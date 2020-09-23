import {watch, computed, defineComponent, reactive, Ref, ref, provide} from 'vue';
import Component from 'vue-class-component';
import {Provide, Watch} from 'vue-property-decorator';
import CalendarProps from './calendar-props';
import ConfirmPanel from './calendar/confirm-panel';
import Header from './calendar/header';
import ShortcutPanel from './calendar/shortcut-panel';

import DatePicker from './date-picker';
import {Locale} from './data-types';
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

defineComponent({
  props: {
    ...CalendarProps
  },
  setup(props) {
    const DefaultHeader = Header;
    const DefaultShortcut = ShortcutPanel;

    const currentValue: Ref<Date[]> = ref([]);

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
    }

    const setState = (newState: any) => {
      Object.keys(newState).forEach(key=>{
        state[key] = newState[key];
      });
    }

    const shortcutSelect = (startDate: Date, endDate: Date) => {
      const newState = {
        startDate,
        ...selectDate(endDate, true, {startDate}),
        showTimePicker: false
      };
      setState(newState)
    }


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
    return {};
  }
});

@Component({
  name: 'CalendarBase'
})
class CalendarBase extends CalendarProps {

  public static DefaultHeader = Header;
  public static DefaultShortcut = ShortcutPanel;

  public state = {
    showTimePicker: false,
    timePickerTitle: '',
    startDate: undefined,
    endDate: undefined,
    disConfirmBtn: true,
    clientHeight: 0,
    contentStyle: {},
    visible: this.visible
  };


  public onSelectedDate(date: Date) {
    const {startDate, endDate} = this.state;
    const {onSelect} = this;
    if (onSelect) {
      const value = onSelect(date, [startDate, endDate]);
      if (value) {
        this.shortcutSelect(value[0], value[1]);
        return;
      }
    }
    this.state = Object.assign(this.state, this.selectDate(date, false, {startDate, endDate}));
  }

  /** 选择区间包含不可用日期 */
  public onSelectHasDisableDate(date: Date[]) {
    this.onClear();
    this.$emit('select-has-disable-date', date);
  }

  public onClose() {
    this.state = Object.assign(this.state, new StateType());
    this.$emit('close');
    this.$emit('update:visible', false);
  }

  /** 关闭时回调 */
  public onCancel() {
    this.$emit('cancel');
    this.onClose();
  }

  /** 确认时回调 */
  public onConfirm() {
    const {startDate, endDate} = this.state;
    if (startDate && endDate && +startDate > +endDate) {
      return this.$emit('confirm', endDate, startDate);
    }
    this.$emit('confirm', startDate, endDate);
    this.onClose();
  }

  public onTimeChange(timeValue: number[]) {
    const {startDate, endDate} = this.state;
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
      this.state.endDate = date;
    } else if (startDate) {
      this.state.startDate = date;
    }
  }

  /** 清除时回调 */
  public onClear() {
    this.state.startDate = undefined;
    this.state.endDate = undefined;
    this.state.showTimePicker = false;
    this.$emit('clear');
  }


  public setClientHeight(height: number) {
    this.state.clientHeight = height;
  }

  public renderCalendar() {
    const {
      type, locale = {} as Locale, prefixCls, pickTime, showShortcut, renderHeader,
      infiniteOpt, initialMonths, defaultDate, minDate, maxDate, getDateExtra, rowSize,
      defaultTimeValue, renderShortcut, timePickerPrefixCls, timePickerPickerPrefixCls
    } = this;
    const {
      showTimePicker, timePickerTitle,
      startDate, endDate,
      disConfirmBtn, clientHeight
    } = this.state;

    const headerProps = {
      locale,
      showClear: !!startDate
    };
    return (
        <div class={`${prefixCls}`}>
          {
            <div style={this.state.contentStyle} class="content">
              {
                renderHeader ? renderHeader(headerProps) :
                    <Header attrs={
                      {...headerProps}
                    } onClear={this.onCancel} onCancel={this.onCancel}/>
              }
              <DatePicker
                  locale={locale}
                  type={type}
                  displayMode={this.displayMode}
                  prefixCls={prefixCls}
                  infiniteOpt={infiniteOpt}
                  initialMonths={initialMonths}
                  currentStartDate={this.state.startDate}
                  currentEndDate={this.state.endDate}
                  defaultDate={defaultDate}
                  minDate={minDate}
                  maxDate={maxDate}
                  getDateExtra={getDateExtra}
                  onCellClick={this.onSelectedDate}
                  onSelectHasDisableDate={this.onSelectHasDisableDate}
                  onLayout={this.setClientHeight}
                  startDate={startDate}
                  endDate={endDate}
                  rowSize={rowSize}
              />
              {
                !this.displayMode && showTimePicker &&
                <TimePicker
                    prefixCls={timePickerPrefixCls}
                    pickerPrefixCls={timePickerPickerPrefixCls}
                    locale={locale}
                    title={timePickerTitle}
                    defaultValue={defaultTimeValue}
                    value={endDate ? endDate : startDate}
                    onChange={this.onTimeChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    clientHeight={clientHeight}
                />
              }
              {
                !this.displayMode && showShortcut && !showTimePicker &&
                (
                    renderShortcut ?
                        renderShortcut(this.shortcutSelect) :
                        <ShortcutPanel locale={locale} onSelect={this.shortcutSelect}/>
                )
              }
              {
                startDate && !this.displayMode &&
                <ConfirmPanel
                    type={type}
                    locale={locale}
                    startDateTime={startDate}
                    endDateTime={endDate}
                    onConfirm={this.onConfirm}
                    disableBtn={disConfirmBtn}
                    formatStr={pickTime ? locale.dateTimeFormat : locale.dateFormat}
                />
              }
            </div>
          }
        </div>
    );
  }
}
