<template>
  <div>
    <d-year-picker clearable multiple
                   v-model="year"></d-year-picker>
    <div style="margin-top: 20px">绑定值：{{year}}</div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DYearPicker from '../../src/index.vue';

  @Component({
    name: 'Demo1',
    components: {DYearPicker}
  })
  export default class Demo1 extends Vue {
    public value = [];
    private year: string = '';
  }
</script>
<style scoped lang="less">
</style>
