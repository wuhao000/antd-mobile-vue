import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import defaultLocale from './locale/zh_CN';
const DATE = 'date';
let DatePickerProps = class DatePickerProps extends Vue {
};
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "date", void 0);
tslib_1.__decorate([
    Prop({ default: () => new Date() })
], DatePickerProps.prototype, "defaultDate", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "minDate", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "maxDate", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], DatePickerProps.prototype, "minHour", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], DatePickerProps.prototype, "maxHour", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], DatePickerProps.prototype, "minMinute", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], DatePickerProps.prototype, "maxMinute", void 0);
tslib_1.__decorate([
    Prop({
        type: String,
        default: DATE
    })
], DatePickerProps.prototype, "mode", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], DatePickerProps.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ default: defaultLocale })
], DatePickerProps.prototype, "locale", void 0);
tslib_1.__decorate([
    Prop({
        type: Number,
        default: 1
    })
], DatePickerProps.prototype, "minuteStep", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "formatMonth", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "formatDay", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "itemStyle", void 0);
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'rmc-date-picker'
    })
], DatePickerProps.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({})
], DatePickerProps.prototype, "rootNativeProps", void 0);
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'rmc-picker'
    })
], DatePickerProps.prototype, "pickerPrefixCls", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], DatePickerProps.prototype, "use12Hours", void 0);
DatePickerProps = tslib_1.__decorate([
    Component({
        name: 'DatePickerProps'
    })
], DatePickerProps);
export default DatePickerProps;
//# sourceMappingURL=date-picker-props.jsx.map