const { error } = require('node:console');
const fs = require('fs');
const path = require('node:path');
const pathText = path.resolve(
  __dirname,
  'D:\\rs-school-stage1\\HTML-builder\\01-read-file\\text.txt',
);
const readF = fs.ReadStream(pathText);
readF.on('data', (chunk) => {
  console.log(chunk.toString());
});
