<template>
  <div>
    <demo1-component/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DatePickerView from '../../index';
  import Demo1Component from './demo1';

  Vue.use(DatePickerView);
  @Component({
    name: 'Demo1',
    components: {Demo1Component}
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style scoped lang="less">
</style>
