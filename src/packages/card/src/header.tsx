import {defineComponent} from 'vue';


export default defineComponent({
  name: 'MCardHeader',
  props: {
    prefixCls: {default: 'am-card'},
    thumbStyle: {
      default: () => {
        return {};
      }
    },
    thumb: {type: String},
    extra: {type: String},
    title: {type: String}
  },
  render() {
    const {
      prefixCls,
      thumb,
      thumbStyle,
      extra,
      title
    } = this;
    const wrapCls = `${prefixCls}-header`;
    return (
      <div class={wrapCls}>
        <div class={`${prefixCls}-header-content`}>
          {this.$slots.thumb ? (
            this.$slots.thumb
          ) : (
            this.thumb ? <img style={thumbStyle} src={thumb}/> : null
          )}
          {this.$slots.default ? this.$slots.default : title}
        </div>
        {(this.$slots.extra || extra) ? (
          // tslint:disable-next-line:jsx-no-multiline-js
          <div class={`${prefixCls}-header-extra`}>{
            this.$slots.extra ? this.$slots.extra : extra
          }</div>
        ) : null}
      </div>
    );
  }
});
