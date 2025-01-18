const fs = require('fs');
const path = require('node:path');

const pathFolder = path.dirname('04-copy-directory/files/test-js.js');
// console.log(pathFolder);
// console.log(pathFileCopy);
copyDir = () => {
  fs.readdir(pathFolder, (err, files) => {
    if (err) {
      console.error('error');
    } else {
      files.forEach((file) => {
        const pathFile = path.join('04-copy-directory', 'files', file);
        const pathFileCopy = path.join('04-copy-directory', 'files-copy', file);
        fs.copyFile(pathFile, pathFileCopy, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    }
  });
};
copyDir();

fs.mkdir(
  path.join('04-copy-directory', 'files-copy'),
  { recursive: true },
  (err) => {
    console.log(err);
  },
);
