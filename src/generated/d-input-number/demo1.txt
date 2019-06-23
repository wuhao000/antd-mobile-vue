<template>
  <div>
    <d-input-number/>
  </div>
</template>
<script lang="ts">
  import DInputNumber from '../../index';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(DInputNumber);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style lang="less" scoped>
</style>
