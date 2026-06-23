const fs = require('fs');
const logPath = 'C:\\Users\\Gime\\.gemini\\antigravity\\brain\\fc0ca305-4ed5-442b-8a62-9e79725bee46\\.system_generated\\logs\\transcript.jsonl';

const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  try {
    const obj = JSON.parse(lines[i]);
    if (obj.step_index === 20 || obj.step_index === 65 || obj.step_index === 67) {
      console.log(`Step ${obj.step_index}: string length = ${lines[i].length}, content length = ${obj.content ? obj.content.length : 'N/A'}`);
    }
  } catch (err) {
    // Ignore error
  }
}
