<template>
  <div>
    <m-list>
      <m-textarea auto-height
                  title="标题"/>
      <m-textarea v-model="value"
                  title="标题"/>
      <m-textarea auto-height disabled
                  placeholder="请输入"
                  title="禁用的"/>
      <m-textarea placeholder="请输入"
                  title="设置行数"
                  :rows="5"/>
      <m-textarea clearable
                  placeholder="请输入"
                  title="可清除的"/>
    </m-list>
  </div>
</template>
<script lang="ts">
  import List from '@/packages/m-list';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MTextarea from '../../index';

  Vue.use(List);
  Vue.use(MTextarea);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public value = '';
  }
</script>
<style scoped lang="less">
</style>
