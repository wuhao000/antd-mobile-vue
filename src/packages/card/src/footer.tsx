import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'Footer'
})
export default class Footer extends Vue {
  @Prop({default: 'am-card'})
  public prefixCls?: string;
  @Prop({type: String})
  public extra?: string;

  public render() {
    const {prefixCls, extra} = this;
    const wrapCls = `${prefixCls}-footer`;
    return (
      <div class={wrapCls}>
        <div class={`${prefixCls}-footer-content`}>{
          this.$slots.default
        }</div>
        {(this.$slots.extra || extra) && <div class={`${prefixCls}-footer-extra`}>{
          this.$slots.extra ? this.$slots.extra : extra
        }</div>}
      </div>
    );
  }
}
