<template>
  <m-wing-blank>
    <m-button @click="onClick">Click me to add child</m-button>
    <m-white-space/>
    <m-carousel infinite
                :after-change="afterChange"
                :autoplay="false"
                :beforeChange="beforeChange"
                :selectedIndex="state.slideIndex">
      <a v-for="(val, index) in state.data"
         :key="index"
         :style="{ display : 'inline-block', width : '100%', height : state.imgHeight }">
        <img alt=""
             :src="`https://zos.alipayobjects.com/rmsportal/${val}.png`"
             :style="{width : '100%', verticalAlign : 'top' }"/>
      </a>
    </m-carousel>
  </m-wing-blank>
</template>
<script lang="ts">
  import BaseDemo from './base';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'CarouselDemo2'
  })
  export default class CarouselDemo2 extends BaseDemo {

    public onClick() {
      this.state.data = this.state.data.concat(['AiyWuByWklrrUDlFignR']);
      console.log(this.state.data);
    }
  }
</script>
