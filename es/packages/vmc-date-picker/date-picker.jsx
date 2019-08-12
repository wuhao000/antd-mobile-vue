import * as tslib_1 from "tslib";
import Component from 'vue-class-component';
import { Inject, Watch } from 'vue-property-decorator';
import MultiPicker from '../vmc-picker/multi-picker';
import Picker from '../vmc-picker/picker';
import DatePickerProps from './date-picker-props';
function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}
function pad(n) {
    return n < 10 ? `0${n}` : n;
}
function cloneDate(date) {
    return new Date(+date);
}
function setMonth(date, month) {
    date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))));
    date.setMonth(month);
}
const DATETIME = 'datetime';
const DATE = 'date';
const TIME = 'time';
const MONTH = 'month';
const YEAR = 'year';
const ONE_DAY = 24 * 60 * 60 * 1000;
let DatePicker = class DatePicker extends DatePickerProps {
    constructor() {
        super(...arguments);
        this.state = {
            date: this.date || this.defaultDate,
            values: []
        };
    }
    dateChagned() {
        const { value } = this.getValueCols();
        this.state.values = value;
    }
    created() {
        if (this.store) {
            this.store.onOk = this.onOk;
            this.store.onDismiss = this.onDismiss;
        }
    }
    beforeUpdate() {
        if (this.date !== undefined) {
            this.state.date = this.date || this.defaultDate;
        }
    }
    getNewDate(values, index) {
        const value = parseInt(values[index], 10);
        const props = this;
        const { mode } = props;
        const newValue = cloneDate(this.getDate());
        if (mode === DATETIME || mode === DATE || mode === YEAR || mode === MONTH) {
            switch (index) {
                case 0:
                    newValue.setFullYear(value);
                    break;
                case 1:
                    // Note: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth
                    // e.g. from 2017-03-31 to 2017-02-28
                    setMonth(newValue, value);
                    break;
                case 2:
                    newValue.setDate(value);
                    break;
                case 3:
                    this.setHours(newValue, value);
                    break;
                case 4:
                    newValue.setMinutes(value);
                    break;
                case 5:
                    this.setAmPm(newValue, value);
                    break;
                default:
                    break;
            }
        }
        else if (mode === TIME) {
            switch (index) {
                case 0:
                    this.setHours(newValue, value);
                    break;
                case 1:
                    newValue.setMinutes(value);
                    break;
                case 2:
                    this.setAmPm(newValue, value);
                    break;
                default:
                    break;
            }
        }
        return this.clipDate(newValue);
    }
    onOk() {
        const newValue = cloneDate(this.getDate());
        newValue.setSeconds(0);
        const values = this.state.values;
        switch (this.mode) {
            case 'date':
                newValue.setFullYear(parseInt(values[0]));
                setMonth(newValue, values[1]);
                newValue.setDate(values[2]);
                this.setHours(newValue, 0);
                newValue.setMinutes(0);
                break;
            case 'year':
                newValue.setFullYear(parseInt(values[0]));
                break;
            case 'month':
                newValue.setFullYear(parseInt(values[0]));
                setMonth(newValue, values[1]);
                break;
            case 'time':
                this.setHours(newValue, values[0]);
                newValue.setMinutes(values[1]);
                if (this.use12Hours) {
                    this.setAmPm(newValue, values[2]);
                }
                break;
            case 'datetime':
                newValue.setFullYear(parseInt(values[0]));
                setMonth(newValue, values[1]);
                newValue.setDate(values[2]);
                this.setHours(newValue, values[3]);
                newValue.setMinutes(values[4]);
                if (this.use12Hours) {
                    this.setAmPm(newValue, values[5]);
                }
                break;
        }
        this.$emit('input', newValue);
    }
    onDismiss() {
        const { value } = this.getValueCols();
        this.state.values = value;
        this.$emit('dismiss', value);
    }
    onValueChange(values, index) {
        this.state.values = values;
        this.$emit('change', values, index);
    }
    onScrollChange(values, index) {
        const newValue = this.getNewDate(values, index);
        this.$emit('scroll-change', newValue, values, index);
        this.$emit('scrollChange', newValue, values, index);
    }
    setHours(date, hour) {
        if (this.use12Hours) {
            const dh = date.getHours();
            let nhour;
            nhour = dh >= 12 ? hour + 12 : hour;
            nhour = nhour >= 24 ? 0 : nhour; // Make sure no more than one day
            date.setHours(nhour);
        }
        else {
            date.setHours(hour);
        }
    }
    setAmPm(date, index) {
        if (index === 0) {
            date.setTime(+date - ONE_DAY / 2);
        }
        else {
            date.setTime(+date + ONE_DAY / 2);
        }
    }
    getDefaultMinDate() {
        if (!this.defaultMinDate) {
            this.defaultMinDate = new Date(2000, 1, 1, 0, 0, 0);
        }
        return this.defaultMinDate;
    }
    getDefaultMaxDate() {
        if (!this.defaultMaxDate) {
            this.defaultMaxDate = new Date(2030, 1, 1, 23, 59, 59);
        }
        return this.defaultMaxDate;
    }
    getDate() {
        return this.clipDate(this.state.date || this.getDefaultMinDate());
    }
    getValue() {
        return this.getDate();
    }
    getMinYear() {
        return this.getMinDate().getFullYear();
    }
    getMaxYear() {
        return this.getMaxDate().getFullYear();
    }
    getMinMonth() {
        return this.getMinDate().getMonth();
    }
    getMaxMonth() {
        return this.getMaxDate().getMonth();
    }
    getMinDay() {
        return this.getMinDate().getDate();
    }
    getMaxDay() {
        return this.getMaxDate().getDate();
    }
    getMinHour() {
        return this.getMinDate().getHours();
    }
    getMaxHour() {
        return this.getMaxDate().getHours();
    }
    getMinMinute() {
        return this.getMinDate().getMinutes();
    }
    getMaxMinute() {
        return this.getMaxDate().getMinutes();
    }
    getMinDate() {
        return this.minDate || this.getDefaultMinDate();
    }
    getMaxDate() {
        return this.maxDate || this.getDefaultMaxDate();
    }
    getDateData() {
        const { locale, formatMonth, formatDay, mode } = this;
        const date = this.getDate();
        const selYear = date.getFullYear();
        const selMonth = date.getMonth();
        const minDateYear = this.getMinYear();
        const maxDateYear = this.getMaxYear();
        const minDateMonth = this.getMinMonth();
        const maxDateMonth = this.getMaxMonth();
        const minDateDay = this.getMinDay();
        const maxDateDay = this.getMaxDay();
        const years = [];
        for (let i = minDateYear; i <= maxDateYear; i++) {
            years.push({
                value: i,
                label: i + locale.year
            });
        }
        const yearCol = { key: 'year', props: { children: years } };
        if (mode === YEAR) {
            return [yearCol];
        }
        const months = [];
        let minMonth = 0;
        let maxMonth = 11;
        if (minDateYear === selYear) {
            minMonth = minDateMonth;
        }
        if (maxDateYear === selYear) {
            maxMonth = maxDateMonth;
        }
        for (let i = minMonth; i <= maxMonth; i++) {
            const label = formatMonth ? formatMonth(i, date) : (i + 1 + locale.month);
            months.push({
                value: i,
                label
            });
        }
        const monthCol = { key: 'month', props: { children: months } };
        if (mode === MONTH) {
            return [yearCol, monthCol];
        }
        const days = [];
        let minDay = 1;
        let maxDay = getDaysInMonth(date);
        if (minDateYear === selYear && minDateMonth === selMonth) {
            minDay = minDateDay;
        }
        if (maxDateYear === selYear && maxDateMonth === selMonth) {
            maxDay = maxDateDay;
        }
        for (let i = minDay; i <= maxDay; i++) {
            const label = formatDay ? formatDay(i, date) : (i + locale.day);
            days.push({
                value: i,
                label
            });
        }
        return [
            yearCol,
            monthCol,
            { key: 'day', props: { children: days } }
        ];
    }
    getDisplayHour(rawHour) {
        // 12 hour am (midnight 00:00) -> 12 hour pm (noon 12:00) -> 12 hour am (midnight 00:00)
        if (this.use12Hours) {
            if (rawHour === 0) {
                return 12;
            }
            if (rawHour > 12) {
                return rawHour - 12;
            }
        }
        return rawHour;
    }
    getTimeData(date) {
        let { minHour = 0, maxHour = 23, minMinute = 0, maxMinute = 59 } = this;
        const { mode, locale, minuteStep, use12Hours } = this;
        const minDateMinute = this.getMinMinute();
        const maxDateMinute = this.getMaxMinute();
        const minDateHour = this.getMinHour();
        const maxDateHour = this.getMaxHour();
        const hour = date.getHours();
        if (mode === DATETIME) {
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const minDateYear = this.getMinYear();
            const maxDateYear = this.getMaxYear();
            const minDateMonth = this.getMinMonth();
            const maxDateMonth = this.getMaxMonth();
            const minDateDay = this.getMinDay();
            const maxDateDay = this.getMaxDay();
            if (minDateYear === year && minDateMonth === month && minDateDay === day) {
                minHour = minDateHour;
                if (minDateHour === hour) {
                    minMinute = minDateMinute;
                }
            }
            if (maxDateYear === year && maxDateMonth === month && maxDateDay === day) {
                maxHour = maxDateHour;
                if (maxDateHour === hour) {
                    maxMinute = maxDateMinute;
                }
            }
        }
        else {
            minHour = minDateHour;
            if (minDateHour === hour) {
                minMinute = minDateMinute;
            }
            maxHour = maxDateHour;
            if (maxDateHour === hour) {
                maxMinute = maxDateMinute;
            }
        }
        const hours = [];
        if (minHour === 0 && maxHour === 0 || minHour !== 0 && maxHour !== 0) {
            minHour = this.getDisplayHour(minHour);
        }
        else if (minHour === 0 && use12Hours) {
            minHour = 1;
            hours.push({ value: '0', label: locale.hour ? '12' + locale.hour : '12' });
        }
        maxHour = this.getDisplayHour(maxHour);
        for (let i = minHour; i <= maxHour; i++) {
            hours.push({
                value: i,
                label: locale.hour ? i + locale.hour : pad(i)
            });
        }
        const minutes = [];
        const selMinute = date.getMinutes();
        for (let i = minMinute; i <= maxMinute; i += minuteStep) {
            minutes.push({
                value: i,
                label: locale.minute ? i + locale.minute : pad(i)
            });
            if (selMinute > i && selMinute < i + minuteStep) {
                minutes.push({
                    value: selMinute,
                    label: locale.minute ? selMinute + locale.minute : pad(selMinute)
                });
            }
        }
        const cols = [
            { key: 'hours', props: { children: hours } },
            { key: 'minutes', props: { children: minutes } }
        ].concat(use12Hours ? [{
                key: 'ampm',
                props: { children: [{ value: 0, label: locale.am }, { value: 1, label: locale.pm }] }
            }] : []);
        return { cols, selMinute };
    }
    clipDate(date) {
        const { mode } = this;
        const minDate = this.getMinDate();
        const maxDate = this.getMaxDate();
        if (mode === DATETIME) {
            if (date < minDate) {
                return cloneDate(minDate);
            }
            if (date > maxDate) {
                return cloneDate(maxDate);
            }
        }
        else if (mode === DATE || mode === YEAR || mode === MONTH) {
            // compare-two-dates: https://stackoverflow.com/a/14629978/2190503
            if (+date + ONE_DAY <= minDate) {
                return cloneDate(minDate);
            }
            if (date >= +maxDate + ONE_DAY) {
                return cloneDate(maxDate);
            }
        }
        else if (mode === TIME) {
            const maxHour = maxDate.getHours();
            const maxMinutes = maxDate.getMinutes();
            const minHour = minDate.getHours();
            const minMinutes = minDate.getMinutes();
            const hour = date.getHours();
            const minutes = date.getMinutes();
            if (hour < minHour || hour === minHour && minutes < minMinutes) {
                return cloneDate(minDate);
            }
            if (hour > maxHour || hour === maxHour && minutes > maxMinutes) {
                return cloneDate(maxDate);
            }
        }
        return date;
    }
    getValueCols() {
        const { mode, use12Hours } = this;
        const date = this.getDate();
        let cols = [];
        let value = [];
        if (mode === YEAR) {
            return {
                cols: this.getDateData(),
                value: [date.getFullYear()]
            };
        }
        if (mode === MONTH) {
            return {
                cols: this.getDateData(),
                value: [date.getFullYear(), date.getMonth()]
            };
        }
        if (mode === DATETIME || mode === DATE) {
            cols = this.getDateData();
            value = [date.getFullYear(), date.getMonth(), date.getDate()];
        }
        if (mode === DATETIME || mode === TIME) {
            const time = this.getTimeData(date);
            cols = cols.concat(time.cols);
            const hour = date.getHours();
            let dtValue = [hour, time.selMinute];
            let nhour = hour;
            if (use12Hours) {
                nhour = hour === 0 ? 12 : (hour > 12 ? hour - 12 : hour);
                dtValue = [nhour, time.selMinute, (hour >= 12 ? 1 : 0)];
            }
            value = value.concat(dtValue);
        }
        return {
            value,
            cols
        };
    }
    render() {
        const { cols } = this.getValueCols();
        const value = this.state.values;
        const { disabled, pickerPrefixCls, prefixCls, rootNativeProps, itemStyle } = this;
        const multiStyle = {
            flexDirection: 'row',
            alignItems: 'center'
        };
        return (
        // @ts-ignore
        <MultiPicker style={multiStyle} rootNativeProps={rootNativeProps} prefixCls={prefixCls} selectedValue={value} on={{
            input: this.onValueChange,
            scrollChange: this.onScrollChange
        }}>
          {cols.map(p => (
        // @ts-ignore
        <Picker attrs={{
            disabled,
            prefixCls: pickerPrefixCls,
            itemStyle
        }} style={{ flex: 1 }} key={p.key}>
                {p.props.children.map(item => (
        // @ts-ignore
        <Picker.Item key={item.value} value={item.value} label={item.label}>
                    </Picker.Item>))}
              </Picker>))}
        </MultiPicker>);
    }
};
tslib_1.__decorate([
    Inject({ from: 'store', default: undefined })
], DatePicker.prototype, "store", void 0);
tslib_1.__decorate([
    Watch('state.date', { immediate: true })
], DatePicker.prototype, "dateChagned", null);
DatePicker = tslib_1.__decorate([
    Component({
        name: 'DatePicker'
    })
], DatePicker);
export default DatePicker;
//# sourceMappingURL=date-picker.jsx.map