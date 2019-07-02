export default [{
  path: 'home',
  name: '演示',
  props: true,
  component: () => import('@/components/demo/mobile/index.vue')
}, {
  path: 'm-steps',
  name: 'm-steps',
  component: () => import('@/components/demo/mobile/steps.vue')
}, {
  path: 'm-tabs',
  name: 'm-tabs',
  component: () => import('@/components/demo/mobile/tabs.vue')
}, {
  path: 'm-calendar',
  name: 'm-calendar',
  component: () => import('@/components/demo/mobile/calendar.vue')
}, {
  path: 'm-pull-request',
  name: 'm-pull-request',
  component: () => import('@/components/demo/mobile/pull-request.vue')
}, {
  path: 'm-radio',
  name: 'm-radio',
  component: () => import('@/components/demo/mobile/radio.vue')
}, {
  path: 'm-checkbox',
  name: 'm-checkbox',
  component: () => import('@/components/demo/mobile/checkbox.vue')
}, {
  path: 'm-drawer',
  name: 'm-drawer',
  component: () => import('@/components/demo/mobile/drawer.vue')
}];
