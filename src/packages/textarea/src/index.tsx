import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import {FormComponent} from '../../../mixins/form-component';
import List from '../../list';
import {IS_IOS} from '../../utils/exenv';
import TouchFeedback from '../../vmc-feedback';

function fixControlledValue(value?: string) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g;

function countSymbols(text = '') {
  return text.replace(regexAstralSymbols, '_').length;
}

@Component({
  name: 'MTextarea'
})
export default class Textarea extends FormComponent {
  @Prop({type: String, default: 'am-textarea'})
  public prefixCls?: string;
  @Prop({type: String, default: 'am-list'})
  public prefixListCls?: string;
  @Prop({type: String})
  public title?: string;
  @Prop({type: Number})
  public maxLength?: number;
  @Prop({type: String})
  public name?: string;
  @Prop({default: ''})
  public placeholder?: string;
  @Prop({type: Boolean, default: false})
  public clearable?: boolean;
  @Prop({type: Number, default: 1})
  public rows?: number;
  @Prop()
  public count?: number;
  @Prop({type: Boolean, default: false})
  public autoHeight?: boolean;
  @Prop({type: Number, default: 5})
  public labelNumber?: number;

  get textareaRef(): any {
    return this.$refs['textarea'];
  }

  private debounceTimeout: any;
  public state = {focus: false, value: this.value || ''};

  public focus() {
    this.textareaRef.focus();
  }

  @Watch('value')
  public valueChanged(value: string) {
    this.state.value = fixControlledValue(value);
  }

  public mounted() {
    if (this.autoHeight) {
      this.reAlignHeight();
    }
  }

  public updated() {
    if (this.autoHeight && this.state.focus) {
      this.reAlignHeight();
    }
  }

  public reAlignHeight() {
    const textareaDom = this.textareaRef;
    textareaDom.style.height = ''; // 字数减少时能自动减小高度
    textareaDom.style.height = `${textareaDom.scrollHeight}px`;
  }

  public beforeDestroy() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
  }

  @Watch('state.value')
  public stateValueChanged(value: string) {
    this.$emit('input', value);
  }

  public onChange(e) {
    const value = e.target.value;
    this.state.value = value;
    this.$emit('change', value);
  }

  public onBlur(e) {
    this.debounceTimeout = setTimeout(() => {
      if (document.activeElement !== this.textareaRef) {
        this.state.focus = false;
      }
    }, 150);
    const value = e.currentTarget.value;
    // fix autoFocus item blur with flash
    setTimeout(() => {
      // fix ios12 wechat browser click failure after input
      if (document.body) {
        document.body.scrollTop = document.body.scrollTop;
      }
    }, 100);
    this.$emit('blur', value);
  }

  public onFocus(e) {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = null;
    }
    this.state.focus = true;
    const value = e.currentTarget.value;
    this.$emit('focus', value);
  }

  public clearInput() {
    this.state.value = '';
    this.$emit('change', '');
  }

  public onInput(e) {
    this.state.value = e.target.value;
    if (this.autoHeight && this.state.focus) {
      this.reAlignHeight();
    }
  }

  public render() {
    const {
      prefixCls,
      prefixListCls,
      editable,
      clearable,
      count,
      labelNumber,
      title,
      autoHeight,
      disabled
    } = this;
    const {value, focus} = this.state;
    const hasCount = count! > 0 && this.rows! > 1;

    const wrapCls = classnames(
      `${prefixListCls}-item`,
      `${prefixCls}-item`,
      {
        [`${prefixCls}-disabled`]: disabled,
        [`${prefixCls}-item-single-line`]: this.rows === 1 && !autoHeight,
        [`${prefixCls}-focus`]: focus,
        [`${prefixCls}-has-count`]: hasCount
      }
    );

    const labelCls = classnames(`${prefixCls}-label`, {
      [`${prefixCls}-label-2`]: labelNumber === 2,
      [`${prefixCls}-label-3`]: labelNumber === 3,
      [`${prefixCls}-label-4`]: labelNumber === 4,
      [`${prefixCls}-label-5`]: labelNumber === 5,
      [`${prefixCls}-label-6`]: labelNumber === 6,
      [`${prefixCls}-label-7`]: labelNumber === 7
    });
    const characterLength = countSymbols(value);
    const lengthCtrlProps: any = {};
    if (count! > 0) {
      // Note: If in the iOS environment of dev-tools, It will fail.
      if (IS_IOS) {
        const entValue = value ? value.replace(regexAstralSymbols, '_') : '';
        const entLen = entValue ? entValue.split('_').length - 1 : 0;
        lengthCtrlProps.maxLength =
          count! + entLen - characterLength + (value ? value.length : 0);
      } else {
        lengthCtrlProps.maxLength =
          count! - characterLength + (value ? value.length : 0);
      }
    }
    return (
      <List.Item class={wrapCls}
                 disabled={this.isDisabled}
                 title={title}>
        <div class={`${prefixCls}-control`} slot="extra">
          <textarea
            ref={'textarea'}
            {...lengthCtrlProps}
            rows={this.rows}
            disabled={this.isDisabled}
            name={this.name}
            placeholder={this.placeholder}
            value={value}
            oninput={this.onInput}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            readOnly={!editable}
          />
          {clearable &&
          editable &&
          value &&
          characterLength > 0 && (
            // @ts-ignore
            <TouchFeedback activeClassName={`${prefixCls}-clear-active`}>
              <div
                class={`${prefixCls}-clear`}
                onclick={this.clearInput}
              />
            </TouchFeedback>
          )}
          {hasCount && (
            <span class={`${prefixCls}-count`}>
            <span>{value ? characterLength : 0}</span>/{count}
          </span>
          )}
        </div>
      </List.Item>
    );
  }
}
