<template>
  <div class="mobile-screen">
    <slot/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'MobileScreen'
  })
  export default class MobileScreen extends Vue {

  }
</script>
<style lang="less">
  .mobile-screen {
    height: 640px;
    width: 480px;
    overflow: auto;
  }
</style>
