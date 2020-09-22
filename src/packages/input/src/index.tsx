/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import {Options} from 'vue-class-component';
import List from '../../list';
import FormComponent from '../../mixins/form-component';
import TouchFeedback from '../../vmc-feedback';
import CustomInput from './custom-input';
import Input from './input';

function noop() {
}

function normalizeValue(value?: string) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value + '';
}

@Options({
  name: 'InputItem',
  props: {
    title: {type: [String, Object]},
    prefixCls: {type: String, default: 'am-input'},
    prefixListCls: {type: String, default: 'am-list'},
    moneyKeyboardAlign: {type: String, default: 'right'},
    moneyKeyboardWrapProps: {
      type: Function,
      default: () => {
        return {};
      }
    },
    moneyKeyboardHeader: {default: null},
    type: {type: String, default: 'text'},
    name: {type: String},
    placeholder: {type: String, default: ''},
    clearable: {type: Boolean, default: false},
    maxLength: {type: Number},
    extra: {default: ''},
    labelNumber: {default: 5},
    textAlign: {type: String},
    locale: {},
    android: {type: Boolean, default: false},
    required: {type: Boolean, default: false}
  },
  watch: {
    placeholder(placeholder) {
      this.state.placeholder = placeholder;
    }
  }
})
class InputItem extends FormComponent {
  public title: string;
  /**
   * class 前缀
   */
  public prefixCls?: string;
  /**
   * list class 前缀
   */
  public prefixListCls?: string;
  /**
   * 文字排版起始方向, 只有 type='money' 支持，
   * 可选为 <code>'left'</code>, <code>'right'</code>
   */
  public moneyKeyboardAlign?: string;
  public moneyKeyboardWrapProps?: object;
  public moneyKeyboardHeader?: any;
  public type?: '' | 'text' | 'bankCard' | 'phone' | 'password' | 'number' | 'digit' | 'money';
  /**
   * input元素的name属性
   */
  public name?: string;
  /**
   * 占位文字
   */
  public placeholder?: string;
  /**
   * 是否支持清除内容
   */
  public clearable?: boolean;
  /**
   * 最大长度
   */
  public maxLength?: number;
  /**
   * 右边注释
   */
  public extra?: any;
  /**
   * 标签的文字个数，可用2-7之间的数字
   */
  public labelNumber?: number;
  public textAlign?: 'left' | 'center' | 'right';
  public locale?: object;
  public android: boolean;
  public state = {
    // @ts-ignore
    placeholder: this.placeholder || ''
  };
  public required: boolean;
  public static install: (Vue) => void;

  private renderLabel(): any {
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
    return <div class={labelCls}>{this.$slots.default?.()}{this.title}</div>;
  }

  get inputRef(): any {
    return this.$refs.input;
  }

  private debounceTimeout: any;

  public created() {
    this.currentValue = normalizeValue(((this.value || '') + ''));
    if (this.value === undefined) {
      this.$watch(() => this.value, (value, old) => {
        if (old === undefined) {
          this.$forceUpdate();
        }
      });
    }
  }

  public beforeDestroy() {
    if (this.debounceTimeout) {
      window.clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
  }

  public onInputChange(e) {
    const el = e.target;
    const {value: rawVal, selectionEnd: prePos} = el;
    const {currentValue: preCtrlVal = ''} = this;
    const {type} = this;
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
        } else if (valueLen >= 8) {
          ctrlValue = `${ctrlValue.substr(0, 3)} ${ctrlValue.substr(3, 4)} ${ctrlValue.substr(
              7
          )}`;
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
          } catch (error) {
            console.warn('Set selection error:', error);
          }
          break;
        default:
          break;
      }
    });
    this.onFieldChange();
  }

  public handleOnChange(value: string, isMutated: boolean = false, adjustPos: any = noop) {
    this.currentValue = value;
    this.$emit('input', value);
    this.$emit('change', value);
    adjustPos();
    if (this.inputRef.$forceUpdate) {
      this.inputRef.$forceUpdate();
    }
    this.$forceUpdate();
  }

  public onInputFocus(value: string) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
    (this.$el as HTMLElement).focus();
    this.$emit('focus', value);
  }

  public onInputBlur(value: string) {
    if (this.inputRef) {
      // this.inputRef may be null if customKeyboard unmount
      this.debounceTimeout = window.setTimeout(() => {
        if (document.activeElement !== (this.inputRef && this.inputRef.inputRef)) {
          (this.$el as HTMLElement).blur();
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

  public clearInput() {
    this.handleOnChange('');
    this.focus();
  }

  public focus() {
    if (this.inputRef) {
      if (typeof this.inputRef.focus === 'function') {
        this.inputRef.focus();
      } else {
        this.inputRef.focus = true;
      }
    }
  }

  public calcPos(prePos: number, preCtrlVal: string, rawVal: string, ctrlVal: string, placeholderChars: Array<string>, maskReg: RegExp) {
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
        } else {
          placeholderCharCount++;
        }
      }
      pos += placeholderCharCount;
    }
    return pos;
  }

  public render(): any {
    const {
      prefixCls,
      prefixListCls,
      isReadonly,
      isDisabled,
      clearable,
      type,
      currentValue,
      moneyKeyboardAlign,
      moneyKeyboardWrapProps,
      moneyKeyboardHeader,
      name, maxLength
    } = this;
    const extra = this.$slots.extra?.() || this.extra;
    const {
      confirmLabel,
      backspaceLabel,
      cancelKeyboardLabel
    } = {
      confirmLabel: '确定',
      backspaceLabel: '退格',
      cancelKeyboardLabel: '收起键盘'
    };

    const {
      focus,
      state: {placeholder}
    } = this;

    const wrapCls = classnames(
        `${prefixListCls}-item`,
        `${prefixCls}-item`,
        `${prefixListCls}-item-middle`,
        {
          [`${prefixCls}-disabled`]: isDisabled,
          [`${prefixCls}-focus`]: focus,
          [`${prefixCls}-android`]: this.android
        }
    );

    const controlCls = `${prefixCls}-control`;

    let inputType: any = 'text';
    if (type === 'bankCard' || type === 'phone') {
      inputType = 'tel';
    } else if (type === 'password') {
      inputType = 'password';
    } else if (type === 'digit') {
      inputType = 'number';
    } else if (type !== 'text' && type !== 'number') {
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
    return (
        <List.Item title={this.renderLabel()}
                   required={this.required}
                   error={this.error}
                   errorMessage={this.errorMessage}
                   errorDisplayType={this.errorDisplayType}
                   class={wrapCls}>
          <template slot="control">
            <div class={controlCls}>
              {type === 'money' ? (
                  // @ts-ignore
                  <CustomInput
                      {
                        ...{
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
                          moneyKeyboardHeader,
                          onChange: this.onInputChange,
                          onFocus: this.onInputFocus,
                          onBlur: this.onInputBlur,
                          onConfirm: (v) => {
                            this.$emit('confirm', v);
                          },
                          ref: 'input'
                        }
                      }
                  />
              ) : (
                  <Input
                      props={
                        {
                          ...patternProps,
                          value: normalizeValue(currentValue),
                          defaultValue: undefined,
                          textAlign: this.textAlign,
                          type: inputType,
                          maxLength,
                          name,
                          placeholder,
                          readonly: isReadonly,
                          disabled: isDisabled
                        }
                      }
                      class={classNameProp}
                      ref="input"
                      on={
                        {
                          change: this.onInputChange,
                          focus: this.onInputFocus,
                          blur: this.onInputBlur
                        }
                      }
                  />
              )}
            </div>
          </template>
          {clearable &&
          !isReadonly &&
          !isDisabled &&
          (currentValue && `${currentValue}`.length > 0) ? (
              // @ts-ignore
              <template slot="suffix">
                <TouchFeedback activeClassName={`${prefixCls}-clear-active`}>
                  <div class={`${prefixCls}-clear`}
                       onClick={this.clearInput}/>
                </TouchFeedback>
              </template>
          ) : null}
          {extra !== '' ? (
              <template slot="extra">
                <div class={`${prefixCls}-extra`}
                     onClick={(e) => {
                       this.$emit('extra-click', e);
                     }}>
                  {extra}
                </div>
              </template>
          ) : null}
        </List.Item>
    );
  }
}


export default InputItem;
