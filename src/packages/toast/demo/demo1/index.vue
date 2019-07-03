<template>
  <div>
    <d-button @click="toast">info</d-button>
    <d-button @click="toast('success')">success</d-button>
    <d-button @click="toast('fail')">fail</d-button>
    <d-button @click="toast('offline')">offline</d-button>
    <d-button @click="toast('loading')">loading</d-button>
    <d-button @click="$toast.fail('提示')">loading</d-button>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MToast from '../../index';

  Vue.use(MToast);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public toast(type: string) {
      if (type === 'fail') {
        this.$toast.fail('这是一条错误信息');
      } else if (type === 'success') {
        this.$toast.success('这是一条成功信息');
      } else if (type === 'offline') {
        this.$toast.offline('这是一条成功信息');
      } else if (type === 'loading') {
        this.$toast.loading('这是一条成功信息');
      } else {
        this.$toast.info('这是一条提示信息');
      }
    }
  }
</script>
<style scoped lang="less">
</style>
