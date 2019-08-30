<template>
  <div>
    <demo-wrapper title="基本">
      <demo2/>
    </demo-wrapper>
		<demo-wrapper title="金额键盘">
      <demo3/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import demo2 from '@/packages/input/demo/demo2.tsx';
  import demo3 from '@/packages/input/demo/demo3.tsx';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo',
    components: {demo2, demo3, DemoWrapper}
  })
  export default class Demo extends Vue {
  }
</script>
