import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import locale from './locale/zh_CN';
let DatePickerProps = class DatePickerProps extends Vue {
};
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ default: 'datetime' })
], DatePickerProps.prototype, "mode", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "minDate", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "maxDate", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], DatePickerProps.prototype, "visible", void 0);
tslib_1.__decorate([
    Prop({ type: Object, default: () => locale })
], DatePickerProps.prototype, "locale", void 0);
tslib_1.__decorate([
    Prop({
        type: Number,
        default: 1
    })
], DatePickerProps.prototype, "minuteStep", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], DatePickerProps.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "format", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], DatePickerProps.prototype, "extra", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "dismissText", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "okText", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "title", void 0);
DatePickerProps = tslib_1.__decorate([
    Component({
        name: 'DatePickerProps'
    })
], DatePickerProps);
export default DatePickerProps;
//# sourceMappingURL=props-type.jsx.map