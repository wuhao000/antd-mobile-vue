/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import {FormComponent} from '../../../mixins/form-component';
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

@Component({
  name: 'InputItem'
})
export default class InputItem extends FormComponent {
  @Prop({type: String})
  public title: string;
  /**
   * class 前缀
   */
  @Prop({type: String, default: 'am-input'})
  public prefixCls?: string;
  /**
   * list class 前缀
   */
  @Prop({type: String, default: 'am-list'})
  public prefixListCls?: string;
  /**
   * 文字排版起始方向, 只有 type='money' 支持，
   * 可选为 <code>'left'</code>, <code>'right'</code>
   */
  @Prop({type: String, default: 'right'})
  public moneyKeyboardAlign?: string;
  @Prop({
    type: Function,
    default: () => {
      return {};
    }
  })
  public moneyKeyboardWrapProps?: object;
  @Prop({default: null})
  public moneyKeyboardHeader?: any;
  @Prop({type: String, default: 'text'})
  public type?: '' | 'text' | 'bankCard' | 'phone' | 'password' | 'number' | 'digit' | 'money';
  /**
   * input元素的name属性
   */
  @Prop({type: String})
  public name?: string;
  /**
   * 占位文字
   */
  @Prop({type: String, default: ''})
  public placeholder?: string;
  /**
   * 是否支持清除内容
   */
  @Prop({type: Boolean, default: false})
  public clearable?: boolean;
  /**
   * 最大长度
   */
  @Prop({type: Number})
  public maxLength?: number;
  /**
   * 右边注释
   */
  @Prop({default: ''})
  public extra?: any;
  @Prop({default: 5})
  /**
   * 标签的文字个数，可用2-7之间的数字
   */
  public labelNumber?: number;
  @Prop({type: String})
  public textAlign?: 'left' | 'center' | 'right';
  @Prop()
  public locale?: object;
  public state = {
    placeholder: this.placeholder || ''
  };

  @Prop({type: Boolean, default: false})
  public required: boolean;

  public static contextTypes = {
    antLocale: PropTypes.object
  };
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
    if (this.$slots.default) {
      return <div class={labelCls}>{this.$slots.default}</div>;
    } else if (this.title) {
      return <div class={labelCls}>{this.title}</div>;
    }
    return null;
  }

  @Watch('placeholder')
  public placeholderChanged(placeholder: string) {
    this.state.placeholder = placeholder;
  }

  get inputRef(): any {
    return this.$refs.input;
  }

  private debounceTimeout: any;

  public created() {
    this.currentValue = normalizeValue(((this.value || '') + ''));
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

  public render() {
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
    const extra = this.$slots.extra || this.extra;
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
          [`${prefixCls}-error`]: this.isCurrentError,
          [`${prefixCls}-focus`]: focus,
          [`${prefixCls}-android`]: focus
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
        <div class={wrapCls}>
          <div class={`${prefixListCls}-line`}>
            {this.renderLabel()}
            <div class={controlCls}>
              {type === 'money' ? (
                  // @ts-ignore
                  <CustomInput
                      attrs={
                        {
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
                        }
                      }
                      onChange={this.onInputChange}
                      onFocus={this.onInputFocus}
                      onBlur={this.onInputBlur}
                      onConfirm={(v) => {
                        this.$emit('confirm', v);
                      }}
                      ref={'input'}
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
                      ref={'input'}
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
            {clearable &&
            !isReadonly &&
            !isDisabled &&
            (currentValue && `${currentValue}`.length > 0) ? (
                // @ts-ignore
                <TouchFeedback activeClassName={`${prefixCls}-clear-active`}>
                  <div class={`${prefixCls}-clear`}
                       onClick={this.clearInput}/>
                </TouchFeedback>
            ) : null}
            {this.errorIcon}
            {extra !== '' ? (
                <div class={`${prefixCls}-extra`}
                     onClick={(e) => {
                       this.$emit('extra-click', e);
                     }}>
                  {extra}
                </div>
            ) : null}
          </div>
        </div>
    );
  }
}
