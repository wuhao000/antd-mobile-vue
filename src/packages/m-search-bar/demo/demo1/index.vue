<template>
  <div>
    {{value}}
    <m-search-bar v-model="value"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MSearchBar from '../../index';

  Vue.use(MSearchBar);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public value: string = '';
  }
</script>
<style scoped lang="less">
</style>
