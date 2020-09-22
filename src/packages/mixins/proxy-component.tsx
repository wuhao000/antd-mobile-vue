import {Options} from 'vue-class-component';
import Emitter from './emitter';

@Options({
  name: 'ProxyComponent'
})
export default class ProxyComponent extends Emitter {
  get cssClass() {
    return {};
  }

  get cssStyle() {
    return {};
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

  public render(): any {
    const ProxyComponent: any = this.getInputComponent();
    const props = {...this.props, class: this.cssClass, style: this.cssStyle};
    return <ProxyComponent
      {...props}
      slots={this.$slots}>
      {this.$slots.default}
    </ProxyComponent>;
  }
}
