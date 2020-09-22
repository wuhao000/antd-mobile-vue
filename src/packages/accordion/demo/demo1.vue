<template>
  <div style="margin: 10px 0;">
    <m-accordion class="my-accordion"
                 :defaultActiveKey="0"
                 @change="onChange">
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
  import { Options, Vue } from 'vue-class-component';
  import Accordion from '@/packages/accordion';
  import List from '@/packages/list';

  @Options({
    name: 'MobileAccordionDemo1',
    components: {
      MAccordion: Accordion,
      MList: List,
      MListItem: List.Item
    }
  })
  export default class MobileAccordionDemo1 extends Vue {
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
