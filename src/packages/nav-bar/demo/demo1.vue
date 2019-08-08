<template>
  <div>
    <m-nav-bar mode="light"
               @left-click="onLeftClick">
      <m-icon slot="icon"
              type="left"/>
      <m-icon key="0"
              slot="right-content"
              type="search"
              :style="{ marginRight : '16px' }"/>
      <m-icon key="1"
              slot="right-content"
              type="ellipsis"/>
      NavBar
    </m-nav-bar>
    <m-nav-bar left-content="Back"
               mode="dark">
      <m-icon key="0"
              slot="right-content"
              type="search"
              :style="{ marginRight : '16px' }"/>
      <m-icon key="1"
              slot="right-content"
              type="ellipsis"/>
      NavBar
    </m-nav-bar>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'DemoDemo1'
  })
  export default class DemoDemo1 extends Vue {
    public onLeftClick() {
      console.log('left click');
    }
  }
</script>
