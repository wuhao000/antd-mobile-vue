<template>
  <div>
    <div>
      <d-radio-group v-model="value"
                     :options="options"
                     @change="valueChanged">
      </d-radio-group>
    </div>
    <div class="m-t">
      <d-radio-group button
                     v-model="value2"
                     :options="options">
      </d-radio-group>
    </div>
    <div class="m-t">
      <d-radio-group button
                     v-model="value3">
        <d-radio-button :value="1">选项1</d-radio-button>
        <d-radio-button :value="2">选项2</d-radio-button>
      </d-radio-group>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DRadio from '../../index';

  Vue.use(DRadio);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public options = [{
      value: 1, label: '选项1'
    }, {
      value: 2, label: '选项2'
    }];
    public value = 2;
    public value2 = 1;
    public value3 = 1;

    public valueChanged() {
    }
  }
</script>
<style scoped lang="less">
</style>
