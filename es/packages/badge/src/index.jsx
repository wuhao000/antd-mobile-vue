import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let Badge = class Badge extends Vue {
    render() {
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
            [`${prefixCls}-not-a-wrapper`]: !this.$slots.default,
            [`${prefixCls}-corner-wrapper`]: corner,
            [`${prefixCls}-hot`]: hot,
            [`${prefixCls}-corner-wrapper-large`]: corner && size === 'large'
        });
        return (<span class={badgeCls}>
          {this.$slots.default}
        {(text || dot) && (
        // tslint:disable-next-line:jsx-no-multiline-js
        <sup class={scrollNumberCls} style={this.textStyle}>
            {text}
          </sup>)}
        </span>);
    }
};
tslib_1.__decorate([
    Prop({ default: 'am-badge' })
], Badge.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Badge.prototype, "hot", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'small' })
], Badge.prototype, "size", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 99 })
], Badge.prototype, "overflowCount", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Badge.prototype, "corner", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Badge.prototype, "dot", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Number] })
], Badge.prototype, "text", void 0);
tslib_1.__decorate([
    Prop({ type: Object })
], Badge.prototype, "textStyle", void 0);
Badge = tslib_1.__decorate([
    Component({
        name: 'Badge'
    })
], Badge);
export default Badge;
//# sourceMappingURL=index.jsx.map