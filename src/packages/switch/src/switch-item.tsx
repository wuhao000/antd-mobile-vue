import FormComponent from '../../mixins/form-component';
import classnames from 'classnames';
import {Options} from 'vue-class-component';
import List from '../../list';
import Switch from './switch';

const ListItem = List.Item as any;

@Options({
  name: 'SwitchItem',
  props: {
    prefixCls: {default: 'am-switch'},
    listPrefixCls: {default: 'am-list'},
    switchProps: {
      default: () => {
        return {};
      }
    },
    title: {type: [String, Object]}
  },
  watch: {
    value(value) {
      this.state.value = value;
    },
    'state.value'(value, oldValue) {
      this.$emit('input', value);
      if (value !== oldValue) {
        this.$emit('change', value);
      }
    }
  }
})
export default class SwitchItem extends FormComponent {
  public prefixCls?: string;
  public listPrefixCls?: string;
  public switchProps?: object;
  public title: string;
  public state = {
    value: this.value
  };

  public onClick(e) {
    if (!this.disabled) {
      this.$emit('click');
    }
  }

  public render(): any {
    const {
      listPrefixCls,
      disabled,
      switchProps,
      ...otherProps
    } = this.$props as any;
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
    const props = {
      ...switchProps,
      ...extraProps,
      ...this.$attrs,
      vModel: this.state.value,
      disabled: this.isDisabled,
      onClick: this.onClick
    };
    // @ts-ignore
    const extra = <Switch {...props}/>;
    return (
      <ListItem
        {...otherProps}
        disabled={this.isDisabled}
        prefixCls={listPrefixCls}
        class={wrapCls}
        extra={extra}>
        {this.$slots.default?.()}
      </ListItem>
    );
  }
}
