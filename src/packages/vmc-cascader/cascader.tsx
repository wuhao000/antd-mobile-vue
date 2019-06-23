import arrayTreeFilter from 'array-tree-filter';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';
import MultiPicker from '../vmc-picker/multi-picker';
import Picker from '../vmc-picker/picker';
import {CascaderValue, ICascaderDataItem} from './cascader-types';

@Component({
  name: 'Cascader'
})
export default class Cascader extends Vue {
  @Prop()
  public defaultValue?: CascaderValue;
  @Prop()
  public value?: CascaderValue;
  @Prop({
    default: () => {
      return [];
    }
  })
  public data: ICascaderDataItem[];
  @Prop({default: 3})
  public cols?: number;
  @Prop({type: Boolean, default: false})
  public disabled?: boolean;
  @Prop()
  public pickerItemStyle?: {};
  @Prop()
  public indicatorStyle?: {};
  @Prop({default: 'rmc-cascader'})
  public prefixCls?: string;
  @Prop({default: 'rmc-picker'})
  public pickerPrefixCls?: string;
  @Inject({from: 'store', default: undefined})
  public store: {
    onDismiss: () => void;
    onOk: (...args: any) => any
  };
  public state = {
    value: this.getValue(this.data, this.defaultValue || this.value)
  };

  private onOk() {
    this.$emit('input', this.state.value);
    this.$emit('change', this.state.value);
  }

  private onDismiss() {
    this.state.value = this.getValue(this.data, this.defaultValue || this.value);
    this.$emit('dismiss', this.state.value);
  }

  public created() {
    if (this.store) {
      this.store.onOk = this.onOk;
      this.store.onDismiss = this.onDismiss;
    }
  }

  public onScrollChange() {
    this.$emit('scroll-change');
  }

  public beforeUpdate() {
    if (this.value !== undefined) {
      this.value = this.getValue(this.data, this.value);
    }
  }

  public onValueChange(value, index) {
    const children = arrayTreeFilter(this.data, (c, level) => {
      return level <= index && c.value === value[level];
    });
    let data = children[index];
    let i;
    for (i = index + 1; data && data.children && data.children.length && i < this.cols!; i++) {
      data = data.children[0];
      value[i] = data.value;
    }
    value.length = i;
    this.state.value = value;
    this.$emit('change', value, index);
  }

  public getValue(d, val) {
    let data = d || this.data;
    let value = val || this.value || this.defaultValue;
    if (!value || !value.length || value.indexOf(undefined) > -1) {
      value = [];
      for (let i = 0; i < this.cols!; i++) {
        if (data && data.length) {
          value[i] = data[0].value;
          data = data[0].children;
        }
      }
    }
    return value;
  }

  public getCols() {
    const {data, cols, pickerPrefixCls, disabled, pickerItemStyle, indicatorStyle} = this;
    const value = this.state.value;
    const childrenTree = arrayTreeFilter(data, (c, level) => {
      return c.value === value[level];
    }).map(c => c.children);

    // in case the users data is async get when select change
    const needPad = cols! - childrenTree.length;
    if (needPad > 0) {
      for (let i = 0; i < needPad; i++) {
        childrenTree.push([]);
      }
    }
    childrenTree.length = cols! - 1;
    childrenTree.unshift(data);
    return childrenTree.map((children: any[] = [], level) => (
        // @ts-ignore
        <Picker
            key={level}
            prefixCls={pickerPrefixCls}
            style={{flex: 1}}
            disabled={disabled}
            itemStyle={pickerItemStyle}
            indicatorStyle={indicatorStyle}>
          {
            children.map(item => {
              // @ts-ignore
              return <Picker.Item value={item.value}
                                  label={item.label}
                                  key={item.value}/>;
            })
          }
        </Picker>
    ));
  }

  public render() {
    const props = this.$props;
    const {prefixCls} = props;
    const cols = this.getCols();
    const multiStyle = {
      flexDirection: 'row',
      alignItems: 'center'
    };
    return (
        // @ts-ignore
        <MultiPicker
            style={multiStyle}
            prefixCls={prefixCls}
            selectedValue={this.state.value}
            onValueChange={this.onValueChange}
            onInput={this.onValueChange}
            onScrollChange={this.onScrollChange}>
          {cols}
        </MultiPicker>
    );
  }
}
