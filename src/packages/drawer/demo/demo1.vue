<template>
  <div class="demo">
    <m-nav-bar @left-click="onOpenChange">
      <template v-slot:icon>
        <m-icon type="ellipsis"/>
      </template>
      Basic
    </m-nav-bar>
    <m-drawer :content-style="{ color : '#A6A6A6', textAlign : 'center', paddingTop : '42px' }"
              :style="drawerStyle"
              :value="state.open"
              class="my-drawer" enable-drag-handle
              @open-change="{onOpenChange}">
      <template v-slot:sidebar>
        <m-list>
          <m-list-item multiple-line
                       thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png">Category
          </m-list-item>
          <template v-for="index in 15"
                    :key="index">
            <m-list-item thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png">Category{{ index }}
            </m-list-item>
          </template>
        </m-list>
      </template>
      Click upper-left corner
    </m-drawer>
  </div>
</template>
<script lang="ts">
import {computed, defineComponent, reactive} from 'vue';

export default defineComponent({
  name: 'DemoDemo1',
  props: {},
  setup(props, {emit, slots}) {
    const state = reactive({
      open: true
    });

    const drawerStyle = computed(() => {
      return {minHeight: document.documentElement.clientHeight + 'px'};
    });
    const onOpenChange = (...args) => {
      console.log(args);
      state.open = !state.open;
    };
    return {state, drawerStyle, onOpenChange};
  }
});
</script>
<style lang="less">
.demo {
  .my-drawer {
    position: relative;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .my-drawer .am-drawer-sidebar {
    background-color: #fff;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .my-drawer .am-drawer-sidebar .am-list {
    width: 300px;
    padding: 0;
  }
}
</style>
