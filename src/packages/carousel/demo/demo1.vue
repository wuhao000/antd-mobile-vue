<template>
  <m-wing-blank>
    <m-carousel infinite
                :after-change="afterChange"
                :autoplay="false"
                :before-change="beforeChange"
    >
      <a v-for="(val, index) in state.data"
         :key="index"
         :style="{display : 'inline-block', width : '100%', height : state.imgHeight}">
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
  import BaseDemo from './base';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'CarouselDemo1'
  })
  export default class CarouselDemo1 extends BaseDemo {

  }
</script>
