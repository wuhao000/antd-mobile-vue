<template>
  <div>
    <ae-icon class="m-l"
             theme="twoTone"
             two-tone-color="#eb2f96"
             type="heart"/>
    <ae-icon class="m-l"
             theme="twoTone"
             two-tone-color="#eb2f96"
             type="heart"
             :size="1.5"/>
    <ae-icon class="m-l"
             theme="twoTone"
             two-tone-color="#eb2f96"
             type="heart"
             :size="2"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import AeIcon from '../../index';

  Vue.use(AeIcon);

  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
  }
</script>
<style scoped lang="less">
</style>
