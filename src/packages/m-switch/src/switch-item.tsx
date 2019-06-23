import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import List from '../../m-list';
import Switch from './switch';

const ListItem = List.Item as any;

@Component({
  name: 'SwitchItem'
})
export default class SwitchItem extends Vue {
  @Prop({default: 'am-switch'})
  public prefixCls?: string;
  @Prop({default: 'am-list'})
  public listPrefixCls?: string;
  @Prop({
    default: () => {
      return {};
    }
  })
  public switchProps?: object;
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  @Prop({type: Boolean, default: false})
  public value: boolean;
  @Prop({type: String})
  public title: string;

  public onChange(value: boolean) {
    this.$emit('change', value);
  }

  public onClick(e) {
    if (!this.disabled) {
      this.$emit('click');
    }
  }

  public render() {
    const {
      listPrefixCls,
      disabled,
      switchProps,
      ...otherProps
    } = this.$props;
    const {prefixCls} = otherProps;
    const wrapCls = classnames(`${prefixCls}-item`, {
      [`${prefixCls}-item-disabled`]: disabled === true
    });

    const extraProps: any = {};
    ['name', 'disabled'].forEach(i => {
      if (i in this.$props) {
        extraProps[i] = (this.$props as any)[i];
      }
    });
    // @ts-ignore
    const extra = <Switch
      attrs={
        {
          ...switchProps,
          ...extraProps,
          ...this.$attrs
        }
      }
      value={this.value}
      onClick={this.onClick}
      onChange={this.onChange}
    />;
    return (
      <ListItem
        attrs={
          {...otherProps}
        }
        prefixCls={listPrefixCls}
        class={wrapCls}
        extra={extra}>
        {this.$slots.default}
      </ListItem>
    );
  }
}
