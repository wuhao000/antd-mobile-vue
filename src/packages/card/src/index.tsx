import classnames from 'classnames';
import {defineComponent} from 'vue';


export default defineComponent({
  name: 'MCard',
  props: {
    prefixCls: {default: 'am-card'},
    full: {type: Boolean, default: false}
  },
  render() {
    const {prefixCls, full} = this;
    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-full`]: full
    });
    return <div class={wrapCls}>{this.$slots.default}</div>;
  }
});
