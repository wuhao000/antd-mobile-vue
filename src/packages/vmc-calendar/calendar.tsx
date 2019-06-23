import Component from 'vue-class-component';
import {Provide, Watch} from 'vue-property-decorator';
import Popup from '../m-popup';
import CalendarProps from './calendar-props';
import ConfirmPanel from './calendar/confirm-panel';
import Header from './calendar/header';
import ShortcutPanel from './calendar/shortcut-panel';

import DatePicker from './date-picker';
import {Models} from './date/data-types';
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

@Component({
  name: 'Calendar'
})
export default class Calendar extends CalendarProps {

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

  @Provide('currentValue')
  public currentValue: Date[] = [];

  @Watch('state', {deep: true})
  public stateChanged(value: any) {
    this.currentValue[0] = value.startDate;
    this.currentValue[1] = value.endDate;
  }

  public created() {
    if (this.defaultValue) {
      const defaultValue = this.defaultValue;
      this.state = {
        ...this.state,
        ...this.selectDate(defaultValue[1], true, {startDate: defaultValue[0]})
      };
    }
  }

  @Watch('visible')
  public visibleChanged(visible: boolean) {
    this.state.visible = visible;
    if (visible && this.defaultValue) {
      this.shortcutSelect(this.defaultValue[0], this.defaultValue[1]);
    }
  }

  @Watch('defaultValue')
  public defaultValueChanged(defaultValue: any) {
    if (this.visible && this.defaultValue) {
      this.shortcutSelect(this.defaultValue[0], this.defaultValue[1]);
    }
  }

  public selectDate(date: Date, useDateTime = false, oldState: { startDate?: Date, endDate?: Date } = {}) {
    if (!date) {
      return {} as StateType;
    }
    let newState = {} as StateType;
    const {type, pickTime, defaultTimeValue, locale = {} as Models.Locale} = this;
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
    let date = null;
    if (endDate) {
      date = this.state.endDate;
    } else if (startDate) {
      date = this.state.startDate;
    }
    if (date) {
      if (timeValue[2] === 0) {
        date.setHours(timeValue[0]);
      } else {
        date.setHours(timeValue[0] + 12);
      }
      date.setSeconds(timeValue[2]);
    }
  }

  /** 清除时回调 */
  public onClear() {
    this.state.startDate = undefined;
    this.state.endDate = undefined;
    this.state.showTimePicker = false;
    this.$emit('clear');
  }

  public shortcutSelect(startDate: Date, endDate: Date) {
    this.state = Object.assign(this.state, {
      startDate,
      ...this.selectDate(endDate, true, {startDate}),
      showTimePicker: false
    });
  }

  public setClientHeight(height: number) {
    this.state.clientHeight = height;
  }

  public render() {
    const {
      type, locale = {} as Models.Locale, prefixCls, visible, pickTime, showShortcut, renderHeader,
      infiniteOpt, initialMonths, defaultDate, minDate, maxDate, getDateExtra, rowSize,
      defaultTimeValue, renderShortcut, enterDirection, timePickerPrefixCls, timePickerPickerPrefixCls
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
      // @ts-ignore
      <Popup value={this.state.visible}
             onClose={this.onClose}
             attrs={{
               height: '500px'
             }}>
        <div class={`${prefixCls}`}>
          {
            // @ts-ignore
            <div style={this.state.contentStyle} class={'content'}>
              {
                renderHeader ? renderHeader(headerProps) :
                  // @ts-ignore
                  <Header attrs={
                    {...headerProps}
                  } onClear={this.onCancel} onCancel={this.onCancel}/>
              }
              {
                // @ts-ignore
                <DatePicker
                  locale={locale}
                  type={type}
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
              }
              {
                showTimePicker &&
                // @ts-ignore
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
                showShortcut && !showTimePicker &&
                (
                  renderShortcut ?
                    renderShortcut(this.shortcutSelect) :
                    // @ts-ignore
                    <ShortcutPanel locale={locale} onSelect={this.shortcutSelect}/>
                )
              }
              {
                startDate &&
                // @ts-ignore
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
      </Popup>
    );
  }
}
