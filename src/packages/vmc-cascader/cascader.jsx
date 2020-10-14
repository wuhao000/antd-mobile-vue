import arrayTreeFilter from 'array-tree-filter';
import { defineComponent, inject, onBeforeUpdate, reactive } from 'vue';
import MultiPicker from '../vmc-picker/multi-picker';
import Picker from '../vmc-picker/picker';
const Cascader = defineComponent({
    name: 'Cascader',
    props: {
        defaultValue: {},
        value: {},
        data: {
            type: Array,
            default: () => {
                return [];
            }
        },
        cols: {
            default: 3
        },
        disabled: {
            type: Boolean,
            default: false
        },
        pickerItemStyle: {},
        indicatorStyle: {},
        prefixCls: {
            default: 'rmc-cascader'
        },
        pickerPrefixCls: {
            default: 'rmc-picker'
        }
    },
    setup(props, { emit }) {
        const store = inject('store', undefined);
        const getValue = (d, val) => {
            let data = d || props.data;
            let value = val || props.value || props.defaultValue;
            if (!value || !value.length || value.indexOf(undefined) > -1) {
                value = [];
                for (let i = 0; i < props.cols; i++) {
                    if (data && data.length) {
                        value[i] = data[0].value;
                        data = data[0].children;
                    }
                }
            }
            return value;
        };
        const state = reactive({
            value: getValue(props.data, props.defaultValue || props.value)
        });
        const onOk = () => {
            emit('update:value', state.value);
            emit('change', state.value);
        };
        const onDismiss = () => {
            state.value = getValue(props.data, props.defaultValue || props.value);
            emit('dismiss', state.value);
        };
        const onScrollChange = () => {
            emit('scroll-change');
        };
        const onValueChange = (value, index) => {
            const children = arrayTreeFilter(props.data, (c, level) => {
                return level <= index && c.value === value[level];
            });
            let data = children[index];
            let i;
            for (i = index + 1; data && data.children && data.children.length && i < props.cols; i++) {
                data = data.children[0];
                value[i] = data.value;
            }
            value.length = i;
            state.value = value;
            emit('change', value, index);
        };
        const getCols = () => {
            const { data, cols, pickerPrefixCls, disabled, pickerItemStyle, indicatorStyle } = props;
            const value = state.value;
            const childrenTree = arrayTreeFilter(data, (c, level) => {
                return c.value === value[level];
            }).map(c => c.children);
            // in case the users data is async get when select change
            const needPad = cols - childrenTree.length;
            if (needPad > 0) {
                for (let i = 0; i < needPad; i++) {
                    childrenTree.push([]);
                }
            }
            childrenTree.length = cols - 1;
            childrenTree.unshift(data);
            return childrenTree.map((children = [], level) => (
            // @ts-ignore
            <Picker key={level} prefixCls={pickerPrefixCls} style={{ flex: 1 }} disabled={disabled} itemStyle={pickerItemStyle} indicatorStyle={indicatorStyle}>
          {children.map(item => {
                // @ts-ignore
                return <Picker.Item value={item.value} label={item.label} key={item.value}/>;
            })}
        </Picker>));
        };
        {
            if (store) {
                store.onOk = onOk;
                store.onDismiss = onDismiss;
            }
        }
        onBeforeUpdate(() => {
            if (props.value !== undefined) {
                state.value = getValue(props.data, props.value);
            }
        });
        return {
            getCols, state, onValueChange, onScrollChange
        };
    },
    render() {
        const props = this.$props;
        const { prefixCls } = props;
        const cols = this.getCols();
        const multiStyle = {
            flexDirection: 'row',
            alignItems: 'center'
        };
        return (
        // @ts-ignore
        <MultiPicker style={multiStyle} prefixCls={prefixCls} selectedValue={this.state.value} onValueChange={this.onValueChange} onInput={this.onValueChange} onScrollChange={this.onScrollChange}>
        {cols}
      </MultiPicker>);
    }
});
export default Cascader;
//# sourceMappingURL=cascader.jsx.map