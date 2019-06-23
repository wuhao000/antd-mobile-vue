<template>
  <div>
    <d-button size="small">我是一个按钮</d-button>
    <d-button>我是一个按钮</d-button>
    <d-button size="large">我是一个按钮</d-button>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DButton from '../../index';

  Vue.use(DButton);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style scoped lang="less">
</style>
