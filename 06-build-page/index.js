const fs = require('fs');
const path = require('path');
const fsPromise = require('fs/promises');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.mkdir(
  path.join(__dirname, 'project-dist', 'assets'),
  { recursive: true },
  (err) => {
    if (err) throw err;
  }
);

fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), '', (err) => {
  if (err) throw err;
});

fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
  if (err) throw err;
});

(async function createAssetsDirectory() {
  try {
    const readDirectory = await fs.promises.readdir(
      path.join(__dirname, 'assets'),
      {
        withFileTypes: true,
      }
    );
    for (const directory of readDirectory) {
      let readSubDirectory = await fs.promises.readdir(
        path.join(__dirname, 'assets', directory.name),
        {
          withFileTypes: true,
        }
      );
      fs.mkdir(
        path.join(__dirname, 'project-dist', 'assets', directory.name),
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );
      let subDirectory = await fs.promises.readdir(
        path.join(__dirname, 'project-dist', 'assets', directory.name),
        { withFileTypes: true }
      );
      for (const file of subDirectory) {
        fs.unlink(
          path.join(
            __dirname,
            'project-dist',
            'assets',
            directory.name,
            file.name
          ),
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );
      }
      for (const file of readSubDirectory) {
        fs.copyFile(
          path.join(__dirname, 'assets', directory.name, file.name),
          path.join(
            __dirname,
            'project-dist',
            'assets',
            directory.name,
            file.name
          ),
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
})();

(async function createHTMLFile() {
  try {
    let templateFileValue = await fs.promises.readFile(
      path.join(__dirname, 'template.html')
    );
    let componentsList = await fsPromise.readdir(
      path.join(__dirname, 'components'),
      { withFileTypes: true }
    );
    let htmlTemplate = templateFileValue.toString();
    let htmlComponentItem = '';
    for (const componentItem of componentsList) {
      if (
        componentItem.isFile() &&
        path.extname(componentItem.name) === '.html'
      ) {
        htmlComponentItem = await fsPromise.readFile(
          path.join(__dirname, 'components', componentItem.name)
        );
        htmlTemplate = htmlTemplate.replace(
          `{{${componentItem.name.split('.')[0]}}}`,
          htmlComponentItem.toString()
        );
      }
    }
    fsPromise.writeFile(
      path.join(__dirname, 'project-dist', 'index.html'),
      htmlTemplate
    );
  } catch (err) {
    console.log(err);
  }
})();

(async function createCSSFile() {
  try {
    let stylesList = await fsPromise.readdir(path.join(__dirname, 'styles'), {
      withFileTypes: true,
    });
    for (const styleItem of stylesList) {
      if (
        styleItem.isFile() === true &&
        path.extname(styleItem.name) == '.css'
      ) {
        let cssStyleItem = await fsPromise.readFile(
          path.join(__dirname, 'styles', styleItem.name),
          'utf-8'
        );
        fs.appendFile(
          path.join(__dirname, 'project-dist', 'style.css'),
          cssStyleItem + '\n',
          (err) => {
            if (err) throw err;
          }
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
})();
