import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import DateTimePicker from '../vmc-date-picker';
export const MIN_DATE = new Date(0, 0, 0, 0, 0);
export const MAX_DATE = new Date(9999, 11, 31, 23, 59, 59);
let TimePicker = class TimePicker extends Vue {
    onDateChange(date) {
        this.$emit('change', date);
    }
    getMinTime(date) {
        const minDate = this.minDate;
        if (!date ||
            date.getFullYear() > minDate.getFullYear() ||
            date.getMonth() > minDate.getMonth() ||
            date.getDate() > minDate.getDate()) {
            return MIN_DATE;
        }
        return minDate;
    }
    getMaxTime(date) {
        const maxDate = this.maxDate;
        if (!date ||
            date.getFullYear() < maxDate.getFullYear() ||
            date.getMonth() < maxDate.getMonth() ||
            date.getDate() < maxDate.getDate()) {
            return MAX_DATE;
        }
        return maxDate;
    }
    render() {
        const { locale, title, value, defaultValue, prefixCls, pickerPrefixCls, clientHeight } = this.$props;
        const date = value || defaultValue || undefined;
        const height = (clientHeight && clientHeight * 3 / 8 - 52) || Number.POSITIVE_INFINITY;
        return (<div class={'time-picker'}>
        <div class={'title'}>{title}</div>
        {
        // @ts-ignore
        <DateTimePicker prefixCls={prefixCls} pickerPrefixCls={pickerPrefixCls} style={{
            height: height > 164 || height < 0 ? 164 : height,
            overflow: 'hidden'
        }} mode={'time'} date={date} locale={locale} minDate={this.getMinTime(date)} maxDate={this.getMaxTime(date)} onChange={this.onDateChange} use12Hours/>}
      </div>);
    }
};
tslib_1.__decorate([
    Prop()
], TimePicker.prototype, "locale", void 0);
tslib_1.__decorate([
    Prop(String)
], TimePicker.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop(String)
], TimePicker.prototype, "pickerPrefixCls", void 0);
tslib_1.__decorate([
    Prop(String)
], TimePicker.prototype, "title", void 0);
tslib_1.__decorate([
    Prop(Date)
], TimePicker.prototype, "defaultValue", void 0);
tslib_1.__decorate([
    Prop(Date)
], TimePicker.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({
        type: Date, default: () => {
            return MIN_DATE;
        }
    })
], TimePicker.prototype, "minDate", void 0);
tslib_1.__decorate([
    Prop({
        type: Date, default: () => {
            return MAX_DATE;
        }
    })
], TimePicker.prototype, "maxDate", void 0);
tslib_1.__decorate([
    Prop()
], TimePicker.prototype, "clientHeight", void 0);
TimePicker = tslib_1.__decorate([
    Component({
        name: 'TimePicker'
    })
], TimePicker);
export default TimePicker;
//# sourceMappingURL=time-picker.jsx.map