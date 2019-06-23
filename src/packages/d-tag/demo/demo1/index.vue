<template>
  <div>
    <d-tag>是</d-tag>
    <d-tag size="small">是</d-tag>
    <d-tag size="default">否</d-tag>
    <d-tag size="large">在是</d-tag>
    <d-tag type="danger">在是</d-tag>
    <d-tag type="success">在是</d-tag>
    <d-tag type="info">在是</d-tag>
    <d-tag type="primary">在是</d-tag>
    <d-tag type="warning">在是</d-tag>
  </div>
</template>
<script lang="ts">
  import DTag from '../../index';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(DTag);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style lang="less" scoped>
</style>
