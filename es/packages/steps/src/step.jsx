import * as tslib_1 from "tslib";
import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
const Icon = aegis.AeIcon;
function isString(str) {
    return typeof str === 'string';
}
const statusIcon = {
    finish: 'check-circle',
    error: 'cross-circle-o',
    wait: 'ellipsis'
};
let Step = class Step extends Vue {
    get iconSize() {
        if (this.steps.size === 'small') {
            return 18;
        }
        else {
            return 22;
        }
    }
    renderIconNode() {
        const { prefixCls, progressDot, stepNumber, status, title, description, icon, iconPrefix } = this;
        if (this.$slots.icon) {
            return <span class={`${prefixCls}-icon`}>{this.$slots.icon}</span>;
        }
        let iconNode;
        const iconClassName = classNames(`${prefixCls}-icon`, `${iconPrefix}icon`, {
            [`${iconPrefix}icon-${icon}`]: icon && isString(icon),
            [`${iconPrefix}icon-check`]: !icon && status === 'finish',
            [`${iconPrefix}icon-cross`]: !icon && status === 'error'
        });
        const iconStyle = {
            position: 'relative',
            left: '-1px'
        };
        const iconDot = <span class={`${prefixCls}-icon-dot`}/>;
        // `progressDot` enjoy the highest priority
        if (progressDot) {
            if (typeof progressDot === 'function') {
                iconNode = (<span class={`${prefixCls}-icon`}>
              {progressDot(iconDot, { index: stepNumber - 1, status, title, description })}
            </span>);
            }
            else {
                iconNode = <span class={`${prefixCls}-icon`}>{iconDot}</span>;
            }
        }
        else if (icon && isString(icon)) {
            iconNode = <span class={`${prefixCls}-icon`}>{<Icon style={iconStyle} size={this.iconSize} mobile={true} type={icon}/>}</span>;
        }
        else if (icon || status === 'finish' || status === 'error') {
            iconNode = <span class={iconClassName}/>;
        }
        else {
            iconNode = <span class={`${prefixCls}-icon`}>{stepNumber}</span>;
        }
        return iconNode;
    }
    render() {
        const _a = this, { prefixCls, itemWidth, status = 'wait', iconPrefix, icon, wrapperStyle, adjustMarginRight, stepNumber, description, title, progressDot } = _a, restProps = tslib_1.__rest(_a, ["prefixCls", "itemWidth", "status", "iconPrefix", "icon", "wrapperStyle", "adjustMarginRight", "stepNumber", "description", "title", "progressDot"]);
        const classString = classNames(`${prefixCls}-item`, `${prefixCls}-item-${status}`, { [`${prefixCls}-item-custom`]: icon });
        const stepItemStyle = {};
        if (itemWidth) {
            stepItemStyle.width = itemWidth;
        }
        if (adjustMarginRight) {
            stepItemStyle.marginRight = adjustMarginRight;
        }
        return (<div {...restProps} class={classString} style={stepItemStyle}>
        <div class={`${prefixCls}-item-tail`}/>
        <div class={`${prefixCls}-item-icon`}>
          {this.renderIconNode()}
        </div>
        <div class={`${prefixCls}-item-content`}>
          <div class={`${prefixCls}-item-title`}>
            {this.$slots.title ? this.$slots.title : title}
          </div>
          {(description || this.$slots.description) && <div class={`${prefixCls}-item-description`}>{this.$slots.description ? this.$slots.description : description}</div>}
        </div>
      </div>);
    }
};
tslib_1.__decorate([
    Prop({ type: String, default: 'am-step' })
], Step.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop()
], Step.prototype, "wrapperStyle", void 0);
tslib_1.__decorate([
    Prop([Number, String])
], Step.prototype, "itemWidth", void 0);
tslib_1.__decorate([
    Prop(String)
], Step.prototype, "status", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'ant' })
], Step.prototype, "iconPrefix", void 0);
tslib_1.__decorate([
    Prop(String)
], Step.prototype, "icon", void 0);
tslib_1.__decorate([
    Prop([Number, String])
], Step.prototype, "adjustMarginRight", void 0);
tslib_1.__decorate([
    Prop(Number)
], Step.prototype, "stepNumber", void 0);
tslib_1.__decorate([
    Prop(String)
], Step.prototype, "description", void 0);
tslib_1.__decorate([
    Prop(String)
], Step.prototype, "title", void 0);
tslib_1.__decorate([
    Prop()
], Step.prototype, "progressDot", void 0);
tslib_1.__decorate([
    Inject('steps')
], Step.prototype, "steps", void 0);
Step = tslib_1.__decorate([
    Component({
        name: 'Step'
    })
], Step);
export default Step;
//# sourceMappingURL=step.jsx.map