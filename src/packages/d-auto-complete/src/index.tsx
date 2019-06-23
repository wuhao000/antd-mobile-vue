import Component from 'vue-class-component';
import BaseFormComponent from '../../../mixins/base-input-component';


@Component({
  name: 'DAutoComplete',
  inheritAttrs: false
})
export default class DAutoComplete extends BaseFormComponent {

  public static install: (Vue) => void;

  public getInputComponent() {
    return window.antd.AutoComplete;
  }

}
