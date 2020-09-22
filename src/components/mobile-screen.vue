<template>
  <div class="mobile-screen">
    <slot/>
  </div>
</template>
<script lang="ts">
import {Vue, Options} from 'vue-class-component';

@Options({
  name: 'MobileScreen'
})
export default class MobileScreen extends Vue {

}
</script>
<style lang="less">
.mobile-screen {
  height: 640px;
  width: 480px;
  overflow: auto;
}
</style>
