<template>
  <div>
    <ae-codemirror-editor v-model="code1"
                mode="javascript"
                :theme="theme"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Codemirror from '../../index';

  Vue.use(Codemirror);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public code1 = `function test() {
}`;
    public theme: string = '3024-day';
  }
</script>
<style lang="less" type="text/less">
</style>
