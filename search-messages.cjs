const fs = require('fs');
const logPath = 'C:\\Users\\Gime\\.gemini\\antigravity\\brain\\fc0ca305-4ed5-442b-8a62-9e79725bee46\\.system_generated\\logs\\transcript.jsonl';

const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  if (lines[i].includes("const G    = '#35C36B'") || lines[i].includes('const G    = "#35C36B"')) {
    try {
      const obj = JSON.parse(lines[i]);
      console.log(`Line ${i}: Step ${obj.step_index}, Type: ${obj.type}, Status: ${obj.status}, Line Length: ${lines[i].length}`);
    } catch (err) {
      console.log(`Line ${i} (Unparseable): Line Length: ${lines[i].length}`);
    }
  }
}
