import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import List from '../../m-list';
import Radio from './radio';

const ListItem = List.Item as any;

@Component({
  name: 'MRadioItem'
})
export default class RadioItem extends Vue {
  @Prop({default: 'am-radio'})
  public prefixCls?: string;
  @Prop({default: 'am-list'})
  public listPrefixCls?: string;
  @Prop({
    default: () => {
      return {};
    }
  })
  public radioProps?: object;
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  @Prop({type: Boolean, default: false})
  public value: boolean;

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
      radioProps,
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
    const extra = <Radio
      attrs={
        {
          ...radioProps,
          ...extraProps
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
