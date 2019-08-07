<template>
  <m-wing-blank>
    <m-carousel infinite
                class="space-carousel"
                frameOverflow="visible"
                :afterChange="afterChange"
                :autoplay="false"
                :beforeChange="beforeChange"
                :cellSpacing="10"
                :slideWidth="0.8">
      <a v-for="(val, index) in state.data"
         :key="val"
         :style="{
          display : 'block',
          position : 'relative',
          top : state.slideIndex === index ? '-10px' : 0,
          height : state.imgHeight,
          boxShadow : '2px 1px 1px rgba(0, 0, 0, 0.2)',
          }">
        <img alt=""
             :src="`https://zos.alipayobjects.com/rmsportal/${val}.png`"
             :style="{ width : '100%', verticalAlign : 'top' }"
             @load="onLoad"
        />
      </a>
    </m-carousel>
  </m-wing-blank>
</template>
<script lang="ts">
  import Component from 'vue-class-component';
  import BaseDemo from './base';

  @Component({
    name: 'CarouselMode3'
  })
  export default class CarouselMode3 extends BaseDemo {
  }
</script>
<style lang="less">
  .space-carousel {
    padding: 16px;
    background: #DEF1E5;
    overflow: hidden;
  }
</style>
