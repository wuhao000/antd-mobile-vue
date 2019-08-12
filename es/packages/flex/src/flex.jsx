import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let Flex = class Flex extends Vue {
    render() {
        const _a = this, { direction, wrap, justify, align, alignContent, prefixCls } = _a, restProps = tslib_1.__rest(_a, ["direction", "wrap", "justify", "align", "alignContent", "prefixCls"]);
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
        return (<div class={wrapCls} {...{ props: restProps }}>
          {this.$slots.default}
        </div>);
    }
};
tslib_1.__decorate([
    Prop(String)
], Flex.prototype, "alignContent", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-flexbox' })
], Flex.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop(String)
], Flex.prototype, "role", void 0);
tslib_1.__decorate([
    Prop(String)
], Flex.prototype, "direction", void 0);
tslib_1.__decorate([
    Prop(String)
], Flex.prototype, "wrap", void 0);
tslib_1.__decorate([
    Prop(String)
], Flex.prototype, "justify", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'center' })
], Flex.prototype, "align", void 0);
tslib_1.__decorate([
    Prop(Boolean)
], Flex.prototype, "disabled", void 0);
Flex = tslib_1.__decorate([
    Component({
        name: 'Flex'
    })
], Flex);
export default Flex;
//# sourceMappingURL=flex.jsx.map