const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'img');
const files = fs.readdirSync(imgDir);

files.forEach(file => {
  if (file.endsWith('.png')) {
    const filePath = path.join(imgDir, file);
    const buffer = Buffer.alloc(24);
    const fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buffer, 0, 24, 0);
    fs.closeSync(fd);
    
    // Check if it is a PNG
    if (buffer.readUInt32BE(0) === 0x89504E47 && buffer.readUInt32BE(12) === 0x49484452) {
      const width = buffer.readUInt32BE(16);
      const height = buffer.readUInt32BE(20);
      console.log(`${file}: ${width}x${height}`);
    } else {
      console.log(`${file}: Not a standard PNG`);
    }
  }
});
