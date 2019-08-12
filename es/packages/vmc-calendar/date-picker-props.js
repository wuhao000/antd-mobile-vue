import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
let DatePickerProps = class DatePickerProps extends Vue {
};
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "defaultDate", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "endDate", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "getDateExtra", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], DatePickerProps.prototype, "infiniteOpt", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], DatePickerProps.prototype, "initialMonths", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "locale", void 0);
tslib_1.__decorate([
    Prop({ type: Date })
], DatePickerProps.prototype, "maxDate", void 0);
tslib_1.__decorate([
    Prop({ type: Date })
], DatePickerProps.prototype, "minDate", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "onSelectHasDisableDate", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], DatePickerProps.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "rowSize", void 0);
tslib_1.__decorate([
    Prop({ type: Date })
], DatePickerProps.prototype, "startDate", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "type", void 0);
DatePickerProps = tslib_1.__decorate([
    Component({
        name: 'DatePickerProps'
    })
], DatePickerProps);
export default DatePickerProps;
//# sourceMappingURL=date-picker-props.js.map