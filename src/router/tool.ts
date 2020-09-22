import {RouteRecordRaw} from 'vue-router';

export default [{
  path: 'api-proxy',
  name: 'ApiProxy 接口代理工具',
  meta: {
    tag: '其他'
  },
  component: () => import('@/generated/api-proxy/index.vue')
}] as RouteRecordRaw[];
