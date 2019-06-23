<template>
  <div>
    <div v-loading="loading">
      aaaaaaaaaaaaaaa
      <d-button @click="load">加载</d-button>
    </div>
    <div v-loading="loading2">
      aaaaaaaaaaaaaaa
      <d-button @click="load">加载</d-button>
    </div>
  </div>
</template>
<script lang="ts">
  import DButton from '@/packages/d-button';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import LoadingDirective from '../../index';

  Vue.use(DButton);
  Vue.use(LoadingDirective);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {

    public loading = false;
    public loading2 = false;

    public load() {
      this.loading = true;
      this.loading2 = true;
      setTimeout(() => {
        this.loading = false;
      }, 2100);
      setTimeout(() => {
        this.loading2 = false;
      }, 2099);
    }
  }
</script>
<style scoped lang="less">
</style>
