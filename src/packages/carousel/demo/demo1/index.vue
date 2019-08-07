<template>
  <div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MCarousel from '../../index';

  Vue.use(MCarousel);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
  }
</script>
<style scoped lang="less">
  .item {
    height: 100px;
    background: mediumseagreen;
  }
</style>
