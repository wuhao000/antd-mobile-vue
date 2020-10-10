import {RouteRecordRaw} from 'vue-router';

export default [{
  path: 'accordion',
  name: 'Accordion 手风琴',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/accordion/index.vue')
}, {
  path: 'popover',
  name: 'Popover 气泡',
  meta: {
    tag: '其他'
  },
  component: () => import('@/generated/popover/index.vue')
}, {
  path: 'pull-refresh',
  name: 'PullRefresh 下拉刷新',
  meta: {
    tag: '手势'
  },
  component: () => import('@/generated/pull-refresh/index.vue')
}, {
  path: 'radio',
  name: 'Radio 单选',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/radio/index.vue')
}, {
  path: 'picker',
  name: 'Picker 选择器',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/picker/index.vue')
}, {
  path: 'slider',
  name: 'Slider 滑动输入条',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/slider/index.vue')
}, {
  path: 'menu',
  name: 'Menu 菜单',
  meta: {
    tag: '导航'
  },
  component: () => import('@/generated/menu/index.vue')
}, {
  path: 'stepper',
  name: 'Stepper 步进器',
  meta: {
    tag: '其他'
  },
  component: () => import('@/generated/stepper/index.vue')
}, {
  path: 'segmented-control',
  name: 'SegmentedControl 分段器',
  meta: {
    tag: '导航'
  },
  component: () => import('@/generated/segmented-control/index.vue')
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
  path: 'progress',
  name: 'Progress 进度条',
  meta: {
    tag: '反馈'
  },
  component: () => import('@/generated/progress/index.vue')
}, {
  path: 'popup',
  name: 'Popup 弹出层',
  meta: {
    tag: '其他'
  },
  component: () => import('@/generated/popup/index.vue')
}, {
  path: 'steps',
  name: 'Steps 步骤条',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/steps/index.vue')
}, {
  path: 'tab-bar',
  name: 'TabBar 标签栏',
  meta: {
    tag: '导航'
  },
  component: () => import('@/generated/tab-bar/index.vue')
}, {
  path: 'tabs',
  name: 'Tabs 标签页',
  meta: {
    tag: '导航'
  },
  component: () => import('@/generated/tabs/index.vue')
}, {
  path: 'tag',
  name: 'Tag 标签',
  meta: {
    tag: '其他'
  },
  component: () => import('@/generated/tag/index.vue')
}, {
  path: 'notice-bar',
  name: 'NoticeBar 通告栏',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/notice-bar/index.vue')
}, {
  path: 'pagination',
  name: 'Pagination 分页器',
  meta: {
    tag: '导航'
  },
  component: () => import('@/generated/pagination/index.vue')
}, {
  path: 'textarea',
  name: 'Textarea 文本框',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/textarea/index.vue')
}, {
  path: 'result',
  name: 'Result 结果页',
  meta: {
    tag: '组合'
  },
  component: () => import('@/generated/result/index.vue')
}, {
  path: 'toast',
  name: 'Toast 轻提示',
  meta: {
    tag: '反馈'
  },
  component: () => import('@/generated/toast/index.vue')
}, {
  path: 'icon',
  name: 'Icon 图标',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/icon/index.vue')
}, {
  path: 'modal',
  name: 'Modal 模态框',
  meta: {
    tag: '反馈'
  },
  component: () => import('@/generated/modal/index.vue')
}, {
  path: 'search-bar',
  name: 'SearchBar 搜索框',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/search-bar/index.vue')
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
