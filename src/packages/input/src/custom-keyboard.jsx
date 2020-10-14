import { __decorate, __rest } from "tslib";
import classnames from 'classnames';
import { Options, Vue } from 'vue-class-component';
import { IS_IOS } from '../../utils/exenv';
import TouchFeedback from '../../vmc-feedback';
let KeyboardItem = class KeyboardItem extends Vue {
    get tdRef() {
        return this.$refs['td'];
    }
    render() {
        var _a, _b, _c, _d;
        const _e = this, { prefixCls, disabled, label, iconOnly } = _e, restProps = __rest(_e, ["prefixCls", "disabled", "label", "iconOnly"]);
        let value = (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
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
        return (<TouchFeedback class={type} activeClassName={`${prefixCls}-item-active`}>
        <td ref="td" 
        // tslint:disable-next-line:jsx-no-multiline-js
        onClick={e => {
            this.$emit('click', e, this.value);
        }} class={wrapCls} {...restProps}>
          {(_d = (_c = this.$slots).default) === null || _d === void 0 ? void 0 : _d.call(_c)}
          {iconOnly && <i class="sr-only">{label}</i>}
        </td>
      </TouchFeedback>);
    }
};
KeyboardItem = __decorate([
    Options({
        name: 'KeyboardItem',
        props: {
            value: { type: [String, Number] },
            label: String,
            type: { type: String },
            prefixCls: { default: 'am-number-keyboard' },
            iconOnly: {},
            disabled: { type: Boolean, default: false }
        }
    })
], KeyboardItem);
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
        return (<KeyboardItem2 {...{ value: item }} onClick={this.onKeyboardClick} key={`item-${item}-${index}`}>
        {item}
      </KeyboardItem2>);
    }
    render() {
        const { prefixCls, confirmLabel, backspaceLabel, cancelKeyboardLabel, wrapProps, header } = this;
        const wrapperCls = classnames(`${prefixCls}-wrapper`, `${prefixCls}-wrapper-hide`);
        const KeyboardItem2 = KeyboardItem;
        return (<div class={wrapperCls} ref="antmKeyboard" {...wrapProps}>
        {header}
        <table>
          <tbody>
          <tr>
            {['1', '2', '3'].map((item, index) => 
        // tslint:disable-next-line:jsx-no-multiline-js
        this.renderKeyboardItem(item, index))}
            <KeyboardItem2 {...Object.assign(Object.assign({}, this.getAriaAttr(backspaceLabel)), { type: 'keyboard-delete', rowSpan: 2, onClick: e => this.onKeyboardClick(e, 'delete') })}/>
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
            <KeyboardItem2 {...{
            type: 'keyboard-confirm',
            rowSpan: 2,
            onClick: e => this.onKeyboardClick(e, 'confirm')
        }} tdRef="td">
              {confirmLabel}
            </KeyboardItem2>
          </tr>
          <tr>
            {['.', '0'].map((item, index) => 
        // tslint:disable-next-line:jsx-no-multiline-js
        this.renderKeyboardItem(item, index))}
            <KeyboardItem2 {...Object.assign(Object.assign({}, this.getAriaAttr(cancelKeyboardLabel)), { type: 'keyboard-hide', onClick: e => this.onKeyboardClick(e, 'hide') })}/>
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
CustomKeyboard = __decorate([
    Options({
        name: 'CustomKeyboard',
        props: {
            prefixCls: {},
            confirmLabel: {},
            backspaceLabel: {},
            cancelKeyboardLabel: {},
            wrapProps: {},
            header: {}
        }
    })
], CustomKeyboard);
export default CustomKeyboard;
//# sourceMappingURL=custom-keyboard.jsx.map