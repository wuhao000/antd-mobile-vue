<template>
  <div>
    <demo-wrapper title="折线图">
      <demo1/>
    </demo-wrapper>
		<demo-wrapper title="平滑折线图">
      <demo2/>
    </demo-wrapper>
		<demo-wrapper title="面积图">
      <demo3/>
    </demo-wrapper>
		<demo-wrapper title="柱状图">
      <demo4/>
    </demo-wrapper>
		<demo-wrapper title="饼图">
      <demo5/>
    </demo-wrapper>
		<demo-wrapper title="多个面积图">
      <demo6/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import demo1 from '@/packages/chart/demo/demo1.vue';
  import demo2 from '@/packages/chart/demo/demo2.vue';
  import demo3 from '@/packages/chart/demo/demo3.vue';
  import demo4 from '@/packages/chart/demo/demo4.vue';
  import demo5 from '@/packages/chart/demo/demo5.vue';
  import demo6 from '@/packages/chart/demo/demo6.vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo',
    components: {demo1, demo2, demo3, demo4, demo5, demo6, DemoWrapper}
  })
  export default class Demo extends Vue {
  }
</script>
