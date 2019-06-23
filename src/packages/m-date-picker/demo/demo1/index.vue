<template>
  <div>
    <m-list>
      <m-date-picker title="aaaaaa">
        <m-list-item>测试</m-list-item>
      </m-date-picker>
      <m-date-picker v-model="value">
        <m-list-item>测试</m-list-item>
      </m-date-picker>
      <m-date-picker v-model="value2"
                     mode="time"
                     :minute-step="5">
        <m-list-item>Time</m-list-item>
      </m-date-picker>
      <m-date-picker v-model="value3"
                     mode="year">
        <m-list-item>Year</m-list-item>
      </m-date-picker>
      <m-date-picker v-model="value4"
                     mode="date">
        <m-list-item>Date</m-list-item>
      </m-date-picker>
      <m-date-picker v-model="value5"
                     mode="month">
        <m-list-item>Month</m-list-item>
      </m-date-picker>
    </m-list>
  </div>
</template>
<script lang="tsx">
  import List from '@/packages/m-list';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MDatePicker from '../../index';


  Vue.use(List);
  Vue.use(MDatePicker);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public value = new Date(new Date().getTime() - 24 * 3600 * 1000 * 192);
    public value2 = null;
    public value3 = null;
    public value4 = null;
    public value5 = null;
  }
</script>
<style scoped lang="less">
</style>
