<template>
  <div>
    <m-carousel autoplay infinite
                vertical
                class="my-carousel"
                :dots="false" :dragging="false" :swiping="false">
      <div class="v-item">carousel 1</div>
      <div class="v-item">carousel 2</div>
      <div class="v-item">carousel 3</div>
    </m-carousel>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MCarousel from '../../index';

  Vue.use(MCarousel);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public data = ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'];

    public load() {
      // fire window resize event to change height
      window.dispatchEvent(new Event('resize'));
    }
  }
</script>
<style scoped lang="less">
  .my-carousel .v-item {
    height: 36px;
    line-height: 36px;
    padding-left: 10px;
  }
</style>
