<template>
  <div>
    <m-nav-bar mode="light"
               @left-click="onLeftClick">
      <m-icon slot="icon"
              type="left"/>
      <m-icon key="0"
              slot="right-content"
              :style="{ marginRight : '16px' }"
              type="search"/>
      <m-icon key="1"
              slot="right-content"
              type="ellipsis"/>
      NavBar
    </m-nav-bar>
    <m-nav-bar left-content="Back"
               mode="dark">
      <m-icon key="0"
              slot="right-content"
              :style="{ marginRight : '16px' }"
              type="search"/>
      <m-icon key="1"
              slot="right-content"
              type="ellipsis"/>
      NavBar
    </m-nav-bar>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'DemoDemo1',
  props: {},
  setup(props, {emit, slots}) {
    const onLeftClick = () => {
      console.log('left click');
    };
    return {};
  }
});

</script>
