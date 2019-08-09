<template>
  <div>
    <demo-wrapper title="APP 型选项卡">
      <demo1/>
    </demo-wrapper>
		<demo-wrapper title="Tabbar 在顶部">
      <demo2/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import demo1 from '@/packages/tab-bar/demo/demo1.tsx';
  import demo2 from '@/packages/tab-bar/demo/demo2.tsx';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo',
    components: {demo1, demo2, DemoWrapper}
  })
  export default class Demo extends Vue {
  }
</script>
