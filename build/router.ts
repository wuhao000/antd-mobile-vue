import fs from 'fs';
import {Component} from './components';

console.log('生成路由中...');
const renderTemplate = require('./tmpl').render;
const components: Component[] = require('./components');
const types = distinct(components.map(it => it.type));

function distinct(strings: string[]) {
  const res = [];
  strings.forEach(it => {
    if (!res.includes(it)) {
      res.push(it);
    }
  });
  return res;
}

types.forEach(type => {
  const typeComponents = components.filter(it => it.type === type);
  if (type !== 'component') {
    createRoutesForType(type, typeComponents);
  } else {
    const componentTypes = distinct(typeComponents.map(it => it.componentType));
    componentTypes.forEach(componentType => {
      const uiTypeComponents = typeComponents.filter(it => it.componentType === componentType);
      createRoutesForType(componentType + '-component', uiTypeComponents);
    });
  }
});

function createRoutesForType(type: string, typeComponents: Component[]) {
  const route = typeComponents.map((it: Component) => {
    return `{
  path: '${it.dir}',
  name: '${it.upperCase} ${it.zhName}',
  component: () => import('@/generated/${it.dir}/index.vue')
}`;
  }).join(', ');
  const routerTmpl = renderTemplate(`src/templates/router.ts.tmpl`, {
    routers: `[${route}]`
  });
  fs.writeFileSync(`src/router/${type}.ts`, routerTmpl);
}

console.log('生成路由完成');
