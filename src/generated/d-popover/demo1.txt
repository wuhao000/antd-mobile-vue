<template>
  <div>
    <d-button @click="show = !show">切换</d-button>
    {{show}}
    <d-popover trigger="click"
               :value="show">
      <d-button>测试</d-button>
      <div slot="content">
        这是弹出内容
      </div>
    </d-popover>
  </div>
</template>
<script lang="ts">
  import Button from '@/packages/d-button';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DPopover from '../../index';

  Vue.use(Button);
  Vue.use(DPopover);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public show: boolean = false;
  }
</script>
<style scoped lang="less">
</style>
