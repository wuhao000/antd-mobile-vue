<template>
  <div>
    <m-list>
      <!--      <m-calendar-item title="日期范围选择"/>-->
      <!--      <m-calendar-item pick-time-->
      <!--                       title="时间范围选择"/>-->
      <!--      <m-calendar-item show-shortcut-->
      <!--                       title="时间范围选择"/>-->
      <!--      <m-calendar-item title="时间选择"-->
      <!--                       type="one"/>-->
      <!--      <m-calendar-item row-size="xk"-->
      <!--                       title="大行距"/>-->
      <m-calendar-item title="默认日期"
                       :maxDate="maxDate"
                       :minDate="minDate"
                       v-model="defaultValue"/>
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
    public defaultValue = [];
    public minDate = new Date(2019, 5, 1, 0, 0, 0);
    public maxDate = new Date();
    public value = false;
  }
</script>
<style scoped lang="less">
</style>
