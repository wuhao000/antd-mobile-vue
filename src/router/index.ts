import Vue from 'vue';
import Router, {RouteConfig} from 'vue-router';
import site from './site';

Vue.use(Router);

export const routes = [
  site,
  {
    path: '/',
    redirect: '/install'
  },
  {
    path: '/demo/mobile',
    name: '演示',
    props: true,
    component: () => import('@/components/demo.vue'),
    children: [{
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
    }]
  }
] as RouteConfig[];

export default new Router({
  base: process.env.BASE_URL,
  routes,
  mode: 'history'
});
