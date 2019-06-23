<template>
  <div>
     <d-color-picker v-model="color" defaultColor="#666" :disabled="colorPickerDisabled" v-on:change="headleChangeColor"/>
  </div>
</template>
<script lang="ts">
  import DColorPicker from '../../src/index.vue';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'Demo1',
    components: {DColorPicker}
  })
  export default class Demo1 extends Vue {
    public color: string = '#ff0000';
    public colorPickerDisabled: boolean = false;
    public headleChangeColor() {
      console.log(this.color);
    }
  }
</script>
<style lang="less" scoped>
</style>
