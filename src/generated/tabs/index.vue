<template>
  <div>
    <div id="basic">
      <markdown :source="title"/>
    </div>
    <div class="markdown-body m-b" id="demo">
      <span></span>
      <h2>示例代码</h2>
    </div>
    <demo1 id="demo1"/>
    <demo2 id="demo2"/>
    <demo3 id="demo3"/>
    <div class="markdown-body" id="props">
      <span></span>
      <h2>属性说明</h2>
    </div>
    <markdown :source="props"/>
 </div>
</template>

<script lang="ts">
  import demo1 from './demo1.vue';
  import demo2 from './demo2.vue';
  import demo3 from './demo3.vue';
  
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Tabs from '@/packages/tabs';
  import title from '../../packages/tabs/demo/README.md';
  import props from '../../packages/tabs/demo/props.md';

  Vue.use(Tabs);
  @Component({
    name: 'ComponentDemo',
    components: {
      demo1, demo2, demo3
    }
  })
  export default class ComponentDemo extends Vue {
    public title = title;
    public props = props;

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
