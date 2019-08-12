import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { IS_IOS } from '../../utils/exenv';
import TouchFeedback from '../../vmc-feedback';
function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}
const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]|\n/g;
function countSymbols(text = '') {
    return text.replace(regexAstralSymbols, '_').length;
}
let Textarea = class Textarea extends Vue {
    constructor() {
        super(...arguments);
        this.state = { focus: false, value: this.value || this.defaultValue || '' };
    }
    get textareaRef() {
        return this.$refs['textarea'];
    }
    focus() {
        this.textareaRef.focus();
    }
    valueChanged(value) {
        this.state.value = fixControlledValue(value);
    }
    mounted() {
        if (this.autoHeight) {
            this.reAlignHeight();
        }
    }
    updated() {
        if (this.autoHeight && this.state.focus) {
            this.reAlignHeight();
        }
    }
    reAlignHeight() {
        const textareaDom = this.textareaRef;
        textareaDom.style.height = ''; // 字数减少时能自动减小高度
        textareaDom.style.height = `${textareaDom.scrollHeight}px`;
    }
    beforeDestroy() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
    }
    stateValueChanged(value) {
        this.$emit('input', value);
    }
    onChange(e) {
        const value = e.target.value;
        this.state.value = value;
        this.$emit('change', value);
    }
    onBlur(e) {
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
    onFocus(e) {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
        this.state.focus = true;
        const value = e.currentTarget.value;
        this.$emit('focus', value);
    }
    onErrorClick() {
        this.$emit('error-click');
    }
    clearInput() {
        this.state.value = '';
        this.$emit('change', '');
    }
    onInput(e) {
        this.state.value = e.target.value;
        if (this.autoHeight && this.state.focus) {
            this.reAlignHeight();
        }
    }
    render() {
        const { prefixCls, prefixListCls, editable, clearable, error, count, labelNumber, title, autoHeight, disabled } = this;
        const { value, focus } = this.state;
        const hasCount = count > 0 && this.rows > 1;
        const wrapCls = classnames(`${prefixListCls}-item`, `${prefixCls}-item`, {
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-item-single-line`]: this.rows === 1 && !autoHeight,
            [`${prefixCls}-error`]: error,
            [`${prefixCls}-focus`]: focus,
            [`${prefixCls}-has-count`]: hasCount
        });
        const labelCls = classnames(`${prefixCls}-label`, {
            [`${prefixCls}-label-2`]: labelNumber === 2,
            [`${prefixCls}-label-3`]: labelNumber === 3,
            [`${prefixCls}-label-4`]: labelNumber === 4,
            [`${prefixCls}-label-5`]: labelNumber === 5,
            [`${prefixCls}-label-6`]: labelNumber === 6,
            [`${prefixCls}-label-7`]: labelNumber === 7
        });
        const characterLength = countSymbols(value);
        const lengthCtrlProps = {};
        if (count > 0) {
            // Note: If in the iOS environment of dev-tools, It will fail.
            if (IS_IOS) {
                const entValue = value ? value.replace(regexAstralSymbols, '_') : '';
                const entLen = entValue ? entValue.split('_').length - 1 : 0;
                lengthCtrlProps.maxLength =
                    count + entLen - characterLength + (value ? value.length : 0);
            }
            else {
                lengthCtrlProps.maxLength =
                    count - characterLength + (value ? value.length : 0);
            }
        }
        return (<div class={wrapCls}>
        {title && <div class={labelCls}>{title}</div>}
        <div class={`${prefixCls}-control`}>
          <textarea ref={'textarea'} {...lengthCtrlProps} rows={this.rows} disabled={this.disabled} name={this.name} placeholder={this.placeholder} value={value} oninput={this.onInput} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} readOnly={!editable}/>
        </div>
        {clearable &&
            editable &&
            value &&
            characterLength > 0 && (
        // @ts-ignore
        <TouchFeedback activeClassName={`${prefixCls}-clear-active`}>
            <div class={`${prefixCls}-clear`} onclick={this.clearInput}/>
          </TouchFeedback>)}
        {error && (<div class={`${prefixCls}-error-extra`} onClick={this.onErrorClick}/>)}
        {hasCount && (<span class={`${prefixCls}-count`}>
            <span>{value ? characterLength : 0}</span>/{count}
          </span>)}
      </div>);
    }
};
tslib_1.__decorate([
    Prop({ type: String, default: 'am-textarea' })
], Textarea.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-list' })
], Textarea.prototype, "prefixListCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Textarea.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], Textarea.prototype, "maxLength", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Textarea.prototype, "name", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Textarea.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Textarea.prototype, "defaultValue", void 0);
tslib_1.__decorate([
    Prop({ default: '' })
], Textarea.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Textarea.prototype, "clearable", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 1 })
], Textarea.prototype, "rows", void 0);
tslib_1.__decorate([
    Prop()
], Textarea.prototype, "count", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Textarea.prototype, "error", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Textarea.prototype, "autoHeight", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], Textarea.prototype, "editable", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Textarea.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 5 })
], Textarea.prototype, "labelNumber", void 0);
tslib_1.__decorate([
    Watch('value')
], Textarea.prototype, "valueChanged", null);
tslib_1.__decorate([
    Watch('state.value')
], Textarea.prototype, "stateValueChanged", null);
Textarea = tslib_1.__decorate([
    Component({
        name: 'MTextarea'
    })
], Textarea);
export default Textarea;
//# sourceMappingURL=index.jsx.map