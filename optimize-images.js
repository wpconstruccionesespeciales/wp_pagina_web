import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'public', 'wmu');
const files = [
  'wmu-cero.png',
  'wmu-cero2.png',
  'wmu-sauce.png',
  'wmu-aldea.png',
  'wmu-financing.png'
];

async function run() {
  console.log('Verificando instalación de Sharp...');
  let sharp;
  try {
    const module = await import('sharp');
    sharp = module.default;
  } catch (e) {
    console.log('Sharp no está instalado. Instalándolo como devDependency...');
    execSync('npm install -D sharp', { stdio: 'inherit' });
    const module = await import('sharp');
    sharp = module.default;
  }

  for (const file of files) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace('.png', '.webp'));

    if (fs.existsSync(inputPath)) {
      console.log(`Convirtiendo ${file} a WebP...`);
      const start = Date.now();
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      const end = Date.now();
      const origSize = (fs.statSync(inputPath).size / 1024 / 1024).toFixed(2);
      const newSize = (fs.statSync(outputPath).size / 1024).toFixed(2);
      console.log(`¡Listo! ${file} (${origSize} MB) -> ${path.basename(outputPath)} (${newSize} KB) en ${end - start}ms`);
    } else {
      console.warn(`Archivo no encontrado: ${inputPath}`);
    }
  }
  console.log('¡Optimización de imágenes completada!');
}

run().catch(console.error);
