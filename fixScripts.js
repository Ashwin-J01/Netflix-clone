// fixScripts.js
try {
  const fs = require('fs');
  const path = require('path');

  const file = path.join(__dirname, 'node_modules/.bin/react-scripts');
  fs.chmodSync(file, 0o755);
  console.log('React-scripts permission fixed.');
} catch (err) {
  console.log('No permission fix needed.');
}
