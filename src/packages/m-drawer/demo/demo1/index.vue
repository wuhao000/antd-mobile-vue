<template>
  <div style="background: lightgray">
    <m-drawer docked
              class="my-drawer"
              :content-style="{ color : '#A6A6A6', textAlign : 'center', paddingTop : 42 }"
              :open="open"
              :style="drawerStyle"
              @open="onOpenChange">
      <m-list slot="content"
              style="background:green">
        <m-list-item>a</m-list-item>
        <m-list-item>b</m-list-item>
      </m-list>
      <div style="background:lightgray !important;">
        <m-button @click="toggle">打开</m-button>
        <div>
          Click upper-left corner
        </div>
      </div>
    </m-drawer>
  </div>
</template>
<script lang="ts">
  import Button from '@/packages/m-button';
  import List from '@/packages/m-list';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MDrawer from '../../index';

  Vue.use(Button);
  Vue.use(List);
  Vue.use(MDrawer);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public open = false;

    get drawerStyle() {
      return {minHeight: document.documentElement.clientHeight + 'px'};
    }

    public onOpenChange(...args) {
      this.open = !this.open;
    }

    public toggle() {
      this.open = !this.open;
    }
  }
</script>
<style lang="less">
  .my-drawer .am-drawer-sidebar .am-list {
    width: 300px;
    padding: 0;
  }
</style>
