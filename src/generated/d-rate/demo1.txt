<template>
  <div>
    <d-rate v-model="value"/>
    {{value}}
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DRate from '../../index';

  Vue.use(DRate);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public value = null;
  }
</script>
<style scoped lang="less">
</style>
