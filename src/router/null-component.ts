import {RouteConfig} from 'vue-router';

export default [{
  path: 'slider',
  name: 'Slider 滑动输入条',
  component: () => import('@/generated/slider/index.vue')
}] as RouteConfig[];
