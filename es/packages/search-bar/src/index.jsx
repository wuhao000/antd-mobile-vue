import * as tslib_1 from "tslib";
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import TouchFeedback from '../../vmc-feedback';
function onNextFrame(cb) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}
function clearNextFrameAction(nextFrameId) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    }
    else {
        window.clearTimeout(nextFrameId);
    }
}
let SearchBar = class SearchBar extends Vue {
    constructor() {
        super(...arguments);
        this.state = {
            value: this.value || '',
            focus: false
        };
    }
    get inputRef() {
        return this.$refs['input'];
    }
    get rightBtnRef() {
        return this.$refs['rightBtn'];
    }
    get syntheticPhContainerRef() {
        return this.$refs['syntheticPhContainer'];
    }
    get syntheticPhRef() {
        return this.$refs['syntheticPh'];
    }
    get inputContainerRef() {
        return this.$refs['inputContainer'];
    }
    mounted() {
        if (this.rightBtnRef) {
            const initBtn = window.getComputedStyle(this.rightBtnRef);
            this.rightBtnInitMarginleft = initBtn.marginLeft;
        }
        this.update();
    }
    updated() {
        this.update();
    }
    update() {
        if (this.syntheticPhRef) {
            if (this.inputContainerRef &&
                this.inputContainerRef.className.indexOf(`${this.prefixCls}-start`) > -1) {
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
            }
            else {
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
    valueChanged(value) {
        this.state.value = value;
    }
    beforeDestroy() {
        if (this.onBlurTimeout) {
            clearNextFrameAction(this.onBlurTimeout);
            this.onBlurTimeout = null;
        }
    }
    onSubmit(e) {
        e.preventDefault();
        this.$emit('submit', this.state.value || '');
        if (this.inputRef) {
            this.inputRef.blur();
        }
    }
    stateValueChanged(value) {
        this.$emit('input', value);
    }
    onChange(e) {
        if (!this.state.focus) {
            this.state.focus = true;
        }
        const value = e.target.value;
        this.state.value = value;
        this.$emit('change', value);
    }
    onFocus() {
        this.state.focus = true;
        this.firstFocus = true;
        this.$emit('focus');
    }
    onBlur() {
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
    onClear() {
        this.doClear();
    }
    doClear(blurFromOnClear = true) {
        this.blurFromOnClear = blurFromOnClear;
        this.state.value = '';
        this.$emit('clear');
        this.$emit('change');
        if (blurFromOnClear) {
            this.focus();
        }
    }
    onCancel() {
        this.$emit('cancel');
        this.doClear(false);
    }
    focus() {
        if (this.inputRef) {
            this.inputRef.focus();
        }
    }
    render() {
        const { prefixCls, showCancelButton, disabled, placeholder, maxLength } = this;
        // tslint:disable-next-line:variable-name
        const cancelText = '取消';
        const { value, focus } = this.state;
        const wrapCls = classnames(prefixCls, {
            [`${prefixCls}-start`]: (focus || (value && value.length > 0))
        });
        const clearCls = classnames(`${prefixCls}-clear`, {
            [`${prefixCls}-clear-show`]: (focus && value && value.length > 0)
        });
        const cancelCls = classnames(`${prefixCls}-cancel`, {
            [`${prefixCls}-cancel-show`]: (showCancelButton ||
                focus ||
                (value && value.length > 0)),
            [`${prefixCls}-cancel-anim`]: this.firstFocus
        });
        const TouchFeedback2 = TouchFeedback;
        return (<form onSubmit={this.onSubmit} class={wrapCls} ref={'inputContainer'} action={'#'}>
        <div class={`${prefixCls}-input`}>
          <div class={`${prefixCls}-synthetic-ph`} ref={'syntheticPh'}>
            <span class={`${prefixCls}-synthetic-ph-container`} ref={'syntheticPhContainer'}>
              <i class={`${prefixCls}-synthetic-ph-icon`}/>
              <span class={`${prefixCls}-synthetic-ph-placeholder`} 
        // tslint:disable-next-line:jsx-no-multiline-js
        style={{
            visibility: placeholder && !value ? 'visible' : 'hidden'
        }}>
                {placeholder}
              </span>
            </span>
          </div>
          <input type={'search'} class={`${prefixCls}-value`} value={value} disabled={disabled} placeholder={placeholder} onInput={this.onChange} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} ref={'input'} maxLength={maxLength}/>
          <TouchFeedback2 activeclass={`${prefixCls}-clear-active`}>
            <a onClick={this.onClear} class={clearCls}/>
          </TouchFeedback2>
        </div>
        <div class={cancelCls} onClick={this.onCancel} ref={'rightBtn'}>
          {this.cancelText || cancelText}
        </div>
      </form>);
    }
};
SearchBar.contextTypes = {
    antLocale: PropTypes.object
};
tslib_1.__decorate([
    Prop({ type: String, default: 'am-search' })
], SearchBar.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], SearchBar.prototype, "defaultValue", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], SearchBar.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], SearchBar.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], SearchBar.prototype, "showCancelButton", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], SearchBar.prototype, "cancelText", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], SearchBar.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], SearchBar.prototype, "autoFocus", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], SearchBar.prototype, "focused", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], SearchBar.prototype, "maxLength", void 0);
tslib_1.__decorate([
    Watch('value')
], SearchBar.prototype, "valueChanged", null);
tslib_1.__decorate([
    Watch('state.value')
], SearchBar.prototype, "stateValueChanged", null);
SearchBar = tslib_1.__decorate([
    Component({
        name: 'SearchBar'
    })
], SearchBar);
export default SearchBar;
//# sourceMappingURL=index.jsx.map