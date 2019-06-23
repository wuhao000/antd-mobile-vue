<template>
  <div id="components-layout-demo-basic">
    <div>
      <ae-layout>
        <ae-layout-header>Header</ae-layout-header>
        <ae-layout-content>Content</ae-layout-content>
        <ae-layout-footer>Footer</ae-layout-footer>
      </ae-layout>
    </div>
    <div class="m-t">
      <ae-layout>
        <ae-layout-header>Header</ae-layout-header>
        <ae-layout>
          <ae-layout-sider>Sider</ae-layout-sider>
          <ae-layout-content>Content</ae-layout-content>
        </ae-layout>
        <ae-layout-footer>Footer</ae-layout-footer>
      </ae-layout>
    </div>
    <div class="m-t">
      <ae-layout>
        <ae-layout-header>Header</ae-layout-header>
        <ae-layout>
          <ae-layout-content>Content</ae-layout-content>
          <ae-layout-sider>Sider</ae-layout-sider>
        </ae-layout>
        <ae-layout-footer>Footer</ae-layout-footer>
      </ae-layout>
    </div>
    <div class="m-t">
      <ae-layout>
        <ae-layout-sider>Sider</ae-layout-sider>
        <ae-layout>
          <ae-layout-header>Header</ae-layout-header>
          <ae-layout-content>Content</ae-layout-content>
          <ae-layout-footer>Footer</ae-layout-footer>
        </ae-layout>
      </ae-layout>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import AeLayout from '../../index';

  Vue.use(AeLayout);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
  }
</script>
<style scoped lang="less">
  #components-layout-demo-basic .ant-layout-header,
  #components-layout-demo-basic .ant-layout-footer {
    background: #7dbcea;
    color: #fff;
    height: 64px;
    text-align: center;
    line-height: 64px;
  }

  #components-layout-demo-basic .ant-layout-sider {
    background: #3ba0e9;
    color: #fff;
    line-height: 120px;
    text-align: center;
  }

  #components-layout-demo-basic .ant-layout-content {
    background: rgba(16, 142, 233, 1);
    color: #fff;
    min-height: 120px;
    line-height: 120px;
    text-align: center;
  }
</style>
