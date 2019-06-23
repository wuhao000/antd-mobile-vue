<template>
  <div>
    <m-button @click="show = !show">显示</m-button>
    <m-action-sheet v-model="show"
                    :menus="menus"/>
  </div>
</template>
<script lang="ts">
  import Button from '@/packages/m-button';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MActionSheet from '../../index';

  Vue.use(Button);
  Vue.use(MActionSheet);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public menus = [{
      value: 1, label: '操作1', badge: true
    }, {
      value: 2, label: '操作2', badge: 22
    }];
    public show = true;
    public showDrawer = true;

    public onClose() {
      this.showDrawer = false;
    }
  }
</script>
<style scoped lang="less">
</style>
