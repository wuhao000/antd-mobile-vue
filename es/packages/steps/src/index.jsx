import * as tslib_1 from "tslib";
import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide } from 'vue-property-decorator';
let Steps = class Steps extends Vue {
    constructor() {
        super(...arguments);
        this.steps = this;
    }
    render() {
        const _a = this, { prefixCls, direction, labelPlacement, iconPrefix, status, size, current, progressDot } = _a, restProps = tslib_1.__rest(_a, ["prefixCls", "direction", "labelPlacement", "iconPrefix", "status", "size", "current", "progressDot"]);
        const adjustedlabelPlacement = !!progressDot ? 'vertical' : labelPlacement;
        const classString = classNames(prefixCls, `${prefixCls}-${direction}`, {
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-label-${adjustedlabelPlacement}`]: direction === 'horizontal',
            [`${prefixCls}-dot`]: !!progressDot
        });
        return (<div class={classString} {...restProps}>
          {this.$slots.default.map((child, index) => {
            if (!child) {
                return null;
            }
            const childProps = {
                stepNumber: index + 1,
                prefixCls,
                iconPrefix,
                icon: child.componentOptions.propsData['icon'] || '',
                wrapperStyle: {},
                progressDot,
                status: child.componentOptions.propsData['status'] || '',
                class: ''
            };
            let icon = this.icon;
            if (!icon) {
                if (index < current) {
                    // 对应 state: finish
                    icon = 'check-circle-o';
                }
                else if (index > current) {
                    // 对应 state: wait
                    icon = 'ellipsis';
                    childProps.class = 'ellipsis-item';
                }
                if ((status === 'error' && index === current)
                    || child.componentOptions.propsData['status'] === 'error') {
                    icon = 'cross-circle-o';
                }
            }
            if (icon) {
                childProps.icon = icon;
            }
            // fix tail color
            if (status === 'error' && index === current - 1) {
                childProps.class = `${prefixCls}-next-error`;
            }
            if (!child.componentOptions.propsData['status']) {
                if (index === current) {
                    childProps.status = status;
                }
                else if (index < current) {
                    childProps.status = 'finish';
                }
                else {
                    childProps.status = 'wait';
                }
            }
            Object.keys(childProps).forEach(key => {
                child.componentOptions.propsData[key] = childProps[key];
            });
            return child;
        })}
        </div>);
    }
};
tslib_1.__decorate([
    Prop(String)
], Steps.prototype, "icon", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-steps' })
], Steps.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'ant' })
], Steps.prototype, "iconPrefix", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'vertical' })
], Steps.prototype, "direction", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'vertical' })
], Steps.prototype, "labelPlacement", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'process' })
], Steps.prototype, "status", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '' })
], Steps.prototype, "size", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Steps.prototype, "progressDot", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 0 })
], Steps.prototype, "current", void 0);
tslib_1.__decorate([
    Provide('steps')
], Steps.prototype, "steps", void 0);
Steps = tslib_1.__decorate([
    Component({
        name: 'Step'
    })
], Steps);
export default Steps;
//# sourceMappingURL=index.jsx.map