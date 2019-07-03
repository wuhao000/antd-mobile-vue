<template>
  <div>
    <m-nav-bar icon="left" left-content="返回"/>
  </div>
</template>
<script lang="ts">
  import MNavBar from '../../index';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(MNavBar);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style lang="less" scoped>
</style>
