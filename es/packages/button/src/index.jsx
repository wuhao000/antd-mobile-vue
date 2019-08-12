import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import IconRes from '../../../mixins/icon-res';
import TouchFeedback from '../../vmc-feedback';
const httpReg = /^http(s)?:\/\//;
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str) {
    return typeof str === 'string';
}
let Button = class Button extends Vue {
    insertSpace(child) {
        if (isString(child.text) && isTwoCNChar(child.text)) {
            return <span>{child.text.split('').join(' ')}</span>;
        }
        return child;
    }
    render() {
        const { prefixCls, type, size, inline, disabled, icon, loading, activeStyle, activeClassName } = this;
        const iconType = loading ? 'loading' : icon;
        const wrapCls = classnames(prefixCls, {
            [`${prefixCls}-primary`]: type === 'primary',
            [`${prefixCls}-ghost`]: type === 'ghost',
            [`${prefixCls}-warning`]: type === 'warning',
            [`${prefixCls}-small`]: size === 'small',
            [`${prefixCls}-inline`]: inline,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-loading`]: loading,
            [`${prefixCls}-icon`]: !!iconType
        });
        const kids = this.$slots.default ? this.$slots.default.map(this.insertSpace) : '';
        let iconEl;
        if (typeof iconType === 'string') {
            iconEl = (<IconRes class={`${prefixCls}-icon`} 
            // @ts-ignore
            props={{
                type: httpReg.test(iconType) ? iconType : {
                    mobile: true,
                    iconType: 'icon',
                    type: iconType,
                    size: size === 'small' ? 'xxs' : 'md'
                }
            }}/>);
        }
        else if (iconType) {
            const cls = classnames('am-icon', `${prefixCls}-icon`, size === 'small' ? 'am-icon-xxs' : 'am-icon-md');
            iconEl = (
            // @ts-ignore
            <IconRes class={cls} props={{ type: iconType }}/>);
        }
        // use div, button native is buggy @yiminghe
        return (
        // @ts-ignore
        <TouchFeedback 
        // tslint:disable-next-line:jsx-no-multiline-js
        activeClassName={activeClassName || (activeStyle ? `${prefixCls}-active` : undefined)} disabled={disabled} activeStyle={activeStyle}>
        <a role={'button'} class={wrapCls} onClick={(e) => {
            if (!this.disabled) {
                this.$emit('click', e);
            }
        }} aria-disabled={disabled}>
          {iconEl}
          {kids}
        </a>
      </TouchFeedback>);
    }
};
tslib_1.__decorate([
    Prop({ type: String, default: 'am-button' })
], Button.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Button.prototype, "role", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Button.prototype, "inline", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Object] })
], Button.prototype, "icon", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Button.prototype, "activeClassName", void 0);
tslib_1.__decorate([
    Prop({
        type: [Boolean, Object],
        default: () => {
            return {};
        }
    })
], Button.prototype, "activeStyle", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Button.prototype, "type", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'large' })
], Button.prototype, "size", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Button.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Button.prototype, "loading", void 0);
Button = tslib_1.__decorate([
    Component({
        name: 'Button'
    })
], Button);
export default Button;
//# sourceMappingURL=index.jsx.map