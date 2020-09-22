import {Options, Vue} from 'vue-class-component';
import classnames from 'classnames';
import {addClass, removeClass} from '../../utils/class';
import CustomKeyboard from './custom-keyboard';
import Portal from './portal';
import { VNode } from 'vue';

let instanceArr: any = [];
let customNumberKeyboard: any = null;

@Options({
  name: 'MNumberInput',
  props: {
    placeholder: {default: ''},
    disabled: {type: Boolean, default: false},
    editable: {type: Boolean, default: true},
    moneyKeyboardAlign: {},
    moneyKeyboardWrapProps: {},
    moneyKeyboardHeader: {},
    value: {type: [String, Number]},
    prefixCls: {default: 'am-input'},
    keyboardPrefixCls: {default: 'am-number-keyboard'},
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
    focus(focus: boolean) {
      if (focus) {
        this.onInputFocus();
      }
    }
  }
})
class NumberInput extends Vue {
  public placeholder?: string;
  public disabled?: boolean;
  public editable?: boolean;
  public moneyKeyboardAlign?: 'left' | 'right' | string;
  public moneyKeyboardWrapProps?: object;
  public moneyKeyboardHeader?: VNode;
  public value?: string;
  public prefixCls?: string;
  public keyboardPrefixCls?: string;
  public confirmLabel: any;
  public backspaceLabel: any;
  public cancelKeyboardLabel: any;
  public maxLength?: number;
  public type?: string;
  public container: HTMLElement;
  public inputRef: HTMLDivElement | null;
  private focus: boolean = false;
  private currentValue: string;

  public created() {
    this.currentValue = this.value || '';
  }

  public onChange(value: any) {
    if (!('value' in this)) {
      this.currentValue = value.target.value;
    }
    this.$emit('change', value);
  }

  public onConfirm(value: any) {
    this.$emit('confirm', value);
  }

  public addBlurListener() {
    document.addEventListener('click', this.doBlur, false);
  }

  public removeBlurListener() {
    document.removeEventListener('click', this.doBlur, false);
  }

  public beforeDestroy() {
    // focus:true unmount 不能触发 blur
    if (!this.focus) {
      this.$emit('blur', this.value);
    }
    this.unLinkInput();
  }

  public saveRef(el: any) {
    customNumberKeyboard = el;
    instanceArr.push({el, container: this.container});
  }

  public getComponent() {
    const {
      confirmLabel,
      backspaceLabel,
      cancelKeyboardLabel,
      keyboardPrefixCls,
      moneyKeyboardWrapProps,
      moneyKeyboardHeader
    } = this;
    return (
      <CustomKeyboard
        ref="keyboard"
        onClick={this.onKeyboardClick.bind(this)}
        prefixCls={keyboardPrefixCls}
        confirmLabel={confirmLabel}
        backspaceLabel={backspaceLabel}
        cancelKeyboardLabel={cancelKeyboardLabel}
        wrapProps={moneyKeyboardWrapProps}
        header={moneyKeyboardHeader}
      />
    );
  }

  public getContainer(): HTMLElement {
    const {keyboardPrefixCls} = this;
    if (!this.container) {
      const container: HTMLElement = document.createElement('div');
      container.setAttribute('id', `${keyboardPrefixCls}-container-${(new Date().getTime())}`);
      document.body.appendChild(container);
      this.container = container;
    }
    return this.container;
  }

  public doBlur(ev: MouseEvent) {
    if (ev.target !== this.inputRef) {
      this.onInputBlur(this.value);
    }
  }

  public removeCurrentExtraKeyboard() {
    instanceArr = instanceArr.filter((item: any) => {
      const {el, container} = item;
      if (el && container && el !== customNumberKeyboard) {
        (container as any).parentNode.removeChild(container);
      }
      return el === customNumberKeyboard;
    });
  }

  public mounted() {
    this.saveRef(this.$refs.keyboard as any);
  }

  public unLinkInput() {
    if (
      customNumberKeyboard &&
      customNumberKeyboard.antmKeyboard &&
      customNumberKeyboard.linkedInput &&
      customNumberKeyboard.linkedInput === this
    ) {
      customNumberKeyboard.linkedInput = null;
      addClass(
        customNumberKeyboard.antmKeyboard,
        `${this.keyboardPrefixCls}-wrapper-hide`
      );
    }
    // for unmount
    this.removeBlurListener();
    this.removeCurrentExtraKeyboard();
  }

  public onInputBlur(value: string) {
    if (this.focus) {
      this.focus = false;
      this.$emit('blur', value);
      setTimeout(() => {
        this.unLinkInput();
      }, 50);
    }
  }

  public onInputFocus(e?) {
    this.$emit('focus', this.value);
    this.focus = true;
    if (customNumberKeyboard) {
      customNumberKeyboard.linkedInput = this;
      if (customNumberKeyboard.antmKeyboard) {
        removeClass(
          customNumberKeyboard.antmKeyboard,
          `${this.keyboardPrefixCls}-wrapper-hide`
        );
      }
      customNumberKeyboard.confirmDisabled = this.value === '';
      if (customNumberKeyboard.confirmKeyboardItem) {
        if (this.value === '') {
          addClass(
            customNumberKeyboard.confirmKeyboardItem,
            `${this.keyboardPrefixCls}-item-disabled`
          );
        } else {
          removeClass(
            customNumberKeyboard.confirmKeyboardItem,
            `${this.keyboardPrefixCls}-item-disabled`
          );
        }
      }
    }
  }

  public onKeyboardClick(KeyboardItemValue: string) {
    const {maxLength} = this;
    const {value} = this;
    // tslint:disable-next-line:no-this-assignment
    const {onChange} = this;

    let valueAfterChange;
    // 删除键
    if (KeyboardItemValue === 'delete') {
      valueAfterChange = value.substring(0, value.length - 1);
      onChange({target: {value: valueAfterChange}});
      // 确认键
    } else if (KeyboardItemValue === 'confirm') {
      valueAfterChange = value;
      onChange({target: {value: valueAfterChange}});
      this.onInputBlur(value);
      this.onConfirm(value);
      // 收起键
    } else if (KeyboardItemValue === 'hide') {
      valueAfterChange = value;
      this.onInputBlur(valueAfterChange);
    } else {
      if (
        maxLength !== undefined &&
        +maxLength >= 0 &&
        (value + KeyboardItemValue).length > maxLength
      ) {
        valueAfterChange = (value + KeyboardItemValue).substr(0, maxLength);
        onChange({target: {value: valueAfterChange}});
      } else {
        valueAfterChange = value + KeyboardItemValue;
        onChange({target: {value: valueAfterChange}});
      }
    }
    if (customNumberKeyboard) {
      customNumberKeyboard.confirmDisabled = valueAfterChange === '';
      if (customNumberKeyboard.confirmKeyboardItem) {
        if (valueAfterChange === '') {
          addClass(
            customNumberKeyboard.confirmKeyboardItem,
            `${this.keyboardPrefixCls}-item-disabled`
          );
        } else {
          removeClass(
            customNumberKeyboard.confirmKeyboardItem,
            `${this.keyboardPrefixCls}-item-disabled`
          );
        }
      }
    }
  }

  public onFakeInputClick(e) {
    this.focusFunc(e);
  }

  public focusFunc(e) {
    // this focus may invocked by users page button click, so this click may trigger blurEventListener at the same time
    this.removeBlurListener();
    const {focus} = this;
    if (!focus) {
      this.onInputFocus(e);
    }
    setTimeout(() => {
      this.addBlurListener();
    }, 50);
  }

  public renderPortal() {
    return (
      <Portal props={
        {
          getContainer: () => this.getContainer()
        }
      }>
        {this.getComponent()}
      </Portal>
    );
  }

  public render(): any {
    const {placeholder, disabled, editable, moneyKeyboardAlign} = this;
    const {focus, value} = this;
    const preventKeyboard = disabled || !editable;
    const fakeInputCls = classnames(`fake-input`, {
      focus,
      'fake-input-disabled': disabled
    });
    const fakeInputContainerCls = classnames('fake-input-container', {
      'fake-input-container-left': moneyKeyboardAlign === 'left'
    });
    return (
      <div class={fakeInputContainerCls}>
        {value === '' && (
          <div class="fake-input-placeholder">{placeholder}</div>
        )}
        <div
          role="textbox"
          aria-label={value || placeholder}
          class={fakeInputCls}
          ref="input"
          onClick={preventKeyboard ? () => {
          } : this.onFakeInputClick}
        >
          {value}
        </div>
        {this.renderPortal()}
      </div>
    );
  }
}

export default NumberInput;
