<template>
  <ae-layout>
    <m-drawer v-model="show">
      <m-button @click="show = !show">测试</m-button>
      <m-list slot="content" style="height: 100%" class="bg-white">
        <m-list-item>测试1</m-list-item>
        <m-list-item>测试2</m-list-item>
        <m-list-item>测试3</m-list-item>
      </m-list>
    </m-drawer>
  </ae-layout>
</template>
<script lang="ts">
  import Radio from '@/packages/radio';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(Radio);
  @Component({
    name: 'Components'
  })
  export default class Components extends Vue {

    public show = false;
  }
</script>
<style lang="less" type="text/less">
</style>
