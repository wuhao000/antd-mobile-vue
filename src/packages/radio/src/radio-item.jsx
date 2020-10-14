import { __rest } from "tslib";
import classnames from 'classnames';
import { defineComponent } from 'vue';
import List from '../../list';
import Radio from './radio';
const ListItem = List.Item;
const RadioItem = defineComponent({
    name: 'MRadioItem',
    props: {
        prefixCls: {
            default: 'am-radio'
        },
        listPrefixCls: {
            default: 'am-list'
        },
        radioProps: {
            default: () => {
                return {};
            }
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
        const onChange = (value) => {
            emit('change', value);
        };
        const onClick = (e) => {
            if (!props.disabled) {
                emit('click', e);
            }
        };
        return {
            onClick, onChange
        };
    },
    render() {
        const _a = this.$props, { listPrefixCls, disabled, radioProps } = _a, otherProps = __rest(_a, ["listPrefixCls", "disabled", "radioProps"]);
        const { prefixCls } = otherProps;
        const wrapCls = classnames(`${prefixCls}-item`, {
            [`${prefixCls}-item-disabled`]: disabled === true
        });
        const extraProps = {};
        ['name', 'disabled'].forEach(i => {
            if (i in this.$props) {
                extraProps[i] = this.$props[i];
            }
        });
        // @ts-ignore
        const extra = <Radio {...Object.assign(Object.assign({}, radioProps), extraProps)} value={this.value} onClick={this.onClick} onChange={this.onChange}/>;
        return (<ListItem {...otherProps} prefixCls={listPrefixCls} class={wrapCls} extra={extra}>
        {this.$slots.default}
      </ListItem>);
    }
});
export default RadioItem;
//# sourceMappingURL=radio-item.jsx.map