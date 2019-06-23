import PureInputComponent from './pure-input-component';
import Component from 'vue-class-component';
import {mixins} from 'vue-class-component/lib/util';
import {FormComponent} from './form-component';

@Component({
  name: 'BaseFormComponent'
})
export default class BaseFormComponent extends mixins(PureInputComponent, FormComponent) {

  get props() {
    return {
      ...this.getSlotProps(),
      ...this.$attrs,
      ...this.$props,
      ...this.getProps(),
      disabled: this.isDisabled,
      readOnly: this.isReadonly,
      visible: this.stateValue,
      size: this.componentSize
    };
  }

}
