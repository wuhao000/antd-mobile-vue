import fs from 'fs';
import {Component} from './components';

const basePath = 'src/packages';

/**
 * 获取组件文件夹相对路径的绝对路径
 * @param {Component} component 组件对象
 * @param {string} relativePath 与组件文件夹的相对路径
 */
const resolvePath = (component: Component, relativePath: string) => {
  let copyRelativePath = relativePath;
  if (copyRelativePath.startsWith('/')) {
    copyRelativePath = copyRelativePath.substring(1);
  }
  return `${basePath}/${component.dir}/${copyRelativePath}`;
};
module.exports.resolvePath = resolvePath;

/**
 * 获取组件相关路径文件的内容
 * @param {Component} component 组件对象
 * @param {string} relativePath 与组件文件夹的相对路径
 */
const readPath = (component: Component, relativePath: string): string => {
  const path = resolvePath(component, relativePath);
  if (fs.existsSync(path)) {
    return fs.readFileSync(path).toString();
  }
};
module.exports.readPath = readPath;
