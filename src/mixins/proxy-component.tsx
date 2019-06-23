import Component from 'vue-class-component';
import Emitter from './emitter';

@Component({
  name: 'ProxyComponent'
})
export default class ProxyComponent extends Emitter {

  get cssClass() {
    return {};
  }

  get cssStyle() {
    return {};
  }

  get listeners() {
    const listeners: any = {};
    Object.keys(this.$listeners).forEach(listener => {
      if (listener !== 'change') {
        listeners[listener] = this.$listeners[listener];
      }
    });
    return listeners;
  }

  get props() {
    return {
      ...this.getSlotProps(),
      ...this.$attrs,
      ...this.$props,
      ...this.getProps()
    };
  }

  get slotNames() {
    return Object.keys(this.$slots);
  }

  public getInputComponent() {
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

  public render() {
    const ProxyComponent: any = this.getInputComponent();
    return <ProxyComponent
      attrs={this.props}
      on={this.listeners}
      scopedSlots={this.$scopedSlots}
      slots={this.$slots}
      class={this.cssClass}
      style={this.cssStyle}>
      {this.$slots.default}
    </ProxyComponent>;
  }
}
