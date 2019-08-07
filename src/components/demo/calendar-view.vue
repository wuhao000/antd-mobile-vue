<template>
  <div>
    <m-list>
      <m-calendar-view title="日期范围选择"
                       :get-date-extra="getExtra"/>
    </m-list>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {

    public getExtra() {
      return {
        selected: true,
        info: 'abc'
      };
    }
  }
</script>
<style scoped lang="less">
</style>
