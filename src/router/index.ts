import demo from './demo';
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
    children: demo
  }
] as RouteConfig[];

export default new Router({
  base: process.env.BASE_URL,
  routes,
  mode: 'history'
});
