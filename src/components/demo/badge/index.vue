<template>
  <demo-wrapper title="基本">
    <badge-demo1/>
  </demo-wrapper>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import BadgeDemo1 from '@/components/demo/badge/demo1.vue';
  import MList from '@/packages/list';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  Vue.use(MList);
  @Component({
    name: 'BadgeIndex',
    components: {BadgeDemo1, DemoWrapper}
  })
  export default class BadgeIndex extends Vue {

  }
</script>
