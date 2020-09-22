import {RouteRecordRaw} from 'vue-router';

export default [{
  path: 'accordion',
  name: 'Accordion 手风琴',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/accordion/index.vue')
}, {
  path: 'action-sheet',
  name: 'ActionSheet 动作面板',
  meta: {
    tag: '反馈'
  },
  component: () => import('@/generated/action-sheet/index.vue')
}, {
  path: 'button',
  name: 'Button 按钮',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/button/index.vue')
}, {
  path: 'list',
  name: 'List 列表',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/list/index.vue')
}, {
  path: 'range',
  name: 'Range 区域选择',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/range/index.vue')
}, {
  path: 'switch',
  name: 'Switch 开关',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/switch/index.vue')
}, {
  path: 'input',
  name: 'Input 输入框',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/input/index.vue')
}] as RouteRecordRaw[];
