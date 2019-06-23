export enum ComponentType {
  Tool = 'tool',
  UIComponent = 'component',
  Directive = 'directive'
}

export interface Component {
  componentType: string;
  dir: string;
  name: string;
  type: ComponentType,
  upperCase: string;
  zhName: string;
}

const resolveComponents = () => {
  const packageMap = require('../src/packages/map.json');
  const componentList: Component[] = [];
  Object.keys(packageMap).forEach(name => {
    const componentName = name.split('-').map(it => it.substring(0, 1).toUpperCase() + it.substring(1)).join('');
    componentList.push({
      name: packageMap[name].name,
      dir: name,
      componentType: packageMap[name].componentType,
      zhName: packageMap[name].chineseName,
      upperCase: componentName,
      type: packageMap[name].type
    });
  });
  return componentList;
};
module.exports = resolveComponents();
