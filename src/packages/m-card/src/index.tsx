import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Body from './body';
import Footer from './footer';
import Header from './header';


@Component({
  name: 'Card'
})
export default class Card extends Vue {
  @Prop({default: 'am-card'})
  public prefixCls?: string;
  @Prop({type: Boolean, default: false})
  public full?: boolean;
  public static Header = Header;
  public static Body = Body;
  public static Footer = Footer;

  public render() {
    const {prefixCls, full} = this;
    const wrapCls = classnames(prefixCls, {
      [`${prefixCls}-full`]: full
    });
    return <div class={wrapCls}>{this.$slots.default}</div>;
  }
}
