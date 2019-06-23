<template>
  <div>
    <d-switch v-model="value"/>
    <d-switch v-model="value2"/>
    <a-switch v-model="value"/>
    <a-switch v-model="value2"/>
  </div>
</template>
<script lang="ts">
  import DSwitch from '../../index';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(DSwitch);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public value = true;
    public value2 = false;
  }
</script>
<style lang="less" scoped>
</style>
