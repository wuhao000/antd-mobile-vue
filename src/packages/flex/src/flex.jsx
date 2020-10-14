import { __rest } from "tslib";
import { filterHTMLAttrs } from '../../utils/dom';
import classnames from 'classnames';
import { defineComponent } from 'vue';
export default defineComponent({
    inheritAttrs: false,
    Item: null,
    name: 'Flex',
    props: {
        alignContent: {
            type: String
        },
        prefixCls: {
            type: String,
            default: 'am-flexbox'
        },
        role: {
            type: String
        },
        direction: {
            type: String
        },
        wrap: {
            type: String
        },
        justify: {
            type: String
        },
        align: {
            type: String,
            default: 'center'
        },
        disabled: {
            type: Boolean
        }
    },
    render() {
        var _a, _b;
        const _c = this, { direction, wrap, justify, align, alignContent, prefixCls } = _c, restProps = __rest(_c, ["direction", "wrap", "justify", "align", "alignContent", "prefixCls"]);
        const wrapCls = classnames(prefixCls, {
            [`${prefixCls}-dir-row`]: direction === 'row',
            [`${prefixCls}-dir-row-reverse`]: direction === 'row-reverse',
            [`${prefixCls}-dir-column`]: direction === 'column',
            [`${prefixCls}-dir-column-reverse`]: direction === 'column-reverse',
            [`${prefixCls}-nowrap`]: wrap === 'nowrap',
            [`${prefixCls}-wrap`]: wrap === 'wrap',
            [`${prefixCls}-wrap-reverse`]: wrap === 'wrap-reverse',
            [`${prefixCls}-justify-start`]: justify === 'start',
            [`${prefixCls}-justify-end`]: justify === 'end',
            [`${prefixCls}-justify-center`]: justify === 'center',
            [`${prefixCls}-justify-between`]: justify === 'between',
            [`${prefixCls}-justify-around`]: justify === 'around',
            [`${prefixCls}-align-start`]: align === 'start',
            [`${prefixCls}-align-center`]: align === 'center',
            [`${prefixCls}-align-end`]: align === 'end',
            [`${prefixCls}-align-baseline`]: align === 'baseline',
            [`${prefixCls}-align-stretch`]: align === 'stretch',
            [`${prefixCls}-align-content-start`]: alignContent === 'start',
            [`${prefixCls}-align-content-end`]: alignContent === 'end',
            [`${prefixCls}-align-content-center`]: alignContent === 'center',
            [`${prefixCls}-align-content-between`]: alignContent === 'between',
            [`${prefixCls}-align-content-around`]: alignContent === 'around',
            [`${prefixCls}-align-content-stretch`]: alignContent === 'stretch'
        });
        const props = filterHTMLAttrs(Object.assign(Object.assign({}, restProps), this.$attrs));
        return (<div {...props} class={wrapCls}>
        {(_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)}
      </div>);
    }
});
//# sourceMappingURL=flex.jsx.map