import classnames from 'classnames';
import PropTypes from 'prop-types';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import TouchFeedback from '../../vmc-feedback';

function onNextFrame(cb: () => void) {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame(cb);
  }
  return window.setTimeout(cb, 1);
}

function clearNextFrameAction(nextFrameId: number) {
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(nextFrameId);
  } else {
    window.clearTimeout(nextFrameId);
  }
}

@Component({
  name: 'SearchBar'
})
export default class SearchBar extends Vue {
  @Prop({type: String, default: 'am-search'})
  public prefixCls?: string;
  @Prop({type: String})
  public defaultValue?: string;
  @Prop({type: String})
  public value?: string;
  @Prop({type: String})
  public placeholder?: string;
  @Prop({type: Boolean})
  public showCancelButton?: boolean;
  @Prop({type: String})
  public cancelText?: string;
  @Prop({type: Boolean})
  public disabled?: boolean;
  @Prop({type: Boolean})
  public autoFocus?: boolean;
  @Prop({type: Boolean})
  public focused?: boolean;
  @Prop({type: Number})
  public maxLength?: number;
  public static contextTypes = {
    antLocale: PropTypes.object
  };
  public rightBtnInitMarginleft: string | null;
  public firstFocus: boolean;
  public blurFromOnClear: boolean;
  public onBlurTimeout: number | null;

  get inputRef(): HTMLInputElement | null {
    return this.$refs['input'] as any;
  }

  get rightBtnRef(): HTMLDivElement | null {
    return this.$refs['rightBtn'] as any;
  }

  get syntheticPhContainerRef(): HTMLSpanElement | null {
    return this.$refs['syntheticPhContainer'] as any;
  }

  get syntheticPhRef(): HTMLDivElement | null {
    return this.$refs['syntheticPh'] as any;
  }

  get inputContainerRef(): HTMLFormElement | null {
    return this.$refs['inputContainer'] as any;
  }

  public state = {
    value: this.value || '',
    focus: false
  };

  public mounted() {
    if (this.rightBtnRef) {
      const initBtn = window.getComputedStyle(this.rightBtnRef);
      this.rightBtnInitMarginleft = initBtn.marginLeft;
    }
    this.update();
  }

  public updated() {
    this.update();
  }

  public update() {
    if (this.syntheticPhRef) {
      if (
        this.inputContainerRef &&
        this.inputContainerRef.className.indexOf(
          `${this.prefixCls}-start`
        ) > -1
      ) {
        // 检测是否包含名为 ${this.props.prefixCls}-start 样式，生成动画
        // offsetWidth 某些时候是向上取整，某些时候是向下取整，不能用
        if (this.syntheticPhContainerRef) {
          const realWidth = this.syntheticPhContainerRef.getBoundingClientRect()
            .width; // 包含小数
          this.syntheticPhRef.style.width = `${Math.ceil(realWidth)}px`;
        }
        if (!this.showCancelButton && this.rightBtnRef) {
          this.rightBtnRef.style.marginRight = '0';
        }
      } else {
        this.syntheticPhRef.style.width = '100%';
        if (!this.showCancelButton && this.rightBtnRef) {
          this.rightBtnRef.style.marginRight = `-${this.rightBtnRef
            .offsetWidth +
          (this.rightBtnInitMarginleft != null
            ? parseInt(this.rightBtnInitMarginleft, 10)
            : 0)}px`;
        }
      }
    }
  }

  @Watch('value')
  public valueChanged(value: string) {
    this.state.value = value;
  }

  public beforeDestroy() {
    if (this.onBlurTimeout) {
      clearNextFrameAction(this.onBlurTimeout);
      this.onBlurTimeout = null;
    }
  }

  public onSubmit(e) {
    e.preventDefault();
    this.$emit('submit', this.state.value || '');
    if (this.inputRef) {
      this.inputRef.blur();
    }
  }

  @Watch('state.value')
  public stateValueChanged(value: string) {
    this.$emit('input', value);
  }

  public onChange(e) {
    if (!this.state.focus) {
      this.state.focus = true;
    }
    const value = e.target.value;
    this.state.value = value;
    this.$emit('change', value);
  }

  public onFocus() {
    this.state.focus = true;
    this.firstFocus = true;
    this.$emit('focus');
  }

  public onBlur() {
    this.onBlurTimeout = onNextFrame(() => {
      if (!this.blurFromOnClear) {
        if (document.activeElement !== this.inputRef) {
          this.state.focus = false;
        }
      }
      this.blurFromOnClear = false;
    });
    // fix autoFocus item blur with flash
    if (this.$listeners && this.$listeners.blur) {
      setTimeout(() => {
        // fix ios12 wechat browser click failure after input
        if (document.body) {
          document.body.scrollTop = document.body.scrollTop;
        }
      }, 100);
      this.$emit('blur');
    }
  }

  public onClear() {
    this.doClear();
  }

  public doClear(blurFromOnClear = true) {
    this.blurFromOnClear = blurFromOnClear;
    this.state.value = '';
    this.$emit('clear');
    this.$emit('change');
    if (blurFromOnClear) {
      this.focus();
    }
  }

  public onCancel() {
    this.$emit('cancel');
    this.doClear(false);
  }

  public focus() {
    if (this.inputRef) {
      this.inputRef.focus();
    }
  }

  public render() {
    const {
      prefixCls,
      showCancelButton,
      disabled,
      placeholder,
      maxLength
    } = this;

    // tslint:disable-next-line:variable-name
    const cancelText = '取消';

    const {value, focus} = this.state;

    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-start`]: (focus || (value && value.length > 0))
    });

    const clearCls = classnames(`${prefixCls}-clear`, {
      [`${prefixCls}-clear-show`]: (focus && value && value.length > 0)
    });

    const cancelCls = classnames(`${prefixCls}-cancel`, {
      [`${prefixCls}-cancel-show`]: (
        showCancelButton ||
        focus ||
        (value && value.length > 0)
      ),
      [`${prefixCls}-cancel-anim`]: this.firstFocus
    });
    const TouchFeedback2 = TouchFeedback as any;
    return (
      <form
        onSubmit={this.onSubmit}
        class={wrapCls}
        ref={'inputContainer'}
        action={'#'}
      >
        <div class={`${prefixCls}-input`}>
          <div
            class={`${prefixCls}-synthetic-ph`}
            ref={'syntheticPh'}
          >
            <span
              class={`${prefixCls}-synthetic-ph-container`}
              ref={'syntheticPhContainer'}
            >
              <i class={`${prefixCls}-synthetic-ph-icon`}/>
              <span
                class={`${prefixCls}-synthetic-ph-placeholder`}
                // tslint:disable-next-line:jsx-no-multiline-js
                style={{
                  visibility: placeholder && !value ? 'visible' : 'hidden'
                }}
              >
                {placeholder}
              </span>
            </span>
          </div>
          <input
            type={'search'}
            class={`${prefixCls}-value`}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onInput={this.onChange}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            ref={'input'}
            maxLength={maxLength}
          />
          <TouchFeedback2 activeclass={`${prefixCls}-clear-active`}>
            <a onClick={this.onClear} class={clearCls}/>
          </TouchFeedback2>
        </div>
        <div
          class={cancelCls}
          onClick={this.onCancel}
          ref={'rightBtn'}>
          {this.cancelText || cancelText}
        </div>
      </form>
    );
  }
}
