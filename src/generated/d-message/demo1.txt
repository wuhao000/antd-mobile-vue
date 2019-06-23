<template>
  <div>
    <d-button @click="$message.info('这是一条展示信息')">Info</d-button>
    <d-button @click="$message.error('这是一条错误信息')">Error</d-button>
    <d-button @click="$message.warning('这是一条警告信息')">Warning</d-button>
    <d-button @click="$message.loading('这是一条Loading信息')">Loading</d-button>
    <d-button @click="$message.success('这是一条成功信息')">Sccess</d-button>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DButton from '../../../d-button';
  import DMessage from '../../index';

  Vue.use(DButton);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {

    public error() {
      DMessage.error('error');
    }

    public info() {
      DMessage.info('info');
    }

    public success() {
      DMessage.success('success');
    }
  }
</script>
<style scoped lang="less">
</style>
