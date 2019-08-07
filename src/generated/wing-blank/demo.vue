<template>
  <div>
    <demo-wrapper title="基本">
      <demo1/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import demo1 from '@/packages/wing-blank/demo/demo1.vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo',
    components: {demo1, DemoWrapper}
  })
  export default class Demo extends Vue {
  }
</script>
