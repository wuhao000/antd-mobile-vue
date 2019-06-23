<!--
* @Author : ChangJun
* @Date :  2019/3/12
* @Version : 1.0
* @Content : 实现省市区三级联动
-->
<template>
  <div class="d-province">
    <d-cascader placeholder="省/市/区"
                :options="data"
                :size="size"
                @change="handleChanged"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import DCascader from '../../d-cascader';
  import {Area} from './area';
  import {China} from './static/data';

  Vue.use(DCascader);
  @Component({
    name: 'DProvince',
    components: {}
  })
  export default class VProvince extends Vue {
    @Prop({
      type: String
    })
    public size: 'small' | 'large' | 'default';
    @Prop({
      type: Array
    }) // 指定选中项：string[] | number[]
    public value: string[]; // 输入框大小：string，可选 large default small
    public data: Area[] = China; // 数据
    public names: string[] = []; // 匹配名称
    /**
     * 选择
     */
    public handleChanged(val: string[]): void {
      console.table(val);
      this.$emit('change', val);
    }
  }
</script>
<style scoped lang="less">
  .d-province {
  }
</style>
