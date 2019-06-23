const componentList = require('./components');
const fs = require('fs');
const componentTypesDir = 'types/components';
console.log('生成typescript定义文件中……');

componentList.forEach(comp => {
  if (comp.type !== 'tool') {
    const defFilePath = componentTypesDir + '/' + comp.dir + '.d.ts';
    if (!fs.existsSync(defFilePath)) {
      const defFileContent = `import {UIComponent} from './component';

export declare class ${comp.upperCase}Component extends UIComponent {
}
`;
      fs.writeFileSync(defFilePath, defFileContent);
    }
  }
});
const nonToolComponents = componentList.filter(it => it.type !== 'tool');
const importString = nonToolComponents.map(it => {
  return `import {${it.upperCase}Component} from './components/${it.dir}';`;
}).join('\n');
const classString = nonToolComponents.map(it => {
  return `export class ${it.upperCase} extends ${it.upperCase}Component {
}`;
}).join('\n');
const componentsDefContent = importString + '\n\n' + classString + '\n';
const packageDefPath = 'types/aegis-ui.d.ts';

fs.writeFileSync(packageDefPath, componentsDefContent);
console.log('生成typescript定义文件完成');
module.exports = {};
