<template>
  <div>
<!--    <demo-wrapper title="基本">-->
<!--      <demo1/>-->
<!--    </demo-wrapper>-->
<!--    <demo-wrapper title="子元素数量变化">-->
<!--      <demo2/>-->
<!--    </demo-wrapper>-->
    <demo-wrapper title="带间距">
      <demo3/>
    </demo-wrapper>
<!--    <demo-wrapper title="竖向">-->
<!--      <demo4/>-->
<!--    </demo-wrapper>-->
<!--    <demo-wrapper title="抽奖">-->
<!--      <demo5/>-->
<!--    </demo-wrapper>-->
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Demo1 from './demo1.vue';
  import Demo2 from './demo2.vue';
  import Demo3 from './demo3.vue';
  import Demo4 from './demo4.vue';
  import Demo5 from './demo5.vue';

  @Component({
    name: 'CarouselDemo',
    components: {DemoWrapper, Demo1, Demo2, Demo3, Demo4, Demo5}
  })
  export default class ActionSheetDemo extends Vue {
  }
</script>
