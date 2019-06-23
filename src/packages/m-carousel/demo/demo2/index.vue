<template>
  <div>
    <m-carousel autoplay infinite
                frame-overflow="visible"
                :cell-spacing="10"
                :slide-width="0.8">
      <a v-for="val in data"
         href="http://www.alipay.com"
         :key="val"
         :style="{ display : 'inline-block', width : '100%', height : 'auto' }"
      >
        <img alt=""
             :src="`https://zos.alipayobjects.com/rmsportal/${val}.png`"
             :style="{ width : '100%', verticalAlign : 'top' }"
             @load="load"
        />
      </a>
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
  .item {
    height: 100px;
    background: mediumseagreen;
  }
</style>
