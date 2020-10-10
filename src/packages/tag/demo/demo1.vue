<template>
  <div class="tag-container">
    <m-tag>Basic</m-tag>
    <m-tag selected>Selected</m-tag>
    <m-tag disabled>Disabled</m-tag>
    <m-tag closable>Closable</m-tag>
    <m-tag closable
           @close="close">Closable
    </m-tag>
  </div>
</template>
<script lang="ts">
import {message} from 'ant-design-vue';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Demo1',
  props: {},
  setup() {
    const close = () => {
      message.success('close');
    };


    return {close};
  }

});

</script>
<style lang="less">
.tag-container {
  display: flex;
  padding-top: 9px;
  flex-direction: row;
  flex-wrap: wrap;
}

.tag-container > div {
  margin-left: 9px;
  margin-bottom: 9px;
}
</style>
