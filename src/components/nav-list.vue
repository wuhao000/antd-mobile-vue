<template>
  <d-menu id="nav-list"
          mode="inline"
          :open-keys.sync="openKeys">
    <template v-for="item in menuList">
      <d-sub-menu v-if="item.children && item.children.length"
                  :key="item.name">
        <div class="category-title"
             slot="title">{{item.name}}
        </div>
        <d-menu-item v-for="sub in item.children"
                     :key="sub.name"
                     @click="handleClick(sub)">{{sub.name}}
        </d-menu-item>
      </d-sub-menu>
      <d-menu-item v-else
                   class="category-title"
                   :key="item.name"
                   @click="handleClick(item)">{{item.name}}
      </d-menu-item>
    </template>
  </d-menu>
</template>
<script lang="ts">
  import Menu from '@/packages/d-menu';
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {RouteConfig} from 'vue-router';

  Vue.use(Menu);
  @Component
  export default class NavList extends Vue {
    @Prop({
      type: Array
    })
    public menuList: RouteConfig[]; // 代码片段

    public openKeys: string[] = [];

    public handleClick(route) {
      this.$router.push(route);
    }

  }
</script>
<style lang="less">
  #nav-list {
    .category-title {
      color: black;
      font-family: 'Songti SC', serif;
      font-weight: bold;
    }
  }
</style>
