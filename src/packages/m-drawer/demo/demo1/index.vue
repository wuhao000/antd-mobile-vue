<template>
  <ae-layout style="background: lightgray">
    <ae-layout-header>
      {{open}}
    </ae-layout-header>
    <ae-layout-content>
      <div>
        <m-drawer class="my-drawer"
                  :content-style="{ color : '#A6A6A6', textAlign : 'center', paddingTop : 42 }"
                  v-model="open"
                  position="right"
                  :style="drawerStyle">
          <div style="background:lightgray !important;">
            <m-button @click="toggle">打开 {{open}}</m-button>
            <div>
              Click upper-left corner
            </div>
          </div>
          <m-list slot="content"
                  style="background:green">
            <m-list-item>a</m-list-item>
            <m-list-item>b</m-list-item>
          </m-list>

        </m-drawer>
      </div>
    </ae-layout-content>
  </ae-layout>
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
