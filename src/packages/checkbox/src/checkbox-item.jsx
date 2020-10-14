import { __rest } from "tslib";
import classnames from 'classnames';
import { defineComponent, reactive, watch } from 'vue';
import List from '../../list';
import Checkbox from './checkbox';
const CheckboxItem = defineComponent({
    name: 'MCheckboxItem',
    props: {
        thumbStyle: {
            type: Object,
            default: () => ({})
        },
        listPrefixCls: {
            type: String,
            default: 'am-list'
        },
        prefixCls: {
            type: String,
            default: 'am-checkbox'
        },
        name: {
            type: String
        },
        wrapLabel: {
            type: Boolean,
            default: false
        },
        checkboxProps: {
            type: Object,
            default: () => {
                return {};
            }
        },
        extra: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        value: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const state = reactive({
            value: props.value
        });
        watch(() => props.value, (value) => {
            state.value = value;
        });
        watch(() => state.value, (value) => {
            emit('update:value', value);
            emit('change', value);
        });
        const onChange = (value) => {
        };
        const onClick = (e) => {
            if (!props.disabled) {
                state.value = !state.value;
            }
        };
        return { state, onChange, onClick };
    },
    render() {
        const _a = this.$props, { listPrefixCls, disabled, checkboxProps } = _a, restProps = __rest(_a, ["listPrefixCls", "disabled", "checkboxProps"]);
        const { prefixCls } = restProps;
        const wrapCls = classnames(`${prefixCls}-item`, {
            [`${prefixCls}-item-disabled`]: disabled === true
        });
        const extraProps = {};
        ['name', 'defaultChecked', 'checked', 'onChange', 'disabled'].forEach(i => {
            if (i in this.$props) {
                extraProps[i] = this.$props[i];
            }
        });
        // @ts-ignore
        const thumb = <Checkbox {...Object.assign(Object.assign(Object.assign({}, checkboxProps), extraProps), { value: this.state.value })} style={this.thumbStyle} onChange={this.onChange}/>;
        return (
        // @ts-ignore
        <List.Item {...restProps} touchFeedback={!this.disabled} onClick={this.onClick} prefixCls={listPrefixCls} class={wrapCls} thumb={thumb}>
        {this.$slots.default()}
      </List.Item>);
    }
});
export default CheckboxItem;
//# sourceMappingURL=checkbox-item.jsx.map