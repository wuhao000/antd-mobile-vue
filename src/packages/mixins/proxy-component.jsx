import { __decorate } from "tslib";
import { Options } from 'vue-class-component';
import Emitter from './emitter';
let ProxyComponent = class ProxyComponent extends Emitter {
    get cssClass() {
        return {};
    }
    get cssStyle() {
        return {};
    }
    get props() {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, this.getSlotProps()), this.$attrs), this.$props), this.getProps());
    }
    get slotNames() {
        return Object.keys(this.$slots);
    }
    getInputComponent() {
        return {};
    }
    getProps() {
        return {};
    }
    getSlotProps() {
        const props = {};
        Object.keys(this.$slots).forEach((slotKey) => {
            if (slotKey !== 'default') {
                props[slotKey] = this.$slots[slotKey];
            }
        });
        return props;
    }
    render() {
        const ProxyComponent = this.getInputComponent();
        const props = Object.assign(Object.assign({}, this.props), { class: this.cssClass, style: this.cssStyle });
        return <ProxyComponent {...props} slots={this.$slots}>
      {this.$slots.default}
    </ProxyComponent>;
    }
};
ProxyComponent = __decorate([
    Options({
        name: 'ProxyComponent'
    })
], ProxyComponent);
export default ProxyComponent;
//# sourceMappingURL=proxy-component.jsx.map