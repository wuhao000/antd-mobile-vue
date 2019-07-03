<template>
  <div>
    <m-list section
            :touch-feedback="false">
      <m-list-item>
        <m-button size="small">small</m-button>
      </m-list-item>
      <m-list-item>
        <m-button>normal</m-button>
      </m-list-item>
      <m-list-item>
        <m-button size="large">large</m-button>
      </m-list-item>
    </m-list>
  </div>
</template>
<script lang="ts">
  import List from '@/packages/list';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MButton from '../../index';

  Vue.use(List);
  @Component({
    name: 'Demo1',
    components: {MButton}
  })
  export default class Demo1 extends Vue {

  }
</script>
<style scoped>
</style>
