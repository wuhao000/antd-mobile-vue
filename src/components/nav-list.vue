<template>
  <a-menu id="nav-list"
          mode="inline">
    <template v-for="item in menuList">
      <a-sub-menu v-if="item.children && item.children.length"
                  :key="item.name">
        <template v-slot:title>
          <div class="category-title">{{item.name}}
          </div>
        </template>
        <template v-if="item.name === '组件'">
          <a-menu-item-group v-for="(item) in getComponentMap(item.children)"
                             :key="item.tag"
                             :title="item.tag">
            <a-menu-item v-for="component in item.components"
                         :key="component.name"
                         @click="handleClick(component)">{{component.name}}
            </a-menu-item>
          </a-menu-item-group>
        </template>
        <template v-else>
          <a-menu-item v-for="sub in item.children"
                       :key="sub.name"
                       @click="handleClick(sub)">{{sub.name}}
          </a-menu-item>
        </template>
      </a-sub-menu>
      <a-menu-item v-else
                   class="category-title"
                   :key="item.name"
                   @click="handleClick(item)">{{item.name}}
      </a-menu-item>
    </template>
  </a-menu>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {RouteRecordRaw} from 'vue-router';

const tagNames = ['布局', '导航', '数据入口', '数据展示', '反馈', '手势', '组合', '其他'];
  @Options({
    props: {
      menuList: {
        type: Array
      }
    }
  })
  export default class NavList extends Vue {
    public menuList: RouteRecordRaw[]; // 代码片段

    public openKeys: string[] = [];

    public getComponentMap(routes: RouteRecordRaw[]) {
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
