import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
let SimpleFormComponent = class SimpleFormComponent extends Vue {
    get isDisabled() {
        let disabled = this.disabled;
        if (this.form) {
            if (!disabled) {
                disabled = this.form.disabled;
            }
        }
        return disabled;
    }
    get componentSize() {
        let size = this.size;
        if (this.form) {
            if (size === undefined || size === null) {
                size = this.form.size;
            }
        }
        return size;
    }
    get isReadonly() {
        let isReadonly = this.readOnly;
        if (this.form) {
            if (!isReadonly) {
                isReadonly = this.form.readOnly;
            }
        }
        return isReadonly;
    }
};
tslib_1.__decorate([
    Prop({ type: String })
], SimpleFormComponent.prototype, "size", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], SimpleFormComponent.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], SimpleFormComponent.prototype, "readOnly", void 0);
tslib_1.__decorate([
    Inject({ from: 'form', default: undefined })
], SimpleFormComponent.prototype, "form", void 0);
SimpleFormComponent = tslib_1.__decorate([
    Component({
        name: 'SimpleFormComponent'
    })
], SimpleFormComponent);
export { SimpleFormComponent };
//# sourceMappingURL=simple-form-component.jsx.map