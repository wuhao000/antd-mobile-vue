<template>
  <div>
    <m-pagination v-model="current" :total="3"/>
    <m-pagination :value="current" :total="3" mode="number"/>
    <m-pagination :value="current" :total="3" mode="pointer"/>
  </div>
</template>
<script lang="ts">
  import MPagination from '../../index';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(MPagination);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public current = 1;
  }
</script>
<style lang="less" scoped>
</style>
