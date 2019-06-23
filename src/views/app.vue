<template>
  <router-view/>
</template>
<script lang="ts">
  import Layout from '@/packages/ae-layout';
  import Vue from 'vue';
  import VueClipboard from 'vue-clipboard2';
  import {Component} from 'vue-property-decorator';

  Vue.use(VueClipboard as any);
  Vue.use(Layout);
  @Component({
    name: 'App'
  })
  export default class App extends Vue {
  }
</script>
<style lang="less">
  @import "../assets/styles/common";
  @import "../assets/styles/custom";
  @import "../packages/style/themes/default";

  body {
    background: @body-background;
  }

  #app-header {
    height: 60px;
  }

  #app-body {
    padding: @padding-xs;
  }

  .ant-layout {
    height: 100%;

    &, &-header, &-sider, &-footer, &-content {
      background: transparent;
      padding: 0;
    }

    &-header {
      line-height: 1;
    }

    &-header, &-footer {
      height: auto;
    }

    &-sider {
      & > &-children {
        overflow: auto;
      }
    }

    &-content {
      flex: 1;
      overflow: auto;
    }
  }

  #app-content {
    background: white;
    padding: @padding-sm 200px 144px @padding-lg;
  }

  p {
    margin: 0;
    padding: 0;
  }

  #app-nav {
    background: white;
    margin-right: @padding-xs;
  }

  .bg-white {
    background: white;
  }

  .demo {
    margin: @padding-md 0;
  }
</style>
