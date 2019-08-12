import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { IS_IOS } from '../../utils/exenv';
import TouchFeedback from '../../vmc-feedback';
let KeyboardItem = class KeyboardItem extends Vue {
    get tdRef() {
        return this.$refs['td'];
    }
    render() {
        const _a = this, { prefixCls, disabled, label, iconOnly } = _a, restProps = tslib_1.__rest(_a, ["prefixCls", "disabled", "label", "iconOnly"]);
        let value = this.$slots.default;
        const type = this.type;
        if (type === 'keyboard-delete') {
            value = 'delete';
        }
        else if (type === 'keyboard-hide') {
            value = 'hide';
        }
        else if (type === 'keyboard-confirm') {
            value = 'confirm';
        }
        const wrapCls = classnames(`${prefixCls}-item`);
        const TouchFeedback2 = TouchFeedback;
        return (<TouchFeedback2 class={type} props={{
            activeClassName: `${prefixCls}-item-active`
        }}>
          <td ref={'td'} 
        // tslint:disable-next-line:jsx-no-multiline-js
        onclick={e => {
            this.$emit('click', e, this.value);
        }} class={wrapCls} {...restProps}>
            {this.$slots.default}
            {iconOnly && <i class={'sr-only'}>{label}</i>}
          </td>
        </TouchFeedback2>);
    }
};
tslib_1.__decorate([
    Prop({ type: [String, Number] })
], KeyboardItem.prototype, "value", void 0);
tslib_1.__decorate([
    Prop(String)
], KeyboardItem.prototype, "label", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], KeyboardItem.prototype, "type", void 0);
tslib_1.__decorate([
    Prop({ default: 'am-number-keyboard' })
], KeyboardItem.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop()
], KeyboardItem.prototype, "iconOnly", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], KeyboardItem.prototype, "disabled", void 0);
KeyboardItem = tslib_1.__decorate([
    Component({
        name: 'KeyboardItem'
    })
], KeyboardItem);
export { KeyboardItem };
let CustomKeyboard = class CustomKeyboard extends Vue {
    get antmKeyboard() {
        return this.$refs.antmKeyboard;
    }
    onKeyboardClick(e, value = '') {
        e.stopImmediatePropagation();
        if (value === 'confirm' && this.confirmDisabled) {
            return null;
        }
        else {
            if (this.linkedInput) {
                this.linkedInput.onKeyboardClick(value);
            }
        }
    }
    renderKeyboardItem(item, index) {
        const KeyboardItem2 = KeyboardItem;
        return (<KeyboardItem2 props={{ value: item }} onClick={this.onKeyboardClick} key={`item-${item}-${index}`}>
          {item}
        </KeyboardItem2>);
    }
    render() {
        const { prefixCls, confirmLabel, backspaceLabel, cancelKeyboardLabel, wrapProps, header } = this;
        const wrapperCls = classnames(`${prefixCls}-wrapper`, `${prefixCls}-wrapper-hide`);
        const KeyboardItem2 = KeyboardItem;
        return (<div class={wrapperCls} ref={'antmKeyboard'} {...wrapProps}>
          {header}
          <table>
            <tbody>
              <tr>
                {['1', '2', '3'].map((item, index) => 
        // tslint:disable-next-line:jsx-no-multiline-js
        this.renderKeyboardItem(item, index))}
                <KeyboardItem2 props={Object.assign({}, this.getAriaAttr(backspaceLabel), { type: 'keyboard-delete', rowSpan: 2 })} on={{
            click: e => this.onKeyboardClick(e, 'delete')
        }}/>
              </tr>
              <tr>
                {['4', '5', '6'].map((item, index) => 
        // tslint:disable-next-line:jsx-no-multiline-js
        this.renderKeyboardItem(item, index))}
              </tr>
              <tr>
                {['7', '8', '9'].map((item, index) => 
        // tslint:disable-next-line:jsx-no-multiline-js
        this.renderKeyboardItem(item, index))}
                <KeyboardItem2 props={{
            type: 'keyboard-confirm',
            rowSpan: 2
        }} on={{
            click: e => this.onKeyboardClick(e, 'confirm')
        }} tdRef={'td'}>
                  {confirmLabel}
                </KeyboardItem2>
              </tr>
              <tr>
                {['.', '0'].map((item, index) => 
        // tslint:disable-next-line:jsx-no-multiline-js
        this.renderKeyboardItem(item, index))}
                <KeyboardItem2 props={Object.assign({}, this.getAriaAttr(cancelKeyboardLabel), { type: 'keyboard-hide' })} on={{
            click: e => this.onKeyboardClick(e, 'hide')
        }}/>
              </tr>
            </tbody>
          </table>
        </div>);
    }
    getAriaAttr(label) {
        if (IS_IOS) {
            return { label, iconOnly: true };
        }
        else {
            return { role: 'button', 'aria-label': label };
        }
    }
};
tslib_1.__decorate([
    Prop()
], CustomKeyboard.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop()
], CustomKeyboard.prototype, "confirmLabel", void 0);
tslib_1.__decorate([
    Prop()
], CustomKeyboard.prototype, "backspaceLabel", void 0);
tslib_1.__decorate([
    Prop()
], CustomKeyboard.prototype, "cancelKeyboardLabel", void 0);
tslib_1.__decorate([
    Prop()
], CustomKeyboard.prototype, "wrapProps", void 0);
tslib_1.__decorate([
    Prop()
], CustomKeyboard.prototype, "header", void 0);
CustomKeyboard = tslib_1.__decorate([
    Component({
        name: 'CustomKeyboard'
    })
], CustomKeyboard);
export default CustomKeyboard;
//# sourceMappingURL=custom-keyboard.jsx.map