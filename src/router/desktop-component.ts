import {RouteConfig} from 'vue-router';

export default [{
  path: 'd-anchor',
  name: 'DAnchor 锚点',
  component: () => import('@/generated/d-anchor/index.vue')
}, {
  path: 'd-auto-complete',
  name: 'DAutoComplete 自动完成',
  component: () => import('@/generated/d-auto-complete/index.vue')
}, {
  path: 'd-button',
  name: 'DButton 按钮',
  component: () => import('@/generated/d-button/index.vue')
}, {
  path: 'd-calendar',
  name: 'DCalendar 日历',
  component: () => import('@/generated/d-calendar/index.vue')
}, {
  path: 'd-card',
  name: 'DCard 卡片',
  component: () => import('@/generated/d-card/index.vue')
}, {
  path: 'd-cascader',
  name: 'DCascader 级联组件',
  component: () => import('@/generated/d-cascader/index.vue')
}, {
  path: 'd-checkbox',
  name: 'DCheckbox 单选框',
  component: () => import('@/generated/d-checkbox/index.vue')
}, {
  path: 'd-color-picker',
  name: 'DColorPicker 颜色选择',
  component: () => import('@/generated/d-color-picker/index.vue')
}, {
  path: 'd-date-picker',
  name: 'DDatePicker 日期选择框',
  component: () => import('@/generated/d-date-picker/index.vue')
}, {
  path: 'd-description-list',
  name: 'DDescriptionList 列表页',
  component: () => import('@/generated/d-description-list/index.vue')
}, {
  path: 'd-divider',
  name: 'DDivider 分割线',
  component: () => import('@/generated/d-divider/index.vue')
}, {
  path: 'd-empty',
  name: 'DEmpty 空状态',
  component: () => import('@/generated/d-empty/index.vue')
}, {
  path: 'd-form',
  name: 'DForm 表单',
  component: () => import('@/generated/d-form/index.vue')
}, {
  path: 'd-input',
  name: 'DInput 文本框',
  component: () => import('@/generated/d-input/index.vue')
}, {
  path: 'd-input-number',
  name: 'DInputNumber 数字输入框',
  component: () => import('@/generated/d-input-number/index.vue')
}, {
  path: 'd-list',
  name: 'DList 列表',
  component: () => import('@/generated/d-list/index.vue')
}, {
  path: 'd-menu',
  name: 'DMenu 菜单',
  component: () => import('@/generated/d-menu/index.vue')
}, {
  path: 'd-message',
  name: 'DMessage 消息提示',
  component: () => import('@/generated/d-message/index.vue')
}, {
  path: 'd-pagination',
  name: 'DPagination 分页器',
  component: () => import('@/generated/d-pagination/index.vue')
}, {
  path: 'd-popover',
  name: 'DPopover 气泡卡片',
  component: () => import('@/generated/d-popover/index.vue')
}, {
  path: 'd-province',
  name: 'DProvince 省市区联动',
  component: () => import('@/generated/d-province/index.vue')
}, {
  path: 'd-radio',
  name: 'DRadio 单选',
  component: () => import('@/generated/d-radio/index.vue')
}, {
  path: 'd-rate',
  name: 'DRate 评分器',
  component: () => import('@/generated/d-rate/index.vue')
}, {
  path: 'd-select',
  name: 'DSelect 下拉选择',
  component: () => import('@/generated/d-select/index.vue')
}, {
  path: 'd-slider',
  name: 'DSlider 滑动输入条',
  component: () => import('@/generated/d-slider/index.vue')
}, {
  path: 'd-switch',
  name: 'DSwitch 开关',
  component: () => import('@/generated/d-switch/index.vue')
}, {
  path: 'd-table',
  name: 'DTable 表格',
  component: () => import('@/generated/d-table/index.vue')
}, {
  path: 'd-tag',
  name: 'DTag 标签',
  component: () => import('@/generated/d-tag/index.vue')
}, {
  path: 'd-time-picker',
  name: 'DTimePicker 时间选择框',
  component: () => import('@/generated/d-time-picker/index.vue')
}, {
  path: 'd-transfer',
  name: 'DTransfer 穿梭框',
  component: () => import('@/generated/d-transfer/index.vue')
}, {
  path: 'd-tree',
  name: 'DTree 树',
  component: () => import('@/generated/d-tree/index.vue')
}, {
  path: 'd-upload',
  name: 'DUpload 上传组件',
  component: () => import('@/generated/d-upload/index.vue')
}, {
  path: 'd-year-picker',
  name: 'DYearPicker 年份选择器',
  component: () => import('@/generated/d-year-picker/index.vue')
}] as RouteConfig[];
