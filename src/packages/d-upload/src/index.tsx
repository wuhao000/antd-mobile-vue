import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import localeProvider from '../../locale-provider/zh_CN';
import BaseFormComponent from '../../../mixins/base-input-component';


@Component({
  name: 'DUpload',
  inheritAttrs: false
})
export default class DUpload extends BaseFormComponent {
  @Prop({type: Object, default: () => localeProvider.Upload})
  public locale: object;
  public static install: (Vue) => void;

  public getInputComponent() {
    return window.antd.Upload;
  }

}
