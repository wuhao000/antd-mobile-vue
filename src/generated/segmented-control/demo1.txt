<template>
  <div>
    <m-segmented-control v-model="value"
                         :values="['Segment1', 'Segment2']"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import SegmentedControl from '../../index';

  Vue.use(SegmentedControl);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public value = null;
  }
</script>
<style scoped lang="less">
</style>
