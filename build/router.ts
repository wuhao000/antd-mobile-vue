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
  createRoutesForType(type, typeComponents);
});

function getTags(typeComponents: Component[]) {
  const tags = [];
  typeComponents.forEach(comp => {
    if (comp.tag && !tags.includes(comp.tag)) {
      tags.push(comp.tag);
    }
  });
  tags.push(undefined);
  return tags;
}

function createRouteStr(it: Component) {
  return `{
  path: '${it.dir}',
  name: '${it.upperCase} ${it.zhName}',
  meta: {
    tag: '${it.tag || '其他'}'
  },
  component: () => import('@/generated/${it.dir}/index.vue')
}`;
}

function createRoutesForType(type: string, typeComponents: Component[]) {
  let route = '';
  route = typeComponents.map((it: Component) => {
    return createRouteStr(it);
  }).join(', ');
  const routerTmpl = renderTemplate(`src/templates/router.ts.tmpl`, {
    routers: `[${route}]`
  });
  fs.writeFileSync(`src/router/${type}.ts`, routerTmpl);
}

console.log('生成路由完成');
