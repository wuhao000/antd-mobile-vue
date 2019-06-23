<template>
  <div>
    <m-card>
      <m-card-header>这是标题</m-card-header>
      <m-card-body>这是内容</m-card-body>
      <m-card-body>这是操作区</m-card-body>
    </m-card>
  </div>
</template>
<script lang="ts">
  import MCard from '../../index';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(MCard);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style lang="less" scoped>
</style>
