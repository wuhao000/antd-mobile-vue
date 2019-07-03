import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import List from '../../list';
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
  public state = {
    value: this.value
  };

  @Watch('value')
  public valueChanged(value: boolean) {
    this.state.value = value;
  }

  @Watch('state.value')
  public stateValueChanged(value: boolean, oldValue: boolean) {
    this.$emit('input', value);
    if (value !== oldValue) {
      this.$emit('change', value);
    }
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
      vModel={this.state.value}
      attrs={
        {
          ...switchProps,
          ...extraProps,
          ...this.$attrs
        }
      }
      onClick={this.onClick}
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
