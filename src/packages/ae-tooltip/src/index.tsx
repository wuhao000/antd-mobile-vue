import Component from 'vue-class-component';
import ProxyComponent from '../../../mixins/proxy-component';

const Tooltip = window.antd.Tooltip;

@Component({
  name: 'DTooltip',
  inheritAttrs: false
})
export default class DTooltip extends ProxyComponent {

  public static install: (Vue) => void;

  public getInputComponent() {
    return Tooltip;
  }

}
