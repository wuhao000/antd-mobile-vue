export default [{
  path: 'home',
  name: '演示',
  props: true,
  component: () => import('@/components/demo/index.vue')
}, {
  path: 'm-accordion',
  name: 'm-accordion',
  component: () => import('@/components/demo/accordion/index.vue')
}, {
  path: 'm-carousel',
  name: 'm-carousel',
  component: () => import('@/components/demo/carousel/index.vue')
}, {
  path: 'm-card',
  name: 'm-card',
  component: () => import('@/components/demo/card/index.vue')
}, {
  path: 'm-badge',
  name: 'm-badge',
  component: () => import('@/components/demo/badge/index.vue')
}, {
  path: 'm-steps',
  name: 'm-steps',
  component: () => import('@/components/demo/steps.vue')
}, {
  path: 'm-tabs',
  name: 'm-tabs',
  component: () => import('@/components/demo/tabs.vue')
}, {
  path: 'm-calendar',
  name: 'm-calendar',
  component: () => import('@/components/demo/calendar.vue')
}, {
  path: 'm-pull-request',
  name: 'm-pull-request',
  component: () => import('@/components/demo/pull-request.vue')
}, {
  path: 'm-radio',
  name: 'm-radio',
  component: () => import('@/components/demo/radio.vue')
}, {
  path: 'm-checkbox',
  name: 'm-checkbox',
  component: () => import('@/components/demo/checkbox.vue')
}, {
  path: 'm-drawer',
  name: 'm-drawer',
  component: () => import('@/components/demo/drawer.vue')
}, {
  path: 'calendar-view',
  name: 'calendar-view',
  component: () => import('@/components/demo/calendar-view.vue')
}];
