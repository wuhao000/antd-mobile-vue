import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let PopupPickerProps = class PopupPickerProps extends Vue {
};
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "picker", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'click' })
], PopupPickerProps.prototype, "triggerType", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "WrapComponent", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "dismissText", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "okText", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], PopupPickerProps.prototype, "visible", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], PopupPickerProps.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "content", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "actionTextUnderlayColor", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "actionTextActiveOpacity", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "wrapStyle", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "pickerValueProp", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "pickerValueChangeProp", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "transitionName", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "popupTransitionName", void 0);
tslib_1.__decorate([
    Prop()
], PopupPickerProps.prototype, "maskTransitionName", void 0);
PopupPickerProps = tslib_1.__decorate([
    Component({
        name: 'PopupPickerProps'
    })
], PopupPickerProps);
export { PopupPickerProps };
//# sourceMappingURL=popup-picker-types.jsx.map