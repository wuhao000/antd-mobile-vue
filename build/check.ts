const components = require('./components');
import fs from 'fs';

const checkSuffix = ['.ts', '.tsx', '.vue', '.jsx', '.js'];
const checkDirs = ['mixins'];

function getCheckFiles(dir: string) {
  if (fs.existsSync(dir)) {
    const fileNames = fs.readdirSync(dir);
    return fileNames.filter(name => checkSuffix.some(it => name.endsWith(it)))
      .map(it => dir + '/' + it);
  }
  return [];
}

components.forEach(comp => {
  const componentRootPath = 'src/packages/' + comp.dir;
  const srcPath = componentRootPath + '/src';
  if (!fs.existsSync(componentRootPath)) {
    fs.mkdirSync(componentRootPath);
  }
  const files = fs.readdirSync(componentRootPath);
  let checkFiles = files.filter(name => checkSuffix.some(it => name.endsWith(it)))
    .map(it => componentRootPath + '/' + it);
  checkFiles = checkFiles.concat(getCheckFiles(srcPath));
  checkDirs.forEach((dir) => {
    checkFiles = checkFiles.concat(getCheckFiles('src/' + dir));
  });
  checkFiles.forEach(path => {
    const content = fs.readFileSync(path).toString();
    if (content.includes('\'@/')) {
      throw Error('文件' + path + '中存在路径别名@');
    }
  });
});
