<template>
  <div>
    <div style="background:#f8f8f8;">
      <m-list style="margin-bottom:15px;">
        <m-input v-model="form.text"
                 title="文本"/>
        <m-textarea v-model="form.longText"
                    title="长文本"/>
        <m-checkbox-popup-list v-model="form.multiSelect"
                               title="弹出多选"
                               :options="options"/>
        <m-checkbox-list v-model="form.multiSelect"
                         title="多选"
                         :options="options"/>
        <m-radio-popup-list v-model="form.singleSelect"
                            title="弹出单选"
                            :options="options"/>
        <m-radio-list v-model="form.singleSelect"
                      title="单选"
                      :options="options"/>
        <m-switch-item v-model="form.switch"
                       title="开关"/>
        <m-slider-item v-model="form.slider"
                       title="滑动"
                       :max="100"
                       :min="0"/>
        <m-range v-model="form.range"
                 title="范围"
                 :max="100"
                 :min="0"/>
      </m-list>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MList from '../../index';

  Vue.use(MList);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public form = {
      text: '',
      longText: '',
      multiSelect: [],
      singleSelect: '',
      switch: false,
      slider: 20,
      range: [1, 2]
    };
    public options = [{
      label: '选项1', value: '1'
    }, {
      label: '选项2', value: '2'
    }];
  }
</script>
<style scoped lang="less">
</style>
