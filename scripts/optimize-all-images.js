import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const TARGET_DIRS = [
  path.join(process.cwd(), 'public', 'wp'),
  path.join(process.cwd(), 'public', 'wmu')
];

const MAX_WIDTH = 1600;
const SIZE_THRESHOLD_BYTES = 300 * 1024; // 300 KB

// Helper to recursively find files matching extensions
function getFilesRecursively(dir, extensions) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(filePath, extensions));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        results.push(filePath);
      }
    }
  }
  return results;
}

async function optimizeImage(filePath) {
  const stats = fs.statSync(filePath);
  if (stats.size <= SIZE_THRESHOLD_BYTES) {
    return null; // Skip small files
  }

  const ext = path.extname(filePath).toLowerCase();
  const originalSizeMB = (stats.size / 1024 / 1024).toFixed(2);
  const relativePath = path.relative(process.cwd(), filePath);

  try {
    const buffer = fs.readFileSync(filePath);
    const image = sharp(buffer);
    const metadata = await image.metadata();

    let pipeline = sharp(buffer);
    let resized = false;

    // Resize if width is larger than MAX_WIDTH
    if (metadata.width && metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      resized = true;
    }

    // Set quality based on format
    if (ext === '.webp') {
      pipeline = pipeline.webp({ quality: 78, effort: 4 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 80, progressive: true });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
    } else {
      return null; // Skip unsupported types
    }

    // Write to a temporary file first, then overwrite original to avoid corrupting it on failure
    const tempFilePath = `${filePath}.tmp`;
    await pipeline.toFile(tempFilePath);

    const tempStats = fs.statSync(tempFilePath);
    if (tempStats.size < stats.size) {
      // Overwrite original safely in Windows by copying and then unlinking
      fs.copyFileSync(tempFilePath, filePath);
      fs.unlinkSync(tempFilePath);
      const newSizeKB = (tempStats.size / 1024).toFixed(2);
      const ratio = ((1 - tempStats.size / stats.size) * 100).toFixed(1);
      console.log(`[OPTIMIZED] ${relativePath}: ${originalSizeMB} MB -> ${newSizeKB} KB (-${ratio}%) ${resized ? `(resized from ${metadata.width}px)` : ''}`);
      return { relativePath, originalSizeMB, newSizeKB, ratio, resized, originalWidth: metadata.width };
    } else {
      // Temp file is larger than original? Delete temp file and skip
      fs.unlinkSync(tempFilePath);
      console.log(`[SKIPPED] ${relativePath}: Optimized file was larger than original.`);
      return null;
    }
  } catch (error) {
    console.error(`[ERROR] Failed to process ${relativePath}:`, error.message);
    return null;
  }
}

async function run() {
  console.log('--- STARTING IMAGE OPTIMIZATION ---');
  console.log(`Looking for images > ${SIZE_THRESHOLD_BYTES / 1024} KB in:`);
  TARGET_DIRS.forEach(d => console.log(` - ${path.relative(process.cwd(), d)}`));

  let allImageFiles = [];
  for (const dir of TARGET_DIRS) {
    if (fs.existsSync(dir)) {
      const files = getFilesRecursively(dir, ['.webp', '.jpg', '.jpeg', '.png']);
      allImageFiles = allImageFiles.concat(files);
    }
  }

  console.log(`Found ${allImageFiles.length} total image files.`);
  let optimizedCount = 0;
  const results = [];

  for (const file of allImageFiles) {
    const result = await optimizeImage(file);
    if (result) {
      optimizedCount++;
      results.push(result);
    }
  }

  console.log('--- OPTIMIZATION SUMMARY ---');
  console.log(`Optimized ${optimizedCount} images out of ${allImageFiles.length} candidates.`);
  
  if (results.length > 0) {
    console.log('\nOptimized files list:');
    results.forEach(r => {
      console.log(` - ${r.relativePath}: ${r.originalSizeMB}MB -> ${r.newSizeKB}KB (-${r.ratio}%)`);
    });
  }
}

run().catch(console.error);
