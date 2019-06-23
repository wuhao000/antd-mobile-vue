import Component from 'vue-class-component';
import BaseFormComponent from '../../../mixins/base-input-component';

@Component({
  name: 'DPopover'
})
export default class AeIcon extends BaseFormComponent {

  public getInputComponent(): {} {
    return window.antd.Popover;
  }

}
