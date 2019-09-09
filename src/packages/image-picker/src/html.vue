<template>
  <div v-html="html"
       class="svg-container"
       style="font-size:10px;"
  ></div>
</template>
<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'SrcHtml',
    props: {html: String}
  });
</script>
<style lang="less">
  .svg-container {
    text-align: center;
    vertical-align: center;
    padding-top: 17px;
    border: 1px solid #ddd;
    border-radius: 3px;
    background-color: white;
    svg {
      width: 40px;
    }
  }
</style>
