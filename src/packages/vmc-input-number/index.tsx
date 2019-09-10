import classNames from 'classnames';
import {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import BaseComponent from './base';
import InputHandler from './input-handler';

function noop() {
}

function preventDefault(e: any) {
  e.preventDefault();
}

@Component({
  name: 'InputNumber'
})
class InputNumber extends BaseComponent {

  @Prop({type: Boolean, default: false})
  public valueEditable: boolean;
  @Prop({type: Boolean, default: false})
  public focusOnUpDown?: boolean;
  @Prop({type: String, default: 'rmc-input-number'})
  public prefixCls?: string;
  @Prop(Number)
  public tabIndex?: number;
  @Prop(Object)
  public upHandler?: VNode;
  @Prop(Object)
  public downHandler?: VNode;
  @Prop(Function)
  public formatter?: (v: any) => void;

  public start: any;
  public end: any;

  get input(): any {
    return this.$refs.input;

  }

  public update() {
    if (this.focusOnUpDown && this.state.focused) {
      const selectionRange = this.input.setSelectionRange;
      if (selectionRange &&
        typeof selectionRange === 'function' &&
        this.start !== undefined &&
        this.end !== undefined &&
        this.start !== this.end) {
        this.input.setSelectionRange(this.start, this.end);
      } else {
        this.focus();
      }
    }
  }

  public mounted() {
    this.update();
  }

  public beforeUpdate() {
    try {
      this.start = this.input.selectionStart;
      this.end = this.input.selectionEnd;
    } catch (e) {
      // Fix error in Chrome:
      // Failed to read the 'selectionStart' property from 'HTMLInputElement'
      // http://stackoverflow.com/q/21177489/3040605
    }
  }

  public focus() {
    this.input.focus();
  }

  public formatWrapper(num: any) {
    if (this.formatter) {
      return this.formatter(num);
    }
    return num;
  }

  public render() {
    const {prefixCls = '', disabled, readOnly, max, step, valueEditable, autoFocus, tabIndex, min} = this;
    const classes = classNames({
      [prefixCls]: true,
      [`${prefixCls}-disabled`]: disabled,
      [`${prefixCls}-focused`]: this.state.focused
    });
    let upDisabledClass = '';
    let downDisabledClass = '';
    const {inputValue} = this.state;
    if (inputValue || inputValue === 0) {
      if (!isNaN(inputValue)) {
        const val = Number(inputValue);
        if (val >= (max as number)) {
          upDisabledClass = `${prefixCls}-handler-up-disabled`;
        }
        if (val <= (min as number)) {
          downDisabledClass = `${prefixCls}-handler-down-disabled`;
        }
      } else {
        upDisabledClass = `${prefixCls}-handler-up-disabled`;
        downDisabledClass = `${prefixCls}-handler-down-disabled`;
      }
    }

    const editable = !readOnly && !disabled;

    // focus state, show input value
    // unfocus state, show valid value
    let inputDisplayValue;
    if (this.state.focused) {
      inputDisplayValue = this.state.inputValue;
    } else {
      inputDisplayValue = this.toPrecisionAsStep(this.state.inputValue);
    }
    if (inputDisplayValue === undefined || inputDisplayValue === null) {
      inputDisplayValue = '';
    }
    let upEvents;
    let downEvents;
    upEvents = {
      touchstart: (editable && !upDisabledClass) ? this.up : noop,
      touchend: this.stop,
      click: (...args: any[]) => {
        if (editable && !upDisabledClass) {
          // @ts-ignore
          this.up(...args);
          this.stop();
        }
      }
    };
    downEvents = {
      touchstart: (editable && !downDisabledClass) ? this.down : noop,
      touchend: this.stop,
      click: (...args: any[]) => {
        if (editable && !upDisabledClass) {
          // @ts-ignore
          this.down(...args);
          this.stop();
        }
      }
    };
    const inputDisplayValueFormat = this.formatWrapper(inputDisplayValue);
    const isUpDisabled = !!upDisabledClass || disabled || readOnly;
    const isDownDisabled = !!downDisabledClass || disabled || readOnly;
    return (
      <div class={classes}>
        <div class={`${prefixCls}-handler-wrap`}>
          <InputHandler
            disabled={isUpDisabled}
            prefixCls={prefixCls}
            unselectable="unselectable"
            on={
              {...upEvents}
            }
            role="button"
            aria-label="Increase Value"
            aria-disabled={isUpDisabled}
            class={`${prefixCls}-handler ${prefixCls}-handler-up ${upDisabledClass}`}
          >
            {this.upHandler || <span
                unselectable="unselectable"
                class={`${prefixCls}-handler-up-inner`}
                onClick={preventDefault}
            />}
          </InputHandler>
          <InputHandler
            disabled={isDownDisabled}
            prefixCls={prefixCls}
            unselectable="unselectable"
            on={{...downEvents}}
            role="button"
            aria-label="Decrease Value"
            aria-disabled={isDownDisabled}
            class={`${prefixCls}-handler ${prefixCls}-handler-down ${downDisabledClass}`}>
            {this.downHandler || <span
                unselectable="unselectable"
                class={`${prefixCls}-handler-down-inner`}
                onClick={preventDefault}
            />}
          </InputHandler>
        </div>
        <div
          class={`${prefixCls}-input-wrap`}
          role="spinbutton"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={inputValue}
        >
          <input
            class={`${prefixCls}-input`}
            tabIndex={tabIndex}
            autoComplete="off"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            autoFocus={autoFocus}
            readOnly={readOnly || !valueEditable}
            disabled={disabled}
            max={max}
            min={min}
            step={step}
            onChange={this.onChange}
            ref="input"
            value={inputDisplayValueFormat}
          />
        </div>
      </div>
    );
  }
}

export default InputNumber as any;
