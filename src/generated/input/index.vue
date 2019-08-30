<template>
  <div>
    <div id="basic">
      <markdown :source="title"/>
    </div>
    <div class="markdown-body m-b" id="demo">
      <span></span>
      <h2>示例代码</h2>
    </div>
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
  import demo2 from './demo2.vue';
  import demo3 from './demo3.vue';
  
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Input from '@/packages/input';
  import title from '../../packages/input/demo/README.md';
  import props from '../../packages/input/demo/props.md';

  Vue.use(Input);
  @Component({
    name: 'ComponentDemo',
    components: {
      demo2, demo3
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
