<template>
  <div>
    <demo-wrapper title="默认">
      <demo1/>
    </demo-wrapper>
		<demo-wrapper title="通栏">
      <demo2/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import demo1 from '@/packages/card/demo/demo1.vue';
  import demo2 from '@/packages/card/demo/demo2.vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo',
    components: {demo1, demo2, DemoWrapper}
  })
  export default class Demo extends Vue {
  }
</script>
