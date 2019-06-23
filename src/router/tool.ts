import {RouteConfig} from 'vue-router';

export default [{
  path: 'api-proxy',
  name: 'ApiProxy 接口代理工具',
  component: () => import('@/generated/api-proxy/index.vue')
}] as RouteConfig[];
