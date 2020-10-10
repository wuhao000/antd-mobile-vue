import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';
import List from '../../list';
import Radio from './radio';

const ListItem = List.Item as any;

const RadioItem = defineComponent({
  name: 'MRadioItem',
  props: {
    prefixCls: {
      default: 'am-radio'
    },
    listPrefixCls: {
      default: 'am-list'
    },
    radioProps: {
      default: () => {
        return {};
      }
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    value: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, {emit}) {


    const onChange = (value: boolean) => {
      emit('change', value);
    };
    const onClick = (e) => {
      if (!props.disabled) {
        emit('click', e);
      }
    };


    return {
      onClick, onChange
    };
  },
  render() {
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
      {
        ...{
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
        {
          ...otherProps
        }
        prefixCls={listPrefixCls}
        class={wrapCls}
        extra={extra}>
        {this.$slots.default}
      </ListItem>
    );
  }
});

export default RadioItem as any;
