<template>
  <div>
    <div style="background:#f8f8f8;">
      <m-list section
              style="margin-bottom:15px;">
        <m-list-item>列表项2</m-list-item>
        <m-list-item>列表项3</m-list-item>
      </m-list>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MList from '../../index';

  Vue.use(MList);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
  }
</script>
<style scoped lang="less">
</style>
