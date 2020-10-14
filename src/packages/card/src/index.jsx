import classnames from 'classnames';
import { defineComponent } from 'vue';
import Body from './body';
import Header from './header';
import Footer from './footer';
export default defineComponent({
    name: 'MCard',
    Body,
    Header,
    Footer,
    props: {
        prefixCls: { default: 'am-card' },
        full: { type: Boolean, default: false }
    },
    render() {
        var _a, _b;
        const { prefixCls, full } = this;
        const wrapCls = classnames(prefixCls, {
            [`${prefixCls}-full`]: full
        });
        return <div class={wrapCls}>{(_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)}</div>;
    }
});
//# sourceMappingURL=index.jsx.map