<template>
  <div id="components-grid-demo-basic">
    <ae-row>
      <ae-col :span="12">col-12</ae-col>
      <ae-col :span="12">col-12</ae-col>
    </ae-row>
    <ae-row>
      <ae-col :span="8">col-8</ae-col>
      <ae-col :span="8">col-8</ae-col>
      <ae-col :span="8">col-8</ae-col>
    </ae-row>
    <ae-row>
      <ae-col :span="6">col-6</ae-col>
      <ae-col :span="6">col-6</ae-col>
      <ae-col :span="6">col-6</ae-col>
      <ae-col :span="6">col-6</ae-col>
    </ae-row>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import AeGrid from '../../index';

  Vue.use(AeGrid);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
  }
</script>
<style scoped lang="less">
  .code-box-demo .ant-row>div:not(.gutter-row):nth-child(2n + 1),
  .code-box-demo .ant-row>div:not(.gutter-row):nth-child(2n + 1),
  .code-box-demo .ant-row-flex>div:not(.gutter-row):nth-child(2n + 1),
  .code-box-demo .ant-row-flex>div:not(.gutter-row):nth-child(2n + 1) {
    background: rgba(0,160,233,0.7);
  }

  .code-box-demo .ant-row > div:not(.gutter-row),
  .code-box-demo .ant-row > div:not(.gutter-row),
  .ant-row-flex > div:not(.gutter-row),
  .code-box-demo .ant-row-flex > div:not(.gutter-row) {
    padding: 16px 0;
    background: #00a0e9;
  }

  .ant-row > div,
  .ant-row > div,
  .code-box-demo .ant-row > div,
  .code-box-demo .ant-row > div,
  .ant-row-flex > div,
  .ant-row-flex > div,
  .code-box-demo .ant-row-flex > div,
  .code-box-demo .ant-row-flex > div {
    min-height: 30px;
    margin-top: 8px;
    margin-bottom: 8px;
    padding: 5px 0;
    color: #fff;
    text-align: center;
    border-radius: 0;
  }
</style>
