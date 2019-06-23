<template>
  <div>
    <d-upload>
      <div>我要上传</div>
    </d-upload>
  </div>
</template>
<script lang="ts">
  import DUpload from '../../index';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(DUpload);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style lang="less" scoped>
</style>
