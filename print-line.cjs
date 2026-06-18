const fs = require('fs');
const logPath = 'C:\\Users\\Gime\\.gemini\\antigravity\\brain\\fc0ca305-4ed5-442b-8a62-9e79725bee46\\.system_generated\\logs\\transcript.jsonl';

const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

const lineIndices = [19, 129, 248, 279];
for (const idx of lineIndices) {
  if (idx < lines.length) {
    fs.writeFileSync(`line_${idx}.json`, lines[idx], 'utf8');
    console.log(`Wrote line_${idx}.json, size: ${lines[idx].length} bytes`);
  }
}
