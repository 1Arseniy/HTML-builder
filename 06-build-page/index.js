const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('node:path');
const pathTemplateHtml = path.resolve('06-build-page/template.html');
const componentsPath = path.dirname('06-build-page/components/header.html');
const indexPath = path.resolve('06-build-page/project-dist/index.html');
fs.mkdir(
  path.join('06-build-page', 'project-dist'),
  { recursive: true },
  (err) => {
    console.error(err);
  },
);
const replaceTag = async () => {
  const componentsFiles = await fsPromise.readdir(componentsPath);
  const readTemplateHtml = await fsPromise.readFile(pathTemplateHtml, 'utf-8');
  let templateFile = readTemplateHtml;
  for (const file of componentsFiles) {
    const componentsFile = path.join('06-build-page', 'components', file);
    const isFile = await fsPromise.stat(componentsFile);
    if (isFile.isFile() && path.extname(componentsFile) === '.html') {
      const pathName = path.basename(file, '.html');
      const readComponentsFile = await fsPromise.readFile(
        componentsFile,
        'utf-8',
      );
      const regExp = `{{${pathName}}}`;
      templateFile = templateFile.replace(regExp, readComponentsFile);
    }
  }
  const writeComponentsFile = fs.createWriteStream(indexPath);
  writeComponentsFile.write(templateFile);
};

replaceTag();

const pathStyles = path.dirname('06-build-page/styles/01-header.css');
const copyFile2 = async () => {
  const arrStyles = [];
  const readFiles = await fsPromise.readdir(pathStyles);
  const allPromises = readFiles.map(async (file) => {
    const pathFile = path.join(pathStyles, file);
    const fileIsFile = await fsPromise.stat(pathFile);
    if (fileIsFile.isFile() && path.extname(pathFile) === '.css') {
      return new Promise((resolve) => {
        const readStyles = fs.createReadStream(pathFile);
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
  const bundleFolder = fs.createWriteStream(
    '06-build-page/project-dist/style.css',
  );
  bundleFolder.write(newArr.join());
};
copyFile2();

const copyDir = async (pathFolder, pathFileCopy) => {
  await fsPromise.mkdir(path.join('06-build-page', 'project-dist', 'assets'), {
    recursive: true,
  });

  const readFolder = await fsPromise.readdir(pathFolder);
  const Promise1 = readFolder.map(async (file) => {
    const pathAssetsFolder = path.join(pathFolder, file);
    const pathFolderCopy = path.join(pathFileCopy, file);
    const stats = await fsPromise.stat(pathAssetsFolder);
    if (stats.isDirectory()) {
      copyDir(pathAssetsFolder, pathFolderCopy);
      fsPromise.mkdir(
        path.join('06-build-page', 'project-dist', 'assets', file),
        { recursive: true },
      );
    } else {
      await fsPromise.copyFile(pathAssetsFolder, pathFolderCopy);
    }
  });
  await Promise.all(Promise1);
};

copyDir(
  path.join('06-build-page', 'assets'),
  path.join('06-build-page', 'project-dist', 'assets'),
);
