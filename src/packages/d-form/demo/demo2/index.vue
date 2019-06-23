<template>
  <div>
    <div>
      <d-switch v-model="disabled"></d-switch>
      <d-radio-group button
                     v-model="size"
                     :options="sizeOptions">
      </d-radio-group>
      <div style="word-break: break-all">
        {{JSON.stringify(form)}}
      </div>
    </div>
    <d-form ref="form"
            :disabled="disabled"
            :label-width="120"
            :model="form"
            :rules="rules"
            :size="size">
      <ae-row>
        <ae-col :span="cols">
          <d-form-item required
                       label="时间">
            <d-time-picker v-model="form.time"/>
          </d-form-item>
        </ae-col>
        <ae-col :span="cols">
          <d-form-item required
                       label="姓名"
                       prop="name">
            <d-input v-model="form.name"
                     placeholder="请输入"/>
          </d-form-item>
        </ae-col>
        <ae-col :span="cols">
          <d-form-item required
                       label="年龄">
            <d-input-number v-model="form.age"
                            placeholder="请输入年龄"/>
          </d-form-item>
        </ae-col>
      </ae-row>
      <ae-row>
        <ae-col :span="cols">
          <d-form-item required
                       label="性别"
                       prop="gender">
            <d-radio-group v-model="form.gender"
                           :options="[{value:1,label:'男'}, {value:2,label:'女'}]"/>
          </d-form-item>
        </ae-col>
        <ae-col :span="cols">
          <d-form-item label="所属地区">
            <d-cascader v-model="form.location"></d-cascader>
          </d-form-item>
        </ae-col>
        <ae-col :span="cols">
          <d-form-item label="生日">
            <d-date-picker v-model="form.birthday"
                           mode="date"></d-date-picker>
          </d-form-item>
        </ae-col>
      </ae-row>
      <ae-row>
        <ae-col :span="cols">
          <d-form-item required
                       label="爱好">
            <d-checkbox-group button
                              v-model="form.favorites"
                              :options="[{label:'爬山',value:1}, {label:'音乐',value:2}]"></d-checkbox-group>
          </d-form-item>
        </ae-col>
        <ae-col :span="cols">
          <d-form-item label="评分">
            <d-rate></d-rate>
          </d-form-item>
        </ae-col>
        <ae-col :span="cols">
          <d-form-item label="滑动条">
            <d-slider v-model="form.score"></d-slider>
          </d-form-item>
        </ae-col>
      </ae-row>
      <ae-row>
        <ae-col :span="cols">
          <d-form-item label="自动完成">
            <d-auto-complete v-model="form.description"/>
          </d-form-item>
        </ae-col>
        <ae-col :span="cols * 2">
          <d-form-item label="穿梭框">
            <d-transfer v-model="form.blocks"
                        :data-source="[{title:'1', key:'1'}, {title:'2',key:'2'}]"/>
          </d-form-item>
        </ae-col>
        <ae-col :span="cols">
          <d-form-item label="上传头像">
            <d-upload>
              <div>
                <ae-icon type="plus"/>
              </div>
            </d-upload>
          </d-form-item>
        </ae-col>
      </ae-row>
      <ae-row>
        <ae-col :span="cols">
          <d-form-item required
                       label="选择"
                       prop="age">
            <d-select clearable
                      v-model="form.age"
                      placeholder="请选择"
                      :options="[{label:'选项1',value:1}, {label:'选项2',value:2}]">
            </d-select>
          </d-form-item>
        </ae-col>
        <ae-col :span="cols">
          <d-form-item label="开关">
            <d-switch v-model="form.open"/>
          </d-form-item>
        </ae-col>
        <ae-col :span="cols">
          <d-form-item required
                       label="选择2">
            <d-select clearable
                      placeholder="请选择">
              <d-select-option value="1">选项1</d-select-option>
              <d-select-option value="2">选项2</d-select-option>
              <d-select-option-group label="分组1">
                <d-select-option value="3">选项3</d-select-option>
                <d-select-option value="4">选项4</d-select-option>
              </d-select-option-group>
            </d-select>
          </d-form-item>
        </ae-col>
      </ae-row>
      <ae-row>
        <ae-col :span="cols">
          <d-form-item>
            <d-button @click="submit">提交</d-button>
          </d-form-item>
        </ae-col>
      </ae-row>
    </d-form>
  </div>
</template>
<script lang="ts">
  import Grid from '@/packages/ae-grid';
  import AutoComplete from '@/packages/d-auto-complete';
  import DButton from '@/packages/d-button';
  import Cascader from '@/packages/d-cascader';
  import Checkbox from '@/packages/d-checkbox';
  import DatePicker from '@/packages/d-date-picker';
  import DInput from '@/packages/d-input';
  import Number from '@/packages/d-input-number';
  import DRadio from '@/packages/d-radio';
  import Rate from '@/packages/d-rate';
  import DSelect from '@/packages/d-select';
  import Slider from '@/packages/d-slider';
  import Switch from '@/packages/d-switch';
  import TimePicker from '@/packages/d-time-picker';
  import Transfer from '@/packages/d-transfer';
  import Upload from '@/packages/d-upload';
  import {ValidateRules} from 'async-validator';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DForm from '../../index';

  Vue.use(TimePicker);
  Vue.use(Slider);
  Vue.use(AutoComplete);
  Vue.use(Transfer);
  Vue.use(Rate);
  Vue.use(Grid);
  Vue.use(DatePicker);
  Vue.use(Cascader);
  Vue.use(Checkbox);
  Vue.use(Upload);
  Vue.use(Switch);
  Vue.use(Number);
  Vue.use(DSelect);
  Vue.use(DRadio);
  Vue.use(DButton);
  Vue.use(DInput);
  Vue.use(DForm);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {

    public cols = 8;

    public disabled = false;

    public form = {
      blocks: [],
      description: '',
      favorites: [],
      time: null,
      score: 0,
      name: '',
      age: null,
      open: false,
      gender: null,
      location: [],
      birthday: null
    };
    public rules: ValidateRules = {
      name: [{required: true, message: '请输入姓名'}],
      age: [{required: true, message: '请选择性别'}],
      gender: [{required: true, message: '请选择年龄'}]
    };
    public size = 'default';

    public sizeOptions = [
      {label: '小', value: 'small'},
      {label: '正常', value: 'default'},
      {label: '大', value: 'large'}
    ];

    public async submit() {
      try {
        const res = await (this.$refs['form'] as any).validate();
      } catch (e) {

      } finally {

      }
    }
  }
</script>
<style scoped lang="less">
</style>
