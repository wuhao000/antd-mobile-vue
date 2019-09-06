import PureInputComponent from './pure-input-component';
import Component from 'vue-class-component';
import {mixins} from 'vue-class-component';
import {SimpleFormComponent} from './simple-form-component';

@Component({
  name: 'BaseFormComponent'
})
export default class BaseFormComponent extends mixins(PureInputComponent, SimpleFormComponent) {

  get props() {
    return {
      ...this.getSlotProps(),
      ...this.$attrs,
      ...this.$props,
      ...this.getProps(),
      disabled: this.isDisabled,
      readOnly: this.isReadonly,
      visible: this.stateValue
    };
  }

}
