<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MIcon from '../../index';

  Vue.use(MIcon);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<template>
  <div>
    <div>
      <m-icon color="blue"
              type="check-circle"></m-icon>
      <m-icon color="blue"
              type="search"></m-icon>
      <m-icon type="fail"></m-icon>
      <m-icon type="loading"></m-icon>
    </div>
    <div>
      <ae-icon type="user"/>
    </div>
  </div>
</template>
<style scoped lang="less">
</style>
