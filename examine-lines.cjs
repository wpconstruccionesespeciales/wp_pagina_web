const fs = require('fs');

function inspectDump(filename) {
  const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
  console.log(`=== ${filename} ===`);
  console.log('step_index:', data.step_index);
  console.log('type:', data.type);
  console.log('status:', data.status);
  if (data.tool_calls) {
    console.log('tool_calls:', JSON.stringify(data.tool_calls, null, 2));
  }
  if (data.content) {
    console.log('content (first 500 chars):', data.content.substring(0, 500));
    console.log('content (last 500 chars):', data.content.substring(data.content.length - 500));
  }
}

inspectDump('line_19.json');
inspectDump('line_129.json');
inspectDump('line_248.json');
inspectDump('line_279.json');
