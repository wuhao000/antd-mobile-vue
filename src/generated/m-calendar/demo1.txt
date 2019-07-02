<template>
  <div>
    <m-list>
      <m-list-item arrow="horizontal"
                   @click="value = !value">测试
      </m-list-item>
      <d-button @click="setValue">设置值</d-button>
      <m-calendar-item v-model="dateRange"
                       title="日期范围选择"/>
      <m-calendar-item pick-time
                       title="时间范围选择"/>
      <m-calendar-item show-shortcut
                       title="时间范围选择"/>
      <m-calendar-item title="时间选择"
                       type="one"/>
      <m-calendar-item row-size="xk"
                       title="大行距"/>
      <m-calendar-item title="默认日期"
                       :default-value="defaultValue"/>
      <m-calendar-item default-value=""
                       title="默认时间"/>
    </m-list>
    <m-calendar :default-date="new Date()"
                :maxDate="maxDate"
                :minDate="minDate"
                :visible.sync="value"/>
  </div>
</template>
<script lang="ts">
  import List from '@/packages/m-list';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MCalendar from '../../index';

  Vue.use(List);
  Vue.use(MCalendar);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public dateRange = [];
    public defaultValue = [new Date(2019, 3, 1, 0, 0, 0), new Date()];
    public maxDate = new Date(Date.now() + 31536000000);
    public minDate = new Date(Date.now() - 5184000000);
    public value = false;


    public setValue() {
      this.dateRange = [new Date(), new Date()];
    }
  }
</script>
<style scoped lang="less">
</style>
