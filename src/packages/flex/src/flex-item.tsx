import {filterHTMLAttrs} from '../../utils/dom';
import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';

export default defineComponent({
  inheritAttrs: false,
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
    const props = filterHTMLAttrs({
      ...restProps,
      ...this.$attrs
    });
    return (
      <div class={wrapCls}
           {...props}>
        {this.$slots.default?.()}
      </div>
    );
  }
});
