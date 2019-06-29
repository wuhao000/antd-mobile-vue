<template>
  <div>
    <demo/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Demo from './demo1';

  @Component({
    name: 'Demo1',
    components: {Demo}
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style lang="less">
  .top-nav-bar {
    position: relative;
    background-color: #008AE6;
    color: #FFF;
  }

  .am-navbar-title {
    color: white !important;
  }
</style>
