import {defineComponent} from 'vue';

export default defineComponent({
  name: 'MCardFooter',
  props: {
    prefixCls: {default: 'am-card'},
    extra: {type: String},
    content: {type: String}
  },
  render() {
    const {prefixCls, content, extra} = this;
    const wrapCls = `${prefixCls}-footer`;
    return (
      <div class={wrapCls}>
        <div class={`${prefixCls}-footer-content`}>{
          this.$slots.default ? this.$slots.default : content
        }</div>
        {(this.$slots.extra || extra) && <div class={`${prefixCls}-footer-extra`}>{
          this.$slots.extra ? this.$slots.extra : extra
        }</div>}
      </div>
    );
  }
});
