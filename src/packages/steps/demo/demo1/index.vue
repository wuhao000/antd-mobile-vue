<template>
  <div>
    <ae-icon mobile
             type="fail"/>
    <m-steps status="wait">
      <m-step description="description"
              title="abc"></m-step>
      <m-step description="description"
              title="abc"></m-step>
      <m-step title="abc">
        <div slot="title">这是标题</div>
        <div slot="description">这是描述</div>
      </m-step>
      <m-step title="abc">
        <div slot="title">这是标题</div>
        <div slot="description">这是描述</div>
      </m-step>
    </m-steps>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MSteps from '../../index';

  Vue.use(MSteps);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style scoped lang="less">
</style>
