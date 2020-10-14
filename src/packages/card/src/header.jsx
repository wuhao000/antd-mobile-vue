import { isEmptySlot } from '../../utils/vnode';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'MCardHeader',
    props: {
        prefixCls: { default: 'am-card' },
        thumbStyle: {
            default: () => {
                return {};
            }
        },
        thumb: { type: String },
        extra: { type: String },
        title: { type: String }
    },
    render() {
        var _a, _b, _c, _d, _e, _f;
        const { prefixCls, thumb, thumbStyle, extra, title } = this;
        const wrapCls = `${prefixCls}-header`;
        return (<div class={wrapCls}>
        <div class={`${prefixCls}-header-content`}>
          {(_c = (_b = (_a = this.$slots).thumb) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : (this.thumb ? <img style={thumbStyle} src={thumb}/> : null)}
          {!isEmptySlot(this.$slots.default) ? this.$slots.default() : title}
        </div>
        {(this.$slots.extra || extra) ? (
        // tslint:disable-next-line:jsx-no-multiline-js
        <div class={`${prefixCls}-header-extra`}>{(_f = (_e = (_d = this.$slots).extra) === null || _e === void 0 ? void 0 : _e.call(_d)) !== null && _f !== void 0 ? _f : extra}</div>) : null}
      </div>);
    }
});
//# sourceMappingURL=header.jsx.map