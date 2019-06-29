const env = process.env;
const args = JSON.parse(env.npm_config_argv).remain;
const fs = require('fs');

const path = require('path');

const renderTemplate = require('./tmpl').render;

import {js_beautify as jsBeautify} from 'js-beautify';


const componentList = require('./components');
let componentListName: string[] = [];
/**
 * 获取components的name ,lowerCase,upperCase 列表。
 * 以此判断是否重名
 */
componentList.forEach(componentName => {
  componentListName.push(componentName.dir);
  componentListName.push(componentName.upperCase);
});

const resolve = dir => {
  return path.join(__dirname, dir);
};
const basePath = resolve('../src/packages');

interface Options {
  chineseName: string;
  componentType: 'general' | 'desktop' | 'mobile'
  name: string;
  type: 'tool' | 'component' | 'directive' | 'general-component' | 'desktop-component' | 'mobile-component',
}

/* 驼峰转换-*/
function toLine(name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/* -转驼峰*/
function toCamel(str) {
  str = str.substring(0, 1).toUpperCase() + str.substring(1);
  return str.replace(/([^-])(?:-+([^-]))/g, function ($0, $1, $2) {
    return $1 + $2.toUpperCase();
  });
}

/** 对象熟悉按字典排序 */
function objKeySort(obj) {
  let newkey = Object.keys(obj).sort();
  let newObj = {};
  for (let i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]];
  }
  return newObj;//返回排好序的新对象
}

module.exports.objKeySort = objKeySort;

export default function createFile(options: Options) {
  /*
  获取templates文件夹下需要的{type}-index.ts.tmpl模板
  */

  const indexTsTemplate = renderTemplate(resolve(`../src/templates/${options.type}-index.ts.tmpl`), {
    name: toCamel(options.name),
    directiveName: toLine(options.name)
  });

  let folderName = options.type === 'directive' ? `${toLine(options.name)}-directive` : `${toLine(options.name)}`;

  fs.mkdirSync(`${basePath}/${folderName}`);  // 创建 文件夹
  fs.mkdirSync(`${basePath}/${folderName}/demo`); //创建 子文件夹 demo
  fs.writeFileSync(`${basePath}/${folderName}/demo/README.md`, `# ${options.chineseName}  ${toLine(options.name)}`);
  fs.mkdirSync(`${basePath}/${folderName}/demo/demo1`); // demo 目录下创建 demo1 目录
  /**
   * 获取templates文件夹下需要的demo1-{type}-index.vue.tmpl模板  该模板应用于 demo1目录
   */
  const demo1IndexVue = renderTemplate(resolve(`../src/templates/demo1-${options.type}-index.vue.tmpl`), {
    name: toCamel(options.name)
  });
  fs.writeFileSync(`${basePath}/${folderName}/demo/demo1/index.vue`, demo1IndexVue);
  fs.writeFileSync(`${basePath}/${folderName}/demo/demo1/index.md`, '基本用法');
  fs.mkdirSync(`${basePath}/${folderName}/src`);
  fs.writeFileSync(`${basePath}/${folderName}/index.ts`, indexTsTemplate);

  if (options.type === 'component') {
    /**
     * 获取templates文件夹下需要的src-index.vue.tmpl模板  该模板应用于 src目录 并且 type为 component
     */
    const srcIndexVue = renderTemplate(resolve(`../src/templates/src-index.ts.tmpl`), {
      name: options.name,
      className: toLine(options.name),
      componentClassName: toCamel(options.name)
    });
    fs.writeFileSync(`${basePath}/${folderName}/src/index.tsx`, srcIndexVue);
  }
  if (options.type === 'directive') {
    /**
     * 获取templates文件夹下需要的src-directive-index.ts.tmpl模板  该模板应用于 src目录 并且 type为 directive
     */
    const srcIndexDirective = renderTemplate(resolve(`../src/templates/src-directive-index.ts.tmpl`), {});
    fs.writeFileSync(`${basePath}/${folderName}/src/index.tsx`, srcIndexDirective);
  }
  if (options.type === 'tool') {
    const srcIndexTool = `export default {};
`;
    fs.writeFileSync(`${basePath}/${folderName}/src/index.tsx`, srcIndexTool);
  }
  /**
   * 改写 map.json文件
   */
  const mapJson = require('../src/packages/map.json');
  let obj = Object.assign(mapJson, {
    [folderName]: {
      type: options.type,
      componentType: options.componentType,
      name: options.name,
      chineseName: options.chineseName
    }
  });
  let mapJsonFormat = jsBeautify(JSON.stringify(objKeySort(obj)), { // 格式化
    indent_size: 2
  });
  fs.writeFileSync(`${basePath}/map.json`, mapJsonFormat);
  require('./router');
}

const types = ['tool', 'directive', 'component'];
if (args.length !== 3) {
  throw Error('参数数量不正确');
} else {
  const nameReg = /^[a-z]+(-[a-z]+)*$/g;
  const componentNameReg = /^[a-z]+((-[a-z]+)+)?$/g;
  const name = args[0];
  let type = args[2];
  if (type === 'ui') {
    type = 'component';
  }
  const options: Options = {
    name,
    chineseName: args[1],
    type,
    componentType: 'mobile'
  };
  if (!options.type) {
    throw Error('type参数不正确，参数值仅支持：ui, ' + types.join(', '));
  }
  if (componentListName.includes(options.name)) {
    throw Error(`已有 ${options.name} 的目录，请换个名称创建`);
  }

  if (!nameReg.test(options.name)) {
    throw Error(`命名方式为-连接小写单词，不允许使用大写`);
  } else if (options.type === 'component' && !componentNameReg.test(options.name)) {
    throw Error(`UI组件以m开头，例如m-input,PC端UI组件以d开头，例如d-input,通用UI组件以ae开头，例如ae-input`);
  }
  // if (args.length > 1) {
  //   args.splice(0, 1);
  // }
  // const argPairs: string[][] = [];
  // for (let i = 0; i < args.length / 2; i++) {
  //   argPairs.push([args[i], args[i + 1]]);
  // }
  // console.log(argPairs)
  // argPairs.forEach(pair => {
  //   console.log(pair)
  //   if (pair[0] === 'type') {
  //     if (['tool', 'component', 'directive'].includes(pair[1])) {
  //       options.type = pair[1] as any;
  //     } else {
  //       throw Error("type参数不正确，参数值仅支持：tool, component, directive")
  //     }
  //   }
  // });
  createFile(options);
}
