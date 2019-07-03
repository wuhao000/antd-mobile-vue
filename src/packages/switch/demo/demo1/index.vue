<template>
  <div>
    <m-list>
      <m-switch-item title="abc"/>
      <m-list-item>
        <m-switch/>
      </m-list-item>
      <m-list-item>
        <m-switch platform="android"/>
      </m-list-item>
      <m-list-item>
        <m-switch color="#108ee9"/>
      </m-list-item>
      <m-list-item>
        <m-switch v-model="value"/>
        {{value}}
      </m-list-item>
      <m-switch-item title="开关" v-model="value"></m-switch-item>
    </m-list>
  </div>
</template>
<script lang="ts">
  import List from '@/packages/list';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MSwitch from '../../index';

  Vue.use(MSwitch);
  Vue.use(List);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public value = false;
  }
</script>
<style scoped lang="less">
</style>
