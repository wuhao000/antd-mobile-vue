import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import ProxyComponent from '../../../mixins/proxy-component';

const Layout = window.antd.Layout;

@Component({
  name: 'DLayoutSider',
  inheritAttrs: false
})
class DLayoutSider extends ProxyComponent {

  @Prop({type: [String, Number], default: 'auto'})
  public width: string | number;

  public getInputComponent() {
    return Layout.Sider;
  }

  get cssStyle(): {} {
    return {
      width: typeof this.width === 'number' ? (this.width + 'px') : this.width
    };
  }

}


@Component({
  name: 'DLayoutHeader',
  inheritAttrs: false
})
class DLayoutHeader extends ProxyComponent {

  @Prop({type: [String, Number], default: 'auto'})
  public height: string | number;
  @Prop({type: [String, Number], default: 1})
  public lineHeight: string | number;

  public getInputComponent() {
    return Layout.Header;
  }

  get cssStyle(): {} {
    return {
      lineHeight: this.lineHeight,
      height: typeof this.height === 'number' ? (this.height + 'px') : this.height
    };
  }

}

@Component({
  name: 'DLayout',
  inheritAttrs: false
})
export default class DLayout extends ProxyComponent {

  public static Header = DLayoutHeader;
  public static Content = Layout.Content;
  public static Footer = Layout.Footer;
  public static Sider = DLayoutSider;

  public getInputComponent() {
    return Layout;
  }

}
