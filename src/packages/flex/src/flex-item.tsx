import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';

export default defineComponent({
  name: 'FlexItem',
  props: {
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-flexbox'
    }
  },
  render() {
    const {prefixCls, ...restProps} = this;
    const wrapCls = classnames(`${prefixCls}-item`);
    return (
      <div class={wrapCls} {...{props: restProps}}>
        {this.$slots.default?.()}
      </div>
    );
  }
});
