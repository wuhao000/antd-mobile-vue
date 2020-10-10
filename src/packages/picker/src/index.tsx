/* tslint:disable:jsx-no-multiline-js */
import treeFilter from 'array-tree-filter';
import {cloneVNode, defineComponent, PropType, provide, ref, Ref, VNode, watch} from 'vue';
import {setProps} from '../../utils/vnode';
import RMCCascader from '../../vmc-cascader/cascader';
import RMCPopupCascader from '../../vmc-cascader/popup';
import RMCMultiPicker from '../../vmc-picker/multi-picker';
import RMCPicker from '../../vmc-picker/picker';
import {PickerData} from './props-type';

export default defineComponent({
  name: 'Picker',
  props: {
    placeholder: {
      type: String as PropType<string>,
      default: ''
    },
    dismissText: {
      type: String as PropType<string>,
      default: '取消'
    },
    okText: {
      type: String as PropType<string>,
      default: '确定'
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-picker'
    },
    triggerType: {
      type: String as PropType<string>,
      default: 'click'
    },
    pickerPrefixCls: {
      type: String as PropType<string>,
      default: 'am-picker-col'
    },
    popupPrefixCls: {
      type: String as PropType<string>,
      default: 'am-picker-popup'
    },
    title: {
      type: [String, Object] as PropType<string>,
      default: ''
    },
    data: {},
    cascade: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    value: {
      type: Array as PropType<any[]>
    },
    format: {
      type: Function as PropType<(values: Array<VNode | string>) => string | VNode[]>,
      default: (values: VNode[]) => {
        // label is JSX.Element or other
        if (values.length > 0 && typeof values[0] !== 'string') {
          return values;
        }
        return values.join(',');
      }
    },
    cols: {
      type: Number as PropType<number>,
      default: 3
    },
    extra: {},
    onChange: {},
    itemStyle: {},
    indicatorStyle: {}
  },
  setup(props, {emit, slots}) {
    const currentValue: Ref<any[]> = ref([]);
    const popupProps: Ref<{
      WrapComponent: 'div',
      transitionName: 'am-slide-up',
      maskTransitionName: 'am-fade',
    }> = ref(null);
    const scrollValue: Ref<any> = ref(null);
    watch(() => props.value, (v: any[]) => {
      if (v && v !== currentValue.value) {
        currentValue.value = v;
      }
    }, {immediate: true});
    watch(() => currentValue.value, (currentValue: any[]) => {
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
      let treeChildren: PickerData[];
      const data = props.data;
      if (props.cascade) {
        treeChildren = treeFilter(data as PickerData[], (c: any, level: any) => {
          return c.value === value[level];
        });
      } else {
        treeChildren = value.map((v, i) => {
          return (data as PickerData[][])[i].filter(d => d.value === v)[0];
        });
      }
      const extra = (
        props.format &&
        props.format(treeChildren.map(v => {
            return v.label;
          })
        )
      );
      if (Array.isArray(extra)) {
        return extra[0];
      }
      return extra;
    };
    const getPickerCol = () => {
      const {data, pickerPrefixCls, itemStyle, indicatorStyle} = props;
      return (data as PickerData[][]).map((col, index) => {
        return (
          // @ts-ignore
          <RMCPicker
            key={index}
            prefixCls={pickerPrefixCls}
            style={{flex: 1}}
            itemStyle={itemStyle}
            indicatorStyle={indicatorStyle}>
            {col.map(item => {
              return (
                // @ts-ignore
                <RMCPicker.Item key={item.value} value={item.value}>{item.label}</RMCPicker.Item>
              );
            })}
          </RMCPicker>
        );
      });
    };
    const onOk = (v: any) => {
      let value = v;
      if (scrollValue.value !== undefined) {
        value = scrollValue.value;
      }
      emit('change', value);
      emit('ok', value);
    };
    const setScrollValue = (v: any) => {
      scrollValue.value = v;
    };
    const setCasecadeScrollValue = (v: any) => {
      // 级联情况下保证数据正确性，滚动过程中只有当最后一级变化时才变更数据
      if (v && scrollValue.value) {
        const length = scrollValue.value.length;
        if (
          length === v.length &&
          scrollValue.value[length - 1] === v[length - 1]
        ) {
          return;
        }
      }
      setScrollValue(v);
    };
    const fixOnOk = (cascader: any) => {
      if (cascader && cascader.onOk !== onOk.bind(this)) {
        cascader.onOk = onOk;
        cascader.forceUpdate();
      }
    };
    const onPickerChange = (v: any, i) => {
      setScrollValue(v);
      emit('pickerChange', v, i);
    };
    const onVisibleChange = (visible: boolean) => {
      setScrollValue(undefined);
      emit('visibleChange', visible);
    };
    const onInput = (v: any) => {
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
    const {
      popupPrefixCls,
      itemStyle,
      indicatorStyle,
      okText,
      dismissText,
      extra,
      cascade,
      prefixCls,
      pickerPrefixCls,
      data,
      cols,
      ...restProps
    } = this.$props;

    let cascader;
    let popupMoreProps = {};
    if (cascade) {
      cascader = (
        // @ts-ignore
        <RMCCascader
          prefixCls={prefixCls}
          pickerPrefixCls={pickerPrefixCls}
          data={data as PickerData[]}
          cols={cols}
          onInput={(v) => {
            this.onInput(v);
          }}
          onChange={this.onPickerChange}
          onScrollChange={this.setCasecadeScrollValue}
          pickerItemStyle={itemStyle}
          indicatorStyle={indicatorStyle}/>
      );
    } else {
      cascader = (
        // @ts-ignore
        <RMCMultiPicker
          style={{flexDirection: 'row', alignItems: 'center'}}
          prefixCls={prefixCls}
          onInput={(v) => {
            this.onInput(v);
          }}
          onScrollChange={this.setScrollValue}>
          {this.getPickerCol()}
        </RMCMultiPicker>
      );
      popupMoreProps = {
        pickerValueProp: 'selectedValue',
        pickerValueChangeProp: 'onValueChange'
      };
    }
    const props = {
      ...this.popupProps,
      cascader,
      ...restProps,
      prefixCls: popupPrefixCls,
      value: this.currentValue,
      dismissText,
      okText,
      ...popupMoreProps
    };
    const childExtra = this.getSel() || extra || this.getPlaceholder() || '';
    return (
      // @ts-ignore
      <RMCPopupCascader
        v-slots={{
          cascader: () => cascader
        }}
        {...props}>
        {this.$slots.default && this.$slots.default().map(child => {
          const node = cloneVNode(child);
          setProps(node, {
            extra: childExtra,
            arrow: 'horizontal'
          });
          return node;
        })}
      </RMCPopupCascader>
    );
  }
});
