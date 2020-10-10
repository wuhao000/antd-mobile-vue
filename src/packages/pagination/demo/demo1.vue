<template>
  <div class="pagination-container">
    <p class="sub-title">Button with text</p>
    <m-pagination :total="5"
                  :value="1"/>
    <p class="sub-title">Button with text and icon</p>
    <m-pagination :total="5"
                  :value="1"
                  class="custom-pagination-with-icon">
      <template v-slot:prevText>
      <span class="arrow-align">
        <m-icon type="left"/>
        上一步</span>
      </template>
      <template v-slot:nextText>
      <span class="arrow-align">下一步
        <m-icon type="right"/>
      </span>
      </template>
    </m-pagination>
    <p class="sub-title">Hide number</p>
    <m-pagination :total="5"
                  :value="1" simple/>
    <p class="sub-title">Show number only</p>
    <m-pagination :total="5"
                  :value="3"
                  mode="number"/>
    <p class="sub-title">Point style</p>
    <m-pagination :style="{ marginBottom : '16px' }"
                  :total="5"
                  :value="2"
                  mode="pointer"/>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'Demo1',
  props: {},
  setup(props, {emit, slots}) {
    const current = ref(1);
    return {current};
  }
});
</script>
<style lang="less" scoped>
.pagination-container {
  margin: 0 15px;
}

.custom-pagination-with-icon .am-pagination-wrap-btn-prev .am-button-inline {
  padding-left: 0;
  padding-right: 10px;
}

.custom-pagination-with-icon .am-pagination-wrap-btn-next .am-button-inline {
  padding-left: 10px;
  padding-right: 0;
}

.arrow-align {
  display: flex;
  align-items: center;
}

.sub-title {
  color: #888;
  font-size: 14px;
  padding: 30px 0 18px 0;
}
</style>
