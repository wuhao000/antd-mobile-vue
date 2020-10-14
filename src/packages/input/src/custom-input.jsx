import { __decorate } from "tslib";
import classnames from 'classnames';
import { Teleport } from 'vue';
import { Options, Vue } from 'vue-class-component';
import { addClass, removeClass } from '../../utils/class';
import CustomKeyboard from './custom-keyboard';
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
        this.$emit('confirm', value);
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
        return (<CustomKeyboard ref="keyboard" onClick={this.onKeyboardClick} prefixCls={keyboardPrefixCls} confirmLabel={confirmLabel} backspaceLabel={backspaceLabel} cancelKeyboardLabel={cancelKeyboardLabel} wrapProps={moneyKeyboardWrapProps} header={moneyKeyboardHeader}/>);
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
    onKeyboardClick(keyboardItemValue) {
        const { maxLength } = this;
        const { value } = this;
        // tslint:disable-next-line:no-this-assignment
        const { onChange } = this;
        let valueAfterChange;
        // 删除键
        if (keyboardItemValue === 'delete') {
            valueAfterChange = value.substring(0, value.length - 1);
            onChange({ target: { value: valueAfterChange } });
            // 确认键
        }
        else if (keyboardItemValue === 'confirm') {
            valueAfterChange = value;
            onChange({ target: { value: valueAfterChange } });
            this.onInputBlur(value);
            this.onConfirm(value);
            // 收起键
        }
        else if (keyboardItemValue === 'hide') {
            valueAfterChange = value;
            this.onInputBlur(valueAfterChange);
        }
        else {
            if (maxLength !== undefined &&
                +maxLength >= 0 &&
                (value + keyboardItemValue).length > maxLength) {
                valueAfterChange = (value + keyboardItemValue).substr(0, maxLength);
                onChange({ target: { value: valueAfterChange } });
            }
            else {
                valueAfterChange = value + keyboardItemValue;
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
        const props = {
            disabled: false,
            to: this.getContainer()
        };
        return (<Teleport {...props}>
          {this.getComponent()}
        </Teleport>);
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
          {value === '' && (<div class="fake-input-placeholder">{placeholder}</div>)}
          <div role="textbox" aria-label={value || placeholder} class={fakeInputCls} ref="input" onClick={preventKeyboard ? () => {
        } : this.onFakeInputClick}>
            {value}
          </div>
          {this.renderPortal()}
        </div>);
    }
};
NumberInput = __decorate([
    Options({
        name: 'MNumberInput',
        props: {
            placeholder: { default: '' },
            disabled: { type: Boolean, default: false },
            editable: { type: Boolean, default: true },
            moneyKeyboardAlign: {},
            moneyKeyboardWrapProps: {},
            moneyKeyboardHeader: {},
            value: { type: [String, Number] },
            prefixCls: { default: 'am-input' },
            keyboardPrefixCls: { default: 'am-number-keyboard' },
            confirmLabel: {},
            backspaceLabel: {},
            cancelKeyboardLabel: {},
            maxLength: {},
            type: {}
        },
        watch: {
            value(value) {
                this.currentValue = value;
            },
            focus(focus) {
                if (focus) {
                    this.onInputFocus();
                }
            }
        }
    })
], NumberInput);
export default NumberInput;
//# sourceMappingURL=custom-input.jsx.map