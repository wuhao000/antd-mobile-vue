import classNames from 'classnames';
import { defineComponent, onBeforeUpdate, onMounted, ref } from 'vue';
import { baseComponentProps, useBaseComponent } from './base';
import InputHandler from './input-handler';
function noop() {
}
function preventDefault(e) {
    e.preventDefault();
}
const InputNumber = defineComponent({
    name: 'InputNumber',
    props: Object.assign(Object.assign({}, baseComponentProps), { valueEditable: {
            type: Boolean,
            default: false
        }, focusOnUpDown: {
            type: Boolean,
            default: false
        }, prefixCls: {
            type: String,
            default: 'rmc-input-number'
        }, tabIndex: {
            type: Number
        }, upHandler: {
            type: Object
        }, downHandler: {
            type: Object
        }, formatter: {
            type: Function
        } }),
    setup(props, { emit, slots, attrs }) {
        const { state, stop, up, onFocus, onBlur, onChange, down, toPrecisionAsStep } = useBaseComponent(props, { emit });
        const start = ref(null);
        const end = ref(null);
        const inputRef = ref(null);
        const update = () => {
            if (props.focusOnUpDown && state.focused) {
                const selectionRange = inputRef.value.setSelectionRange;
                if (selectionRange &&
                    typeof selectionRange === 'function' &&
                    start.value !== undefined &&
                    end.value !== undefined &&
                    start.value !== end.value) {
                    inputRef.value.setSelectionRange(start.value, end.value);
                }
                else {
                    focus();
                }
            }
        };
        const focus = () => {
            inputRef.value.focus();
        };
        const formatWrapper = (num) => {
            if (props.formatter) {
                return props.formatter(num);
            }
            return num;
        };
        onMounted(() => {
            update();
        });
        onBeforeUpdate(() => {
            try {
                start.value = inputRef.value.selectionStart;
                end.value = inputRef.value.selectionEnd;
            }
            catch (e) {
                // Fix error in Chrome:
                // Failed to read the 'selectionStart' property from 'HTMLInputElement'
                // http://stackoverflow.com/q/21177489/3040605
            }
        });
        return {
            state, toPrecisionAsStep,
            stop, up, down, formatWrapper,
            onFocus, onBlur, onChange,
            setInputRef(el) {
                inputRef.value = el;
            }
        };
    },
    render() {
        const { prefixCls = '', disabled, readOnly, max, step, valueEditable, autoFocus, tabIndex, min } = this;
        const classes = classNames({
            [prefixCls]: true,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-focused`]: this.state.focused
        });
        let upDisabledClass = '';
        let downDisabledClass = '';
        const { inputValue } = this.state;
        if (inputValue || inputValue === 0) {
            if (!isNaN(inputValue)) {
                const val = Number(inputValue);
                if (val >= max) {
                    upDisabledClass = `${prefixCls}-handler-up-disabled`;
                }
                if (val <= min) {
                    downDisabledClass = `${prefixCls}-handler-down-disabled`;
                }
            }
            else {
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
        }
        else {
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
            click: (...args) => {
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
            click: (...args) => {
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
        return (<div class={classes}>
        <div class={`${prefixCls}-handler-wrap`}>
          <InputHandler disabled={isUpDisabled} prefixCls={prefixCls} unselectable="unselectable" on={Object.assign({}, upEvents)} role="button" aria-label="Increase Value" aria-disabled={isUpDisabled} class={`${prefixCls}-handler ${prefixCls}-handler-up ${upDisabledClass}`}>
            {this.upHandler || <span unselectable="off" class={`${prefixCls}-handler-up-inner`} onClick={preventDefault}/>}
          </InputHandler>
          <InputHandler disabled={isDownDisabled} prefixCls={prefixCls} unselectable="unselectable" on={Object.assign({}, downEvents)} role="button" aria-label="Decrease Value" aria-disabled={isDownDisabled} class={`${prefixCls}-handler ${prefixCls}-handler-down ${downDisabledClass}`}>
            {this.downHandler || <span unselectable="off" class={`${prefixCls}-handler-down-inner`} onClick={preventDefault}/>}
          </InputHandler>
        </div>
        <div class={`${prefixCls}-input-wrap`} role="spinbutton" aria-valuemin={min} aria-valuemax={max} aria-valuenow={inputValue}>
          <input class={`${prefixCls}-input`} tabindex={tabIndex} autocomplete="off" onFocus={this.onFocus} onBlur={this.onBlur} autofocus={autoFocus} readonly={readOnly || !valueEditable} disabled={disabled} max={max} min={min} step={step} onChange={this.onChange} ref={this.setInputRef} value={inputDisplayValueFormat}/>
        </div>
      </div>);
    }
});
export default InputNumber;
//# sourceMappingURL=index.jsx.map