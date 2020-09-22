<template>
  <router-view></router-view>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  name: 'Components'
})
export default class Components extends Vue {
}
</script>
<style lang="less" type="text/less">
</style>
