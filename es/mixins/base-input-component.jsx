import * as tslib_1 from "tslib";
import PureInputComponent from './pure-input-component';
import Component from 'vue-class-component';
import { mixins } from 'vue-class-component/lib/util';
import { SimpleFormComponent } from './simple-form-component';
let BaseFormComponent = class BaseFormComponent extends mixins(PureInputComponent, SimpleFormComponent) {
    get props() {
        return Object.assign({}, this.getSlotProps(), this.$attrs, this.$props, this.getProps(), { disabled: this.isDisabled, readOnly: this.isReadonly, visible: this.stateValue });
    }
};
BaseFormComponent = tslib_1.__decorate([
    Component({
        name: 'BaseFormComponent'
    })
], BaseFormComponent);
export default BaseFormComponent;
//# sourceMappingURL=base-input-component.jsx.map