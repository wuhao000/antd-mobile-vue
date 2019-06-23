import Component from 'vue-class-component';
import BaseFormComponent from '../../../mixins/base-input-component';


@Component({
  name: 'DSlider',
  inheritAttrs: false
})
export default class DSlider extends BaseFormComponent {

  public static install: (Vue) => void;

  public getInitValue(): any {
    return 0;
  }

  public getInputComponent() {
    return window.antd.Slider;
  }

}
