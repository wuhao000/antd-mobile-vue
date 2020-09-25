import classnames from 'classnames';
import {VNode} from 'vue';
import {Options, Vue} from 'vue-class-component';
import {IS_IOS} from '../../utils/exenv';
import TouchFeedback from '../../vmc-feedback';

@Options({
  name: 'KeyboardItem',
  props: {
    value: {type: [String, Number]},
    label: String,
    type: {type: String},
    prefixCls: {default: 'am-number-keyboard'},
    iconOnly: {},
    disabled: {type: Boolean, default: false}
  }
})
class KeyboardItem extends Vue {
  public value: any;
  public label: string;
  public type: string;
  public prefixCls?: string;

  get tdRef(): any {
    return this.$refs['td'];
  }

  public iconOnly?: boolean;
  public disabled: boolean;

  public render(): any {
    const {
      prefixCls,
      disabled,
      label,
      iconOnly,
      ...restProps
    } = this;
    let value: any = this.$slots.default?.();
    const type = this.type;
    if (type === 'keyboard-delete') {
      value = 'delete';
    } else if (type === 'keyboard-hide') {
      value = 'hide';
    } else if (type === 'keyboard-confirm') {
      value = 'confirm';
    }

    const wrapCls = classnames(`${prefixCls}-item`);
    return (
      <TouchFeedback
        class={type}
        activeClassName={`${prefixCls}-item-active`}>
        <td
          ref="td"
          // tslint:disable-next-line:jsx-no-multiline-js
          onClick={e => {
            this.$emit('click', e, this.value);
          }}
          class={wrapCls}
          {...restProps}
        >
          {this.$slots.default?.()}
          {iconOnly && <i class="sr-only">{label}</i>}
        </td>
      </TouchFeedback>
    );
  }
}

@Options({
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

class CustomKeyboard extends Vue {
  public prefixCls: string;
  public confirmLabel: string;
  public backspaceLabel: string;
  public cancelKeyboardLabel: string;
  public wrapProps: any;
  public header: VNode;
  public linkedInput: any;

  get antmKeyboard(): HTMLDivElement | null {
    return this.$refs.antmKeyboard as any;
  }

  public confirmDisabled: boolean;
  public confirmKeyboardItem: HTMLTableDataCellElement | null;

  public onKeyboardClick(e, value: string = '') {
    e.stopImmediatePropagation();
    if (value === 'confirm' && this.confirmDisabled) {
      return null;
    } else {
      if (this.linkedInput) {
        this.linkedInput.onKeyboardClick(value);
      }
    }
  }

  public renderKeyboardItem(item: string, index: number) {
    const KeyboardItem2: any = KeyboardItem;
    return (
      <KeyboardItem2
        {...{value: item}}
        onClick={this.onKeyboardClick}
        key={`item-${item}-${index}`}>
        {item}
      </KeyboardItem2>
    );
  }

  public render(): any {
    const {
      prefixCls,
      confirmLabel,
      backspaceLabel,
      cancelKeyboardLabel,
      wrapProps,
      header
    } = this;

    const wrapperCls = classnames(
      `${prefixCls}-wrapper`,
      `${prefixCls}-wrapper-hide`
    );
    const KeyboardItem2: any = KeyboardItem;
    return (
      <div class={wrapperCls} ref="antmKeyboard" {...wrapProps}>
        {header}
        <table>
          <tbody>
          <tr>
            {['1', '2', '3'].map((item, index) =>
              // tslint:disable-next-line:jsx-no-multiline-js
              this.renderKeyboardItem(item, index)
            )}
            <KeyboardItem2
              {
                ...{
                  ...this.getAriaAttr(backspaceLabel),
                  type: 'keyboard-delete',
                  rowSpan: 2,
                  onClick: e => this.onKeyboardClick(e, 'delete')
                }
              }
            />
          </tr>
          <tr>
            {['4', '5', '6'].map((item, index) =>
              // tslint:disable-next-line:jsx-no-multiline-js
              this.renderKeyboardItem(item, index)
            )}
          </tr>
          <tr>
            {['7', '8', '9'].map((item, index) =>
              // tslint:disable-next-line:jsx-no-multiline-js
              this.renderKeyboardItem(item, index)
            )}
            <KeyboardItem2
              {
                ...{
                  type: 'keyboard-confirm',
                  rowSpan: 2,
                  onClick: e => this.onKeyboardClick(e, 'confirm')
                }
              }
              tdRef="td"
            >
              {confirmLabel}
            </KeyboardItem2>
          </tr>
          <tr>
            {['.', '0'].map((item, index) =>
              // tslint:disable-next-line:jsx-no-multiline-js
              this.renderKeyboardItem(item, index)
            )}
            <KeyboardItem2
              {
                ...{
                  ...this.getAriaAttr(cancelKeyboardLabel),
                  type: 'keyboard-hide',
                  onClick: e => this.onKeyboardClick(e, 'hide')
                }
              }
            />
          </tr>
          </tbody>
        </table>
      </div>
    );
  }

  public getAriaAttr(label: string) {
    if (IS_IOS) {
      return {label, iconOnly: true};
    } else {
      return {role: 'button', 'aria-label': label};
    }
  }
}

export default CustomKeyboard as any;
