<template>
  <div>
    <m-activity-indicator size="small"/>
    <m-activity-indicator size="large"/>
    <m-activity-indicator text="正在加载中"/>
  </div>
</template>
<script lang="ts">
  import MActivityIndicator from '../../index';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(MActivityIndicator);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style lang="less" scoped>
</style>
