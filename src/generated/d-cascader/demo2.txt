<template>
  <div id="components-cascader-demo">
    <d-cascader placeholder="请选择"
                :load-data="loadOptions"
                :options="options"
                @change="onChange"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DCascader from '../../index';

  Vue.use(DCascader);
  @Component({
    name: 'Demo'
  })
  export default class Demo extends Vue {
    public null;

    public options = [{
      value: 'zhejiang',
      label: '浙江',
      isLeaf: false,
      loading: false
    }, {
      value: 'jiangsu',
      label: '江苏',
      isLeaf: false,
      loading: false
    }];

    public mounted() {
    }

    public async loadOptions(selectedOptions: any) {
      const targetOption = selectedOptions[selectedOptions.length - 1];
      targetOption.loading = true;
      setTimeout(() => {
        targetOption.loading = false;
        targetOption.children = [{
          label: '南京', value: 'nj'
        }, {
          label: '广州', value: 'gz'
        }];
      }, 1000);
    }

    public onChange(value) {
      console.log(value);
    }
  }
</script>
<style>
  #components-cascader-demo .ant-cascader-picker {
    width: 300px;
  }
</style>
