import {RouteConfig} from 'vue-router';

export default [{
  path: 'menu',
  name: 'Menu 菜单',
  component: () => import('@/generated/menu/index.vue')
}] as RouteConfig[];
