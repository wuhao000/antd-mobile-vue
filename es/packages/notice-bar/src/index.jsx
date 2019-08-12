import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Icon from '../../icon';
import Marquee from './marquee';
let NoticeBar = class NoticeBar extends Vue {
    constructor() {
        super(...arguments);
        this.show = true;
    }
    onClick() {
        const { mode } = this;
        this.$emit('click');
        if (mode === 'closable') {
            this.show = false;
        }
    }
    render() {
        const _a = this, { mode, prefixCls, action, marqueeProps } = _a, restProps = tslib_1.__rest(_a, ["mode", "prefixCls", "action", "marqueeProps"]);
        const icon = this.icon || <Icon type="voice" size="xxs"/>;
        const extraProps = {};
        let operationDom = null;
        if (mode === 'closable') {
            operationDom = (<div class={`${prefixCls}-operation`} onClick={this.onClick} role="button" aria-label="close">
            {action ? action : <Icon type="cross" size="md"/>}
          </div>);
        }
        else {
            if (mode === 'link') {
                operationDom = (<div class={`${prefixCls}-operation`} role="button" aria-label="go to detail">
              {action ? action : <Icon type="right" size="md"/>}
            </div>);
            }
            extraProps.onClick = this.onClick;
        }
        const wrapCls = classnames(prefixCls);
        return this.show ? (<div class={wrapCls} onClick={(e) => {
            if (extraProps.onClick) {
                extraProps.onClick(e);
            }
        }} role="alert">
          {icon && (
        // tslint:disable-next-line:jsx-no-multiline-js
        <div class={`${prefixCls}-icon`} aria-hidden="true">
                {icon}
              </div>)}
          <div class={`${prefixCls}-content`}>
            <Marquee prefixCls={prefixCls} text={this.$slots.default ? this.$slots.default[0] : null} props={marqueeProps}/>
          </div>
          {operationDom}
        </div>) : null;
    }
};
tslib_1.__decorate([
    Prop({})
], NoticeBar.prototype, "marqueeProps", void 0);
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'am-notice-bar'
    })
], NoticeBar.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ default: '' })
], NoticeBar.prototype, "mode", void 0);
tslib_1.__decorate([
    Prop()
], NoticeBar.prototype, "icon", void 0);
tslib_1.__decorate([
    Prop({})
], NoticeBar.prototype, "action", void 0);
NoticeBar = tslib_1.__decorate([
    Component({
        name: 'NoticeBar'
    })
], NoticeBar);
export default NoticeBar;
//# sourceMappingURL=index.jsx.map