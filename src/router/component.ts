import {RouteRecordRaw} from 'vue-router';

export default [{
  path: 'accordion',
  name: 'Accordion 手风琴',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/accordion/index.vue')
}, {
  path: 'nav-bar',
  name: 'NavBar 导航栏',
  meta: {
    tag: '导航'
  },
  component: () => import('@/generated/nav-bar/index.vue')
}, {
  path: 'drawer',
  name: 'Drawer 抽屉',
  meta: {
    tag: '导航'
  },
  component: () => import('@/generated/drawer/index.vue')
}, {
  path: 'card',
  name: 'Card 卡片',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/card/index.vue')
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
  path: 'activity-indicator',
  name: 'ActivityIndicator 活动指示器',
  meta: {
    tag: '反馈'
  },
  component: () => import('@/generated/activity-indicator/index.vue')
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
}, {
  path: 'calendar',
  name: 'Calendar 日历',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/calendar/index.vue')
}, {
  path: 'badge',
  name: 'Badge 徽标',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/badge/index.vue')
}, {
  path: 'wing-blank',
  name: 'WingBlank 两翼留白',
  meta: {
    tag: '布局'
  },
  component: () => import('@/generated/wing-blank/index.vue')
}, {
  path: 'checkbox',
  name: 'Checkbox 复选框',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/checkbox/index.vue')
}, {
  path: 'flex',
  name: 'Flex 弹性布局',
  meta: {
    tag: '布局'
  },
  component: () => import('@/generated/flex/index.vue')
}, {
  path: 'grid',
  name: 'Grid 宫格',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/grid/index.vue')
}, {
  path: 'carousel',
  name: 'Carousel 走马灯',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/carousel/index.vue')
}, {
  path: 'white-space',
  name: 'WhiteSpace 上下留白',
  meta: {
    tag: '布局'
  },
  component: () => import('@/generated/white-space/index.vue')
}] as RouteRecordRaw[];
