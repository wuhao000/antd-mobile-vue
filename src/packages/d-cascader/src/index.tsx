import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import BaseFormComponent from '../../../mixins/base-input-component';


@Component({
  name: 'DCascader',
  inheritAttrs: false
})
export default class DCascader extends BaseFormComponent {

  @Prop({type: String, default: ''})
  public placeholder: string;

  public static install: (Vue) => void;

  public getInputComponent() {
    return window.antd.Cascader;
  }

}
