<template>
  <div>
    <m-list title="abc">
      {{value}}
      <m-input clearable
               v-model="value"
               placeholder="请输入内容"
               title="标题"
               :label-position="'top'"
               :text-align="'right'"></m-input>
      {{value2}}
      <m-input v-model="value2"
               type="bankCard">银行卡
      </m-input>
      <m-input type="phone">手机号</m-input>
      <m-input type="password">密码</m-input>
      <m-input type="number">数字</m-input>
      <m-input type="digit">小数</m-input>
      <m-input type="money">金额</m-input>
      <m-input :editable="false">禁止编辑（只读）
      </m-input>
      <m-input disabled>禁用
      </m-input>
      <m-input clearable>支持清除</m-input>
      <m-input :max-length="5">最大长度5</m-input>
      <m-input error>错误</m-input>
      <m-input extra="提示">Extra</m-input>
    </m-list>
  </div>
</template>
<script lang="ts">
  import MList from '@/packages/list';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MInput from '../../index';
  import Test from './test';

  Vue.component('Test', Test);
  Vue.use(MList);
  Vue.use(MInput);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public value = '你好';
    public value2 = '2222222222222';
  }
</script>
<style scoped lang="less">
</style>
