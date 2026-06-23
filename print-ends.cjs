const fs = require('fs');

function checkLineNumbers(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const lines = content.split('\n');
  const nums = [];
  for (const line of lines) {
    const match = line.match(/^(\d+):/);
    if (match) {
      nums.push(parseInt(match[1], 10));
    }
  }
  if (nums.length > 0) {
    console.log(`${filename}: line numbers from ${nums[0]} to ${nums[nums.length - 1]}, total found = ${nums.length}`);
  } else {
    console.log(`${filename}: no line numbers found`);
  }
}

checkLineNumbers('step20_content.txt');
checkLineNumbers('step65_content.txt');
checkLineNumbers('step67_content.txt');
