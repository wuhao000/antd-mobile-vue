/**
 * 解析vue文件中的Props，将其转化为说明文档（markdown）
 * @author 吴昊
 * @since 2019/04/06
 */
import {Component} from './components';

const fs = require('fs');
const compiler = require('vue-template-compiler');
const reg = '((/\\*\\*\\s(.*?)\\s\\*/\\s+)|(/\\*\\*\\s+(\\*\\s+.*\\s+)*\\*/\\s+))?(@Prop\\(([\\s\\S]*?)\\))\\s+public\\s(.*?):\\s(.*?);';
const resolvePath = require('./utils').resolvePath;

function toLine(it) {
  return it.name + '|' + it.comment + '|' + it.type.replace(/\|/g, '\\\|') + '|' + (it.defaultValue || '');
}

function createPropsMarkdown(component: Component, resolveProps) {
  const propsMdPath = resolvePath(component, 'demo/props.md');
  const newList = [];
  resolveProps.forEach(it => {
    newList.push({
      name: it.name,
      line: toLine(it)
    });
  });
  if (fs.existsSync(propsMdPath)) {
    const existsProps = resolveExistsProps(propsMdPath);
    const resolvedNames = resolveProps.map(it => it.name);
    existsProps.filter(it => !resolvedNames.includes(it.name))
        .forEach(it => {
          newList.push(it);
        });
  }
  const newMdContent = `属性 | 说明 | 类型 | 默认值 
------ | ------ | ------ | ---
` + newList.sort((a, b) => a.name.localeCompare(b.name)).map(it => it.line).join('\n');
  fs.writeFileSync(propsMdPath, newMdContent);
}

function getScript(component: Component): string {
  const vueFilePath = resolvePath(component, 'src/index.vue');
  const tsxFilePath = resolvePath(component, 'src/index.tsx');
  if (fs.existsSync(vueFilePath)) {
    const vue = fs.readFileSync(vueFilePath).toString();
    const parsed = compiler.parseComponent(vue);
    return parsed.script.content;
  } else if (fs.existsSync(tsxFilePath)) {
    return fs.readFileSync(tsxFilePath).toString();
  }
}

module.exports.resolveProps = (component) => {
  const script = getScript(component);
  if (script) {
    console.log(`为${component.name}生成props.md...`);
    const propReg = new RegExp(reg, 'g');
    const res = script.match(propReg);
    if (res) {
      const resolveProps = res.map(prop => resolveProp(prop));
      if (resolveProps.length) {
        // createPropsMarkdown(component, resolveProps);
      }
    }
    console.log(`为${component.name}生成props.md完成`);
  }
};

/**
 * 去掉注释中的 *，保留文字部分
 * @param commentText 注释部分去掉开头的/**和结尾的*\/的部分
 * @return {string} 注释
 */
function pureComment(commentText) {
  if (commentText) {
    return commentText.trim()
        .split('\n')
        .map(it => it.trim())
        .map(it => {
          if (it.indexOf('*') === 0) {
            return it.substring(1);
          } else {
            return it;
          }
        }).join('').trim();
  }
  return '';
}

/**
 * 从@Prop装饰器中解析默认值
 * @param decoratorPart
 * @return {null|string}
 */
function resolveDefaultValueFromDecorator(decoratorPart) {
  const defaultPart = decoratorPart.match(/default:\s(\w+)/g);
  if (defaultPart) {
    return defaultPart[0].replace('default: ', '');
  }
  return null;
}

/**
 * 解析vue文件中的prop属性
 * @param prop prop属性完整表达式
 */
function resolveProp(prop) {
  const propExecReg = new RegExp(reg);
  const match = propExecReg.exec(prop);
  const comment = pureComment(match[3] || match[5]);
  const decoratorPart = match[6];
  const name = match[8];
  const type = match[9];
  const defaultValue = resolveDefaultValueFromDecorator(decoratorPart);
  return {
    name: name.endsWith('?') ? name.substring(0, name.length - 1) : name, type, comment, defaultValue
  };
}


/**
 *
 * @return {Array}
 */
export default function resolveExistsProps(mdFilePath) {
  const md = fs.readFileSync(mdFilePath).toString();
  const lines = md.split('\n').filter(line => line.length);
  const existsProp = [];
  lines.forEach(line => {
    if (line.includes('|')) {
      const name = line.split('|').filter(it => it.length)[0].trim();
      if (name !== '属性' && !/[-]+/.test(name)) {
        existsProp.push({
          name,
          line
        });
      }
    }
  });
  return existsProp;
}
