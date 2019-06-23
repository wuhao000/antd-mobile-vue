<template>
  <div>
    {{current}}
    <d-pagination v-model="current"
                  show-size-changer
                  :page-size="20"
                  :total="1000"
                  @change="print"/>
  </div>
</template>
<script lang="ts">
  import DPagination from '../../index';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(DPagination);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public current = 1;

    public print() {
      console.log('print: ' + this.current);
    }
  }
</script>
<style scoped lang="less">
</style>
