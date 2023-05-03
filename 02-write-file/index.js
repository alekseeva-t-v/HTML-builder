const { stdin, stdout, exit } = process;
const fs = require('fs');
const path = require('path');
fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
  if (err) throw err;
});
stdout.write('Hello! Enter text, please...\n');
stdin.on('data', (data) => {
  const dataStringified = data.toString();
  if (dataStringified.trim() === 'exit') {
    stdout.write('Goodbye!');
    exit();
  }
  fs.appendFile(path.join(__dirname, 'text.txt'), dataStringified, (err) => {
    if (err) throw err;
  });
});

process.on('SIGINT', () => {
  stdout.write('Goodbye!');
  exit();
});
