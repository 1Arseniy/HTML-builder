const fs = require('fs');
const readline = require('readline');
const writeF = fs.createWriteStream('./02-write-file/02-write-file.txt');

let createInput = readline.createInterface(process.stdin, process.stdout);
const file = () => {
  console.log('Hello');
  createInput.on('line', (input) => {
    writeF.write(input);
    if (input === 'exit') {
      console.log('Bye');
      createInput.close();
    }
  });
};
file();
createInput.on('SIGINT', () => {
  console.log('\nBye');
  createInput.close();
});
