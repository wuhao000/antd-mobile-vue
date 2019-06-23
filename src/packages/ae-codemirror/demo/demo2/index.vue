<template>
  <div>
    <d-radio-group button
                   v-model="theme"
                   :options="themeOptions">
    </d-radio-group>
    <ae-codemirror-editor v-model="code1"
                class="m-t"
                mode="javascript"
                :theme="theme"/>
    <ae-codemirror-editor beautify
                v-model="code2"
                class="m-t"
                mode="html"></ae-codemirror-editor>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Radio from '../../../d-radio';
  import Codemirror from '../../index';

  Vue.use(Codemirror);
  Vue.use(Radio);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public code1 = `function test() {
}`;
    public code2 = `<div><h2>这是html</h2></div>`;
    public theme: string = '3024-day';

    public themeOptions = [{
      label: '3024-day', value: '3024-day'
    }, {
      label: 'blackboard', value: 'blackboard'
    }];
  }
</script>
<style lang="less" type="text/less">
</style>
