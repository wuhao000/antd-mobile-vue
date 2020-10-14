import { __rest } from "tslib";
import { filterHTMLAttrs } from '../../utils/dom';
import classnames from 'classnames';
import { defineComponent } from 'vue';
export default defineComponent({
    inheritAttrs: false,
    name: 'FlexItem',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        prefixCls: {
            type: String,
            default: 'am-flexbox'
        }
    },
    render() {
        var _a, _b;
        const _c = this, { prefixCls } = _c, restProps = __rest(_c, ["prefixCls"]);
        const wrapCls = classnames(`${prefixCls}-item`);
        const props = filterHTMLAttrs(Object.assign(Object.assign({}, restProps), this.$attrs));
        return (<div class={wrapCls} {...props}>
        {(_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)}
      </div>);
    }
});
//# sourceMappingURL=flex-item.jsx.map