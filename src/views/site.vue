<template>
  <ae-layout>
    <ae-layout-header id="app-header">
      <ui-header/>
    </ae-layout-header>
    <ae-layout id="app-body">
      <ae-layout>
        <ae-layout-sider v-show="!isDemo"
                         id="app-nav"
                         width="220px">
          <nav-list :menu-list="routersName"></nav-list>
        </ae-layout-sider>
        <ae-layout-content :id="(!$route.meta || $route.meta.hideNav !== true) ? 'app-content' : ''">
          <router-view/>
        </ae-layout-content>
      </ae-layout>
    </ae-layout>
  </ae-layout>
</template>
<script lang="ts">
  import NavList from '@/components/nav-list.vue';
  import {routes} from '@/router';
  import UiHeader from '@/views/header.vue';
  import Vue from 'vue';
  import VueClipboard from 'vue-clipboard2';
  import {Component} from 'vue-property-decorator';

  Vue.use(VueClipboard as any);
  @Component({
    components: {
      UiHeader,
      NavList
    }
  })
  export default class App extends Vue {

    get isDemo() {
      return this.$route.path.startsWith('/demo');
    }

    get routersName() {
      return routes.find(it => it.name === 'site').children;
    }

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
