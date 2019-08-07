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
        <template v-if="item.name === '组件'">
          <d-menu-item-group v-for="(item) in getComponentMap(item.children)"
                             :key="item.tag"
                             :title="item.tag">
            <d-menu-item v-for="component in item.components"
                         :key="component.name"
                         @click="handleClick(component)">{{component.name}}
            </d-menu-item>
          </d-menu-item-group>
        </template>
        <template v-else>
          <d-menu-item v-for="sub in item.children"
                       :key="sub.name"
                       @click="handleClick(sub)">{{sub.name}}
          </d-menu-item>
        </template>
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
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {RouteConfig} from 'vue-router';

  const tagNames = ['布局', '导航', '数据入口', '数据展示', '反馈', '手势', '组合', '其他'];
  @Component
  export default class NavList extends Vue {
    @Prop({
      type: Array
    })
    public menuList: RouteConfig[]; // 代码片段

    public openKeys: string[] = [];

    public getComponentMap(routes: RouteConfig[]) {
      const tags = routes.map(it => it.meta && it.meta.tag);
      const map = {};
      tags.forEach(tag => {
        map[tag] = routes.filter(it => it.meta.tag === tag);
      });
      const tagComponentsList = [];
      Object.keys(map).forEach(key => {
        tagComponentsList.push({
          tag: key,
          components: map[key]
        });
      });
      tagComponentsList.sort((a, b) => {
        return tagNames.indexOf(a.tag) - tagNames.indexOf(b.tag);
      });
      return tagComponentsList;
    }

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
