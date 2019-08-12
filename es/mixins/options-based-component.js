import * as tslib_1 from "tslib";
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { getOptionProperty } from '../packages/utils/option';
import BaseFormComponent from './base-input-component';
let OptionsBasedComponent = class OptionsBasedComponent extends mixins(BaseFormComponent) {
    beforeUpdate() {
        this.setProps();
    }
    created() {
        this.setProps();
    }
    getOptions() {
        return this.getResolvedOptions(this.options);
    }
    getResolvedOptions(options) {
        if (options) {
            return options.map(option => {
                const op = Object.assign({}, option);
                op.label = getOptionProperty(option, this.labelProperty);
                op.value = getOptionProperty(option, this.valueProperty);
                return op;
            });
        }
        else {
            return null;
        }
    }
    setProps() {
        if (this.$slots.default) {
            this.$slots.default.forEach(node => {
                if (node.componentOptions && node.componentOptions.propsData['disabled'] === undefined) {
                    node.componentOptions.propsData['disabled'] = this['isDisabled'];
                }
                if (node.componentOptions && node.componentOptions.propsData['readonly'] === undefined) {
                    node.componentOptions.propsData['readonly'] = this['isReadonly'];
                }
            });
        }
    }
};
tslib_1.__decorate([
    Prop({ type: [String, Function], default: 'label' })
], OptionsBasedComponent.prototype, "labelProperty", void 0);
tslib_1.__decorate([
    Prop({ type: Array })
], OptionsBasedComponent.prototype, "options", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Function], default: 'value' })
], OptionsBasedComponent.prototype, "valueProperty", void 0);
OptionsBasedComponent = tslib_1.__decorate([
    Component({
        name: 'OptionsBasedComponent'
    })
], OptionsBasedComponent);
export default OptionsBasedComponent;
//# sourceMappingURL=options-based-component.js.map