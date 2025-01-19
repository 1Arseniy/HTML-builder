const fs = require('fs/promises');
const fsReadWrite = require('fs');
const path = require('node:path');

const pathStyles = path.dirname('05-merge-styles/styles/style-1.css');
const copyFile2 = async () => {
  const arrStyles = [];
  const readFiles = await fs.readdir(pathStyles);
  const allPromises = readFiles.map(async (file) => {
    const pathFile = path.join(pathStyles, file);
    //   console.log(pathFile);
    const fileIsFile = await fs.stat(pathFile);
    if (fileIsFile.isFile() && path.extname(pathFile) === '.css') {
      return new Promise((resolve) => {
        const readStyles = fsReadWrite.createReadStream(pathFile);
        readStyles.on('data', (chunk) => {
          const allStyles = chunk.toString();
          arrStyles.push(allStyles);
        });
        readStyles.on('end', () => {
          resolve(arrStyles);
        });
      });
    }
  });
  await Promise.all(allPromises);
  const newArr = [];
  newArr.push(arrStyles[0] + arrStyles[1] + arrStyles[2]);
  console.log(newArr);
  const bundleFolder = fsReadWrite.createWriteStream(
    '05-merge-styles/project-dist/bundle.css',
  );
  bundleFolder.write(newArr.join());
  console.log(arrStyles);
};
copyFile2();
