<template>
  <div>
    <m-list>
      <m-calendar-item v-model="dateRange2"
                       title="日期范围选择"/>
      <m-calendar-item v-model="dateRange"
                       title="日期范围选择"
                       :maxDate="new Date()"
                       :minDate="new Date(2017, 0, 1)"/>
      <!--      <m-calendar-item pick-time-->
      <!--                       title="时间范围选择"/>-->
      <!--      <m-calendar-item show-shortcut-->
      <!--                       title="时间范围选择"/>-->
      <!--      <m-calendar-item v-model="date"-->
      <!--                       title="日期选择"-->
      <!--                       type="one"/>-->
      <!--      <m-calendar-item pick-time-->
      <!--                       title="时间选择"-->
      <!--                       type="one"/>-->
      <!--      <m-calendar-item row-size="xk"-->
      <!--                       title="大行距"/>-->
      <!--      <m-calendar-item title="默认日期"-->
      <!--                       :default-value="defaultValue"/>-->
      <!--      <m-calendar-item default-value=""-->
      <!--                       title="默认时间"/>-->
    </m-list>
    <m-calendar :default-date="new Date()"
                :maxDate="maxDate"
                :minDate="minDate"
                :visible.sync="value"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public date = new Date();
    public dateRange = [new Date(2019, 4, 28), new Date()];
    public dateRange2 = [new Date(2019, 4, 28), new Date()];
    public defaultValue = [new Date(2019, 3, 1, 0, 0, 0), new Date()];
    public maxDate = new Date(Date.now() + 31536000000);
    public minDate = new Date(Date.now() - 5184000000);
    public value = false;

  }
</script>
<style scoped lang="less">
</style>
