const fs = require('fs');
const path = require('node:path');
const pathFolder = path.dirname('04-copy-directory/files/test-js.js');
const copyDir = () => {
  fs.readdir(pathFolder, (err, files1) => {
    if (err) {
      console.error('error');
    } else {
      files1.forEach((file) => {
        const pathFile = path.join('04-copy-directory', 'files', file);
        const pathFileCopy = path.join('04-copy-directory', 'files-copy', file);
        fs.copyFile(pathFile, pathFileCopy, (err) => {
          if (err) {
            console.error(err);
          }
        });
      });
      fs.readdir('04-copy-directory/files-copy/', (err, files2) => {
        if (files2.length !== files1.length) {
          files2.forEach((file2) => {
            if (!files1.includes(file2)) {
              fs.rm(`04-copy-directory/files-copy/${file2}`, (err) => {
                console.log(err);
              });
            }
          });
        }
      });
    }
  });
};
copyDir();

const createDelFolder = () => {
  fs.mkdir(
    path.join('04-copy-directory', 'files-copy'),
    { recursive: true },
    (err) => {
      err;
    },
  );
};
createDelFolder();
