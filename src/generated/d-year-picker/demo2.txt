<template>
  <div>
    <d-year-picker clearable
                   v-model="year"
                   :disabledDate="disabledDate"></d-year-picker>
    <div style="margin-top: 20px">{{year}}</div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DYearPicker from '../../src/index.vue';

  @Component({
    name: 'Demo2',
    components: {DYearPicker}
  })
  export default class Demo2 extends Vue {
    private year: number = null;

    private disabledDate(year: string) {
      return Number.parseInt(year) > new Date().getFullYear();
    }
  }
</script>
<style scoped lang="less">
</style>
