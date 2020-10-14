export default [{
        path: 'loading-directive',
        name: 'LoadingDirective 加载中',
        meta: {
            tag: '其他'
        },
        component: () => import('@/generated/loading-directive/index.vue')
    }, {
        path: 'time-directive',
        name: 'TimeDirective 时间展示',
        meta: {
            tag: '其他'
        },
        component: () => import('@/generated/time-directive/index.vue')
    }];
//# sourceMappingURL=directive.js.map