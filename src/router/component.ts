import {RouteConfig} from 'vue-router';

export default [{
  path: 'date-picker-view',
  name: 'DatePickerView 日期选择器',
  meta: {
    tag: '其他'
  },
  component: () => import('@/generated/date-picker-view/index.vue')
}, {
  path: 'm-accordion',
  name: 'MAccordion 手风琴',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/m-accordion/index.vue')
}, {
  path: 'm-action-sheet',
  name: 'MActionSheet 动作面板',
  meta: {
    tag: '反馈'
  },
  component: () => import('@/generated/m-action-sheet/index.vue')
}, {
  path: 'm-activity-indicator',
  name: 'MActivityIndicator 活动指示器',
  meta: {
    tag: '反馈'
  },
  component: () => import('@/generated/m-activity-indicator/index.vue')
}, {
  path: 'm-badge',
  name: 'MBadge 徽标',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/m-badge/index.vue')
}, {
  path: 'm-button',
  name: 'MButton 按钮',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/m-button/index.vue')
}, {
  path: 'm-calendar',
  name: 'MCalendar 日历',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/m-calendar/index.vue')
}, {
  path: 'm-card',
  name: 'MCard 卡片',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/m-card/index.vue')
}, {
  path: 'm-carousel',
  name: 'MCarousel 走马灯',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/m-carousel/index.vue')
}, {
  path: 'm-chart',
  name: 'MChart 图表',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/m-chart/index.vue')
}, {
  path: 'm-checkbox',
  name: 'MCheckbox 复选框',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/m-checkbox/index.vue')
}, {
  path: 'm-date-picker',
  name: 'MDatePicker 日期选择',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/m-date-picker/index.vue')
}, {
  path: 'm-drawer',
  name: 'MDrawer 抽屉',
  meta: {
    tag: '导航'
  },
  component: () => import('@/generated/m-drawer/index.vue')
}, {
  path: 'm-flex',
  name: 'MFlex 弹性布局',
  meta: {
    tag: '布局'
  },
  component: () => import('@/generated/m-flex/index.vue')
}, {
  path: 'm-grid',
  name: 'MGrid 宫格',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/m-grid/index.vue')
}, {
  path: 'm-icon',
  name: 'MIcon 图标',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/m-icon/index.vue')
}, {
  path: 'm-input',
  name: 'MInput 输入框',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/m-input/index.vue')
}, {
  path: 'm-list',
  name: 'MList 列表',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/m-list/index.vue')
}, {
  path: 'm-modal',
  name: 'MModal 模态框',
  meta: {
    tag: '反馈'
  },
  component: () => import('@/generated/m-modal/index.vue')
}, {
  path: 'm-nav-bar',
  name: 'MNavBar 导航栏',
  meta: {
    tag: '导航'
  },
  component: () => import('@/generated/m-nav-bar/index.vue')
}, {
  path: 'm-notice-bar',
  name: 'MNoticeBar 通告栏',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/m-notice-bar/index.vue')
}, {
  path: 'm-pagination',
  name: 'MPagination 分页器',
  meta: {
    tag: '导航'
  },
  component: () => import('@/generated/m-pagination/index.vue')
}, {
  path: 'm-picker',
  name: 'MPicker 选择器',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/m-picker/index.vue')
}, {
  path: 'm-popup',
  name: 'MPopup 弹出层',
  meta: {
    tag: '其他'
  },
  component: () => import('@/generated/m-popup/index.vue')
}, {
  path: 'm-pull-refresh',
  name: 'MPullRefresh 下拉刷新',
  meta: {
    tag: '手势'
  },
  component: () => import('@/generated/m-pull-refresh/index.vue')
}, {
  path: 'm-radio',
  name: 'MRadio 单选',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/m-radio/index.vue')
}, {
  path: 'm-range',
  name: 'MRange 区域选择',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/m-range/index.vue')
}, {
  path: 'm-result',
  name: 'MResult 结果页',
  meta: {
    tag: '组合'
  },
  component: () => import('@/generated/m-result/index.vue')
}, {
  path: 'm-search-bar',
  name: 'MSearchBar 搜索框',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/m-search-bar/index.vue')
}, {
  path: 'm-steps',
  name: 'MSteps 步骤条',
  meta: {
    tag: '数据展示'
  },
  component: () => import('@/generated/m-steps/index.vue')
}, {
  path: 'm-switch',
  name: 'MSwitch 开关',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/m-switch/index.vue')
}, {
  path: 'm-tab-bar',
  name: 'MTabBar 标签栏',
  meta: {
    tag: '导航'
  },
  component: () => import('@/generated/m-tab-bar/index.vue')
}, {
  path: 'm-tabs',
  name: 'MTabs 标签页',
  meta: {
    tag: '导航'
  },
  component: () => import('@/generated/m-tabs/index.vue')
}, {
  path: 'm-textarea',
  name: 'MTextarea 文本框',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/m-textarea/index.vue')
}, {
  path: 'm-toast',
  name: 'MToast 轻提示',
  meta: {
    tag: '反馈'
  },
  component: () => import('@/generated/m-toast/index.vue')
}, {
  path: 'm-white-space',
  name: 'MWhiteSpace 上下留白',
  meta: {
    tag: '布局'
  },
  component: () => import('@/generated/m-white-space/index.vue')
}, {
  path: 'm-wing-blank',
  name: 'MWingBlank 两翼留白',
  meta: {
    tag: '布局'
  },
  component: () => import('@/generated/m-wing-blank/index.vue')
}, {
  path: 'menu',
  name: 'Menu 菜单',
  meta: {
    tag: '导航'
  },
  component: () => import('@/generated/menu/index.vue')
}, {
  path: 'slider',
  name: 'Slider 滑动输入条',
  meta: {
    tag: '数据入口'
  },
  component: () => import('@/generated/slider/index.vue')
}] as RouteConfig[];
