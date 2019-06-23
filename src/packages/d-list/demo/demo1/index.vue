<template>
  <div>
    <d-list :data-source="data"
            size="small">
      <d-list-item slot="renderItem"
                   slot-scope="item, index">
        <d-list-item-meta>
          <div slot="title">
            <a>{{item.title}}</a>
            <ae-icon style="float:right;" type="edit"/>
          </div>
        </d-list-item-meta>
      </d-list-item>
      <div slot="header">Header</div>
      <div slot="footer">Footer</div>
    </d-list>
    <d-list/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DList from '../../index';

  Vue.use(DList);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public data = [
      {
        title: 'Ant Design Title 1'
      },
      {
        title: 'Ant Design Title 2'
      },
      {
        title: 'Ant Design Title 3'
      },
      {
        title: 'Ant Design Title 4'
      }
    ];
  }
</script>
<style scoped lang="less">
</style>
