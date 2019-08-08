<template>
  <div class="demo"
       :style="{ height : '100%' }">
    <m-nav-bar icon="ellipsis"
               @left-click="onDock('open')">
      Docked in document
    </m-nav-bar>
    <m-drawer class="my-drawer"
              :contentStyle="{ color : '#A6A6A6', textAlign : 'center', paddingTop : '42px' }"
              :docked="state.docked"
              :sidebarStyle="{ border : '1px solid #ddd' }"
              :style="drawerStyle"
              :value="state.open">
      <m-list slot="sidebar">
        <m-list-item multiple-line
                     thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png">Category
        </m-list-item>
        <template v-for="index in 15">
          <m-list-item thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
                       :key="index">Category{{index}}
          </m-list-item>
        </template>
      </m-list>
      Click upper-left corner
    </m-drawer>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'DemoDemo2'
  })
  export default class DemoDemo2 extends Vue {


    public state = {
      docked: true,
      open: true
    };

    get drawerStyle() {
      return {minHeight: document.documentElement.clientHeight + 'px'};
    }

    public onDock(d) {
      this.state[d] = !this.state[d];
    }
  }
</script>
