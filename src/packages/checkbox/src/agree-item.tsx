import classnames from 'classnames';
import {defineComponent, PropType, reactive, watch} from 'vue';
import getDataAttr from '../../utils/get-data-attr';
import Checkbox from './checkbox';


export default defineComponent({
  name: 'MAgreeItem',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-checkbox'
    },
    name: {
      type: String as PropType<string>
    },
    wrapLabel: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    defaultValue: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    value: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props, {emit}) {
    const state = reactive({
      value: props.value ?? props.defaultValue
    });
    watch(() => state.value, (value) => {
      emit('update:value', value);
    });
    watch(() => props.value, (value) => {
      state.value = value;
    });
    return {
      state
    };
  },
  render() {
    const {...restProps} = this.$props;
    const {prefixCls} = restProps;
    const wrapCls = classnames(`${prefixCls}-agree`);
    return (
      <div {...getDataAttr(restProps)} class={wrapCls}>
        <Checkbox {...restProps}
                  v-model={[this.state.value, 'value']}
                  class={`${prefixCls}-agree-label`}>
          {this.$slots.default()}
        </Checkbox>
      </div>
    );
  }
});
