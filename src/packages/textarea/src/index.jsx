import classnames from 'classnames';
import { defineComponent, onBeforeUnmount, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import List from '../../list';
import { formComponentProps, useFormComponent } from '../../mixins/form-component';
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
export default defineComponent({
    name: 'MTextarea',
    props: Object.assign(Object.assign({}, formComponentProps), { prefixCls: {
            type: String,
            default: 'am-textarea'
        }, prefixListCls: {
            type: String,
            default: 'am-list'
        }, title: {
            type: String
        }, maxLength: {
            type: Number
        }, name: {
            type: String
        }, placeholder: {
            default: ''
        }, clearable: {
            type: Boolean,
            default: false
        }, rows: {
            type: Number,
            default: 1
        }, count: {
            type: Number
        }, autoHeight: {
            type: Boolean,
            default: false
        }, labelNumber: {
            type: Number,
            default: 5
        } }),
    setup(props, { emit, slots, attrs }) {
        const { isReadonly, isDisabled } = useFormComponent(props, { emit });
        const debounceTimeout = ref(null);
        const state = reactive({ focus: false, value: props.value || '' });
        watch(() => props.value, (value) => {
            state.value = fixControlledValue(value);
        });
        watch(() => state.value, (value) => {
            emit('update:value', value);
        });
        const textareaRef = ref(null);
        const focus = () => {
            textareaRef.value.focus();
        };
        const reAlignHeight = () => {
            const textareaDom = textareaRef.value;
            textareaDom.style.height = ''; // 字数减少时能自动减小高度
            textareaDom.style.height = `${textareaDom.scrollHeight}px`;
        };
        const onChange = (e) => {
            const value = e.target.value;
            state.value = value;
            emit('change', value);
        };
        const onBlur = (e) => {
            debounceTimeout.value = setTimeout(() => {
                if (document.activeElement !== textareaRef.value) {
                    state.focus = false;
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
            emit('blur', value);
        };
        const onFocus = (e) => {
            if (debounceTimeout.value) {
                clearTimeout(debounceTimeout.value);
                debounceTimeout.value = null;
            }
            state.focus = true;
            const value = e.currentTarget.value;
            emit('focus', value);
        };
        const clearInput = () => {
            state.value = '';
            emit('change', '');
        };
        const onInput = (e) => {
            state.value = e.target.value;
            if (props.autoHeight && state.focus) {
                reAlignHeight();
            }
        };
        onMounted(() => {
            if (props.autoHeight) {
                reAlignHeight();
            }
        });
        onUpdated(() => {
            if (props.autoHeight && state.focus) {
                reAlignHeight();
            }
        });
        onBeforeUnmount(() => {
            if (debounceTimeout.value) {
                clearTimeout(debounceTimeout.value);
                debounceTimeout.value = null;
            }
        });
        return {
            setTextareaRef(el) {
                textareaRef.value = el;
            }, state, isDisabled, isReadonly,
            onInput, onChange, onBlur, onFocus, clearInput,
            focus
        };
    },
    render() {
        const { prefixCls, prefixListCls, editable, clearable, count, labelNumber, title, autoHeight, disabled } = this;
        const { value, focus } = this.state;
        const hasCount = count > 0 && this.rows > 1;
        const wrapCls = classnames(`${prefixListCls}-item`, `${prefixCls}-item`, {
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-item-single-line`]: this.rows === 1 && !autoHeight,
            [`${prefixCls}-focus`]: focus,
            [`${prefixCls}-has-count`]: hasCount
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
        const slots = {
            extra: () => {
                return <div class={`${prefixCls}-control`} slot="extra">
          <textarea ref={this.setTextareaRef} {...lengthCtrlProps} rows={this.rows} disabled={this.isDisabled} name={this.name} placeholder={this.placeholder} value={value} oninput={this.onInput} onChange={this.onChange} onBlur={this.onBlur} onFocus={this.onFocus} readOnly={!editable}/>
          {clearable &&
                    editable &&
                    value &&
                    characterLength > 0 && (
                // @ts-ignore
                <TouchFeedback activeClassName={`${prefixCls}-clear-active`}>
              <div class={`${prefixCls}-clear`} onClick={this.clearInput}/>
            </TouchFeedback>)}
          {hasCount && (<span class={`${prefixCls}-count`}>
            <span>{value ? characterLength : 0}</span>/{count}
          </span>)}
        </div>;
            }
        };
        return (<List.Item class={wrapCls} required={this.required} disabled={this.isDisabled} v-slots={slots} title={title}/>);
    }
});
//# sourceMappingURL=index.jsx.map