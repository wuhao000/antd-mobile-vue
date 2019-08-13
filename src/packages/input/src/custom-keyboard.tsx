import classnames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {IS_IOS} from '../../utils/exenv';
import TouchFeedback from '../../vmc-feedback';

@Component({
  name: 'KeyboardItem'
})
export class KeyboardItem extends Vue {
  @Prop({type: [String, Number]})
  public value: any;
  @Prop(String)
  public label: string;
  @Prop({type: String})
  public type: string;
  @Prop({default: 'am-number-keyboard'})
  public prefixCls?: string;

  get tdRef(): any {
    return this.$refs['td'];
  }

  @Prop()
  public iconOnly?: boolean;
  @Prop({type: Boolean, default: false})
  public disabled: boolean;

  public render() {
    const {
      prefixCls,
      disabled,
      label,
      iconOnly,
      ...restProps
    } = this;
    let value: any = this.$slots.default;
    const type = this.type;
    if (type === 'keyboard-delete') {
      value = 'delete';
    } else if (type === 'keyboard-hide') {
      value = 'hide';
    } else if (type === 'keyboard-confirm') {
      value = 'confirm';
    }

    const wrapCls = classnames(`${prefixCls}-item`);
    const TouchFeedback2: any = TouchFeedback;
    return (
        <TouchFeedback2
            class={type}
            props={
              {
                activeClassName: `${prefixCls}-item-active`
              }
            }>
          <td
              ref={'td'}
              // tslint:disable-next-line:jsx-no-multiline-js
              onclick={e => {
                this.$emit('click', e, this.value);
              }}
              class={wrapCls}
              {...restProps}
          >
            {this.$slots.default}
            {iconOnly && <i class={'sr-only'}>{label}</i>}
          </td>
        </TouchFeedback2>
    );
  }
}

@Component({
  name: 'CustomKeyboard'
})
class CustomKeyboard extends Vue {

  @Prop()
  public prefixCls: string;
  @Prop()
  public confirmLabel: string;
  @Prop()
  public backspaceLabel: string;
  @Prop()
  public cancelKeyboardLabel: string;
  @Prop()
  public wrapProps: any;
  @Prop()
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
            props={{value: item}}
            onClick={this.onKeyboardClick}
            key={`item-${item}-${index}`}>
          {item}
        </KeyboardItem2>
    );
  }

  public render() {
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
        <div class={wrapperCls} ref={'antmKeyboard'} {...wrapProps}>
          {header}
          <table>
            <tbody>
              <tr>
                {['1', '2', '3'].map((item, index) =>
                    // tslint:disable-next-line:jsx-no-multiline-js
                    this.renderKeyboardItem(item, index)
                )}
                <KeyboardItem2
                    props={
                      {
                        ...this.getAriaAttr(backspaceLabel),
                        type: 'keyboard-delete',
                        rowSpan: 2
                      }
                    }
                    on={
                      {
                        click: e => this.onKeyboardClick(e, 'delete')
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
                    props={
                      {
                        type: 'keyboard-confirm',
                        rowSpan: 2
                      }
                    }
                    on={
                      {
                        click: e => this.onKeyboardClick(e, 'confirm')
                      }
                    }
                    tdRef={'td'}
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
                    props={
                      {
                        ...this.getAriaAttr(cancelKeyboardLabel),
                        type: 'keyboard-hide'
                      }
                    }
                    on={
                      {
                        click: e => this.onKeyboardClick(e, 'hide')
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
