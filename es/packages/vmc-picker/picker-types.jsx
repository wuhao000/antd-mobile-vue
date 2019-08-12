import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let PickerProps = class PickerProps extends Vue {
};
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], PickerProps.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop()
], PickerProps.prototype, "selectedValue", void 0);
tslib_1.__decorate([
    Prop()
], PickerProps.prototype, "itemStyle", void 0);
tslib_1.__decorate([
    Prop()
], PickerProps.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop()
], PickerProps.prototype, "indicatorStyle", void 0);
tslib_1.__decorate([
    Prop()
], PickerProps.prototype, "indicatorClassName", void 0);
tslib_1.__decorate([
    Prop()
], PickerProps.prototype, "defaultSelectedValue", void 0);
PickerProps = tslib_1.__decorate([
    Component({
        name: 'PickerProps'
    })
], PickerProps);
export { PickerProps };
//# sourceMappingURL=picker-types.jsx.map