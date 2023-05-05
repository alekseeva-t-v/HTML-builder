const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', (err) => {
  if (err) throw err;
});

fs.promises
  .readdir(path.join(__dirname, 'styles'))
  .then(async (elements) => {
    elements.forEach(async (element) => {
      const file = path.join(__dirname, 'styles', element);
      const name = path.basename(file);
      const extension = path.extname(file);
      if (extension === '.css') {
        const readableStream = fs.createReadStream(
          path.join(__dirname, 'styles', name)
        );
        readableStream.on('data', (data) => {
          fs.appendFile(
            path.join(__dirname, 'project-dist', 'bundle.css'),
            data.toString() + '\n',
            (err) => {
              if (err) throw err;
            }
          );
        });
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });
