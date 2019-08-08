<template>
  <div class="demo">
    <m-nav-bar @left-click="onOpenChange">
      <m-icon slot="icon"
              type="ellipsis"/>
      Basic
    </m-nav-bar>
    <m-drawer enable-drag-handle
              class="my-drawer"
              :content-style="{ color : '#A6A6A6', textAlign : 'center', paddingTop : '42px' }"
              :style="drawerStyle"
              :value="state.open"
              @open-change="{onOpenChange}">
      <m-list slot="sidebar">
        <m-list-item multiple-line
                     thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png">Category
        </m-list-item>
        <template v-for="index in 15">
          <m-list-item thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                       :key="index">Category{{index}}
          </m-list-item>
        </template>
      </m-list>
      Click upper-left corner
    </m-drawer>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'DemoDemo1'
  })
  export default class DemoDemo1 extends Vue {

    public state = {
      open: true
    };

    get drawerStyle() {
      return {minHeight: document.documentElement.clientHeight + 'px'};
    }

    public onOpenChange(...args) {
      console.log(args);
      this.state.open = !this.state.open;
    }
  }
</script>
<style lang="less">
  .demo {
    .my-drawer {
      position: relative;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .my-drawer .am-drawer-sidebar {
      background-color: #fff;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    .my-drawer .am-drawer-sidebar .am-list {
      width: 300px;
      padding: 0;
    }
  }
</style>
