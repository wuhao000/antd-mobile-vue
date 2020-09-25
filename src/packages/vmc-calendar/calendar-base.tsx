import {provide, reactive, ref, Ref, watch} from 'vue';
import ConfirmPanel from './calendar/confirm-panel';
import Header from './calendar/header';
import ShortcutPanel from './calendar/shortcut-panel';
import {Locale} from './data-types';

import DatePicker from './date-picker';
import TimePicker from './time-picker';

import {mergeDateTime} from './util';

export class StateType {
  public showTimePicker: boolean = false;
  public timePickerTitle?: string;
  public startDate?: Date = undefined;
  public endDate?: Date = undefined;
  public disConfirmBtn?: boolean = true;
  public clientHight?: number = 0;
  public visible: boolean = false;
}

export const useBaseCalendar = (props, {emit}) => {
  const currentValue: Ref<Date[]> = ref(props.value ?? []);
  provide('currentValue', currentValue);
  const state = reactive({
    showTimePicker: false,
    timePickerTitle: '',
    startDate: undefined,
    endDate: undefined,
    disConfirmBtn: true,
    clientHeight: 0,
    contentStyle: {},
    visible: props.visible
  });
  const onSelectedDate = (date: Date) => {
    const {startDate, endDate} = state;
    const {onSelect} = props;
    if (onSelect) {
      const value = onSelect(date, [startDate, endDate]);
      if (value) {
        shortcutSelect(value[0], value[1]);
        return;
      }
    }
    setState(selectDate(date, false, {startDate, endDate}));
  };

  /** 选择区间包含不可用日期 */
  const onSelectHasDisableDate = (date: Date[]) => {
    onClear();
    emit('select-has-disable-date', date);
  };

  const onClose = () => {
    setState(new StateType());
    emit('close');
    emit('update:visible', false);
  };

  /** 关闭时回调 */
  const onCancel = () => {
    emit('cancel');
    onClose();
  };

  /** 确认时回调 */
  const onConfirm = () => {
    const {startDate, endDate} = state;
    if (startDate && endDate && +startDate > +endDate) {
      return emit('confirm', endDate, startDate);
    }
    emit('confirm', startDate, endDate);
    onClose();
  };

  const onTimeChange = (timeValue: number[]) => {
    const {startDate, endDate} = state;
    let date: Date = null;
    if (endDate) {
      date = endDate;
    } else if (startDate) {
      date = startDate;
    }
    if (date) {
      let hours = timeValue[0];
      if (timeValue[2] === 1) {
        hours += 12;
        date.setUTCHours(timeValue[0]);
      }
      date = new Date(date.getFullYear(), date.getMonth(),
        date.getDate(), timeValue[0], timeValue[1], 0);
    }
    if (endDate) {
      state.endDate = date;
    } else if (startDate) {
      state.startDate = date;
    }
  };

  /** 清除时回调 */
  const onClear = () => {
    state.startDate = undefined;
    state.endDate = undefined;
    state.showTimePicker = false;
    emit('clear');
  };


  const setClientHeight = (height: number) => {
    state.clientHeight = height;
  };

  const renderCalendar = () => {
    const {
      type, locale = {} as Locale, prefixCls, pickTime, showShortcut, renderHeader,
      infiniteOpt, initialMonths, defaultDate, minDate, maxDate, getDateExtra, rowSize,
      defaultTimeValue, renderShortcut, timePickerPrefixCls, timePickerPickerPrefixCls
    } = props;
    const {
      showTimePicker, timePickerTitle,
      startDate, endDate,
      disConfirmBtn, clientHeight
    } = state;

    const headerProps = {
      locale,
      showClear: !!startDate,
      onClear: onCancel,
      onCancel: onCancel
    };
    return (
      <div class={`${prefixCls}`}>
        {
          <div style={state.contentStyle} class="content">
            {
              renderHeader ? renderHeader(headerProps) :
                <Header {...headerProps}
                        onClear={onCancel}
                        onCancel={onCancel}/>
            }
            <DatePicker
              locale={locale}
              type={type}
              value={endDate ? endDate : startDate}
              displayMode={props.displayMode}
              prefixCls={prefixCls}
              infiniteOpt={infiniteOpt}
              initialMonths={initialMonths}
              currentStartDate={state.startDate}
              currentEndDate={state.endDate}
              defaultDate={defaultDate}
              minDate={minDate}
              maxDate={maxDate}
              getDateExtra={getDateExtra}
              onCellClick={onSelectedDate}
              onSelectHasDisableDate={onSelectHasDisableDate}
              onLayout={setClientHeight}
              startDate={startDate}
              endDate={endDate}
              rowSize={rowSize}
            />
            {
              !props.displayMode && showTimePicker &&
              <TimePicker
                  prefixCls={timePickerPrefixCls}
                  pickerPrefixCls={timePickerPickerPrefixCls}
                  locale={locale}
                  title={timePickerTitle}
                  defaultValue={defaultTimeValue}
                  value={endDate ? endDate : startDate}
                  onChange={onTimeChange}
                  minDate={minDate}
                  maxDate={maxDate}
                  clientHeight={clientHeight}
              />
            }
            {
              !props.displayMode && showShortcut && !showTimePicker &&
              (
                renderShortcut ?
                  renderShortcut(shortcutSelect) :
                  <ShortcutPanel locale={locale} onSelect={shortcutSelect}/>
              )
            }
            {
              startDate && !props.displayMode &&
              <ConfirmPanel
                  type={type}
                  locale={locale}
                  startDateTime={startDate}
                  endDateTime={endDate}
                  onConfirm={onConfirm}
                  disableBtn={disConfirmBtn}
                  formatStr={pickTime ? locale.dateTimeFormat : locale.dateFormat}
              />
            }
          </div>
        }
      </div>
    );
  };


  const selectDate = (date: Date, useDateTime = false, oldState: { startDate?: Date, endDate?: Date } = {}) => {
    if (!date) {
      return {} as StateType;
    }
    let newState = {} as StateType;
    const {type, pickTime, defaultTimeValue, locale = {} as Locale} = props;
    const newDate = pickTime && !useDateTime ? mergeDateTime(date, defaultTimeValue) : date;
    const {startDate, endDate} = oldState;
    switch (type) {
      case 'one':
        newState = {
          ...newState,
          startDate: newDate,
          disConfirmBtn: false
        };
        if (pickTime) {
          newState = {
            ...newState,
            timePickerTitle: locale.selectTime,
            showTimePicker: true
          };
        }
        break;

      case 'range':
        if (!startDate || endDate) {
          newState = {
            ...newState,
            startDate: newDate,
            endDate: undefined,
            disConfirmBtn: true
          };
          if (pickTime) {
            newState = {
              ...newState,
              timePickerTitle: locale.selectStartTime,
              showTimePicker: true
            };
          }
        } else {
          newState = {
            ...newState,
            timePickerTitle: +newDate >= +startDate ? locale.selectEndTime : locale.selectStartTime,
            disConfirmBtn: false,
            endDate: (pickTime && !useDateTime && +newDate >= +startDate) ?
              new Date(+mergeDateTime(newDate, startDate) + 3600000) : newDate
          };
        }
        break;
    }
    return newState;
  };

  const setState = (newState: any) => {
    Object.keys(newState).forEach(key => {
      state[key] = newState[key];
    });
  };

  const shortcutSelect = (startDate: Date, endDate: Date) => {
    const newState = {
      startDate,
      ...selectDate(endDate, true, {startDate}),
      showTimePicker: false
    };
    setState(newState);
  };


  watch(() => state, (value) => {
    currentValue.value[0] = value.startDate;
    currentValue.value[1] = value.endDate;
  }, {deep: true});
  watch(() => props.defaultValue, () => {
    if (props.visible && props.defaultValue) {
      shortcutSelect(props.defaultValue[0], props.defaultValue[1]);
    }
  });
  if (props.defaultValue) {
    const defaultValue = props.defaultValue;
    const newState = {
      ...state,
      ...selectDate(defaultValue[1], true, {startDate: defaultValue[0]})
    };
    setState(newState);
  }
  return {state, shortcutSelect, onClose, renderCalendar};
};
