import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';


@Component({
  name: 'Header'
})
export default class Header extends Vue {
  @Prop({default: 'am-card'})
  public prefixCls?: string;
  @Prop({
    default: () => {
      return {};
    }
  })
  public thumbStyle?: object;
  /** need url of img, if this is string. */
  @Prop({type: String})
  public thumb?: string;
  @Prop({type: String})
  public extra?: string;

  public render() {
    const {
      prefixCls,
      thumb,
      thumbStyle,
      extra,
      ...restProps
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
          {this.$slots.default}
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
}
