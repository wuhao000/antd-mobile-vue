<template>
  <div>
    <d-tree checkable
            v-model="selectedKeys"
            :tree-data="treeData"/>
    {{selectedKeys}}
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DTree from '../../index';

  Vue.use(DTree);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public selectedKeys = ['0-0-0-0'];
    public treeData = [{
      title: '0-0',
      key: '0-0',
      children: [{
        title: '0-0-0',
        key: '0-0-0',
        children: [
          {title: '0-0-0-0', key: '0-0-0-0'},
          {title: '0-0-0-1', key: '0-0-0-1'},
          {title: '0-0-0-2', key: '0-0-0-2'}
        ]
      }, {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          {title: '0-0-1-0', key: '0-0-1-0'},
          {title: '0-0-1-1', key: '0-0-1-1'},
          {title: '0-0-1-2', key: '0-0-1-2'}
        ]
      }, {
        title: '0-0-2',
        key: '0-0-2'
      }]
    }, {
      title: '0-1',
      key: '0-1',
      children: [
        {title: '0-1-0-0', key: '0-1-0-0'},
        {title: '0-1-0-1', key: '0-1-0-1'},
        {title: '0-1-0-2', key: '0-1-0-2'}
      ]
    }, {
      title: '0-2',
      key: '0-2'
    }];

  }
</script>
<style scoped lang="less">
</style>
