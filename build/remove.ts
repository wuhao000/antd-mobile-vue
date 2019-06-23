const env = process.env;
const args = JSON.parse(env.npm_config_argv).remain;
import fs from 'fs';
if(args.length !== 1){
  throw new Error('参数数量不正确')
}else{
  const name = args[0];
  const path = 'src/packages/map.json';
  const componentMap = require('../src/packages/map.json');
  if (!componentMap[name]) {
    throw new Error('组件不存在');
  } else {
    delete componentMap[name];
    fs.writeFileSync(path, JSON.stringify(componentMap));
  }
}

function deleteFolder(path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      var curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolder(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}
