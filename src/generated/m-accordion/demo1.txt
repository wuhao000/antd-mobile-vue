<template>
  <div>
    <m-accordion :active-key="['2']">
      <m-accordion-panel key="1" header="Title 1">
        <m-list class="my-list">
          <m-list-item>content 1</m-list-item>
          <m-list-item>content 2</m-list-item>
          <m-list-item>content 3</m-list-item>
        </m-list>
      </m-accordion-panel>
      <m-accordion-panel key="2" header="Title 2">
        <m-list class="my-list">
          <m-list-item>content 2</m-list-item>
        </m-list>
      </m-accordion-panel>
      <m-accordion-panel key="3" header="Title 3">
        <m-list class="my-list">
          <m-list-item>content 3</m-list-item>
        </m-list>
      </m-accordion-panel>
    </m-accordion>
  </div>
</template>
<script lang="ts">
  import List from '@/packages/m-list';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MAccordion from '../../index';

  Vue.use(List);
  Vue.use(MAccordion);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style scoped lang="less">
</style>
