<template>
  <div>
    <ae-icon spin
             class="m-l"
             type="sync"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import AeIcon from '../../index';

  Vue.use(AeIcon);

  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
  }
</script>
<style scoped lang="less">
</style>
