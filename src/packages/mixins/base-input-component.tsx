import {useSimpleFormComponent} from '@/packages/mixins/simple-form-component';
import {mixins, Options} from 'vue-class-component';
import PureInputComponent from './pure-input-component';

@Options({
  name: 'BaseFormComponent',
  setup(props) {
    const {isReadonly, componentSize, isDisabled} = useSimpleFormComponent(props);
    return {isReadonly, componentSize, isDisabled};
  }
})
export default class BaseFormComponent extends PureInputComponent {

  public isDisabled;
  public isReadonly;
  public componentSize;

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
