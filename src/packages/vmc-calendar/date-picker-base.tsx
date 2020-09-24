import {inject, reactive, ref, Ref, watch} from 'vue';
import {CellData, MonthData, SelectType} from './data-types';
import {formatDate, genWeekData, getDateWithoutTime, getMonthDate} from './util';

export interface StateType {
  months: MonthData[];
}

function monthsBetween(minDate: Date, maxDate: Date) {
  return (maxDate.getFullYear() - minDate.getFullYear()) * 12 + maxDate.getMonth() - minDate.getMonth();
}

export const useDatePickerBase = (props, {emit}) => {
  const currentValue: Date[] = inject('currentValue');
  const visibleMonth: Ref<MonthData[]> = ref([]);
  const updateFlag = ref(0);
  const state = reactive({
    months: []
  });
  const genMonthComponent = (data: MonthData): any => {
    return <div/>;
  };
  const created = () => {
    watch(() => {
      return {startDate: props.startDate, endDate: props.endDate};
    }, (newValue, oldValue) => {
      if (oldValue.startDate) {
        selectDateRange(oldValue.startDate, oldValue.endDate, true);
      }
      if (newValue.startDate) {
        selectDateRange(newValue.startDate, newValue.endDate);
      }
    });
  };
  const getBegin = () => {
    if (props.startDate) {
      return props.startDate;
    } else {
      const min = props.minDate || props.defaultDate;
      const max = props.maxDate || props.defaultDate;
      if (monthsBetween(min, max) < 6) {
        return props.minDate;
      } else {
        const date = new Date(max.getTime());
        date.setMonth(date.getMonth() - 6);
        return date;
      }
    }
  };
  const beforeMount = () => {
    const {initialMonths = 6, defaultDate} = props;
    const begin = getBegin();
    for (let i = 0; i < initialMonths; i++) {
      canLoadNext() && genMonthData(begin, i);
    }
    visibleMonth.value = [...state.months];
  };
  const canLoadPrev = () => {
    const {minDate} = props;
    return !minDate || state.months.length <= 0 || +getMonthDate(minDate).firstDate < +state.months[0].firstDate;
  };
  const canLoadNext = () => {
    const {maxDate} = props;
    return !maxDate || state.months.length <= 0
      || +getMonthDate(maxDate).firstDate > +state.months[state.months.length - 1].firstDate;
  };
  const genMonthData = (date?: Date, addMonth: number = 0) => {
    let copyDate = date;
    if (!copyDate) {
      copyDate = addMonth >= 0 ? state.months[state.months.length - 1].firstDate : state.months[0].firstDate;
    }
    if (!copyDate) {
      copyDate = new Date();
    }
    const {locale} = props;
    const {firstDate, lastDate} = getMonthDate(copyDate, addMonth);

    const weeks = genWeekData(firstDate, props.minDate, props.maxDate);
    const title = formatDate(firstDate, locale ? locale.monthTitle : 'yyyy/MM', props.locale);
    const data = {
      title,
      firstDate,
      lastDate,
      weeks
    } as MonthData;
    data.component = genMonthComponent(data);
    if (addMonth >= 0) {
      state.months.push(data);
    } else {
      state.months.unshift(data);
    }
    const {startDate, endDate} = props;
    if (startDate) {
      selectDateRange(startDate, endDate);
    }
    return data;
  };
  const inDate = (date: number, tick: number) => {
    return date <= tick && tick < date + 24 * 3600000;
  };
  const selectDateRange = (startDate: Date, endDate?: Date, clear = false) => {
    const {getDateExtra, type, onSelectHasDisableDate} = props;
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
    const unuseable: number[] = [];
    let needUpdate = false;
    state.months.filter(m => {
      return m.firstDate >= startMonthDate && m.firstDate <= endMonthDate;
    }).forEach(m => {
      m.weeks.forEach(w => w.filter(d => {
          if (!endDateTick) {
            return d.tick && inDate(startDateTick, d.tick);
          } else {
            return d.tick && d.tick >= startDateTick && d.tick <= endDateTick;
          }
        }).forEach(d => {
          const oldValue = d.selected;
          if (clear) {
            d.selected = SelectType.None;
          } else {
            const info = getDateExtra && getDateExtra(new Date(d.tick),
              [...currentValue]) || {};
            if (d.outOfDate || info.disable) {
              unuseable.push(d.tick);
            }
            if (inDate(startDateTick, d.tick)) {
              if (type === 'one') {
                d.selected = SelectType.Single;
              } else if (!endDateTick) {
                d.selected = SelectType.Only;
              } else if (startDateTick !== endDateTick) {
                d.selected = SelectType.Start;
              } else {
                d.selected = SelectType.All;
              }
            } else if (inDate(endDateTick, d.tick)) {
              d.selected = SelectType.End;
            } else {
              d.selected = SelectType.Middle;
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
  };
  const computeVisible = (clientHeight: number, scrollTop: number): boolean => {
    let needUpdate = false;
    const MAX_VIEW_PORT = clientHeight * 2;
    const MIN_VIEW_PORT = clientHeight;

    // 大缓冲区外过滤规则
    const filterFunc = (vm: MonthData) => vm.y && vm.height && (vm.y + vm.height > scrollTop - MAX_VIEW_PORT && vm.y < scrollTop + clientHeight + MAX_VIEW_PORT);

    if (props.infiniteOpt && visibleMonth.value.length > 12) {
      visibleMonth.value = visibleMonth.value.filter(filterFunc).sort((a, b) => +a.firstDate - +b.firstDate);
    }

    // 当小缓冲区不满时填充
    if (visibleMonth.value.length > 0) {
      const last = visibleMonth.value[visibleMonth.value.length - 1];
      if (last.y !== undefined && last.height && last.y + last.height < scrollTop + clientHeight + MIN_VIEW_PORT) {
        const lastIndex = state.months.indexOf(last);
        for (let i = 1; i <= 2; i++) {
          const index = lastIndex + i;
          if (index < state.months.length && visibleMonth.value.indexOf(state.months[index]) < 0) {
            visibleMonth.value.push(state.months[index]);
          } else {
            canLoadNext() && genMonthData(undefined, 1);
          }
        }
        needUpdate = true;
      }

      const first = visibleMonth.value[0];
      if (first.y !== undefined && first.height && first.y > scrollTop - MIN_VIEW_PORT) {
        const firstIndex = state.months.indexOf(first);
        for (let i = 1; i <= 2; i++) {
          const index = firstIndex - i;
          if (index >= 0 && visibleMonth.value.indexOf(state.months[index]) < 0) {
            visibleMonth.value.unshift(state.months[index]);
            needUpdate = true;
          }
        }
      }
    } else if (state.months.length > 0) {
      visibleMonth.value = state.months.filter(filterFunc);
      needUpdate = true;
    }

    return needUpdate;
  };
  const createOnScroll = () => {
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
        if (computeVisible(clientHeight, scrollTop)) {
          updateFlag.value++;
        }
      }, 64);
    };
  };
  const onCellClick = (day: CellData) => {
    if (!day.tick) {
      return;
    }
    emit('cellClick', new Date(day.tick));
  };
  return {
    onCellClick, createOnScroll, visibleMonth,
    updateFlag, genMonthData, state, canLoadPrev
  };
};
