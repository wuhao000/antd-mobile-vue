import directive from '@/router/directive';
import components from '@/router/component';
import tool from '@/router/tool';
import Home from '@/views/home.vue';
import Site from '../views/site.vue';

export default {
  path: '/',
  name: 'site',
  component: Site,
  children: [
    {
      path: 'install',
      name: '安装',
      component: Home
    },
    {
      path: 'develop',
      name: '开发',
      component: () => import('@/views/develop.vue')
    },
    {
      path: 'change-log',
      name: '更新日志',
      component: () => import('@/views/change-log.vue')
    },
    {
      path: '/mobile-components',
      name: '组件',
      component: () => import('@/components/components.vue'),
      children: components
    },
    // {
    //   path: '/tools',
    //   name: '工具',
    //   component: () => import('@/components/components.vue'),
    //   children: tool
    // },
    // {
    //   path: '/directives',
    //   name: '指令',
    //   component: () => import('@/components/components.vue'),
    //   children: directive
    // }
  ]
};
