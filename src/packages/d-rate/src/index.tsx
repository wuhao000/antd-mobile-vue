import Component from 'vue-class-component';
import BaseFormComponent from '../../../mixins/base-input-component';


@Component({
  name: 'DRate',
  inheritAttrs: false
})
export default class DRate extends BaseFormComponent {

  public static install: (Vue) => void;

  public getInputComponent() {
    return window.antd.Rate;
  }

}
