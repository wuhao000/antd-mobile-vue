import classnames from 'classnames';
import {defineComponent, PropType, reactive, watch} from 'vue';
import List from '../../list';
import Checkbox from './checkbox';

const CheckboxItem = defineComponent({
  name: 'MCheckboxItem',
  props: {
    thumbStyle: {
      type: Object as PropType<object>,
      default: () => ({})
    },
    listPrefixCls: {
      type: String as PropType<string>,
      default: 'am-list'
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-checkbox'
    },
    name: {
      type: String as PropType<string>
    },
    wrapLabel: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    checkboxProps: {
      type: Object as PropType<object>,
      default: () => {
        return {};
      }
    },
    extra: {
      type: String as PropType<string>
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
    const state = reactive({
      value: props.value
    });
    watch(() => props.value, (value: any) => {
      state.value = value;
    });
    watch(() => state.value, (value: any) => {
      emit('update:value', value);
      emit('change', value);
    });

    const onChange = (value: boolean) => {
    };
    const onClick = (e) => {
      if (!props.disabled) {
        state.value = !state.value;
      }
    };
    return {state, onChange, onClick};
  },
  render() {
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
      {...{
        ...checkboxProps,
        ...extraProps,
        value: this.state.value
      }}
      style={this.thumbStyle}
      onChange={this.onChange}/>;
    return (
      // @ts-ignore
      <List.Item
        {...{
          ...restProps
        }}
        touchFeedback={!this.disabled}
        onClick={this.onClick}
        prefixCls={listPrefixCls}
        class={wrapCls}
        thumb={thumb}>
        {this.$slots.default()}
      </List.Item>
    );
  }
});


export default CheckboxItem as any;
