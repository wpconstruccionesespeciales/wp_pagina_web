const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\Gime\\.gemini\\antigravity\\brain\\fc0ca305-4ed5-442b-8a62-9e79725bee46\\.system_generated\\logs\\transcript.jsonl';

const fileContent = fs.readFileSync(logPath, 'utf8');
const lines = fileContent.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (!lines[i].trim()) continue;
  try {
    const obj = JSON.parse(lines[i]);
    console.log(`Step ${obj.step_index}: Type: ${obj.type}, Status: ${obj.status}`);
    
    // If it's a step with a tool call we are interested in, print metadata
    if (obj.tool_calls) {
      console.log('  Tool calls:', obj.tool_calls.map(tc => tc.name).join(', '));
    }
  } catch (err) {
    console.error(`Error parsing line ${i}: ${err.message}`);
  }
}
