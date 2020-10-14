import { __rest } from "tslib";
/* tslint:disable:jsx-no-multiline-js */
import treeFilter from 'array-tree-filter';
import { cloneVNode, defineComponent, provide, ref, watch } from 'vue';
import { setProps } from '../../utils/vnode';
import RMCCascader from '../../vmc-cascader/cascader';
import RMCPopupCascader from '../../vmc-cascader/popup';
import RMCMultiPicker from '../../vmc-picker/multi-picker';
import RMCPicker from '../../vmc-picker/picker';
export default defineComponent({
    name: 'Picker',
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        dismissText: {
            type: String,
            default: '取消'
        },
        okText: {
            type: String,
            default: '确定'
        },
        prefixCls: {
            type: String,
            default: 'am-picker'
        },
        triggerType: {
            type: String,
            default: 'click'
        },
        pickerPrefixCls: {
            type: String,
            default: 'am-picker-col'
        },
        popupPrefixCls: {
            type: String,
            default: 'am-picker-popup'
        },
        title: {
            type: [String, Object],
            default: ''
        },
        data: {},
        cascade: {
            type: Boolean,
            default: true
        },
        value: {
            type: Array
        },
        format: {
            type: Function,
            default: (values) => {
                // label is JSX.Element or other
                if (values.length > 0 && typeof values[0] !== 'string') {
                    return values;
                }
                return values.join(',');
            }
        },
        cols: {
            type: Number,
            default: 3
        },
        extra: {},
        onChange: {},
        itemStyle: {},
        indicatorStyle: {}
    },
    setup(props, { emit, slots }) {
        const currentValue = ref([]);
        const popupProps = ref(null);
        const scrollValue = ref(null);
        watch(() => props.value, (v) => {
            if (v && v !== currentValue.value) {
                currentValue.value = v;
            }
        }, { immediate: true });
        watch(() => currentValue.value, (currentValue) => {
            if (currentValue !== props.value) {
                emit('update:value', currentValue);
                emit('change', currentValue);
            }
        });
        const onClick = (e) => {
            return emit('click', e);
        };
        const getSel = () => {
            const value = currentValue.value || [];
            let treeChildren;
            const data = props.data;
            if (props.cascade) {
                treeChildren = treeFilter(data, (c, level) => {
                    return c.value === value[level];
                });
            }
            else {
                treeChildren = value.map((v, i) => {
                    return data[i].filter(d => d.value === v)[0];
                });
            }
            const extra = (props.format &&
                props.format(treeChildren.map(v => {
                    return v.label;
                })));
            if (Array.isArray(extra)) {
                return extra[0];
            }
            return extra;
        };
        const getPickerCol = () => {
            const { data, pickerPrefixCls, itemStyle, indicatorStyle } = props;
            return data.map((col, index) => {
                return (
                // @ts-ignore
                <RMCPicker key={index} prefixCls={pickerPrefixCls} style={{ flex: 1 }} itemStyle={itemStyle} indicatorStyle={indicatorStyle}>
            {col.map(item => {
                    return (
                    // @ts-ignore
                    <RMCPicker.Item key={item.value} value={item.value}>{item.label}</RMCPicker.Item>);
                })}
          </RMCPicker>);
            });
        };
        const onOk = (v) => {
            let value = v;
            if (scrollValue.value !== undefined) {
                value = scrollValue.value;
            }
            emit('change', value);
            emit('ok', value);
        };
        const setScrollValue = (v) => {
            scrollValue.value = v;
        };
        const setCasecadeScrollValue = (v) => {
            // 级联情况下保证数据正确性，滚动过程中只有当最后一级变化时才变更数据
            if (v && scrollValue.value) {
                const length = scrollValue.value.length;
                if (length === v.length &&
                    scrollValue.value[length - 1] === v[length - 1]) {
                    return;
                }
            }
            setScrollValue(v);
        };
        const fixOnOk = (cascader) => {
            if (cascader && cascader.onOk !== onOk.bind(this)) {
                cascader.onOk = onOk;
                cascader.forceUpdate();
            }
        };
        const onPickerChange = (v, i) => {
            setScrollValue(v);
            emit('pickerChange', v, i);
        };
        const onVisibleChange = (visible) => {
            setScrollValue(undefined);
            emit('visibleChange', visible);
        };
        const onInput = (v) => {
            currentValue.value = v;
        };
        const getPlaceholder = () => {
            return props.placeholder || '';
        };
        provide('store', {
            onOk: null
        });
        return {
            onOk, onInput, onPickerChange, getSel,
            getPlaceholder,
            setCasecadeScrollValue, setScrollValue,
            getPickerCol, popupProps, currentValue
        };
    },
    render() {
        const _a = this.$props, { popupPrefixCls, itemStyle, indicatorStyle, okText, dismissText, extra, cascade, prefixCls, pickerPrefixCls, data, cols } = _a, restProps = __rest(_a, ["popupPrefixCls", "itemStyle", "indicatorStyle", "okText", "dismissText", "extra", "cascade", "prefixCls", "pickerPrefixCls", "data", "cols"]);
        let cascader;
        let popupMoreProps = {};
        if (cascade) {
            cascader = (
            // @ts-ignore
            <RMCCascader prefixCls={prefixCls} pickerPrefixCls={pickerPrefixCls} data={data} cols={cols} onInput={(v) => {
                this.onInput(v);
            }} onChange={this.onPickerChange} onScrollChange={this.setCasecadeScrollValue} pickerItemStyle={itemStyle} indicatorStyle={indicatorStyle}/>);
        }
        else {
            cascader = (
            // @ts-ignore
            <RMCMultiPicker style={{ flexDirection: 'row', alignItems: 'center' }} prefixCls={prefixCls} onInput={(v) => {
                this.onInput(v);
            }} onScrollChange={this.setScrollValue}>
          {this.getPickerCol()}
        </RMCMultiPicker>);
            popupMoreProps = {
                pickerValueProp: 'selectedValue',
                pickerValueChangeProp: 'onValueChange'
            };
        }
        const props = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, this.popupProps), { cascader }), restProps), { prefixCls: popupPrefixCls, value: this.currentValue, dismissText,
            okText }), popupMoreProps);
        const childExtra = this.getSel() || extra || this.getPlaceholder() || '';
        return (
        // @ts-ignore
        <RMCPopupCascader v-slots={{
            cascader: () => cascader
        }} {...props}>
        {this.$slots.default && this.$slots.default().map(child => {
            const node = cloneVNode(child);
            setProps(node, {
                extra: childExtra,
                arrow: 'horizontal'
            });
            return node;
        })}
      </RMCPopupCascader>);
    }
});
//# sourceMappingURL=index.jsx.map