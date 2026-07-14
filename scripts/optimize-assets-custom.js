import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const TARGET_DIRS = [
  path.join(ROOT_DIR, 'public', 'wmu'),
  path.join(ROOT_DIR, 'public', 'wp'),
  path.join(ROOT_DIR, 'src', 'assets')
];

async function run() {
  console.log('Cargando Sharp...');
  let sharp;
  try {
    const sharpModule = await import('sharp');
    sharp = sharpModule.default;
  } catch (err) {
    console.error('Error: Sharp no está instalado. Ejecute npm install -D sharp primero.');
    process.exit(1);
  }

  const extensions = ['.png', '.jpg', '.jpeg', '.JPG'];
  let processedCount = 0;

  for (const dir of TARGET_DIRS) {
    if (!fs.existsSync(dir)) {
      console.log(`Directorio no existe: ${dir}`);
      continue;
    }

    console.log(`Escaneando directorio: ${dir}`);
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const ext = path.extname(file);
      if (!extensions.includes(ext)) continue;

      const inputPath = path.join(dir, file);
      const stat = fs.statSync(inputPath);
      
      // Solo optimizar archivos de más de 300KB
      if (stat.size < 300 * 1024) continue;

      const webpFileName = file.substring(0, file.length - ext.length) + '.webp';
      const outputPath = path.join(dir, webpFileName);

      // Si ya existe el archivo webp, saltarlo (a menos que queramos sobreescribir)
      if (fs.existsSync(outputPath)) {
        console.log(`Saltando ${file} - ya existe versión WebP.`);
        continue;
      }

      console.log(`Optimizando: ${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
      try {
        const start = Date.now();
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        const end = Date.now();
        const newSize = fs.statSync(outputPath).size;
        console.log(`-> Creado: ${webpFileName} (${(newSize / 1024).toFixed(1)} KB) en ${end - start}ms`);
        processedCount++;
      } catch (err) {
        console.error(`Error al optimizar ${file}:`, err.message);
      }
    }
  }

  console.log(`¡Optimización completada! Se crearon ${processedCount} archivos WebP nuevos.`);
}

run().catch(console.error);
