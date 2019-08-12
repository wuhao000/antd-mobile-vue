import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { addClass, removeClass } from '../../utils/class';
import CustomKeyboard from './custom-keyboard';
import Portal from './portal';
let instanceArr = [];
let customNumberKeyboard = null;
let NumberInput = class NumberInput extends Vue {
    constructor() {
        super(...arguments);
        this.focus = false;
    }
    created() {
        this.currentValue = this.value || '';
    }
    onChange(value) {
        if (!('value' in this)) {
            this.currentValue = value.target.value;
        }
        this.$emit('change', value);
    }
    onConfirm(value) {
        this.$emit('virtual-keyboard-confirm', value);
    }
    valueChanged(value) {
        this.currentValue = value;
    }
    addBlurListener() {
        document.addEventListener('click', this.doBlur, false);
    }
    removeBlurListener() {
        document.removeEventListener('click', this.doBlur, false);
    }
    beforeDestroy() {
        // focus:true unmount 不能触发 blur
        if (!this.focus) {
            this.$emit('blur', this.value);
        }
        this.unLinkInput();
    }
    saveRef(el) {
        customNumberKeyboard = el;
        instanceArr.push({ el, container: this.container });
    }
    getComponent() {
        const { confirmLabel, backspaceLabel, cancelKeyboardLabel, keyboardPrefixCls, moneyKeyboardWrapProps, moneyKeyboardHeader } = this;
        const CustomKeyboard2 = CustomKeyboard;
        return (<CustomKeyboard2 ref={'keyboard'} onClick={this.onKeyboardClick.bind(this)} prefixCls={keyboardPrefixCls} confirmLabel={confirmLabel} backspaceLabel={backspaceLabel} cancelKeyboardLabel={cancelKeyboardLabel} wrapProps={moneyKeyboardWrapProps} header={moneyKeyboardHeader}/>);
    }
    getContainer() {
        const { keyboardPrefixCls } = this;
        if (!this.container) {
            const container = document.createElement('div');
            container.setAttribute('id', `${keyboardPrefixCls}-container-${(new Date().getTime())}`);
            document.body.appendChild(container);
            this.container = container;
        }
        return this.container;
    }
    doBlur(ev) {
        if (ev.target !== this.inputRef) {
            this.onInputBlur(this.value);
        }
    }
    removeCurrentExtraKeyboard() {
        instanceArr = instanceArr.filter((item) => {
            const { el, container } = item;
            if (el && container && el !== customNumberKeyboard) {
                container.parentNode.removeChild(container);
            }
            return el === customNumberKeyboard;
        });
    }
    mounted() {
        this.saveRef(this.$refs.keyboard);
    }
    unLinkInput() {
        if (customNumberKeyboard &&
            customNumberKeyboard.antmKeyboard &&
            customNumberKeyboard.linkedInput &&
            customNumberKeyboard.linkedInput === this) {
            customNumberKeyboard.linkedInput = null;
            addClass(customNumberKeyboard.antmKeyboard, `${this.keyboardPrefixCls}-wrapper-hide`);
        }
        // for unmount
        this.removeBlurListener();
        this.removeCurrentExtraKeyboard();
    }
    onInputBlur(value) {
        if (this.focus) {
            this.focus = false;
            this.$emit('blur', value);
            setTimeout(() => {
                this.unLinkInput();
            }, 50);
        }
    }
    onInputFocus(e) {
        this.$emit('focus', this.value);
        this.focus = true;
        if (customNumberKeyboard) {
            customNumberKeyboard.linkedInput = this;
            if (customNumberKeyboard.antmKeyboard) {
                removeClass(customNumberKeyboard.antmKeyboard, `${this.keyboardPrefixCls}-wrapper-hide`);
            }
            customNumberKeyboard.confirmDisabled = this.value === '';
            if (customNumberKeyboard.confirmKeyboardItem) {
                if (this.value === '') {
                    addClass(customNumberKeyboard.confirmKeyboardItem, `${this.keyboardPrefixCls}-item-disabled`);
                }
                else {
                    removeClass(customNumberKeyboard.confirmKeyboardItem, `${this.keyboardPrefixCls}-item-disabled`);
                }
            }
        }
    }
    onKeyboardClick(KeyboardItemValue) {
        const { maxLength } = this;
        const { value } = this;
        // tslint:disable-next-line:no-this-assignment
        const { onChange } = this;
        let valueAfterChange;
        // 删除键
        if (KeyboardItemValue === 'delete') {
            valueAfterChange = value.substring(0, value.length - 1);
            onChange({ target: { value: valueAfterChange } });
            // 确认键
        }
        else if (KeyboardItemValue === 'confirm') {
            valueAfterChange = value;
            onChange({ target: { value: valueAfterChange } });
            this.onInputBlur(value);
            this.onConfirm(value);
            // 收起键
        }
        else if (KeyboardItemValue === 'hide') {
            valueAfterChange = value;
            this.onInputBlur(valueAfterChange);
        }
        else {
            if (maxLength !== undefined &&
                +maxLength >= 0 &&
                (value + KeyboardItemValue).length > maxLength) {
                valueAfterChange = (value + KeyboardItemValue).substr(0, maxLength);
                onChange({ target: { value: valueAfterChange } });
            }
            else {
                valueAfterChange = value + KeyboardItemValue;
                onChange({ target: { value: valueAfterChange } });
            }
        }
        if (customNumberKeyboard) {
            customNumberKeyboard.confirmDisabled = valueAfterChange === '';
            if (customNumberKeyboard.confirmKeyboardItem) {
                if (valueAfterChange === '') {
                    addClass(customNumberKeyboard.confirmKeyboardItem, `${this.keyboardPrefixCls}-item-disabled`);
                }
                else {
                    removeClass(customNumberKeyboard.confirmKeyboardItem, `${this.keyboardPrefixCls}-item-disabled`);
                }
            }
        }
    }
    onFakeInputClick(e) {
        this.focusFunc(e);
    }
    focusFunc(e) {
        // this focus may invocked by users page button click, so this click may trigger blurEventListener at the same time
        this.removeBlurListener();
        const { focus } = this;
        if (!focus) {
            this.onInputFocus(e);
        }
        setTimeout(() => {
            this.addBlurListener();
        }, 50);
    }
    renderPortal() {
        const Portal2 = Portal;
        return (<Portal2 props={{
            getContainer: () => this.getContainer()
        }}>
          {this.getComponent()}
        </Portal2>);
    }
    render() {
        const { placeholder, disabled, editable, moneyKeyboardAlign } = this;
        const { focus, value } = this;
        const preventKeyboard = disabled || !editable;
        const fakeInputCls = classnames(`fake-input`, {
            focus,
            'fake-input-disabled': disabled
        });
        const fakeInputContainerCls = classnames('fake-input-container', {
            'fake-input-container-left': moneyKeyboardAlign === 'left'
        });
        return (<div class={fakeInputContainerCls}>
          {value === '' && (
        // tslint:disable-next-line:jsx-no-multiline-js
        <div class={'fake-input-placeholder'}>{placeholder}</div>)}
          <div role={'textbox'} aria-label={value || placeholder} class={fakeInputCls} ref={'input'} onClick={preventKeyboard ? () => {
        } : this.onFakeInputClick.bind(this)}>
            {value}
          </div>
          {this.renderPortal()}
        </div>);
    }
};
tslib_1.__decorate([
    Prop({ default: '' })
], NumberInput.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], NumberInput.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], NumberInput.prototype, "editable", void 0);
tslib_1.__decorate([
    Prop()
], NumberInput.prototype, "moneyKeyboardAlign", void 0);
tslib_1.__decorate([
    Prop()
], NumberInput.prototype, "moneyKeyboardWrapProps", void 0);
tslib_1.__decorate([
    Prop()
], NumberInput.prototype, "moneyKeyboardHeader", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Number] })
], NumberInput.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ default: 'am-input' })
], NumberInput.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ default: 'am-number-keyboard' })
], NumberInput.prototype, "keyboardPrefixCls", void 0);
tslib_1.__decorate([
    Prop()
], NumberInput.prototype, "confirmLabel", void 0);
tslib_1.__decorate([
    Prop()
], NumberInput.prototype, "backspaceLabel", void 0);
tslib_1.__decorate([
    Prop()
], NumberInput.prototype, "cancelKeyboardLabel", void 0);
tslib_1.__decorate([
    Prop()
], NumberInput.prototype, "maxLength", void 0);
tslib_1.__decorate([
    Prop()
], NumberInput.prototype, "type", void 0);
tslib_1.__decorate([
    Watch('value')
], NumberInput.prototype, "valueChanged", null);
NumberInput = tslib_1.__decorate([
    Component({
        name: ''
    })
], NumberInput);
export default NumberInput;
//# sourceMappingURL=custom-input.jsx.map