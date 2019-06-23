<template>
  <div class="base-example">
    <d-province size="large"
                :value.sync="value"
                @change="handleChange"></d-province>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DProvince from '../../src/index.vue';

  @Component({
    name: 'BaseExample',
    components: {DProvince}
  })
  export default class BaseExample extends Vue {
    private value: string[] = [];

    private handleChange(val: string[]): void {
      this.value = val;
    }
  }
</script>
<style scoped lang="less">
</style>
