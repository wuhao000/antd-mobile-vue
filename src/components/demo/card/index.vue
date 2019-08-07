<template>
  <div>
    <demo-wrapper title="默认">
      <Demo1/>
    </demo-wrapper>
    <demo-wrapper title="通栏">
      <Demo2/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Demo1 from './demo1.vue';
  import Demo2 from './demo2.vue';

  @Component({
    name: 'CardDemo',
    components: {
      DemoWrapper,
      Demo1,
      Demo2
    }
  })
  export default class ActionSheetDemo extends Vue {
  }
</script>
