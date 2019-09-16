import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor;

import Component from 'vue-class-component';
import { Inject } from 'vue-property-decorator';
import { SelectType } from './data-types';
import DatePickerProps from './date-picker-props';
import { formatDate, genWeekData, getDateWithoutTime, getMonthDate } from './util';

function monthsBetween(minDate, maxDate) {
  return (maxDate.getFullYear() - minDate.getFullYear()) * 12 + maxDate.getMonth() - minDate.getMonth();
}

var DatePicker = (_dec = Component({
  name: 'DatePicker'
}), _dec2 = Inject('currentValue'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_DatePickerProps) {
  _inheritsLoose(DatePicker, _DatePickerProps);

  function DatePicker() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _DatePickerProps.call.apply(_DatePickerProps, [this].concat(args)) || this, _initializerDefineProperty(_this, "currentValue", _descriptor, _assertThisInitialized(_this)), _this.visibleMonth = [], _this.state = {
      months: []
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = DatePicker.prototype;

  _proto.genMonthComponent = function genMonthComponent(data) {
    var h = this.$createElement;
    return h("div");
  };

  _proto.created = function created() {
    var _this2 = this;

    this.$watch(function () {
      return {
        startDate: _this2.startDate,
        endDate: _this2.endDate
      };
    }, function (newValue, oldValue) {
      if (oldValue.startDate) {
        _this2.selectDateRange(oldValue.startDate, oldValue.endDate, true);
      }

      if (newValue.startDate) {
        _this2.selectDateRange(newValue.startDate, newValue.endDate);
      }
    });
  };

  _proto.getBegin = function getBegin() {
    if (this.startDate) {
      return this.startDate;
    } else {
      var min = this.minDate || this.defaultDate;
      var max = this.maxDate || this.defaultDate;

      if (monthsBetween(min, max) < 6) {
        return this.minDate;
      } else {
        var date = new Date(max.getTime());
        date.setMonth(date.getMonth() - 6);
        return date;
      }
    }
  };

  _proto.beforeMount = function beforeMount() {
    var _this$initialMonths = this.initialMonths,
        initialMonths = _this$initialMonths === void 0 ? 6 : _this$initialMonths,
        defaultDate = this.defaultDate;
    var begin = this.getBegin();

    for (var i = 0; i < initialMonths; i++) {
      this.canLoadNext() && this.genMonthData(begin, i);
    }

    this.visibleMonth = [].concat(this.state.months);
  };

  _proto.canLoadPrev = function canLoadPrev() {
    var minDate = this.minDate;
    return !minDate || this.state.months.length <= 0 || +getMonthDate(minDate).firstDate < +this.state.months[0].firstDate;
  };

  _proto.canLoadNext = function canLoadNext() {
    var maxDate = this.maxDate;
    return !maxDate || this.state.months.length <= 0 || +getMonthDate(maxDate).firstDate > +this.state.months[this.state.months.length - 1].firstDate;
  };

  _proto.genMonthData = function genMonthData(date, addMonth) {
    if (addMonth === void 0) {
      addMonth = 0;
    }

    var copyDate = date;

    if (!copyDate) {
      copyDate = addMonth >= 0 ? this.state.months[this.state.months.length - 1].firstDate : this.state.months[0].firstDate;
    }

    if (!copyDate) {
      copyDate = new Date();
    }

    var locale = this.locale;

    var _getMonthDate = getMonthDate(copyDate, addMonth),
        firstDate = _getMonthDate.firstDate,
        lastDate = _getMonthDate.lastDate;

    var weeks = genWeekData(firstDate, this.minDate, this.maxDate);
    var title = formatDate(firstDate, locale ? locale.monthTitle : 'yyyy/MM', this.locale);
    var data = {
      title: title,
      firstDate: firstDate,
      lastDate: lastDate,
      weeks: weeks
    };
    data.component = this.genMonthComponent(data);

    if (addMonth >= 0) {
      this.state.months.push(data);
    } else {
      this.state.months.unshift(data);
    }

    var startDate = this.startDate,
        endDate = this.endDate;

    if (startDate) {
      this.selectDateRange(startDate, endDate);
    }

    return data;
  };

  _proto.inDate = function inDate(date, tick) {
    return date <= tick && tick < date + 24 * 3600000;
  };

  _proto.selectDateRange = function selectDateRange(startDate, endDate, clear) {
    var _this3 = this;

    if (clear === void 0) {
      clear = false;
    }

    var getDateExtra = this.getDateExtra,
        type = this.type,
        onSelectHasDisableDate = this.onSelectHasDisableDate;
    var copyEndDate = endDate;

    if (type === 'one') {
      copyEndDate = undefined;
    }

    var time1 = getDateWithoutTime(startDate);
    var time2 = getDateWithoutTime(copyEndDate);
    var startDateTick = !time2 || time1 < time2 ? time1 : time2;
    var endDateTick = time2 && time1 > time2 ? time1 : time2;
    var startMonthDate = getMonthDate(new Date(startDateTick)).firstDate;
    var endMonthDate = endDateTick ? new Date(endDateTick) : getMonthDate(new Date(startDateTick)).lastDate;
    var unuseable = [];
    var needUpdate = false;
    this.state.months.filter(function (m) {
      return m.firstDate >= startMonthDate && m.firstDate <= endMonthDate;
    }).forEach(function (m) {
      m.weeks.forEach(function (w) {
        return w.filter(function (d) {
          if (!endDateTick) {
            return d.tick && _this3.inDate(startDateTick, d.tick);
          } else {
            return d.tick && d.tick >= startDateTick && d.tick <= endDateTick;
          }
        }).forEach(function (d) {
          var oldValue = d.selected;

          if (clear) {
            d.selected = SelectType.None;
          } else {
            var info = getDateExtra && getDateExtra(new Date(d.tick), [].concat(_this3.currentValue)) || {};

            if (d.outOfDate || info.disable) {
              unuseable.push(d.tick);
            }

            if (_this3.inDate(startDateTick, d.tick)) {
              if (type === 'one') {
                d.selected = SelectType.Single;
              } else if (!endDateTick) {
                d.selected = SelectType.Only;
              } else if (startDateTick !== endDateTick) {
                d.selected = SelectType.Start;
              } else {
                d.selected = SelectType.All;
              }
            } else if (_this3.inDate(endDateTick, d.tick)) {
              d.selected = SelectType.End;
            } else {
              d.selected = SelectType.Middle;
            }
          }

          needUpdate = needUpdate || d.selected !== oldValue;
        });
      });

      if (needUpdate && m.componentRef) {
        m.componentRef.updateWeeks();
        m.componentRef.$forceUpdate();
      }
    });

    if (unuseable.length > 0) {
      if (onSelectHasDisableDate) {
        onSelectHasDisableDate(unuseable.map(function (tick) {
          return new Date(tick);
        }));
      } else {
        console.warn('Unusable date. You can handle by onSelectHasDisableDate.', unuseable);
      }
    }
  };

  _proto.computeVisible = function computeVisible(clientHeight, scrollTop) {
    var needUpdate = false;
    var MAX_VIEW_PORT = clientHeight * 2;
    var MIN_VIEW_PORT = clientHeight; // 大缓冲区外过滤规则

    var filterFunc = function filterFunc(vm) {
      return vm.y && vm.height && vm.y + vm.height > scrollTop - MAX_VIEW_PORT && vm.y < scrollTop + clientHeight + MAX_VIEW_PORT;
    };

    if (this.infiniteOpt && this.visibleMonth.length > 12) {
      this.visibleMonth = this.visibleMonth.filter(filterFunc).sort(function (a, b) {
        return +a.firstDate - +b.firstDate;
      });
    } // 当小缓冲区不满时填充


    if (this.visibleMonth.length > 0) {
      var last = this.visibleMonth[this.visibleMonth.length - 1];

      if (last.y !== undefined && last.height && last.y + last.height < scrollTop + clientHeight + MIN_VIEW_PORT) {
        var lastIndex = this.state.months.indexOf(last);

        for (var i = 1; i <= 2; i++) {
          var index = lastIndex + i;

          if (index < this.state.months.length && this.visibleMonth.indexOf(this.state.months[index]) < 0) {
            this.visibleMonth.push(this.state.months[index]);
          } else {
            this.canLoadNext() && this.genMonthData(undefined, 1);
          }
        }

        needUpdate = true;
      }

      var first = this.visibleMonth[0];

      if (first.y !== undefined && first.height && first.y > scrollTop - MIN_VIEW_PORT) {
        var firstIndex = this.state.months.indexOf(first);

        for (var _i = 1; _i <= 2; _i++) {
          var _index = firstIndex - _i;

          if (_index >= 0 && this.visibleMonth.indexOf(this.state.months[_index]) < 0) {
            this.visibleMonth.unshift(this.state.months[_index]);
            needUpdate = true;
          }
        }
      }
    } else if (this.state.months.length > 0) {
      this.visibleMonth = this.state.months.filter(filterFunc);
      needUpdate = true;
    }

    return needUpdate;
  };

  _proto.createOnScroll = function createOnScroll() {
    var _this4 = this;

    var timer;
    var clientHeight = 0;
    var scrollTop = 0;
    return function (data) {
      var client = data.client,
          top = data.top;
      clientHeight = client;
      scrollTop = top;

      if (timer) {
        return;
      }

      timer = setTimeout(function () {
        timer = undefined;

        if (_this4.computeVisible(clientHeight, scrollTop)) {
          _this4.$forceUpdate();
        }
      }, 64);
    };
  };

  _proto.onCellClick = function onCellClick(day) {
    if (!day.tick) {
      return;
    }

    this.$emit('cellClick', new Date(day.tick));
  };

  return DatePicker;
}(DatePickerProps), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentValue", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { DatePicker as default };