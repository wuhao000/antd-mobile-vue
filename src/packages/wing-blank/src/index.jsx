import classnames from 'classnames';
import { defineComponent } from 'vue';
const WingBlank = defineComponent({
    name: 'WingBlank',
    props: {
        prefixCls: {
            type: String,
            default: 'am-wingblank'
        },
        size: {
            default: 'lg'
        }
    },
    install: null,
    render() {
        const { prefixCls, size } = this;
        const wrapCls = classnames(prefixCls, `${prefixCls}-${size}`);
        return (<div class={wrapCls}>
        {this.$slots.default()}
      </div>);
    }
});
export default WingBlank;
//# sourceMappingURL=index.jsx.map