import { __rest } from "tslib";
import classnames from 'classnames';
import { defineComponent, reactive, watch } from 'vue';
import List from '../../list';
import { formComponentProps, useFormComponent } from '../../mixins/form-component';
import Switch from './switch';
const ListItem = List.Item;
const switchItem = defineComponent({
    name: 'SwitchItem',
    props: Object.assign(Object.assign({}, formComponentProps), { prefixCls: {
            default: 'am-switch'
        }, listPrefixCls: {
            default: 'am-list'
        }, switchProps: {
            default: () => {
                return {};
            }
        }, title: {
            type: [String, Object]
        } }),
    setup(props, { emit }) {
        const { isDisabled } = useFormComponent(props, { emit });
        const state = reactive({
            value: props.value
        });
        watch(() => props.value, (value) => {
            state.value = value;
        });
        watch(() => state.value, (value, oldValue) => {
            emit('update:value', value);
            if (value !== oldValue) {
                emit('change', value);
            }
        });
        const onClick = () => {
            if (!props.disabled) {
                emit('click');
            }
        };
        return {
            state, onClick, isDisabled
        };
    },
    render() {
        var _a, _b;
        const _c = this.$props, { listPrefixCls, disabled, switchProps } = _c, otherProps = __rest(_c, ["listPrefixCls", "disabled", "switchProps"]);
        const { prefixCls } = otherProps;
        const wrapCls = classnames(`${prefixCls}-item`, {
            [`${prefixCls}-item-disabled`]: disabled === true
        });
        const extraProps = Object.assign(Object.assign(Object.assign({}, this.$attrs), switchProps), { disabled: this.isDisabled, value: this.state.value, 'onUpdate:value': (value) => {
                this.state.value = value;
            }, onClick: this.onClick });
        // @ts-ignore
        const extra = <Switch {...extraProps}/>;
        const listItemProps = Object.assign(Object.assign({}, otherProps), { disabled: this.isDisabled, prefixCls: listPrefixCls, class: wrapCls, extra });
        return (<ListItem {...listItemProps}>
        {(_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)}
      </ListItem>);
    }
});
export default switchItem;
//# sourceMappingURL=switch-item.jsx.map