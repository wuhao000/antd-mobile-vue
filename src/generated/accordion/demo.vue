<template>
  <div>
    <demo-wrapper title="基本">
      <demo1/>
    </demo-wrapper>
		<demo-wrapper title="手风琴模式">
      <demo2/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import demo1 from '@/packages/accordion/demo/demo1.vue';
  import demo2 from '@/packages/accordion/demo/demo2.vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo',
    components: {demo1, demo2, DemoWrapper}
  })
  export default class Demo extends Vue {
  }
</script>
