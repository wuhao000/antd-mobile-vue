<template>
  <div>
    <mobile-screen>
      <m-radio-popup-list clearable
                          read-only
                          v-model="value1"
                          placeholder="请选择"
                          title="弹出选项"
                          :options="options2"></m-radio-popup-list>
      <m-radio-list v-model="value2"
                    :options="options1"/>
      <!--      <m-radio>选项1</m-radio>-->
      <m-list>
        <m-radio-item>选项1</m-radio-item>
        <m-radio-item>选项2</m-radio-item>
        <m-radio-item>选项3</m-radio-item>
      </m-list>
    </mobile-screen>
  </div>
</template>
<script lang="ts">
  import MobileScreen from '@/components/mobile-screen.vue';
  import List from '@/packages/list';
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
    public options1 = [];
    public options2 = [];
    public value1 = null;
    public value2 = 0;

    public created() {
      this.options1 = createOptions(3);
      this.options2 = createOptions(30);

    }
  }
</script>
<style scoped lang="less">
</style>
