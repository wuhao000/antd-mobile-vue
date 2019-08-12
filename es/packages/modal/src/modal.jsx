import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Model, Prop, Watch } from 'vue-property-decorator';
import Dialog from '../../../ant/vc-dialog';
import TouchFeedback from '../../vmc-feedback';
export class ModalComponent extends Vue {
}
let Modal = class Modal extends ModalComponent {
    constructor() {
        super(...arguments);
        this.state = {
            visible: this.visible
        };
    }
    visibleChanged(visible) {
        this.state.visible = visible;
    }
    renderFooterButton(button, prefixCls, i) {
        let buttonStyle = {};
        if (button.style) {
            buttonStyle = button.style;
            if (typeof buttonStyle === 'string') {
                const styleMap = {
                    cancel: {},
                    default: {},
                    destructive: { color: 'red' }
                };
                buttonStyle = styleMap[buttonStyle] || {};
            }
        }
        const onClickFn = (e) => {
            e.preventDefault();
            if (button.onPress) {
                button.onPress();
            }
        };
        return (
        // @ts-ignore
        <TouchFeedback activeClassName={`${prefixCls}-button-active`} key={i}>
        <a class={`${prefixCls}-button`} role={'button'} style={buttonStyle} onClick={onClickFn}>
          {button.text || `Button`}
        </a>
      </TouchFeedback>);
    }
    render() {
        const _a = this.$props, { prefixCls, wrapClassName, transitionName, maskTransitionName, platform, footer = [], operation, animated, transparent, popup, animationType } = _a, restProps = tslib_1.__rest(_a, ["prefixCls", "wrapClassName", "transitionName", "maskTransitionName", "platform", "footer", "operation", "animated", "transparent", "popup", "animationType"]);
        const btnGroupClass = classnames(`${prefixCls}-button-group-${footer.length === 2 && !operation ? 'h' : 'v'}`, `${prefixCls}-button-group-${operation ? 'operation' : 'normal'}`);
        const footerDom = footer.length ? (<div class={btnGroupClass} role={'group'}>
        {footer.map((button, i) => 
        // tslint:disable-next-line:jsx-no-multiline-js
        this.renderFooterButton(button, prefixCls, i))}
      </div>) : null;
        let transName;
        let maskTransName;
        if (animated) {
            // tslint:disable-next-line:prefer-conditional-expression
            if (transparent) {
                transName = maskTransName = 'am-fade';
            }
            else {
                transName = maskTransName = 'am-slide-up';
            }
            if (popup) {
                transName =
                    animationType === 'slide-up' ? 'am-slide-up' : 'am-slide-down';
                maskTransName = 'am-fade';
            }
        }
        const wrapCls = classnames(wrapClassName, {
            [`${prefixCls}-wrap-popup`]: popup
        });
        const cls = classnames(this.className, {
            [`${prefixCls}-transparent`]: transparent,
            [`${prefixCls}-popup`]: popup,
            [`${prefixCls}-operation`]: operation,
            [`${prefixCls}-popup-${animationType}`]: popup && animationType,
            [`${prefixCls}-android`]: platform === 'android'
        });
        return (
        // @ts-ignore
        <Dialog attrs={Object.assign({}, restProps)} maskClosable={this.maskClosable} visible={this.visible} prefixCls={prefixCls} title={this.title} closable={this.closable} class={cls} onClose={this.onClose || ((e) => {
            this.$emit('change', false);
            this.$emit('close', e);
        })} wrapClassName={wrapCls} transitionName={transitionName || transName} maskTransitionName={maskTransitionName || maskTransName} footer={footerDom}>{this.$slots.default}</Dialog>);
    }
};
tslib_1.__decorate([
    Prop({ default: 'am-modal' })
], Modal.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Modal.prototype, "transitionName", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Modal.prototype, "maskTransitionName", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Modal.prototype, "wrapClassName", void 0);
tslib_1.__decorate([
    Prop()
], Modal.prototype, "wrapProps", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'ios' })
], Modal.prototype, "platform", void 0);
tslib_1.__decorate([
    Prop()
], Modal.prototype, "bodyStyle", void 0);
tslib_1.__decorate([
    Prop()
], Modal.prototype, "title", void 0);
tslib_1.__decorate([
    Model('change', { type: Boolean, default: false })
], Modal.prototype, "visible", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], Modal.prototype, "maskClosable", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Modal.prototype, "closable", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return [];
        }
    })
], Modal.prototype, "footer", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Object] })
], Modal.prototype, "className", void 0);
tslib_1.__decorate([
    Prop()
], Modal.prototype, "onClose", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Modal.prototype, "transparent", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Modal.prototype, "popup", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], Modal.prototype, "animated", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'slide-down' })
], Modal.prototype, "animationType", void 0);
tslib_1.__decorate([
    Prop()
], Modal.prototype, "onAnimationEnd", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Modal.prototype, "animateAppear", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Modal.prototype, "operation", void 0);
tslib_1.__decorate([
    Watch('visible')
], Modal.prototype, "visibleChanged", null);
Modal = tslib_1.__decorate([
    Component({
        name: 'Modal'
    })
], Modal);
export default Modal;
//# sourceMappingURL=modal.jsx.map