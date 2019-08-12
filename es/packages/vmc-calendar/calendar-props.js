import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import defaultLocale from './locale/zh_CN';
let CalendarProps = class CalendarProps extends Vue {
};
tslib_1.__decorate([
    Prop({})
], CalendarProps.prototype, "defaultDate", void 0);
tslib_1.__decorate([
    Prop({
        type: Date, default: () => {
            return new Date(2000, 0, 1, 8);
        }
    })
], CalendarProps.prototype, "defaultTimeValue", void 0);
tslib_1.__decorate([
    Prop({})
], CalendarProps.prototype, "defaultValue", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], CalendarProps.prototype, "displayMode", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'vertical' })
], CalendarProps.prototype, "enterDirection", void 0);
tslib_1.__decorate([
    Prop({ type: Function })
], CalendarProps.prototype, "getDateExtra", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], CalendarProps.prototype, "infiniteOpt", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], CalendarProps.prototype, "initialMonths", void 0);
tslib_1.__decorate([
    Prop({
        type: Object, default: () => {
            return defaultLocale;
        }
    })
], CalendarProps.prototype, "locale", void 0);
tslib_1.__decorate([
    Prop({ type: Date })
], CalendarProps.prototype, "maxDate", void 0);
tslib_1.__decorate([
    Prop({ type: Date })
], CalendarProps.prototype, "minDate", void 0);
tslib_1.__decorate([
    Prop({})
], CalendarProps.prototype, "onSelect", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], CalendarProps.prototype, "pickTime", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'rmc-calendar' })
], CalendarProps.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({})
], CalendarProps.prototype, "renderHeader", void 0);
tslib_1.__decorate([
    Prop({})
], CalendarProps.prototype, "renderShortcut", void 0);
tslib_1.__decorate([
    Prop({})
], CalendarProps.prototype, "rowSize", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], CalendarProps.prototype, "showHeader", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], CalendarProps.prototype, "showShortcut", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], CalendarProps.prototype, "timePickerPickerPrefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], CalendarProps.prototype, "timePickerPrefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], CalendarProps.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'range' })
], CalendarProps.prototype, "type", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], CalendarProps.prototype, "visible", void 0);
CalendarProps = tslib_1.__decorate([
    Component({
        name: 'CalendarProps'
    })
], CalendarProps);
export default CalendarProps;
//# sourceMappingURL=calendar-props.js.map