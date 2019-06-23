<template>
  <div>
    <ae-tooltip>
      abc
      <div slot="title">
        这是事实
      </div>
    </ae-tooltip>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import AeTooltip from '../../index';

  Vue.use(AeTooltip);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style scoped lang="less">
</style>
