<template>
  <div>
    <m-pull-refresh>
      <ul>
        <li v-for="i in 100"
            :key="i">11111111111
        </li>
      </ul>
    </m-pull-refresh>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MPullRefresh from '../../index';

  Vue.use(MPullRefresh);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style scoped lang="less">
</style>
