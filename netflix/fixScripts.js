try {
  const fs = require('fs');
  const path = require('path');

  const file = path.join(__dirname, 'node_modules/.bin/react-scripts');
  fs.chmodSync(file, 0o755);
} catch (err) {
}
