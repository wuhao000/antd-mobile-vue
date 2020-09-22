<template>
  <div>
    <m-range v-model="value"
             :max="100"
             :min="0"/>
    <m-range-item v-model="value"
                  :max="100"
                  :min="0"/>
  </div>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  name: 'Demo1'
})
export default class Demo1 extends Vue {
  public value = [1, 2];
}
</script>
<style lang="less" scoped>
</style>
