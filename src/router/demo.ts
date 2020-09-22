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
}];
