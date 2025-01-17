const { error } = require('console');
const fs = require('fs');
const path = require('node:path');

const pathFolder = path.dirname('03-files-in-folder/secret-folder/text.txt');

fs.readdir(pathFolder, { withFileTypes: true }, (error, files) => {
  if (error) {
    console.log(error);
  } else {
    files.forEach((el) => {
      if (el.isFile()) {
        const pathFile = path.join(
          '03-files-in-folder/secret-folder/',
          el.name,
        );
        fs.stat(pathFile, (err, stats) => {
          const fileSize = stats.size;
          const name = path.basename(el.name, path.extname(el.name));
          const pathFolder = path.extname(`${el.name}`);
          const deleteEl = pathFolder.split('').slice(1).join('');
          console.log(`${name} - ${deleteEl} - ${fileSize}`);
        });
      }
    });
  }
});
