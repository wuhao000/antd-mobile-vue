import {formComponentProps, useFormComponent} from '../../mixins/form-component';
import classnames from 'classnames';
import {defineComponent, PropType, reactive, watch} from 'vue';
import List from '../../list';
import Switch from './switch';

const ListItem = List.Item as any;

const switchItem = defineComponent({
  name: 'SwitchItem',
  props: {
    prefixCls: {
      default: 'am-switch'
    },
    listPrefixCls: {
      default: 'am-list'
    },
    switchProps: {
      default: () => {
        return {};
      }
    },
    title: {
      type: [String, Object] as PropType<string>
    },
    ...formComponentProps
  },
  setup(props, {emit}) {
    const {isDisabled} = useFormComponent(props, {emit});
    const state = reactive({
      value: props.value
    });
    watch(() => props.value, (value) => {
      state.value = value;
    });
    watch(() => state.value, (value, oldValue) => {
      emit('input', value);
      if (value !== oldValue) {
        emit('change', value);
      }
    });

    const onClick = () => {
      if (!props.disabled) {
        emit('click');
      }
    };

    return {
      state, onClick, isDisabled
    };
  },
  render() {
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
      disabled={this.isDisabled}
      onClick={this.onClick}
    />;
    return (
      <ListItem
        attrs={
          {...otherProps}
        }
        disabled={this.isDisabled}
        prefixCls={listPrefixCls}
        class={wrapCls}
        extra={extra}>
        {this.$slots.default}
      </ListItem>
    );
  }
});

export default switchItem;
