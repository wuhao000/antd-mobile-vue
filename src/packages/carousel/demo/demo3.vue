<template>
  <m-wing-blank>
    <m-carousel :afterChange="afterChange"
                :autoplay="false"
                :beforeChange="beforeChange"
                :cellSpacing="10"
                :slideWidth="0.8"
                class="space-carousel"
                frameOverflow="visible" infinite>
      <a v-for="(val, index) in state.data"
         :key="val"
         :style="{
          display : 'block',
          position : 'relative',
          top : state.slideIndex === index ? '-10px' : 0,
          height : state.imgHeight,
          boxShadow : '2px 1px 1px rgba(0, 0, 0, 0.2)',
          }">
        <img :src="`https://zos.alipayobjects.com/rmsportal/${val}.png`"
             :style="{ width : '100%', verticalAlign : 'top' }"
             alt=""
             @load="onLoad"
        />
      </a>
    </m-carousel>
  </m-wing-blank>
</template>
<script lang="ts">
import {useBaseDemo} from '@/packages/carousel/demo/base';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'CarouselMode3',
  setup() {
    const {state, onLoad, beforeChange, afterChange} = useBaseDemo();
    return {state, onLoad, beforeChange, afterChange};
  }
});
</script>
<style lang="less">
.space-carousel {
  padding: 16px;
  background: #DEF1E5;
  overflow: hidden;
}
</style>
