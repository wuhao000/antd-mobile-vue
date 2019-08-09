<template>
  <div>
    <demo-wrapper title="类型、尺寸">
      <demo1/>
    </demo-wrapper>
		<demo-wrapper title="应用场景示例">
      <demo2/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import demo1 from '@/packages/button/demo/demo1.tsx';
  import demo2 from '@/packages/button/demo/demo2.tsx';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo',
    components: {demo1, demo2, DemoWrapper}
  })
  export default class Demo extends Vue {
  }
</script>
