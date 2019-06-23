<template>
  <div id="components-grid-demo-basic">
    <ae-row type="flex" justify="start">
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
    </ae-row>

    <p>sub-element align center</p>
    <ae-row type="flex" justify="center">
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
    </ae-row>

    <p>sub-element align right</p>
    <ae-row type="flex" justify="end">
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
    </ae-row>

    <p>sub-element monospaced arrangement</p>
    <ae-row type="flex" justify="space-between">
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
    </ae-row>

    <p>sub-element align full</p>
    <ae-row type="flex" justify="space-around">
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
      <ae-col :span="4">col-4</ae-col>
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
    // TODO
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
