<template>
  <div>
    <m-slider v-model="value"
              :max="30"
              :min="0"
              :style="{marginLeft : '30px',  marginRight : '30px'}"
              @change="onChange"/>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import Slider from '../../index';

  Vue.use(Slider);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public value = 1;

    public onChange(value) {
      console.log('value changed: ' + value);
    }
  }
</script>
<style scoped lang="less">
</style>
