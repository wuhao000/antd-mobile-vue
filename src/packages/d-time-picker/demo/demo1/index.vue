<template>
  <div>
    <d-time-picker/>
  </div>
</template>
<script lang="ts">
  import DTimePicker from '../../index';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(DTimePicker);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style lang="less" scoped>
</style>
