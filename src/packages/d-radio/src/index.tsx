import Component from 'vue-class-component';
import BaseFormComponent from '../../../mixins/base-input-component';
import Group from './radio-group';

const Radio = window.antd.Radio;

@Component({
  name: 'DRadioButon',
  inheritAttrs: false
})
class Button extends BaseFormComponent {

  public getInputComponent() {
    return Radio.Button;
  }

}


@Component({
  name: 'DRadio',
  inheritAttrs: false
})
class DRadio extends BaseFormComponent {

  public getInputComponent() {
    return Radio;
  }

  public static Group = Group;

  public static Button = Button;

}

export {Button, Group};

export default DRadio;
