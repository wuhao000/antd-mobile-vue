import {RouteConfig} from 'vue-router';

export default [{
  path: 'ae-codemirror',
  name: 'AeCodemirror 代码编辑',
  component: () => import('@/generated/ae-codemirror/index.vue')
}, {
  path: 'ae-grid',
  name: 'AeGrid 栅格',
  component: () => import('@/generated/ae-grid/index.vue')
}, {
  path: 'ae-icon',
  name: 'AeIcon 图标',
  component: () => import('@/generated/ae-icon/index.vue')
}, {
  path: 'ae-layout',
  name: 'AeLayout 布局',
  component: () => import('@/generated/ae-layout/index.vue')
}, {
  path: 'ae-modal',
  name: 'AeModal 模态框',
  component: () => import('@/generated/ae-modal/index.vue')
}, {
  path: 'ae-tooltip',
  name: 'AeTooltip 提示',
  component: () => import('@/generated/ae-tooltip/index.vue')
}] as RouteConfig[];
