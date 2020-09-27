<template>
  <m-wing-blank>
    <m-carousel :after-change="afterChange"
                :autoplay="false"
                :before-change="beforeChange" infinite>
      <a v-for="(val, index) in state.data"
         :key="index"
         :style="{display : 'inline-block', width : '100%', height : state.imgHeight}">
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
  name: 'CarouselDemo1',
  setup() {
    const {state, onLoad, afterChange, beforeChange} = useBaseDemo();
    return {state, onLoad, afterChange, beforeChange};
  }
});
</script>
