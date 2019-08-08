<template>
  <div>
    <demo-wrapper title="基本">
      <demo1/>
    </demo-wrapper>
		<demo-wrapper title="单级菜单">
      <demo2/>
    </demo-wrapper>
		<demo-wrapper title="菜单多选">
      <demo3/>
    </demo-wrapper>
		<demo-wrapper title="单级菜单多选">
      <demo4/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import demo1 from '@/packages/menu/demo/demo1.tsx';
  import demo2 from '@/packages/menu/demo/demo2.tsx';
  import demo3 from '@/packages/menu/demo/demo3.tsx';
  import demo4 from '@/packages/menu/demo/demo4.tsx';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo',
    components: {demo1, demo2, demo3, demo4, DemoWrapper}
  })
  export default class Demo extends Vue {
  }
</script>
