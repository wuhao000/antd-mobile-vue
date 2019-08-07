<template>
  <div>
    <demo-wrapper title="基本">
      <mobile-accordion-demo1/>
    </demo-wrapper>
    <demo-wrapper title="手风琴模式">
      <mobile-accordion-demo2/>
    </demo-wrapper>
  </div>
</template>
<script lang="ts">
  import DemoWrapper from '@/components/demo-wrapper.vue';
  import MobileAccordionDemo1 from '@/components/demo/accordion/demo1.vue';
  import MobileAccordionDemo2 from '@/components/demo/accordion/demo2.vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'MobileAccordion',
    components: {MobileAccordionDemo2, MobileAccordionDemo1, DemoWrapper}
  })
  export default class MobileAccordion extends Vue {
  }
</script>
