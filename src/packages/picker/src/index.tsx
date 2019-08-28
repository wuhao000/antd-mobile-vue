/* tslint:disable:jsx-no-multiline-js */
import treeFilter from 'array-tree-filter';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Provide, Watch} from 'vue-property-decorator';
import {cloneVNode, setProps} from '../../utils/vnode';
import RMCCascader from '../../vmc-cascader/cascader';
import {CascaderValue} from '../../vmc-cascader/cascader-types';
import RMCPopupCascader from '../../vmc-cascader/popup';
import RMCMultiPicker from '../../vmc-picker/multi-picker';
import RMCPicker from '../../vmc-picker/picker';
import {PickerData} from './props-type';

@Component({
  name: 'Picker'
})
export default class Picker extends Vue {

  @Prop({type: String, default: ''})
  public placeholder: string;
  @Prop({type: String, default: '取消'})
  public dismissText: string;
  @Prop({type: String, default: '确定'})
  public okText: string;
  @Prop({type: String, default: 'am-picker'})
  public prefixCls: string;
  @Prop({type: String, default: 'click'})
  public triggerType: string;
  @Prop({type: String, default: 'am-picker-col'})
  public pickerPrefixCls?: string;
  @Prop({type: String, default: 'am-picker-popup'})
  public popupPrefixCls?: string;
  @Prop({type: String, default: ''})
  public title: string;
  @Prop()
  public data: PickerData[] | PickerData[][];
  @Prop({type: Boolean, default: true})
  public cascade?: boolean;
  @Prop()
  public value?: Array<string | number>;
  @Prop({
    type: Function, default: (values: VNode[]) => {
      // label is JSX.Element or other
      if (values.length > 0 && typeof values[0] !== 'string') {
        return values;
      }
      return values.join(',');
    }
  })
  public format?: (values: Array<VNode | string>) => string | VNode[];
  @Prop({type: Number, default: 3})
  public cols?: number;
  @Prop()
  public extra?: string;
  @Prop()
  public onChange?: (date?: CascaderValue) => void;
  @Prop()
  public itemStyle?: any;
  @Prop()
  public indicatorStyle?: any;
  public currentValue: any[] = [];
  public popupProps: {
    WrapComponent: 'div',
    transitionName: 'am-slide-up',
    maskTransitionName: 'am-fade',
  };
  public scrollValue: any;
  @Provide('store')
  public store = {
    onOk: null
  };

  @Watch('value', {immediate: true})
  public valueChanged(v: any[]) {
    if (v && v !== this.currentValue) {
      this.currentValue = v;
    }
  }

  private onClick(e) {
    return this.$emit('click', e);
  }

  public getSel() {
    const value = this.currentValue || [];
    let treeChildren: PickerData[];
    const data = this.data;
    if (this.cascade) {
      treeChildren = treeFilter(data as PickerData[], (c: any, level: any) => {
        return c.value === value[level];
      });
    } else {
      treeChildren = value.map((v, i) => {
        return (data as PickerData[][])[i].filter(d => d.value === v)[0];
      });
    }
    const extra = (
        this.format &&
        this.format(treeChildren.map(v => {
              return v.label;
            })
        )
    );
    if (Array.isArray(extra)) {
      return extra[0];
    }
    return extra;
  }

  public getPickerCol() {
    const {data, pickerPrefixCls, itemStyle, indicatorStyle} = this;
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
  }

  public onOk(v: any) {
    let value = v;
    if (this.scrollValue !== undefined) {
      value = this.scrollValue;
    }
    if (this.onChange) {
      this.onChange(value);
    }
    this.$emit('ok', value);
  }

  public setScrollValue(v: any) {
    this.scrollValue = v;
  }

  public setCasecadeScrollValue(v: any) {
    // 级联情况下保证数据正确性，滚动过程中只有当最后一级变化时才变更数据
    if (v && this.scrollValue) {
      const length = this.scrollValue.length;
      if (
          length === v.length &&
          this.scrollValue[length - 1] === v[length - 1]
      ) {
        return;
      }
    }
    this.setScrollValue(v);
  }

  public fixOnOk(cascader: any) {
    if (cascader && cascader.onOk !== this.onOk.bind(this)) {
      cascader.onOk = this.onOk;
      cascader.forceUpdate();
    }
  }

  public onPickerChange(v: any, i) {
    this.setScrollValue(v);
    this.$emit('pickerChange', v, i);
  }

  public onVisibleChange(visible: boolean) {
    this.setScrollValue(undefined);
    this.$emit('visibleChange', visible);
  }

  public render() {
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
      onOk,
      ...restProps
    } = this.$props;

    let cascader;
    let popupMoreProps = {};
    if (cascade) {
      cascader = (
          // @ts-ignore
          <RMCCascader
              slot="cascader"
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
              slot="cascader"
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
            attrs={props}>
          {cascader}
          {this.$slots.default && this.$slots.default.map(child => {
            const node = cloneVNode(child, true);
            setProps(node, {
              extra: childExtra,
              arrow: 'horizontal'
            });
            return node;
          })}
        </RMCPopupCascader>
    );
  }

  @Watch('currentValue')
  public currentValueChanged(currentValue: any[]) {
    if (currentValue !== this.value) {
      this.$emit('input', currentValue);
      this.$emit('change', currentValue);
    }
  }

  private onInput(v: any) {
    this.currentValue = v;
  }

  private getPlaceholder() {
    return this.placeholder || '';
  }
}
