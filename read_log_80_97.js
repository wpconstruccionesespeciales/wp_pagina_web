const fs = require('fs');
const readline = require('readline');

const filePath = 'C:\\Users\\Gime\\.gemini\\antigravity\\brain\\2947c27b-b3a3-4a31-9a9b-6c79df504d2a\\.system_generated\\logs\\transcript.jsonl';

const rl = readline.createInterface({
  input: fs.createReadStream(filePath),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  try {
    const data = JSON.parse(line);
    if (data.step_index >= 80 && data.step_index <= 97) {
      console.log(`Step ${data.step_index} [${data.source}] [${data.type}]`);
      if (data.content) {
        console.log(`Content: ${data.content.substring(0, 400)}`);
      }
      if (data.tool_calls) {
        console.log(`Tool calls: ${JSON.stringify(data.tool_calls)}`);
      }
      console.log('-----------------------------------');
    }
  } catch (err) {
    // Ignore malformed lines
  }
});
