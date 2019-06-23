<template>
  <div>
    <mobile-screen>
      <m-checkbox-popup-list clearable
                             v-model="value1"
                             placeholder="请选择"
                             title="弹出选项"
                             :options="options2"></m-checkbox-popup-list>
      <m-checkbox-list v-model="value2"
                       :options="options"/>
      <m-list-item>
        <m-checkbox v-model="value3">选项1</m-checkbox>
      </m-list-item>
      <m-list>
        <m-checkbox-item v-model="value4">选项1</m-checkbox-item>
      </m-list>
    </mobile-screen>
  </div>
</template>
<script lang="ts">
  import MobileScreen from '@/components/mobile-screen.vue';
  import List from '@/packages/m-list';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MCheckbox from '../../index';

  Vue.use(List);
  Vue.use(MCheckbox);

  function createOptions(size: number) {
    const options = [];
    for (let i = 0; i < size; i++) {
      options.push({label: '选项' + i, value: i});
    }
    return options;
  }

  @Component({
    name: 'Demo1',
    components: {MobileScreen}
  })
  export default class Demo1 extends Vue {
    public options = [];
    public options2 = [];
    public value1 = [1];
    public value2 = [1];
    public value3 = false;
    public value4 = false;

    public created() {

      this.options = createOptions(2);
      this.options2 = createOptions(30);
    }
  }
</script>
<style scoped lang="less">
</style>
