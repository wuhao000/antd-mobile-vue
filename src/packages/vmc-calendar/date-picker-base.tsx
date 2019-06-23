import {VNode} from 'vue';
import Component from 'vue-class-component';
import {Inject} from 'vue-property-decorator';
import DatePickerProps from './date-picker-props';
import {Models} from './date/data-types';
import {formatDate} from './util';

export interface StateType {
  months: Models.MonthData[];
}

@Component({
  name: 'DatePicker'
})
export default class DatePicker extends DatePickerProps {

  @Inject('currentValue')
  public currentValue: Date[];
  public visibleMonth: Models.MonthData[] = [];
  public state = {
    months: []
  };

  public genMonthComponent(data: Models.MonthData): VNode {
    return <div/>;
  }

  public created() {
    this.$watch(() => {
      return {startDate: this.startDate, endDate: this.endDate};
    }, (newValue, oldValue) => {
      if (oldValue.startDate) {
        this.selectDateRange(oldValue.startDate, oldValue.endDate, true);
      }
      if (newValue.startDate) {
        this.selectDateRange(newValue.startDate, newValue.endDate);
      }
    });
  }

  public beforeMount() {
    const {initialMonths = 6, defaultDate} = this;
    for (let i = 0; i < initialMonths; i++) {
      this.canLoadNext() && this.genMonthData(defaultDate, i);
    }
    this.visibleMonth = [...this.state.months];
  }

  public getMonthDate(date = new Date(), addMonth = 0) {
    const y = date.getFullYear();
    const m = date.getMonth();
    return {
      firstDate: new Date(y, m + addMonth, 1),
      lastDate: new Date(y, m + 1 + addMonth, 0)
    };
  }

  public canLoadPrev() {
    const {minDate} = this;
    return !minDate || this.state.months.length <= 0 || +this.getMonthDate(minDate).firstDate < +this.state.months[0].firstDate;
  }

  public canLoadNext() {
    const {maxDate} = this;
    return !maxDate || this.state.months.length <= 0
      || +this.getMonthDate(maxDate).firstDate > +this.state.months[this.state.months.length - 1].firstDate;
  }

  public getDateWithoutTime(date?: Date) {
    if (!date) {
      return 0;
    }
    return +new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
  }

  public genWeekData(firstDate: Date) {
    const minDateTime = this.getDateWithoutTime(this.minDate);
    const maxDateTime = this.getDateWithoutTime(this.maxDate) || Number.POSITIVE_INFINITY;

    const weeks: Models.CellData[][] = [];
    const nextMonth = this.getMonthDate(firstDate, 1).firstDate;
    let currentDay = firstDate;
    let currentWeek: Models.CellData[] = [];
    weeks.push(currentWeek);

    const startWeekday = currentDay.getDay();
    if (startWeekday > 0) {
      for (let i = 0; i < startWeekday; i++) {
        currentWeek.push({} as Models.CellData);
      }
    }
    while (currentDay < nextMonth) {
      if (currentWeek.length === 7) {
        currentWeek = [];
        weeks.push(currentWeek);
      }
      const dayOfMonth = currentDay.getDate();
      const tick = +currentDay;
      currentWeek.push({
        tick,
        dayOfMonth,
        selected: Models.SelectType.None,
        isFirstOfMonth: dayOfMonth === 1,
        isLastOfMonth: false,
        outOfDate: tick < minDateTime || tick > maxDateTime
      });
      currentDay = new Date(currentDay.getTime() + 3600 * 24 * 1000);
    }
    currentWeek[currentWeek.length - 1].isLastOfMonth = true;
    return weeks;
  }

  public genMonthData(date?: Date, addMonth: number = 0) {
    let copyDate = date;
    if (!copyDate) {
      copyDate = addMonth >= 0 ? this.state.months[this.state.months.length - 1].firstDate : this.state.months[0].firstDate;
    }
    if (!copyDate) {
      copyDate = new Date();
    }
    const {locale} = this;
    const {firstDate, lastDate} = this.getMonthDate(copyDate, addMonth);

    const weeks = this.genWeekData(firstDate);
    const title = formatDate(firstDate, locale ? locale.monthTitle : 'yyyy/MM', this.locale);
    const data = {
      title,
      firstDate,
      lastDate,
      weeks
    } as Models.MonthData;
    data.component = this.genMonthComponent(data);
    if (addMonth >= 0) {
      this.state.months.push(data);
    } else {
      this.state.months.unshift(data);
    }
    const {startDate, endDate} = this;
    if (startDate) {
      this.selectDateRange(startDate, endDate);
    }
    return data;
  }

  public inDate(date: number, tick: number) {
    return date <= tick && tick < date + 24 * 3600000;
  }

  public selectDateRange(startDate: Date, endDate?: Date, clear = false) {
    const {getDateExtra, type, onSelectHasDisableDate} = this;
    let copyEndDate = endDate;
    if (type === 'one') {
      copyEndDate = undefined;
    }
    const time1 = this.getDateWithoutTime(startDate);
    const time2 = this.getDateWithoutTime(copyEndDate);
    const startDateTick = !time2 || time1 < time2 ? time1 : time2;
    const endDateTick = time2 && time1 > time2 ? time1 : time2;
    const startMonthDate = this.getMonthDate(new Date(startDateTick)).firstDate;
    const endMonthDate = endDateTick ? new Date(endDateTick) : this.getMonthDate(new Date(startDateTick)).lastDate;
    const unuseable: number[] = [];
    let needUpdate = false;
    this.state.months.filter(m => {
      return m.firstDate >= startMonthDate && m.firstDate <= endMonthDate;
    }).forEach(m => {
      m.weeks.forEach(w => w.filter(d => {
          if (!endDateTick) {
            return d.tick && this.inDate(startDateTick, d.tick);
          } else {
            return d.tick && d.tick >= startDateTick && d.tick <= endDateTick;
          }
        }).forEach(d => {
          const oldValue = d.selected;
          if (clear) {
            d.selected = Models.SelectType.None;
          } else {
            const info = getDateExtra && getDateExtra(new Date(d.tick),
              [...this.currentValue]) || {};
            if (d.outOfDate || info.disable) {
              unuseable.push(d.tick);
            }
            if (this.inDate(startDateTick, d.tick)) {
              if (type === 'one') {
                d.selected = Models.SelectType.Single;
              } else if (!endDateTick) {
                d.selected = Models.SelectType.Only;
              } else if (startDateTick !== endDateTick) {
                d.selected = Models.SelectType.Start;
              } else {
                d.selected = Models.SelectType.All;
              }
            } else if (this.inDate(endDateTick, d.tick)) {
              d.selected = Models.SelectType.End;
            } else {
              d.selected = Models.SelectType.Middle;
            }
          }
          needUpdate = needUpdate || d.selected !== oldValue;
        })
      );
      if (needUpdate && m.componentRef) {
        m.componentRef.updateWeeks();
        m.componentRef.$forceUpdate();
      }
    });
    if (unuseable.length > 0) {
      if (onSelectHasDisableDate) {
        onSelectHasDisableDate(unuseable.map(tick => new Date(tick)));
      } else {
        console.warn('Unusable date. You can handle by onSelectHasDisableDate.', unuseable);
      }
    }
  }

  public computeVisible(clientHeight: number, scrollTop: number) {
    let needUpdate = false;
    const MAX_VIEW_PORT = clientHeight * 2;
    const MIN_VIEW_PORT = clientHeight;

    // 大缓冲区外过滤规则
    const filterFunc = (vm: Models.MonthData) => vm.y && vm.height && (vm.y + vm.height > scrollTop - MAX_VIEW_PORT && vm.y < scrollTop + clientHeight + MAX_VIEW_PORT);

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
          } else {
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
    } else if (this.state.months.length > 0) {
      this.visibleMonth = this.state.months.filter(filterFunc);
      needUpdate = true;
    }

    return needUpdate;
  }

  public createOnScroll() {
    let timer: any;
    let clientHeight = 0;
    let scrollTop = 0;

    return (data: { full: number, client: number, top: number }) => {
      const {client, top} = data;
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

  public onCellClick(day: Models.CellData) {
    if (!day.tick) {
      return;
    }
    this.$emit('cellClick', new Date(day.tick));
  }
}
