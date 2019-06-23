import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import ProxyComponent from '../../../mixins/proxy-component';
import MobileIcon from '../../m-icon';

const fonts = {
  xs: 12, sm: 14, md: 16, lg: 24, xl: 32, xxl: 48
};
@Component({
  name: 'AeIcon'
})
export default class AeIcon extends ProxyComponent {

  @Prop(String)
  public type: string;
  @Prop({type: [String, Number], default: ''})
  public size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  @Prop({type: Boolean, default: false})
  public mobile: boolean;
  @Prop({type: String})
  public color: string;

  get cssStyle() {
    const style: any = {
      fontSize: this.mobile ? 'inherit' : (this.size ? (fonts[this.size] + 'px') : 'inherit')
    };
    if (!this.mobile && this.color) {
      style.color = this.color;
    }
    return style;
  }

  public getInputComponent(): {} {
    if (this.mobile) {
      return MobileIcon;
    } else {
      return window.antd.Icon;
    }
  }
}
