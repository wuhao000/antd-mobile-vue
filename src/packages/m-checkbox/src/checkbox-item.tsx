import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import List from '../../m-list';
import Checkbox from './checkbox';

const ListItem = List.Item;

@Component({
  name: 'MCheckboxItem'
})
export default class CheckboxItem extends Vue {
  @Prop({type: Object, default: () => ({})})
  public thumbStyle: object;
  @Prop({type: String, default: 'am-list'})
  public listPrefixCls?: string;
  @Prop({type: String, default: 'am-checkbox'})
  public prefixCls?: string;
  @Prop({type: String})
  public name?: string;
  @Prop({type: Boolean, default: false})
  public wrapLabel?: boolean;
  @Prop({
    type: Object,
    default: () => {
      return {};
    }
  })
  public checkboxProps?: object;
  @Prop({type: String})
  public extra?: string;
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  @Prop({type: Boolean, default: false})
  public value: boolean;

  public state = {
    value: this.value
  };

  @Watch('value')
  public valueCahnged(value: any) {
    this.state.value = value;
  }

  @Watch('state.value')
  public stateValueChanged(value: any) {
    this.$emit('input', value);
    this.$emit('change', value);
  }


  public onChange(value: boolean) {

  }

  public onClick(e) {
    if (!this.disabled) {
      this.state.value = !this.state.value;
    }
  }

  public render() {
    const {
      listPrefixCls,
      disabled,
      checkboxProps,
      ...restProps
    } = this.$props;
    const {prefixCls} = restProps;
    const wrapCls = classnames(`${prefixCls}-item`, {
      [`${prefixCls}-item-disabled`]: disabled === true
    });

    const extraProps: any = {};
    ['name', 'defaultChecked', 'checked', 'onChange', 'disabled'].forEach(i => {
      if (i in this.$props) {
        extraProps[i] = (this.$props as any)[i];
      }
    });
    // @ts-ignore
    const thumb = <Checkbox
      attrs={{
        ...checkboxProps,
        ...extraProps,
        value: this.value
      }}
      style={this.thumbStyle}
      onChange={this.onChange}/>;
    return (
      // @ts-ignore
      <ListItem
        attrs={{
          ...restProps
        }}
        onClick={this.onClick}
        prefixCls={listPrefixCls}
        class={wrapCls}
        thumb={thumb}>
        {this.$slots.default}
      </ListItem>
    );
  }
}
