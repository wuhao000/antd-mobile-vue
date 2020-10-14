/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import { defineComponent, getCurrentInstance, onBeforeUnmount, reactive, ref, watch } from 'vue';
import List from '../../list';
import { formComponentProps, useFormComponent } from '../../mixins/form-component';
import { isEmptySlot } from '../../utils/vnode';
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
export default defineComponent({
    name: 'InputItem',
    props: Object.assign(Object.assign({}, formComponentProps), { defaultValue: {
            type: [String, Number]
        }, title: {
            type: [String, Object]
        }, 
        /**
         * class 前缀
         */
        prefixCls: {
            type: String,
            default: 'am-input'
        }, 
        /**
         * list class 前缀
         */
        prefixListCls: {
            type: String,
            default: 'am-list'
        }, 
        /**
         * 文字排版起始方向, 只有 type='money' 支持，
         * 可选为 <code>'left'</code>, <code>'right'</code>
         */
        moneyKeyboardAlign: {
            type: String,
            default: 'right'
        }, moneyKeyboardWrapProps: {
            type: Function,
            default: () => {
                return {};
            }
        }, moneyKeyboardHeader: {
            default: null
        }, type: {
            type: String,
            default: 'text'
        }, 
        /**
         * input元素的name属性
         */
        name: {
            type: String
        }, 
        /**
         * 占位文字
         */
        placeholder: {
            type: String,
            default: ''
        }, 
        /**
         * 是否支持清除内容
         */
        clearable: {
            type: Boolean,
            default: false
        }, 
        /**
         * 最大长度
         */
        maxLength: {
            type: Number,
            default: 1000000
        }, 
        /**
         * 右边注释
         */
        extra: {
            default: ''
        }, labelNumber: {
            default: 5
        }, textAlign: {
            type: String
        }, locale: {}, android: {
            type: Boolean,
            default: false
        }, required: {
            type: Boolean,
            default: false
        }, errorDisplayType: {
            type: String,
            default: 'toast'
        } }),
    install: null,
    setup(props, { slots, emit, attrs }) {
        const state = reactive({
            placeholder: props.placeholder || ''
        });
        const { currentValue, isDisabled, isReadonly, onFieldBlur, onFieldChange } = useFormComponent(props, { emit });
        const debounceTimeout = ref(null);
        watch(() => props.placeholder, (placeholder) => {
            state.placeholder = placeholder;
        });
        const inputRef = ref(null);
        const renderLabel = () => {
            const prefixCls = props.prefixCls;
            const labelNumber = props.labelNumber;
            const labelCls = classnames(`${prefixCls}-label`, {
                [`${prefixCls}-label-2`]: labelNumber === 2,
                [`${prefixCls}-label-3`]: labelNumber === 3,
                [`${prefixCls}-label-4`]: labelNumber === 4,
                [`${prefixCls}-label-5`]: labelNumber === 5,
                [`${prefixCls}-label-6`]: labelNumber === 6,
                [`${prefixCls}-label-7`]: labelNumber === 7
            });
            if (!isEmptySlot(slots.default)) {
                return <div class={labelCls}>{slots.default()}</div>;
            }
            else if (props.title) {
                return <div class={labelCls}>{props.title}</div>;
            }
            return null;
        };
        const onInputChange = (e) => {
            var _a;
            const el = e.target;
            const { value: rawVal, selectionEnd: prePos } = el;
            const preCtrlVal = (_a = currentValue.value) !== null && _a !== void 0 ? _a : '';
            const { type } = props;
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
            if (props.maxLength && ctrlValue.length > props.maxLength) {
                ctrlValue = ctrlValue.substring(0, props.maxLength);
            }
            handleOnChange(ctrlValue, ctrlValue !== rawVal, () => {
                switch (type) {
                    case 'bankCard':
                    case 'phone':
                    case 'number':
                        // controlled input type needs to adjust the position of the caret
                        try {
                            // set selection may throw error (https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange)
                            el.selectionStart = el.selectionEnd = calcPos(prePos || 0, preCtrlVal, rawVal, ctrlValue, [' '], /\D/g);
                        }
                        catch (error) {
                            console.warn('Set selection error:', error);
                        }
                        break;
                    default:
                        break;
                }
            });
            onFieldChange();
        };
        /**
         *
         * @param {string} value
         * @param {boolean} isMutated 校正值是否和输入值不同
         * @param adjustPos
         */
        const handleOnChange = (value, isMutated = false, adjustPos = noop) => {
            currentValue.value = value;
            emit('update:value', value);
            emit('change', value);
            adjustPos();
            if (inputRef.value && isMutated) {
                inputRef.value.$forceUpdate();
            }
        };
        const instance = getCurrentInstance();
        const onInputFocus = (value) => {
            if (debounceTimeout.value) {
                clearTimeout(debounceTimeout.value);
                debounceTimeout.value = null;
            }
            instance.vnode.el.focus();
            emit('focus', value);
        };
        const onInputBlur = (value) => {
            if (inputRef.value) {
                // this.inputRef may be null if customKeyboard unmount
                debounceTimeout.value = window.setTimeout(() => {
                    if (document.activeElement !== (inputRef.value && inputRef.value.inputRef)) {
                        instance.vnode.el.blur();
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
            onFieldBlur();
            emit('blur', value);
        };
        const clearInput = () => {
            handleOnChange('');
            focus();
        };
        const focus = () => {
            if (inputRef.value) {
                if (typeof inputRef.value.focus === 'function') {
                    inputRef.value.focus();
                }
                else {
                    inputRef.value.focus = true;
                }
            }
        };
        const calcPos = (prePos, preCtrlVal, rawVal, ctrlVal, placeholderChars, maskReg) => {
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
        };
        currentValue.value = normalizeValue(((props.value || '') + ''));
        onBeforeUnmount(() => {
            if (debounceTimeout.value) {
                window.clearTimeout(debounceTimeout.value);
                debounceTimeout.value = null;
            }
        });
        return {
            clearInput,
            setInputRef(el) {
                inputRef.value = el;
            },
            onInputChange,
            onInputFocus,
            onInputBlur,
            isReadonly,
            isDisabled,
            currentValue,
            focus,
            state,
            renderLabel
        };
    },
    render() {
        const { prefixCls, prefixListCls, isReadonly, isDisabled, clearable, type, currentValue, moneyKeyboardAlign, moneyKeyboardWrapProps, moneyKeyboardHeader, name, maxLength } = this;
        const extra = this.$slots.extra || this.extra;
        const { confirmLabel, backspaceLabel, cancelKeyboardLabel } = {
            confirmLabel: '确定',
            backspaceLabel: '退格',
            cancelKeyboardLabel: '收起键盘'
        };
        const { focus, state: { placeholder } } = this;
        const wrapCls = classnames(`${prefixListCls}-item`, `${prefixCls}-item`, `${prefixListCls}-item-middle`, {
            [`${prefixCls}-disabled`]: isDisabled,
            [`${prefixCls}-focus`]: focus,
            [`${prefixCls}-android`]: this.android
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
        const slots = {
            control: () => {
                return <div class={controlCls}>
          {type === 'money' ? (
                // @ts-ignore
                <CustomInput {...{
                    value: normalizeValue(currentValue),
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
                }} onChange={this.onInputChange} onFocus={this.onInputFocus} onBlur={this.onInputBlur} onConfirm={(v) => {
                    this.$emit('confirm', v);
                }} ref={this.setInputRef}/>) : (<Input {...Object.assign(Object.assign({}, patternProps), { value: normalizeValue(currentValue), defaultValue: this.defaultValue, textAlign: this.textAlign, type: inputType, maxLength,
                    name,
                    placeholder, readonly: isReadonly, disabled: isDisabled, onChange: this.onInputChange, onFocus: this.onInputFocus, onBlur: this.onInputBlur, class: classNameProp, ref: this.setInputRef })}/>)}
        </div>;
            },
            suffix: () => {
                return clearable &&
                    !isReadonly &&
                    !isDisabled &&
                    (currentValue && `${currentValue}`.length > 0) ? (
                // @ts-ignore
                <TouchFeedback activeClassName={`${prefixCls}-clear-active`}>
            <div class={`${prefixCls}-clear`} onClick={this.clearInput}/>
          </TouchFeedback>) : null;
            },
            extra: extra !== '' ? () => {
                return (<div class={`${prefixCls}-extra`} onClick={(e) => {
                    this.$emit('extra-click', e);
                }}>
            {extra}
          </div>);
            } : null
        };
        return (<List.Item title={this.renderLabel()} required={this.required} error={this.error} errorMessage={this.errorMessage} errorDisplayType={this.errorDisplayType} v-slots={slots} class={wrapCls}>
      </List.Item>);
    }
});
//# sourceMappingURL=index.jsx.map