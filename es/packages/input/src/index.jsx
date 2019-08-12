import * as tslib_1 from "tslib";
/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { FormComponent } from '../../../mixins/form-component';
import TouchFeedback from '../../vmc-feedback';
import CustomInput from './custom-input';
import Input from './input';
function noop() {
}
function normalizeValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value + '';
}
let InputItem = class InputItem extends FormComponent {
    constructor() {
        super(...arguments);
        this.state = {
            placeholder: this.placeholder || ''
        };
    }
    renderLabel() {
        const prefixCls = this.prefixCls;
        const labelNumber = this.labelNumber;
        const labelCls = classnames(`${prefixCls}-label`, {
            [`${prefixCls}-label-2`]: labelNumber === 2,
            [`${prefixCls}-label-3`]: labelNumber === 3,
            [`${prefixCls}-label-4`]: labelNumber === 4,
            [`${prefixCls}-label-5`]: labelNumber === 5,
            [`${prefixCls}-label-6`]: labelNumber === 6,
            [`${prefixCls}-label-7`]: labelNumber === 7
        });
        if (this.$slots.default) {
            return <div class={labelCls}>{this.$slots.default}</div>;
        }
        else if (this.title) {
            return <div class={labelCls}>{this.title}</div>;
        }
        return null;
    }
    placeholderChanged(placeholder) {
        this.state.placeholder = placeholder;
    }
    get inputRef() {
        return this.$refs['input'];
    }
    created() {
        this.currentValue = normalizeValue(((this.value || '') + ''));
    }
    beforeDestroy() {
        if (this.debounceTimeout) {
            window.clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
    }
    onInputChange(e) {
        const el = e.target;
        const { value: rawVal, selectionEnd: prePos } = el;
        const { currentValue: preCtrlVal = '' } = this;
        const { type } = this;
        let ctrlValue = rawVal;
        switch (type) {
            case 'bankCard':
                ctrlValue = rawVal.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
                break;
            case 'phone':
                ctrlValue = rawVal.replace(/\D/g, '').substring(0, 11);
                const valueLen = ctrlValue.length;
                if (valueLen > 3 && valueLen < 8) {
                    ctrlValue = `${ctrlValue.substr(0, 3)} ${ctrlValue.substr(3)}`;
                }
                else if (valueLen >= 8) {
                    ctrlValue = `${ctrlValue.substr(0, 3)} ${ctrlValue.substr(3, 4)} ${ctrlValue.substr(7)}`;
                }
                break;
            case 'number':
                ctrlValue = rawVal.replace(/\D/g, '');
                break;
            case 'digit':
                ctrlValue = rawVal.replace(/[^0-9.]/g, '');
                break;
            case 'text':
            case 'password':
            default:
                break;
        }
        if (this.maxLength && ctrlValue.length > this.maxLength) {
            ctrlValue = ctrlValue.substring(0, this.maxLength);
        }
        this.handleOnChange(ctrlValue, ctrlValue !== rawVal, () => {
            switch (type) {
                case 'bankCard':
                case 'phone':
                case 'number':
                    // controlled input type needs to adjust the position of the caret
                    try {
                        // set selection may throw error (https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange)
                        el.selectionStart = el.selectionEnd = this.calcPos(prePos || 0, preCtrlVal, rawVal, ctrlValue, [' '], /\D/g);
                    }
                    catch (error) {
                        console.warn('Set selection error:', error);
                    }
                    break;
                default:
                    break;
            }
        });
        this.onFieldChange();
    }
    handleOnChange(value, isMutated = false, adjustPos = noop) {
        this.currentValue = value;
        this.$emit('input', value);
        this.$emit('change', value);
        adjustPos();
        if (this.inputRef.$forceUpdate) {
            this.inputRef.$forceUpdate();
        }
    }
    onInputFocus(value) {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
        this.$el.focus();
        this.$emit('focus', value);
    }
    onInputBlur(value) {
        if (this.inputRef) {
            // this.inputRef may be null if customKeyboard unmount
            this.debounceTimeout = window.setTimeout(() => {
                if (document.activeElement !== (this.inputRef && this.inputRef.inputRef)) {
                    this.$el.blur();
                }
            }, 200);
        }
        // fix autoFocus item blur with flash
        setTimeout(() => {
            // fix ios12 wechat browser click failure after input
            if (document.body) {
                document.body.scrollTop = document.body.scrollTop;
            }
        }, 100);
        this.onFieldBlur();
        this.$emit('blur', value);
    }
    clearInput() {
        this.currentValue = '';
        this.focus();
    }
    focus() {
        if (this.inputRef) {
            this.inputRef.focus();
        }
    }
    calcPos(prePos, preCtrlVal, rawVal, ctrlVal, placeholderChars, maskReg) {
        const editLength = rawVal.length - preCtrlVal.length;
        const isAddition = editLength > 0;
        let pos = prePos;
        if (isAddition) {
            const additionStr = rawVal.substr(pos - editLength, editLength);
            let ctrlCharCount = additionStr.replace(maskReg, '').length;
            pos -= (editLength - ctrlCharCount);
            let placeholderCharCount = 0;
            while (ctrlCharCount > 0) {
                if (placeholderChars.indexOf(ctrlVal.charAt(pos - ctrlCharCount + placeholderCharCount)) === -1) {
                    ctrlCharCount--;
                }
                else {
                    placeholderCharCount++;
                }
            }
            pos += placeholderCharCount;
        }
        return pos;
    }
    render() {
        const { prefixCls, prefixListCls, isReadonly, isDisabled, clearable, extra, type, moneyKeyboardAlign, moneyKeyboardWrapProps, moneyKeyboardHeader, name, maxLength } = this;
        const { confirmLabel, backspaceLabel, cancelKeyboardLabel } = {
            confirmLabel: '确定',
            backspaceLabel: '退格',
            cancelKeyboardLabel: '收起键盘'
        };
        const { focus, state: { placeholder } } = this;
        const wrapCls = classnames(`${prefixListCls}-item`, `${prefixCls}-item`, `${prefixListCls}-item-middle`, {
            [`${prefixCls}-disabled`]: isDisabled,
            [`${prefixCls}-error`]: this.isCurrentError,
            [`${prefixCls}-focus`]: focus,
            [`${prefixCls}-android`]: focus
        });
        const controlCls = `${prefixCls}-control`;
        let inputType = 'text';
        if (type === 'bankCard' || type === 'phone') {
            inputType = 'tel';
        }
        else if (type === 'password') {
            inputType = 'password';
        }
        else if (type === 'digit') {
            inputType = 'number';
        }
        else if (type !== 'text' && type !== 'number') {
            inputType = type;
        }
        let patternProps;
        if (type === 'number') {
            patternProps = {
                pattern: '[0-9]*'
            };
        }
        let classNameProp = '';
        if (type === 'digit') {
            classNameProp = 'h5numInput';
        }
        return (<div class={wrapCls}>
          <div class={`${prefixListCls}-line`}>
            {this.renderLabel()}
            <div class={controlCls}>
              {type === 'money' ? (
        // @ts-ignore
        <CustomInput attrs={{
            value: normalizeValue(this.currentValue),
            type,
            maxLength,
            placeholder,
            disabled: isDisabled,
            editable: !isReadonly,
            prefixCls,
            confirmLabel,
            backspaceLabel,
            cancelKeyboardLabel,
            moneyKeyboardAlign,
            moneyKeyboardWrapProps,
            moneyKeyboardHeader
        }} onChange={this.onInputChange} onFocus={this.onInputFocus} onBlur={this.onInputBlur} onVirtualKeyboardConfirm={() => {
            this.$emit('virtual-keyboard-confirm');
        }} ref={'input'}/>) : (
        // @ts-ignore
        <Input props={Object.assign({}, patternProps, { value: normalizeValue(this.currentValue), defaultValue: undefined, textAlign: this.textAlign, type: inputType, maxLength,
            name,
            placeholder, readonly: isReadonly, disabled: isDisabled })} class={classNameProp} ref={'input'} on={{
            change: this.onInputChange,
            focus: this.onInputFocus,
            blur: this.onInputBlur
        }}/>)}
            </div>
            {clearable &&
            !isReadonly &&
            !isDisabled &&
            (this.currentValue && `${this.currentValue}`.length > 0) ? (
        // @ts-ignore
        <TouchFeedback activeClassName={`${prefixCls}-clear-active`}>
                  <div class={`${prefixCls}-clear`} onClick={this.clearInput}/>
                </TouchFeedback>) : null}
            {this.errorIcon}
            {extra !== '' ? (<div class={`${prefixCls}-extra`} onClick={(e) => {
            this.$emit('extra-click', e);
        }}>
                  {extra}
                </div>) : null}
          </div>
        </div>);
    }
};
InputItem.contextTypes = {
    antLocale: PropTypes.object
};
tslib_1.__decorate([
    Prop({ type: String })
], InputItem.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-input' })
], InputItem.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-list' })
], InputItem.prototype, "prefixListCls", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'right' })
], InputItem.prototype, "moneyKeyboardAlign", void 0);
tslib_1.__decorate([
    Prop({
        type: Function,
        default: () => {
            return {};
        }
    })
], InputItem.prototype, "moneyKeyboardWrapProps", void 0);
tslib_1.__decorate([
    Prop({ default: null })
], InputItem.prototype, "moneyKeyboardHeader", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'text' })
], InputItem.prototype, "type", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], InputItem.prototype, "name", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '' })
], InputItem.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], InputItem.prototype, "clearable", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], InputItem.prototype, "maxLength", void 0);
tslib_1.__decorate([
    Prop({ default: '' })
], InputItem.prototype, "extra", void 0);
tslib_1.__decorate([
    Prop({ default: 5 })
], InputItem.prototype, "labelNumber", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], InputItem.prototype, "textAlign", void 0);
tslib_1.__decorate([
    Prop()
], InputItem.prototype, "locale", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], InputItem.prototype, "required", void 0);
tslib_1.__decorate([
    Watch('placeholder')
], InputItem.prototype, "placeholderChanged", null);
InputItem = tslib_1.__decorate([
    Component({
        name: 'InputItem'
    })
], InputItem);
export default InputItem;
//# sourceMappingURL=index.jsx.map