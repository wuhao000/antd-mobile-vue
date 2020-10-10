<template>
  <div>
    <m-nav-bar mode="light"
               @left-click="onLeftClick">
      <template v-slot:icon>
        <m-icon type="left"/>
      </template>
      <template v-slot:right-content>
        <m-icon key="0"
                :style="{ marginRight : '16px' }"
                type="search"/>
        <m-icon key="1"
                type="ellipsis"/>
      </template>
      NavBar
    </m-nav-bar>
    <m-nav-bar left-content="Back"
               mode="dark">
      <template v-slot:right-content>
        <m-icon key="0"
                :style="{ marginRight : '16px' }"
                type="search"/>
        <m-icon key="1"
                type="ellipsis"/>
      </template>
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
