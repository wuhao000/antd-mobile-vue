import {RouteRecordRaw} from 'vue-router';

export default [{
  path: 'm-accordion',
  name: 'MAccordion 手风琴',
  component: () => import('@/generated/accordion/index.vue')
}, {
  path: 'm-action-sheet',
  name: 'MActionSheet 动作面板',
  component: () => import('@/generated/action-sheet/index.vue')
}] as RouteRecordRaw[];
