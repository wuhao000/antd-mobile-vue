<template>
  <div>
    <d-form-item prop="name">
      {{form.keywords}}
      <d-input v-model="form.keywords"
               class="search-keywords"
               placeholder="请输入关键词进行检索"
               @keydown.enter.native.stop.prevent="loadData"/>
    </d-form-item>
    <d-form :model="form"
            :rules="rules">

    </d-form>
    <d-input-search @search="searchClicked">
      <div slot="enterButton">
        <ae-icon type="check"></ae-icon>
        <span>
        查询
      </span>
      </div>
    </d-input-search>
    <div class="m-t">
      <d-input-group>
        <d-input style="width: 20%"/>
        <d-input style="width: 30%"
                 :value="1234"/>
      </d-input-group>
    </div>
    <div class="m-t">
      <d-input-search v-model="value3"/>
    </div>
    <div class="m-t">
      <d-textarea v-model="value4"/>
    </div>
  </div>
</template>
<script lang="ts">
  import Form from '@/packages/d-form';
  import {ValidateRules} from 'async-validator';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DInput from '../../index';

  Vue.use(Form);
  Vue.use(DInput);

  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public form = {
      name: 'w',
      keywords: ''
    };
    public rules: ValidateRules = {
      name: [{required: true, message: '必须输入', trigger: 'change'}]
    };
    public value1 = null;
    public value2 = '';
    public value3 = '';
    public value4 = '';

    public blur() {
    }

    public loadData() {
    }

    public searchClicked() {
      console.log('search');
    }

    public valueChanged() {
    }
  }
</script>
<style scoped lang="less">
</style>
