import { __decorate } from "tslib";
import { Options, Vue } from 'vue-class-component';
import classnames from 'classnames';
let Badge = class Badge extends Vue {
    render() {
        var _a, _b, _c, _d;
        let { overflowCount, text } = this;
        const { prefixCls, size, dot, corner, hot } = this;
        overflowCount = overflowCount;
        text =
            typeof text === 'number' && text > overflowCount
                ? `${overflowCount}+`
                : text;
        // dot mode don't need text
        if (dot) {
            text = '';
        }
        const scrollNumberCls = classnames({
            [`${prefixCls}-dot`]: dot,
            [`${prefixCls}-dot-large`]: dot && size === 'large',
            [`${prefixCls}-text`]: !dot && !corner,
            [`${prefixCls}-corner`]: corner,
            [`${prefixCls}-corner-large`]: corner && size === 'large'
        });
        const badgeCls = classnames(prefixCls, {
            [`${prefixCls}-not-a-wrapper`]: !((_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)),
            [`${prefixCls}-corner-wrapper`]: corner,
            [`${prefixCls}-hot`]: hot,
            [`${prefixCls}-corner-wrapper-large`]: corner && size === 'large'
        });
        return (<span class={badgeCls}>
          {(_d = (_c = this.$slots).default) === null || _d === void 0 ? void 0 : _d.call(_c)}
        {(text || dot) && (
        // tslint:disable-next-line:jsx-no-multiline-js
        <sup class={scrollNumberCls} style={this.textStyle}>
            {text}
          </sup>)}
        </span>);
    }
};
Badge = __decorate([
    Options({
        name: 'Badge',
        props: {
            prefixCls: { default: 'am-badge' },
            hot: { type: Boolean, default: false },
            size: { type: String, default: 'small' },
            overflowCount: { type: Number, default: 99 },
            corner: { type: Boolean, default: false },
            dot: { type: Boolean, default: false },
            text: { type: [String, Number] },
            textStyle: { type: Object }
        }
    })
], Badge);
export default Badge;
//# sourceMappingURL=index.jsx.map