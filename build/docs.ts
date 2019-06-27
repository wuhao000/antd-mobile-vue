const resolveProps = require('./props').resolveProps;
import fs from 'fs';
import {Component} from './components';

const componentList = require('./components');
const basePath = 'src/packages';
const renderTemplate = require('./tmpl').render;

interface DemoDescriptor {
  markdownFileContent: string;
  name: string;
  /** 标题 */
  title: string;
  vueFileContent: string;
}

console.log('生成文档中……');

function createDemoFile(component: Component, componentDemoRootPath, demoName, vueContent) {
  const name = demoName.substring(0, 1).toUpperCase() + demoName.substring(1);
  const content = renderTemplate('src/templates/demo-index.vue.tmpl', {
    name, demoName, dir: component.dir
  });
  const componentGeneratedFilePath = 'src/generated/' + component.dir;
  if (!fs.existsSync(componentGeneratedFilePath)) {
    fs.mkdirSync(componentGeneratedFilePath);
  }
  fs.writeFileSync(`${componentGeneratedFilePath}/${demoName}.txt`, vueContent);
  fs.writeFileSync(`${componentGeneratedFilePath}/${demoName}.vue`, content);
}

const titleMap = {
  props: '属性说明',
  events: '事件说明',
  functions: '方法说明',
  slots: '插槽说明'
};

function createDemoTemplate(demos: DemoDescriptor[], options) {
  const demoComponents = demos.map(it => it.name).map(it => `    <${it} id="${it}"/>`).join('\n');
  const mdComponents = ['props', 'events', 'functions', 'slots'].map(it => {
    if (options[it]) {
      return `<div class="markdown-body" id="${it}">
      <span></span>
      <h2>${titleMap[it]}</h2>
    </div>
    <markdown :source="${it}"/>`;
    } else {
      return '';
    }
  }).filter(it => it.length > 0).join('\n\t\t');
  const title = options.title ? '<markdown :source="title"/>' : '';
  return renderTemplate('src/templates/demo.vue.tmpl', {
    title,
    demoComponents,
    mdComponents,
    anchors: demos.map(it => {
      return `        <d-anchor-link href="#${it.name}"
                       title="${it.title}"/>`;
    }).join('\n'),
    propsExists: options['props'] || false,
    eventsExists: options['events'] || false,
    functionsExists: options['functions'] || false,
    slotsExists: options['slots'] || false
  });
}

function createDemoIndex(component: Component, componentDemoRootPath, demos: DemoDescriptor[]) {
  const demoImports = demos.map(it => it.name).map(it => `  import ${it} from './${it}.vue';`)
      .join('\n');
  const options = {
    title: fs.existsSync(componentDemoRootPath + '/README.md'),
    props: fs.existsSync(componentDemoRootPath + '/props.md'),
    events: fs.existsSync(componentDemoRootPath + '/events.md'),
    functions: fs.existsSync(componentDemoRootPath + '/functions.md'),
    slots: fs.existsSync(componentDemoRootPath + '/slots.md')
  };
  const mdImports = Object.keys(options)
      .map(it => options[it] ? `import ${it} from '../../packages/${component.dir}/demo/${it === 'title' ? 'README' : it}.md';` : '')
      .filter(it => it.length > 0)
      .join('\n  ');
  const mdProps = Object.keys(options)
      .map(it => options[it] ? `public ${it} = ${it};` : '')
      .filter(it => it.length > 0)
      .join('\n    ');

  function generateDecorator(demos: DemoDescriptor[]) {
    if (demos.length) {
      return `@Component({
    name: 'ComponentDemo',
    components: {
      ${demos.map(it => it.name).join(', ')}
    }
  })`;
    } else {
      return `@Component({
    name: 'ComponentDemo'
  })`;
    }
  }

  const content = `${createDemoTemplate(demos, options)}
<script lang="ts">
${demoImports}
  
  import Vue from 'vue';
  import Component from 'vue-class-component';
${component.type !== 'tool' ? `  import ${component.upperCase} from '@/packages/${component.dir}';` : ''}
  ${mdImports}

${component.type !== 'tool' ? `  Vue.use(${component.upperCase});` : ''}
  ${generateDecorator(demos)}
  export default class ComponentDemo extends Vue {
${mdProps ? `    ${mdProps}` : ''}

    public getContainer() {
      return document.getElementById('app-content');
    }
  }
</script>
<style lang="less" scoped>
  .toc-affix {
    width: 150px;
    position: fixed;
    top: 100px;
    right: 10px;
    bottom: 250px;
    z-index: 500;
  }
</style>
`;
  const dir = 'src/generated/' + component.dir;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync('src/generated/' + component.dir + '/index.vue', content);
}

function resolveDemo(component) {
  resolveProps(component);
  const componentDemoRootPath = `${basePath}/${component.dir}/demo`;
  if (fs.existsSync(componentDemoRootPath)) {
    const paths = fs.readdirSync(componentDemoRootPath);
    const demoDirs = paths.filter(it => !it.includes('.'));
    const demos: DemoDescriptor[] = [];
    const demoNames: string[] = [];
    demoDirs.forEach(demoName => {
      const demoDir = `${componentDemoRootPath}/${demoName}`;
      const vuePath = demoDir + '/index.vue';
      const hasVueFile = fs.existsSync(vuePath);
      const markdownPath = demoDir + '/index.md';
      const hasMarkdownFile = fs.existsSync(markdownPath);
      if (hasVueFile && hasMarkdownFile) {
        const vueContent = fs.readFileSync(demoDir + '/index.vue').toString();
        createDemoFile(component, componentDemoRootPath,
            demoName, vueContent);
        const markdownContent = fs.readFileSync(markdownPath).toString();
        const firstLine = markdownContent.split('\n')[0];
        demos.push({
          name: demoName,
          title: firstLine ? (firstLine.startsWith('####') ? firstLine.substring(4).trim() : firstLine.trim()) : '',
          markdownFileContent: markdownContent,
          vueFileContent: fs.readFileSync(vuePath).toString()
        });
        demoNames.push(demoName);
      }
    });
    createDemoIndex(component, componentDemoRootPath, demos);
  }
}

componentList.forEach(component => {
  resolveDemo(component);
});
generateMainFile();

/**
 * 生成入口文件src/packages/index.ts
 */
export default function generateMainFile() {
  const componentList = require('./components');
  const res = renderTemplate('src/templates/index.ts.tmpl', {
    imports: componentList.map(it => {
      return `import ${it.upperCase} from './${it.dir}';`;
    }).join('\n'),
    vueComponents: componentList.filter(it => it.type !== 'tool').map(it => it.upperCase).join(',\n\t'),
    components: componentList.map(it => it.upperCase).join(',\n\t')
  });
  fs.writeFileSync('src/packages/index.ts', res);
}
require('./router');
console.log('生成文档完成');
