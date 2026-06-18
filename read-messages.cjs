const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\Gime\\.gemini\\antigravity\\brain\\fc0ca305-4ed5-442b-8a62-9e79725bee46\\.system_generated\\messages';
if (fs.existsSync(dir)) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    console.log(`File: ${file}, Size: ${stat.size} bytes`);
    if (stat.size < 5000) {
      console.log('Content:', fs.readFileSync(fullPath, 'utf8'));
    }
  }
} else {
  console.log('Directory messages does not exist');
}
