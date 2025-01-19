const fs = require('fs/promises');
const fsReadWrite = require('fs');
// const { readdir } = require('node:fs/promises');
// const { stat } = require('node:fs/promises');
const path = require('node:path');
// const { allowedNodeEnvironmentFlags } = require('node:process');

const pathStyles = path.dirname('05-merge-styles/styles/style-1.css');
// console.log(pathStyles);
const arrStyles = [];
const copyFile = async () => {
  //   const result = await Promise.all();
  fs.readdir(pathStyles, (err, files) => {
    if (err) {
      console.error(err);
    } else {
      files.forEach((file) => {
        const pathFile = path.join(pathStyles, file);
        fs.stat(pathFile, (err, stats) => {
          stats.isFile();
          if (path.extname(pathFile) === '.css') {
            //   console.log(pathFile);
            const readStyles = fs.ReadStream(pathFile);
            readStyles.on('data', (chunk) => {
              // console.log(chunk);
              const allStyles = chunk.toString();
              // console.log(allStyles);
              arrStyles.push(allStyles);
              // console.log(arrStyles);
              // bundleFolder.write(arrStyles);
              // console.log(bundleFolder);
              // console.log(newArrStyles);
            });
          }
        });
      });
    }
  });
};
// console.log(arrStyles);
// copyFile();
const copyFile2 = async () => {
  //   const result = Promise.all(
  //   new Promise((resolve, reject) => {
  const arrStyles = [];
  const readFiles = await fs.readdir(pathStyles);
  const allPromises = readFiles.forEach(async (file) => {
    const pathFile = path.join(pathStyles, file);
    //   console.log(pathFile);
    const fileIsFile = await fs.stat(pathFile);
    if (fileIsFile.isFile() && path.extname(pathFile) === '.css') {
      return new Promise((resolve, reject) => {
        const readStyles = fsReadWrite.createReadStream(pathFile);
        readStyles.on('data', (chunk) => {
          const allStyles = chunk.toString();
          arrStyles.push(allStyles);
          //   console.log(arrStyles);
        });
        readStyles.on('end', () => {
          resolve();
        });
      });
      // console.log(all);
    }
  });
  await Promise.all(allPromises).then((result) => console.log(result));
  // }
  //   resolve(arrStyles);
  // }).then((result) => console.log(result));

  // console.log(arrStyles);
  /*  const bundleFolder = fsReadWrite.createWriteStream(
    '05-merge-styles/project-dist/bundle.css',
  );
  bundleFolder.write(arrStyles.join());
  console.log(arrStyles); */
  //   console.log(file);
  //   const pathFile = path.join(pathStyles, file);
  //   console.log(pathFile);
  //   console.log(fileIsFile.isFile());
  //   )
};

copyFile2();

/*       let item = '';
    allStyles.forEach((style) => {
      if (style === '}') {
        item += style;
        arrStyles.push(item);
        item = '';
      } else {
        item += style;
      }
    });
    */
