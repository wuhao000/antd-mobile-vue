<template>
  <div id="header">
    <ae-row>
      <div class="ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-5 ant-col-xl-5 ant-col-xxl-4 header-left">
        <router-link id="logo"
                     to="/">
          <span>Aegis UI</span>
        </router-link>
      </div>
    </ae-row>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Header'
  })
  export default class Header extends Vue {
  }
</script>
<style scoped lang="less">
  #logo {
    padding-left: 40px;
    float: left;
    height: 60px;
    line-height: 64px;
    white-space: nowrap;
    overflow: hidden;
    text-decoration: none;
  }

  #header {
    background: #fff;
    box-shadow: 0 2px 8px #f0f1f2;
    position: relative;
    z-index: 10;
    max-width: 100%;
  }
</style>
