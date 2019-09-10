import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor;

import Component from 'vue-class-component';
import { Inject, Watch } from 'vue-property-decorator';
import MultiPicker from '../vmc-picker/multi-picker';
import Picker from '../vmc-picker/picker';
import DatePickerProps from './date-picker-props';

function getDaysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function pad(n) {
  return n < 10 ? "0" + n : n;
}

function cloneDate(date) {
  return new Date(+date);
}

function setMonth(date, month) {
  date.setDate(Math.min(date.getDate(), getDaysInMonth(new Date(date.getFullYear(), month))));
  date.setMonth(month);
}

var DATETIME = 'datetime';
var DATE = 'date';
var TIME = 'time';
var MONTH = 'month';
var YEAR = 'year';
var ONE_DAY = 24 * 60 * 60 * 1000;
var DatePicker = (_dec = Component({
  name: 'DatePicker'
}), _dec2 = Inject({
  from: 'store',
  default: undefined
}), _dec3 = Watch('state.date', {
  immediate: true
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_DatePickerProps) {
  _inheritsLoose(DatePicker, _DatePickerProps);

  function DatePicker() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _DatePickerProps.call.apply(_DatePickerProps, [this].concat(args)) || this, _this.state = {
      date: _this.date || _this.defaultDate,
      values: []
    }, _initializerDefineProperty(_this, "store", _descriptor, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = DatePicker.prototype;

  _proto.dateChagned = function dateChagned() {
    var _this$getValueCols = this.getValueCols(),
        value = _this$getValueCols.value;

    this.state.values = value;
  };

  _proto.created = function created() {
    if (this.store) {
      this.store.onOk = this.onOk;
      this.store.onDismiss = this.onDismiss;
    }
  };

  _proto.beforeUpdate = function beforeUpdate() {
    if (this.date !== undefined) {
      this.state.date = this.date || this.defaultDate;
    }
  };

  _proto.getNewDate = function getNewDate(values, index) {
    var value = parseInt(values[index], 10);
    var props = this;
    var mode = props.mode;
    var newValue = cloneDate(this.getDate());

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
    } else if (mode === TIME) {
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
  };

  _proto.onOk = function onOk() {
    var newValue = cloneDate(this.getDate());
    newValue.setSeconds(0);
    var values = this.state.values;

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
  };

  _proto.onDismiss = function onDismiss() {
    var _this$getValueCols2 = this.getValueCols(),
        value = _this$getValueCols2.value;

    this.state.values = value;
    this.$emit('dismiss', value);
  };

  _proto.onValueChange = function onValueChange(values, index) {
    this.state.values = values;
    this.$emit('change', values, index);
  };

  _proto.onScrollChange = function onScrollChange(values, index) {
    var newValue = this.getNewDate(values, index);
    this.$emit('scroll-change', newValue, values, index);
    this.$emit('scrollChange', newValue, values, index);
  };

  _proto.setHours = function setHours(date, hour) {
    if (this.use12Hours) {
      var dh = date.getHours();
      var nhour;
      nhour = dh >= 12 ? hour + 12 : hour;
      nhour = nhour >= 24 ? 0 : nhour; // Make sure no more than one day

      date.setHours(nhour);
    } else {
      date.setHours(hour);
    }
  };

  _proto.setAmPm = function setAmPm(date, index) {
    if (index === 0) {
      date.setTime(+date - ONE_DAY / 2);
    } else {
      date.setTime(+date + ONE_DAY / 2);
    }
  };

  _proto.getDefaultMinDate = function getDefaultMinDate() {
    if (!this.defaultMinDate) {
      this.defaultMinDate = new Date(2000, 1, 1, 0, 0, 0);
    }

    return this.defaultMinDate;
  };

  _proto.getDefaultMaxDate = function getDefaultMaxDate() {
    if (!this.defaultMaxDate) {
      this.defaultMaxDate = new Date(2030, 1, 1, 23, 59, 59);
    }

    return this.defaultMaxDate;
  };

  _proto.getDate = function getDate() {
    return this.clipDate(this.state.date || this.getDefaultMinDate());
  };

  _proto.getValue = function getValue() {
    return this.getDate();
  };

  _proto.getMinYear = function getMinYear() {
    return this.getMinDate().getFullYear();
  };

  _proto.getMaxYear = function getMaxYear() {
    return this.getMaxDate().getFullYear();
  };

  _proto.getMinMonth = function getMinMonth() {
    return this.getMinDate().getMonth();
  };

  _proto.getMaxMonth = function getMaxMonth() {
    return this.getMaxDate().getMonth();
  };

  _proto.getMinDay = function getMinDay() {
    return this.getMinDate().getDate();
  };

  _proto.getMaxDay = function getMaxDay() {
    return this.getMaxDate().getDate();
  };

  _proto.getMinHour = function getMinHour() {
    return this.getMinDate().getHours();
  };

  _proto.getMaxHour = function getMaxHour() {
    return this.getMaxDate().getHours();
  };

  _proto.getMinMinute = function getMinMinute() {
    return this.getMinDate().getMinutes();
  };

  _proto.getMaxMinute = function getMaxMinute() {
    return this.getMaxDate().getMinutes();
  };

  _proto.getMinDate = function getMinDate() {
    return this.minDate || this.getDefaultMinDate();
  };

  _proto.getMaxDate = function getMaxDate() {
    return this.maxDate || this.getDefaultMaxDate();
  };

  _proto.getDateData = function getDateData() {
    var locale = this.locale,
        formatMonth = this.formatMonth,
        formatDay = this.formatDay,
        mode = this.mode;
    var date = this.getDate();
    var selYear = date.getFullYear();
    var selMonth = date.getMonth();
    var minDateYear = this.getMinYear();
    var maxDateYear = this.getMaxYear();
    var minDateMonth = this.getMinMonth();
    var maxDateMonth = this.getMaxMonth();
    var minDateDay = this.getMinDay();
    var maxDateDay = this.getMaxDay();
    var years = [];

    for (var i = minDateYear; i <= maxDateYear; i++) {
      years.push({
        value: i,
        label: i + locale.year
      });
    }

    var yearCol = {
      key: 'year',
      props: {
        children: years
      }
    };

    if (mode === YEAR) {
      return [yearCol];
    }

    var months = [];
    var minMonth = 0;
    var maxMonth = 11;

    if (minDateYear === selYear) {
      minMonth = minDateMonth;
    }

    if (maxDateYear === selYear) {
      maxMonth = maxDateMonth;
    }

    for (var _i = minMonth; _i <= maxMonth; _i++) {
      var label = formatMonth ? formatMonth(_i, date) : _i + 1 + locale.month;
      months.push({
        value: _i,
        label: label
      });
    }

    var monthCol = {
      key: 'month',
      props: {
        children: months
      }
    };

    if (mode === MONTH) {
      return [yearCol, monthCol];
    }

    var days = [];
    var minDay = 1;
    var maxDay = getDaysInMonth(date);

    if (minDateYear === selYear && minDateMonth === selMonth) {
      minDay = minDateDay;
    }

    if (maxDateYear === selYear && maxDateMonth === selMonth) {
      maxDay = maxDateDay;
    }

    for (var _i2 = minDay; _i2 <= maxDay; _i2++) {
      var _label = formatDay ? formatDay(_i2, date) : _i2 + locale.day;

      days.push({
        value: _i2,
        label: _label
      });
    }

    return [yearCol, monthCol, {
      key: 'day',
      props: {
        children: days
      }
    }];
  };

  _proto.getDisplayHour = function getDisplayHour(rawHour) {
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
  };

  _proto.getTimeData = function getTimeData(date) {
    var _this$minHour = this.minHour,
        minHour = _this$minHour === void 0 ? 0 : _this$minHour,
        _this$maxHour = this.maxHour,
        maxHour = _this$maxHour === void 0 ? 23 : _this$maxHour,
        _this$minMinute = this.minMinute,
        minMinute = _this$minMinute === void 0 ? 0 : _this$minMinute,
        _this$maxMinute = this.maxMinute,
        maxMinute = _this$maxMinute === void 0 ? 59 : _this$maxMinute;
    var mode = this.mode,
        locale = this.locale,
        minuteStep = this.minuteStep,
        use12Hours = this.use12Hours;
    var minDateMinute = this.getMinMinute();
    var maxDateMinute = this.getMaxMinute();
    var minDateHour = this.getMinHour();
    var maxDateHour = this.getMaxHour();
    var hour = date.getHours();

    if (mode === DATETIME) {
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var minDateYear = this.getMinYear();
      var maxDateYear = this.getMaxYear();
      var minDateMonth = this.getMinMonth();
      var maxDateMonth = this.getMaxMonth();
      var minDateDay = this.getMinDay();
      var maxDateDay = this.getMaxDay();

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
    } else {
      minHour = minDateHour;

      if (minDateHour === hour) {
        minMinute = minDateMinute;
      }

      maxHour = maxDateHour;

      if (maxDateHour === hour) {
        maxMinute = maxDateMinute;
      }
    }

    var hours = [];

    if (minHour === 0 && maxHour === 0 || minHour !== 0 && maxHour !== 0) {
      minHour = this.getDisplayHour(minHour);
    } else if (minHour === 0 && use12Hours) {
      minHour = 1;
      hours.push({
        value: '0',
        label: locale.hour ? '12' + locale.hour : '12'
      });
    }

    maxHour = this.getDisplayHour(maxHour);

    for (var i = minHour; i <= maxHour; i++) {
      hours.push({
        value: i,
        label: locale.hour ? i + locale.hour : pad(i)
      });
    }

    var minutes = [];
    var selMinute = date.getMinutes();

    for (var _i3 = minMinute; _i3 <= maxMinute; _i3 += minuteStep) {
      minutes.push({
        value: _i3,
        label: locale.minute ? _i3 + locale.minute : pad(_i3)
      });

      if (selMinute > _i3 && selMinute < _i3 + minuteStep) {
        minutes.push({
          value: selMinute,
          label: locale.minute ? selMinute + locale.minute : pad(selMinute)
        });
      }
    }

    var cols = [{
      key: 'hours',
      props: {
        children: hours
      }
    }, {
      key: 'minutes',
      props: {
        children: minutes
      }
    }].concat(use12Hours ? [{
      key: 'ampm',
      props: {
        children: [{
          value: 0,
          label: locale.am
        }, {
          value: 1,
          label: locale.pm
        }]
      }
    }] : []);
    return {
      cols: cols,
      selMinute: selMinute
    };
  };

  _proto.clipDate = function clipDate(date) {
    var mode = this.mode;
    var minDate = this.getMinDate();
    var maxDate = this.getMaxDate();

    if (mode === DATETIME) {
      if (date < minDate) {
        return cloneDate(minDate);
      }

      if (date > maxDate) {
        return cloneDate(maxDate);
      }
    } else if (mode === DATE || mode === YEAR || mode === MONTH) {
      // compare-two-dates: https://stackoverflow.com/a/14629978/2190503
      if (+date + ONE_DAY <= minDate) {
        return cloneDate(minDate);
      }

      if (date >= +maxDate + ONE_DAY) {
        return cloneDate(maxDate);
      }
    } else if (mode === TIME) {
      var maxHour = maxDate.getHours();
      var maxMinutes = maxDate.getMinutes();
      var minHour = minDate.getHours();
      var minMinutes = minDate.getMinutes();
      var hour = date.getHours();
      var minutes = date.getMinutes();

      if (hour < minHour || hour === minHour && minutes < minMinutes) {
        return cloneDate(minDate);
      }

      if (hour > maxHour || hour === maxHour && minutes > maxMinutes) {
        return cloneDate(maxDate);
      }
    }

    return date;
  };

  _proto.getValueCols = function getValueCols() {
    var mode = this.mode,
        use12Hours = this.use12Hours;
    var date = this.getDate();
    var cols = [];
    var value = [];

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
      var time = this.getTimeData(date);
      cols = cols.concat(time.cols);
      var hour = date.getHours();
      var dtValue = [hour, time.selMinute];
      var nhour = hour;

      if (use12Hours) {
        nhour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        dtValue = [nhour, time.selMinute, hour >= 12 ? 1 : 0];
      }

      value = value.concat(dtValue);
    }

    return {
      value: value,
      cols: cols
    };
  };

  _proto.render = function render() {
    var h = arguments[0];

    var _this$getValueCols3 = this.getValueCols(),
        cols = _this$getValueCols3.cols;

    var value = this.state.values;
    var disabled = this.disabled,
        pickerPrefixCls = this.pickerPrefixCls,
        prefixCls = this.prefixCls,
        rootNativeProps = this.rootNativeProps,
        itemStyle = this.itemStyle;
    var multiStyle = {
      flexDirection: 'row',
      alignItems: 'center'
    };
    return (// @ts-ignore
      h(MultiPicker, _mergeJSXProps([{
        "style": multiStyle,
        "attrs": {
          "rootNativeProps": rootNativeProps,
          "prefixCls": prefixCls,
          "selectedValue": value
        }
      }, {
        "on": {
          input: this.onValueChange,
          scrollChange: this.onScrollChange
        }
      }]), [cols.map(function (p) {
        return (// @ts-ignore
          h(Picker, _mergeJSXProps2([{}, {
            "attrs": {
              disabled: disabled,
              prefixCls: pickerPrefixCls,
              itemStyle: itemStyle
            }
          }, {
            "style": {
              flex: 1
            },
            "key": p.key
          }]), [p.props.children.map(function (item) {
            return (// @ts-ignore
              h(Picker.Item, {
                "key": item.value,
                "attrs": {
                  "value": item.value,
                  "label": item.label
                }
              })
            );
          })])
        );
      })])
    );
  };

  return DatePicker;
}(DatePickerProps), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "dateChagned", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "dateChagned"), _class2.prototype)), _class2)) || _class);
export default DatePicker;