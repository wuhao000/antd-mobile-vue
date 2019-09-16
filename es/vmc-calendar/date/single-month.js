import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop, Watch } from 'vue-property-decorator';
import { SelectType } from '../data-types';
var SingleMonth = (_dec = Component({
  name: 'SingleMonth'
}), _dec2 = Prop({
  type: Boolean,
  default: false
}), _dec3 = Inject('currentValue'), _dec4 = Prop({}), _dec5 = Prop({}), _dec6 = Prop({
  type: String,
  default: 'normal'
}), _dec7 = Prop({}), _dec8 = Prop({}), _dec9 = Watch('monthData'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(SingleMonth, _Vue);

  function SingleMonth() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "displayMode", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "currentValue", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "locale", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "monthData", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "rowSize", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "getDateExtra", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "callback", _descriptor7, _assertThisInitialized(_this)), _this.state = {
      weekComponents: []
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = SingleMonth.prototype;

  _proto.beforeMount = function beforeMount() {
    var _this2 = this;

    this.monthData.weeks.forEach(function (week, index) {
      _this2.genWeek(week, index);
    });
  };

  _proto.mounted = function mounted() {
    this.callback(this);
  };

  _proto.genWeek = function genWeek(weeksData, index) {
    var _this3 = this;

    var h = this.$createElement;
    var getDateExtra = this.getDateExtra,
        displayMode = this.displayMode,
        monthData = this.monthData,
        locale = this.locale,
        rowSize = this.rowSize;
    var rowCls = 'row';

    if (rowSize === 'xl') {
      rowCls += ' row-xl';
    }

    this.state.weekComponents[index] = h("div", {
      "key": index,
      "class": rowCls
    }, [weeksData.map(function (day, dayOfWeek) {
      var extra = getDateExtra && getDateExtra(new Date(day.tick), [].concat(_this3.currentValue)) || {};
      var info = extra.info;
      var disable = extra.disable || day.outOfDate;
      var cls = 'date';
      var lCls = 'left';
      var rCls = 'right';
      var infoCls = 'info';

      if (dayOfWeek === 0 || dayOfWeek === 6) {
        cls += ' grey';
      }

      if (disable) {
        cls += ' disable';
      } else if (info) {
        cls += ' important';
      }

      if (displayMode && extra.selected) {
        cls += ' date-selected selected-single';
      }

      if (day.selected) {
        cls += ' date-selected';
        var styleType = day.selected;

        switch (styleType) {
          case SelectType.Only:
            info = locale.begin;
            infoCls += ' date-selected';
            break;

          case SelectType.All:
            info = locale.begin_over;
            infoCls += ' date-selected';
            break;

          case SelectType.Start:
            info = locale.begin;
            infoCls += ' date-selected';

            if (dayOfWeek === 6 || day.isLastOfMonth) {
              styleType = SelectType.All;
            }

            break;

          case SelectType.Middle:
            if (dayOfWeek === 0 || day.isFirstOfMonth) {
              if (day.isLastOfMonth || dayOfWeek === 6) {
                styleType = SelectType.All;
              } else {
                styleType = SelectType.Start;
              }
            } else if (dayOfWeek === 6 || day.isLastOfMonth) {
              styleType = SelectType.End;
            }

            break;

          case SelectType.End:
            info = locale.over;
            infoCls += ' date-selected';

            if (dayOfWeek === 0 || day.isFirstOfMonth) {
              styleType = SelectType.All;
            }

            break;
        }

        switch (styleType) {
          case SelectType.Single:
          case SelectType.Only:
          case SelectType.All:
            cls += ' selected-single';
            break;

          case SelectType.Start:
            cls += ' selected-start';
            rCls += ' date-selected';
            break;

          case SelectType.Middle:
            cls += ' selected-middle';
            lCls += ' date-selected';
            rCls += ' date-selected';
            break;

          case SelectType.End:
            cls += ' selected-end';
            lCls += ' date-selected';
            break;
        }
      }

      var defaultContent = [h("div", {
        "key": "wrapper'} class={'date-wrapper"
      }, [h("span", {
        "class": lCls
      }), h("div", {
        "class": cls
      }, [day.dayOfMonth]), h("span", {
        "class": rCls
      })]), h("div", {
        "key": "info",
        "class": infoCls
      }, [info])];
      return h("div", {
        "key": dayOfWeek,
        "class": "cell " + (extra.cellCls || ''),
        "on": {
          "click": function click() {
            if (!disable) {
              if (!displayMode) {
                _this3.$emit('cellClick', day, monthData);
              }
            }
          }
        }
      }, [extra.cellRender ? extra.cellRender(new Date(day.tick)) : defaultContent]);
    })]);
  };

  _proto.updateWeeks = function updateWeeks(monthData) {
    var _this4 = this;

    (monthData || this.monthData).weeks.forEach(function (week, index) {
      _this4.genWeek(week, index);
    });
  };

  _proto.monthDataChanged = function monthDataChanged(data) {
    this.updateWeeks(data);
  };

  _proto.setWarpper = function setWarpper(dom) {
    this.wrapperDivDOM = dom;
  };

  _proto.render = function render() {
    var h = arguments[0];
    var title = this.monthData.title;
    var weekComponents = this.state.weekComponents;
    return h("div", {
      "class": "single-month",
      "ref": this.setWarpper.bind(this)
    }, [h("div", {
      "class": "month-title"
    }, [title]), h("div", {
      "class": "date"
    }, [weekComponents])]);
  };

  return SingleMonth;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "displayMode", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "currentValue", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "monthData", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "rowSize", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "getDateExtra", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "callback", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "monthDataChanged", [_dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "monthDataChanged"), _class2.prototype)), _class2)) || _class);
export default SingleMonth;