import Component from 'vue-class-component';
import BaseFormComponent from '../../../mixins/base-input-component';


@Component({
  name: 'DSwitch',
  inheritAttrs: false
})
export default class DSwitch extends BaseFormComponent {

  public getInputComponent() {
    return window.antd.Switch;
  }

  public getInitValue(): boolean {
    return false;
  }

  public getListeners(): { [p: string]: (...args: any) => any } {
    return {
      change: (value) => {
        this.stateValue = value;
      }
    };
  }

  public getProps(): {} {
    return {checked: this.stateValue};
  }

}
