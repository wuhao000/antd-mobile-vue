<template>
  <div>
    <demo-wrapper title="基本">
      <demo1/>
    </demo-wrapper>
		<demo-wrapper title="子元素数量变化">
      <demo2/>
    </demo-wrapper>
		<demo-wrapper title="带间距">
      <demo3/>
    </demo-wrapper>
		<demo-wrapper title="竖向">
      <demo4/>
    </demo-wrapper>
		<demo-wrapper title="抽奖">
      <demo5/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import demo1 from '@/packages/carousel/demo/demo1.vue';
  import demo2 from '@/packages/carousel/demo/demo2.vue';
  import demo3 from '@/packages/carousel/demo/demo3.vue';
  import demo4 from '@/packages/carousel/demo/demo4.vue';
  import demo5 from '@/packages/carousel/demo/demo5.vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo',
    components: {demo1, demo2, demo3, demo4, demo5, DemoWrapper}
  })
  export default class Demo extends Vue {
  }
</script>
