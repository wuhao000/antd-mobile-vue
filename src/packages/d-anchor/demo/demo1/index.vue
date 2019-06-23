<template>
  <div>
    <d-anchor :get-container="getContainer">
      <d-anchor-link href="#a"
                     title="Basic demo"/>
      <d-anchor-link href="#b"
                     title="Fixed demo"/>
      <d-anchor-link href="#API"
                     title="API">
        <d-anchor-link href="#Anchor-Props"
                       title="Anchor Props"/>
        <d-anchor-link href="#Link-Props"
                       title="Link Props"/>
      </d-anchor-link>
    </d-anchor>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DAnchor from '../../index';

  Vue.use(DAnchor);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public getContainer() {
      return document.getElementById('app-content');
    }
  }
</script>
<style scoped lang="less">
</style>
