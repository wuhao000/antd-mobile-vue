import * as tslib_1 from "tslib";
import Component from 'vue-class-component';
import { Inject } from 'vue-property-decorator';
import DatePickerProps from './date-picker-props';
import { Models } from './date/data-types';
import { formatDate, genWeekData, getDateWithoutTime, getMonthDate } from './util';
function monthsBetween(minDate, maxDate) {
    return (maxDate.getFullYear() - minDate.getFullYear()) * 12 + maxDate.getMonth() - minDate.getMonth();
}
let DatePicker = class DatePicker extends DatePickerProps {
    constructor() {
        super(...arguments);
        this.visibleMonth = [];
        this.state = {
            months: []
        };
    }
    genMonthComponent(data) {
        return <div />;
    }
    created() {
        this.$watch(() => {
            return { startDate: this.startDate, endDate: this.endDate };
        }, (newValue, oldValue) => {
            if (oldValue.startDate) {
                this.selectDateRange(oldValue.startDate, oldValue.endDate, true);
            }
            if (newValue.startDate) {
                this.selectDateRange(newValue.startDate, newValue.endDate);
            }
        });
    }
    getBegin() {
        if (this.startDate) {
            return this.startDate;
        }
        else {
            const min = this.minDate || this.defaultDate;
            const max = this.maxDate || this.defaultDate;
            if (monthsBetween(min, max) < 6) {
                return this.minDate;
            }
            else {
                const date = new Date(max.getTime());
                date.setMonth(date.getMonth() - 6);
                return date;
            }
        }
    }
    beforeMount() {
        const { initialMonths = 6, defaultDate } = this;
        const begin = this.getBegin();
        for (let i = 0; i < initialMonths; i++) {
            this.canLoadNext() && this.genMonthData(begin, i);
        }
        this.visibleMonth = [...this.state.months];
    }
    canLoadPrev() {
        const { minDate } = this;
        return !minDate || this.state.months.length <= 0 || +getMonthDate(minDate).firstDate < +this.state.months[0].firstDate;
    }
    canLoadNext() {
        const { maxDate } = this;
        return !maxDate || this.state.months.length <= 0
            || +getMonthDate(maxDate).firstDate > +this.state.months[this.state.months.length - 1].firstDate;
    }
    genMonthData(date, addMonth = 0) {
        let copyDate = date;
        if (!copyDate) {
            copyDate = addMonth >= 0 ? this.state.months[this.state.months.length - 1].firstDate : this.state.months[0].firstDate;
        }
        if (!copyDate) {
            copyDate = new Date();
        }
        const { locale } = this;
        const { firstDate, lastDate } = getMonthDate(copyDate, addMonth);
        const weeks = genWeekData(firstDate, this.minDate, this.maxDate);
        const title = formatDate(firstDate, locale ? locale.monthTitle : 'yyyy/MM', this.locale);
        const data = {
            title,
            firstDate,
            lastDate,
            weeks
        };
        data.component = this.genMonthComponent(data);
        if (addMonth >= 0) {
            this.state.months.push(data);
        }
        else {
            this.state.months.unshift(data);
        }
        const { startDate, endDate } = this;
        if (startDate) {
            this.selectDateRange(startDate, endDate);
        }
        return data;
    }
    inDate(date, tick) {
        return date <= tick && tick < date + 24 * 3600000;
    }
    selectDateRange(startDate, endDate, clear = false) {
        const { getDateExtra, type, onSelectHasDisableDate } = this;
        let copyEndDate = endDate;
        if (type === 'one') {
            copyEndDate = undefined;
        }
        const time1 = getDateWithoutTime(startDate);
        const time2 = getDateWithoutTime(copyEndDate);
        const startDateTick = !time2 || time1 < time2 ? time1 : time2;
        const endDateTick = time2 && time1 > time2 ? time1 : time2;
        const startMonthDate = getMonthDate(new Date(startDateTick)).firstDate;
        const endMonthDate = endDateTick ? new Date(endDateTick) : getMonthDate(new Date(startDateTick)).lastDate;
        const unuseable = [];
        let needUpdate = false;
        this.state.months.filter(m => {
            return m.firstDate >= startMonthDate && m.firstDate <= endMonthDate;
        }).forEach(m => {
            m.weeks.forEach(w => w.filter(d => {
                if (!endDateTick) {
                    return d.tick && this.inDate(startDateTick, d.tick);
                }
                else {
                    return d.tick && d.tick >= startDateTick && d.tick <= endDateTick;
                }
            }).forEach(d => {
                const oldValue = d.selected;
                if (clear) {
                    d.selected = Models.SelectType.None;
                }
                else {
                    const info = getDateExtra && getDateExtra(new Date(d.tick), [...this.currentValue]) || {};
                    if (d.outOfDate || info.disable) {
                        unuseable.push(d.tick);
                    }
                    if (this.inDate(startDateTick, d.tick)) {
                        if (type === 'one') {
                            d.selected = Models.SelectType.Single;
                        }
                        else if (!endDateTick) {
                            d.selected = Models.SelectType.Only;
                        }
                        else if (startDateTick !== endDateTick) {
                            d.selected = Models.SelectType.Start;
                        }
                        else {
                            d.selected = Models.SelectType.All;
                        }
                    }
                    else if (this.inDate(endDateTick, d.tick)) {
                        d.selected = Models.SelectType.End;
                    }
                    else {
                        d.selected = Models.SelectType.Middle;
                    }
                }
                needUpdate = needUpdate || d.selected !== oldValue;
            }));
            if (needUpdate && m.componentRef) {
                m.componentRef.updateWeeks();
                m.componentRef.$forceUpdate();
            }
        });
        if (unuseable.length > 0) {
            if (onSelectHasDisableDate) {
                onSelectHasDisableDate(unuseable.map(tick => new Date(tick)));
            }
            else {
                console.warn('Unusable date. You can handle by onSelectHasDisableDate.', unuseable);
            }
        }
    }
    computeVisible(clientHeight, scrollTop) {
        let needUpdate = false;
        const MAX_VIEW_PORT = clientHeight * 2;
        const MIN_VIEW_PORT = clientHeight;
        // 大缓冲区外过滤规则
        const filterFunc = (vm) => vm.y && vm.height && (vm.y + vm.height > scrollTop - MAX_VIEW_PORT && vm.y < scrollTop + clientHeight + MAX_VIEW_PORT);
        if (this.infiniteOpt && this.visibleMonth.length > 12) {
            this.visibleMonth = this.visibleMonth.filter(filterFunc).sort((a, b) => +a.firstDate - +b.firstDate);
        }
        // 当小缓冲区不满时填充
        if (this.visibleMonth.length > 0) {
            const last = this.visibleMonth[this.visibleMonth.length - 1];
            if (last.y !== undefined && last.height && last.y + last.height < scrollTop + clientHeight + MIN_VIEW_PORT) {
                const lastIndex = this.state.months.indexOf(last);
                for (let i = 1; i <= 2; i++) {
                    const index = lastIndex + i;
                    if (index < this.state.months.length && this.visibleMonth.indexOf(this.state.months[index]) < 0) {
                        this.visibleMonth.push(this.state.months[index]);
                    }
                    else {
                        this.canLoadNext() && this.genMonthData(undefined, 1);
                    }
                }
                needUpdate = true;
            }
            const first = this.visibleMonth[0];
            if (first.y !== undefined && first.height && first.y > scrollTop - MIN_VIEW_PORT) {
                const firstIndex = this.state.months.indexOf(first);
                for (let i = 1; i <= 2; i++) {
                    const index = firstIndex - i;
                    if (index >= 0 && this.visibleMonth.indexOf(this.state.months[index]) < 0) {
                        this.visibleMonth.unshift(this.state.months[index]);
                        needUpdate = true;
                    }
                }
            }
        }
        else if (this.state.months.length > 0) {
            this.visibleMonth = this.state.months.filter(filterFunc);
            needUpdate = true;
        }
        return needUpdate;
    }
    createOnScroll() {
        let timer;
        let clientHeight = 0;
        let scrollTop = 0;
        return (data) => {
            const { client, top } = data;
            clientHeight = client;
            scrollTop = top;
            if (timer) {
                return;
            }
            timer = setTimeout(() => {
                timer = undefined;
                if (this.computeVisible(clientHeight, scrollTop)) {
                    this.$forceUpdate();
                }
            }, 64);
        };
    }
    onCellClick(day) {
        if (!day.tick) {
            return;
        }
        this.$emit('cellClick', new Date(day.tick));
    }
};
tslib_1.__decorate([
    Inject('currentValue')
], DatePicker.prototype, "currentValue", void 0);
DatePicker = tslib_1.__decorate([
    Component({
        name: 'DatePicker'
    })
], DatePicker);
export default DatePicker;
//# sourceMappingURL=date-picker-base.jsx.map