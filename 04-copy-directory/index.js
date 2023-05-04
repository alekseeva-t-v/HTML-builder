const fs = require('fs');
const path = require('path');

(function copyDir() {
  fs.mkdir(
    path.join(__dirname, 'files-copy'),
    { recursive: true, force: true },
    (err) => {
      if (err) throw err;
    }
  );
  fs.promises.readdir(path.join(__dirname, 'files-copy')).then((elements) => {
    elements.forEach((element) => {
      fs.promises.unlink(path.join(__dirname, 'files-copy', element), (err) => {
        if (err) throw err;
      });
    });
  });
  fs.promises.readdir(path.join(__dirname, 'files')).then((elements) => {
    elements.forEach((element) => {
      fs.promises.copyFile(
        path.join(__dirname, 'files', element),
        path.join(__dirname, 'files-copy', element)
      );
    });
  });
})();
