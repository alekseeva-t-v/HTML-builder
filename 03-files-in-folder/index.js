const fs = require('fs');
const path = require('path');

fs.promises
  .readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true })
  .then((elements) => {
    elements.forEach((element) => {
      if (!element.isDirectory()) {
        const file = path.join(__dirname, 'secret-folder', element.name);
        const name = path.basename(file).split('.')[0];
        const extension = path.extname(file).slice(1);
        fs.promises.stat(file).then((el) => {
          console.log(`${name} - ${extension} - ${el.size} byte`);
        });
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
