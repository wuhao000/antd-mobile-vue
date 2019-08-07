<template>
  <div style="margin: 10px 0;">
    <m-accordion accordion
                 class="my-accordion"
                 @change="onChange"
                 :open-animation="{}">
      <m-accordion-panel header="Title 1">
        <m-list class="my-list">
          <m-list-item>content 1</m-list-item>
          <m-list-item>content 2</m-list-item>
          <m-list-item>content 3</m-list-item>
        </m-list>
      </m-accordion-panel>
      <m-accordion-panel class="pad"
                         header="Title 2">this is panel content2 or other
      </m-accordion-panel>
      <m-accordion-panel class="pad"
                         header="Title 3">
        text text text text text text text text text text text text text text text
      </m-accordion-panel>
    </m-accordion>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'MobileAccordionDemo2'
  })
  export default class MobileAccordionDemo2 extends Vue {

    public onChange(key) {
      console.log(key);
    }
  }
</script>
<style lang="less">
  .my-accordion .pad .am-accordion-content-box {
    padding: 10px;
  }
</style>
