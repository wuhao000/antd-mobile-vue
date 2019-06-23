import Component from 'vue-class-component';
import BaseFormComponent from '../../../mixins/base-input-component';


@Component({
  name: 'DInputNumber',
  inheritAttrs: false
})
export default class DInputNumber extends BaseFormComponent {

  public getInputComponent() {
    return window.antd.InputNumber;
  }

}
