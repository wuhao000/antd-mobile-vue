import classnames from 'classnames';
import {defineComponent} from 'vue';
import Body from './body';
import Header from './header';
import Footer from './footer';


export default defineComponent({
  name: 'MCard',
  Body,
  Header,
  Footer,
  props: {
    prefixCls: {default: 'am-card'},
    full: {type: Boolean, default: false}
  },
  render() {
    const {prefixCls, full} = this;
    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-full`]: full
    });
    return <div class={wrapCls}>{this.$slots.default?.()}</div>;
  }
});
