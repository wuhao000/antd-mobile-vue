import { createRouter, createWebHistory } from 'vue-router';
import demo from './demo';
import site from './site';
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
];
export default createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});
//# sourceMappingURL=index.js.map