import classnames from 'classnames';
import {defineComponent, PropType} from 'vue';

const WingBlank = defineComponent({
  name: 'WingBlank',
  props: {
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-wingblank'
    },
    size: {
      default: 'lg'
    }
  },
  install: null,
  render() {
    const {prefixCls, size} = this;
    const wrapCls = classnames(prefixCls, `${prefixCls}-${size}`);
    return (
      <div class={wrapCls}>
        {this.$slots.default()}
      </div>
    );
  }
});

export default WingBlank as any;
