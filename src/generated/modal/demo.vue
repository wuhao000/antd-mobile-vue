<template>
  <div>
    <demo-wrapper title="">
      <demo1/>
    </demo-wrapper>
		<demo-wrapper title="警告弹窗">
      <demo2/>
    </demo-wrapper>
		<demo-wrapper title="输入弹窗">
      <demo3/>
    </demo-wrapper>
		<demo-wrapper title="操作弹窗">
      <demo4/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import demo1 from '@/packages/modal/demo/demo1.tsx';
  import demo2 from '@/packages/modal/demo/demo2.tsx';
  import demo3 from '@/packages/modal/demo/demo3.tsx';
  import demo4 from '@/packages/modal/demo/demo4.tsx';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo',
    components: {demo1, demo2, demo3, demo4, DemoWrapper}
  })
  export default class Demo extends Vue {
  }
</script>
