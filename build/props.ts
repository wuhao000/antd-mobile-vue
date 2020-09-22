/**
 * 解析vue文件中的Props，将其转化为说明文档（markdown）
 * @author 吴昊
 * @since 2019/04/06
 */

const fs = require('fs');
const reg = '((/\\*\\*\\s(.*?)\\s\\*/\\s+)|(/\\*\\*\\s+(\\*\\s+.*\\s+)*\\*/\\s+))?(@Prop\\(([\\s\\S]*?)\\))\\s+public\\s(.*?):\\s(.*?);';
const resolvePath = require('./utils').resolvePath;

function toLine(it) {
  return it.name + '|' + it.comment + '|' + it.type.replace(/\|/g, '\\\|') + '|' + (it.defaultValue || '');
}

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
