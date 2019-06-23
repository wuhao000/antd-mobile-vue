<template>
  <div>
    <m-tabs card
            v-model="value"
            :tabs="[{key: 'tab1', title: '标签1'},
             {key: 'tab2', title:'标签2'},
             {key: 'tab3', title:'标签3'}]"
            @change="tabChanged"
            @tab-click="tabClicked">
      <div key="tab1">
        第一页的内容
      </div>
      <div key="tab2">
        第二页的内容
      </div>
      <div key="tab3">
        第三页的内容
      </div>
    </m-tabs>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MTabs from '../../index';

  Vue.use(MTabs);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {

    public value = 1;

    public tabChanged() {
    }

    public tabClicked() {
    }
  }
</script>
<style scoped lang="less">
</style>
