export default [{
  path: 'home',
  name: '演示',
  props: true,
  component: () => import('@/components/demo/index.vue')
}, {
  path: 'm-accordion',
  name: 'm-accordion',
  component: () => import('@/generated/accordion/demo.vue')
}, {
  path: 'm-nav-bar',
  name: 'm-nav-bar',
  component: () => import('@/generated/nav-bar/demo.vue')
}, {
  path: 'm-drawer',
  name: 'm-drawer',
  component: () => import('@/generated/drawer/demo.vue')
}, {
  path: 'm-card',
  name: 'm-card',
  component: () => import('@/generated/card/demo.vue')
}, {
  path: 'm-action-sheet',
  name: 'm-action-sheet',
  component: () => import('@/generated/action-sheet/demo.vue')
}, {
  path: 'm-button',
  name: 'm-button',
  component: () => import('@/generated/button/demo.vue')
}, {
  path: 'm-list',
  name: 'm-list',
  component: () => import('@/generated/list/demo.vue')
}, {
  path: 'm-activity-indicator',
  name: 'm-activity-indicator',
  component: () => import('@/generated/activity-indicator/demo.vue')
}, {
  path: 'm-range',
  name: 'm-range',
  component: () => import('@/generated/range/demo.vue')
}, {
  path: 'm-switch',
  name: 'm-switch',
  component: () => import('@/generated/switch/demo.vue')
}, {
  path: 'm-input',
  name: 'm-input',
  component: () => import('@/generated/input/demo.vue')
}, {
  path: 'm-calendar',
  name: 'm-calendar',
  component: () => import('@/generated/calendar/demo.vue')
}, {
  path: 'm-badge',
  name: 'm-badge',
  component: () => import('@/generated/badge/demo.vue')
}, {
  path: 'm-wing-blank',
  name: 'm-wing-blank',
  component: () => import('@/generated/wing-blank/demo.vue')
}, {
  path: 'm-checkbox',
  name: 'm-checkbox',
  component: () => import('@/generated/checkbox/demo.vue')
}, {
  path: 'm-flex',
  name: 'm-flex',
  component: () => import('@/generated/flex/demo.vue')
}, {
  path: 'm-grid',
  name: 'm-grid',
  component: () => import('@/generated/grid/demo.vue')
}, {
  path: 'm-carousel',
  name: 'm-carousel',
  component: () => import('@/generated/carousel/demo.vue')
}, {
  path: 'm-white-space',
  name: 'm-white-space',
  component: () => import('@/generated/white-space/demo.vue')
}];
