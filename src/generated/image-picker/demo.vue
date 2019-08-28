<template>
  <div>
    <demo-wrapper title="简单的图片选择组件">
      <demo1/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import demo1 from '@/packages/image-picker/demo/demo1.tsx';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo',
    components: {demo1, DemoWrapper}
  })
  export default class Demo extends Vue {
  }
</script>
