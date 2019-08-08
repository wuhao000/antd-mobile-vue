<template>
  <div class="pagination-container">
    <p class="sub-title">Button with text</p>
    <m-pagination :value="1"
                  :total="5"/>
    <p class="sub-title">Button with text and icon</p>
    <m-pagination class="custom-pagination-with-icon"
                  :value="1"
                  :total="5">
      <span class="arrow-align"
            slot="prevText">
        <m-icon type="left"/>
        上一步</span>
      <span class="arrow-align"
            slot="nextText">下一步
        <m-icon type="right"/>
      </span>
    </m-pagination>
    <p class="sub-title">Hide number</p>
    <m-pagination simple
                  :value="1"
                  :total="5"/>
    <p class="sub-title">Show number only</p>
    <m-pagination mode="number"
                  :value="3"
                  :total="5"/>
    <p class="sub-title">Point style</p>
    <m-pagination mode="pointer"
                  :value="2"
                  :style="{ marginBottom : '16px' }"
                  :total="5"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public current = 1;
  }
</script>
<style scoped lang="less">
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
