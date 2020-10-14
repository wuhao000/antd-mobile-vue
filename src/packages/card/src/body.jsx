import classnames from 'classnames';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'MCardBody',
    props: {
        prefixCls: { default: 'am-card' }
    },
    render() {
        var _a, _b;
        const { prefixCls } = this;
        const wrapCls = classnames(`${prefixCls}-body`);
        return <div class={wrapCls}>{(_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)}</div>;
    }
});
//# sourceMappingURL=body.jsx.map