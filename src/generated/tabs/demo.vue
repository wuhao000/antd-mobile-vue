<template>
  <div>
    <demo-wrapper title="基本">
      <demo1/>
    </demo-wrapper>
		<demo-wrapper title="标签栏固定">
      <demo2/>
    </demo-wrapper>
		<demo-wrapper title="无动画">
      <demo3/>
    </demo-wrapper>
		<demo-wrapper title="固定高度">
      <demo4/>
    </demo-wrapper>
		<demo-wrapper title="垂直样式">
      <demo5/>
    </demo-wrapper>
		<demo-wrapper title="自定义个数，超出界面宽度，多于5个标签">
      <demo6/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import demo1 from '@/packages/tabs/demo/demo1.tsx';
  import demo2 from '@/packages/tabs/demo/demo2.tsx';
  import demo3 from '@/packages/tabs/demo/demo3.tsx';
  import demo4 from '@/packages/tabs/demo/demo4.tsx';
  import demo5 from '@/packages/tabs/demo/demo5.tsx';
  import demo6 from '@/packages/tabs/demo/demo6.tsx';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo',
    components: {demo1, demo2, demo3, demo4, demo5, demo6, DemoWrapper}
  })
  export default class Demo extends Vue {
  }
</script>
