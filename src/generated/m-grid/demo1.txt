<template>
  <div>
    <mobile-screen>
      <m-grid carousel
              :cols="3"
              :data="data2"
              @click="itemClicked"></m-grid>
      <m-white-space/>
      <m-grid :cols="3"
              :data="data2"
              @click="itemClicked"></m-grid>
    </mobile-screen>
  </div>
</template>
<script lang="ts">
  import MobileScreen from '@/components/mobile-screen.vue';
  import WhiteSpace from '@/packages/m-white-space';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MGrid from '../../index';

  Vue.use(WhiteSpace);
  Vue.use(MGrid);
  @Component({
    name: 'Demo1',
    components: {MobileScreen}
  })
  export default class Demo1 extends Vue {
    public data = [
      {icon: {mobile: true, type: 'check-circle', size: 'md'}, text: ''},
      {icon: 'check-circle', text: 'abc'},
      {icon: 'check-circle', text: 'abc'},
      {icon: 'check-circle', text: 'abc'},
      {icon: 'check-circle', text: 'abc'},
      {icon: 'check-circle', text: 'abc'},
      {icon: 'check-circle', text: 'abc'}
    ];

    get data2() {
      const array = [];
      for (let i = 0; i < 20; i++) {
        array.push({icon: {color: 'green', mobile: false, type: 'check-circle', size: 'md'}, text: '项目' + (i + 1)});
      }
      return array;
    }

    public itemClicked(v) {
    }
  }
</script>
<style scoped lang="less">
</style>
