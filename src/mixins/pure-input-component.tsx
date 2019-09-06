import {VNode} from 'vue';
import Component from 'vue-class-component';
import {mixins} from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import Emitter from './emitter';

const hasListener = (instance, listener) => {
  const listeners = instance.$listeners || {};
  return Object.keys(listeners).includes(listener);
};

const hasProp = (instance, prop) => {
  const $options = instance.$options || {};
  const propsData = $options.propsData || {};
  return prop in propsData;
};

@Component({
  name: 'PureInputComponent'
})
export default class PureInputComponent extends mixins(Emitter) {

  @Prop(Boolean)
  public block: boolean;
  @Prop()
  public value: string | number | any;
  public stateValue = this.initValue;
  @Prop([String, Number])
  public width: string | number;

  get cssStyle() {
    const style: any = {};
    if (this.block) {
      style.display = 'block';
    }
    if (this.width) {
      if (typeof this.width === 'number') {
        style.width = this.width + 'px';
      } else {
        style.width = this.width;
      }
    }
    return style;
  }

  get initValue() {
    const convertValue = this.convertValue(this.value);
    if (convertValue !== null && convertValue !== undefined) {
      return convertValue;
    } else {
      return this.getInitValue();
    }
  }

  protected get listeners() {
    return Object.assign({}, this.$listeners, {
      input: this.onInput,
      blur: this.handleBlur,
      change: this.handleChange,
      keydown: this.handleKeydown,
      keyup: this.handleKeyup
    }, this.getListeners());
  }

  protected get slots() {
    return Object.assign({}, this.$slots, this.getSlots());
  }

  public getSlots() {
    return {};
  }

  public getInitValue() {
    return null;
  }

  protected get props() {
    return {
      ...this.getSlotProps(),
      ...this.$attrs,
      ...this.$props,
      ...this.getProps(),
      visible: this.stateValue
    };
  }

  @Watch('stateValue')
  public stateValueChanged(value: any) {
    const val = this.convertValueBack(value);
    if (hasProp(this, 'value')) {
      this.$emit('input', val);
    }
    this.$emit('change', val);
    this.dispatch('DFormItem', 'd.form.change', [val]);
  }

  @Watch('value')
  public valueChanged(value: any) {
    if (this.stateValue !== this.convertValue(value)) {
      this.stateValue = this.convertValue(value);
    }
  }

  public mounted() {
    this.dispatch('DFormItem', 'd.form-item.setControl', [this]);
  }

  public beforeDestroy() {
    this.dispatch('DFormItem', 'd.form-item.setControl', [null]);
  }

  public convertValue(value: any) {
    return value;
  }

  public convertValueBack(value: any) {
    return value;
  }

  public getInputComponent() {
    return {};
  }

  public getListeners(): { [key: string]: (...args: any) => any } {
    return {};
  }

  public getProps() {
    return {};
  }

  public getSlotProps() {
    const props: any = {};
    Object.keys(this.$slots).forEach((slotKey: string) => {
      if (slotKey !== 'default') {
        props[slotKey] = this.$slots[slotKey];
      }
    });
    return props;
  }

  public handleBlur() {
    this.dispatch('DFormItem', 'd.form.blur', [this.stateValue]);
  }

  public handleChange(value) {
    if (value !== null && value !== undefined && value.toString() === '[object InputEvent]') {
      return;
    }
    const comp: any = this.getInputComponent();
    if (comp.model && comp.model.prop === 'value' && comp.model.event === 'change') {
      this.stateValue = value;
    }
  }

  public handleKeydown() {
    this.$emit('keydown');
  }

  public handleKeyup() {
    this.$emit('keyup');
  }

  public onInput(value) {
    let val = value;
    if (value && value.toString() === '[object InputEvent]') {
      val = value.target.value;
    }
    this.$emit('input', val);
    if (!(hasProp(this, 'value') && hasListener(this, 'input'))) {
      this.stateValue = val;
    }
  }

  public render() {
    const CustomComponent = this.getInputComponent();
    // @ts-ignore
    return <CustomComponent
      attrs={this.props}
      value={this.stateValue}
      scopedSlots={this.$scopedSlots}
      slots={this.slots}
      on={this.listeners}
      style={this.cssStyle}>
      {this.getDefaultSlot()}
    </CustomComponent>;
  }

  public getDefaultSlot(): VNode | VNode[] | undefined {
    return this.$slots.default;
  }
}
