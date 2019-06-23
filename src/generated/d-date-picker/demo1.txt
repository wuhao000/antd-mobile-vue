<template>
  <div>
    <div>
      <d-date-picker clearable
                     v-model="value5"
                     mode="datetime"/>
      <d-date-picker clearable
                     v-model="value1"
                     mode="date"/>
      <d-date-picker clearable
                     v-model="value2"
                     mode="month"/>
      <d-date-picker clearable
                     v-model="value3"
                     mode="week"/>
      {{range}}
      <d-range-picker v-model="range"/>
    </div>
    <d-button @click="submit">提交</d-button>
  </div>
</template>
<script lang="ts">
  import axios from 'axios';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DDatePicker from '../../index';

  Vue.use(DDatePicker);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {

    public range = [];
    public range2 = [];
    public value1 = null;
    public value2 = Date.now();
    public value3 = new Date();
    public value4 = new Date();
    public value5 = new Date();
    public value6 = new Date();

    public submit() {
      axios.post('/aa', {date: this.value3});
    }

  }
</script>
<style scoped lang="less">
</style>
