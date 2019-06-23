<template>
  <d-form label-width="180px">
    <a-select :options="createOptions(5000)"></a-select>
    <a-select :options="createOptions(5000, true)"></a-select>
    <d-form-item label="可清除的">
      <d-select clearable
                v-model="value1"
                placeholder="请选择选项"
                style="width:200px;"
                :default-value="2"
                :options="options"
                @change="valueChanged"/>
      {{value1}}
    </d-form-item>
    <d-form-item label="简单选项">
      <d-select searchable
                v-model="value8"
                :options="['选项1', '选项2']"></d-select>
    </d-form-item>
    <d-form-item label="可搜索的(自定义选项)">
      <d-select searchable
                v-model="value2"
                placeholder="请选择"
                style="min-width:100px;">
        <d-select-option value="1">abc</d-select-option>
        <d-select-option value="2">def</d-select-option>
      </d-select>
    </d-form-item>
    <d-form-item label="可搜索的">
      <d-select searchable
                v-model="value3"
                placeholder="请选择"
                style="min-width:100px;"
                :label-property="(option) => option.label + '(' + option.value + ')'"
                :options="options"/>
    </d-form-item>
    <d-form-item label="默认选项">
      <d-select searchable
                v-model="value3"
                default-option-label="---请选择---"
                placeholder="请选择"
                style="min-width:100px;"
                :default-option-value=" - 1"
                :label-property="(option) => option.label + '(' + option.value + ')'"
                :options="options">
      </d-select>
    </d-form-item>
    <d-form-item label="自定义选项">
      <d-select label-property="name"
                placeholder="请选择"
                style="min-width:100px;"
                value-property="id"
                :options="options2"/>
    </d-form-item>
    <d-form-item label="选项分组">
      <d-select v-model="value4"
                placeholder="请选择"
                style="min-width:100px;">
        <d-select-option-group label="分组1">
          <d-select-option value="1">选项1</d-select-option>
          <d-select-option value="2">选项2</d-select-option>
        </d-select-option-group>
        <d-select-option-group label="分组2">
          <d-select-option value="3">选项3</d-select-option>
          <d-select-option value="4">选项4</d-select-option>
        </d-select-option-group>
      </d-select>
    </d-form-item>
    <d-form-item label="异步加载选项">
      <d-button class="m-r"
                @click="loadOptions">加载选项
      </d-button>
      <d-select v-model="value5"
                placeholder="请选择"
                style="min-width:100px;">
        <d-select-option v-for="option in options3"
                         :key="option.value"
                         :value="option.value">{{option.label}}
        </d-select-option>
      </d-select>
    </d-form-item>
    <d-form-item label="自定义显示标签">
      <d-select v-model="value6"
                placeholder="请选择"
                style="min-width:100px;"
                value-property="id"
                :label-property="getLabel"
                :options="options2">
      </d-select>
    </d-form-item>
    <d-form-item label="多选">
      <d-select v-model="value7"
                mode="multiple"
                style="min-width: 100px;">
        <ae-icon slot="menuItemSelectedIcon"
                 type="edit"></ae-icon>
        <d-select-option :value="1">
          选项1
        </d-select-option>
        <d-select-option :value="2">
          选项2
        </d-select-option>
      </d-select>
    </d-form-item>
  </d-form>
</template>
<script lang="ts">
  import Icon from '@/packages/ae-icon';
  import Form from '@/packages/d-form';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DSelect from '../../index';

  Vue.use(Form);
  Vue.use(Icon);
  Vue.use(DSelect);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {

    public options = [{
      label: '选项1', value: 1
    }, {
      label: '选项2', value: 2, disabled: true
    }, {
      label: '选项3', value: 3
    }];
    public options2 = [{
      name: '自定义选项1', id: 1
    }, {
      name: '自定义选项2', id: 2
    }];

    public options3 = [];
    public options4 = [];

    public value1 = null;
    public value2 = null;
    public value3 = null;
    public value4 = 2;
    public value5 = null;
    public value6 = null;
    public value7 = [];
    public value8 = null;

    public created() {
      const options = [];
      for (let i = 0; i < 400; i++) {
        options.push({
          label: '选项' + (i + 1), value: i + 1
        });
      }
      this.options4 = options;
    }

    public createOptions(count: number, freeze: boolean = false) {
      console.log(1);
      const options = [];
      for (let i = 0; i < count; i++) {
        options.push({
          label: '选项' + (i + 1), value: i + 1
        });
      }
      if (freeze) {
        return options.map(it => Object.freeze(it));
      } else {
        return options;
      }
    }

    public filter(input, option) {
      console.log(input);
      console.log(option);
      return true;
    }

    public getLabel(option) {
      return option.name + '(' + option.id + ')';
    }

    public loadOptions() {
      const options = [];
      for (let i = 0; i < 300; i++) {
        options.push({
          label: '选项' + (i + 1), value: i + 1
        });
      }
      this.options3 = options;
    }

    public valueChanged() {
    }
  }
</script>
<style scoped lang="less">
</style>
