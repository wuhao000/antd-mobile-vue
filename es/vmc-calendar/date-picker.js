import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor;

import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import DatePickerBase from './date-picker-base';
import SingleMonth from './date/single-month';
import WeekPanel from './date/week-panel';
var DatePicker = (_dec = Component({
  name: 'DatePicker'
}), _dec2 = Prop({
  type: Boolean,
  default: false
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_mixins) {
  _inheritsLoose(DatePicker, _mixins);

  function DatePicker() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _mixins.call.apply(_mixins, [this].concat(args)) || this, _initializerDefineProperty(_this, "displayMode", _descriptor, _assertThisInitialized(_this)), _this.transform = '', _temp) || _assertThisInitialized(_this);
  }

  var _proto = DatePicker.prototype;

  _proto.genMonthComponent = function genMonthComponent(data) {
    var _this2 = this;

    var h = this.$createElement;

    if (!data) {
      return;
    } // @ts-ignore


    return h(SingleMonth, {
      "key": data.title,
      "attrs": {
        "locale": this.locale || {},
        "monthData": data,
        "displayMode": this.displayMode,
        "rowSize": this.rowSize,
        "getDateExtra": this.getDateExtra,
        "callback": function callback(dom) {
          data.componentRef = dom || data.componentRef || undefined;

          data.updateLayout = function () {
            _this2.computeHeight(data, dom);
          };

          data.updateLayout();
        }
      },
      "on": {
        "cellClick": function cellClick(day) {
          _this2.onCellClick(day);
        }
      }
    });
  };

  _proto.computeHeight = function computeHeight(data, singleMonth) {
    var _this3 = this;

    if (singleMonth && singleMonth.wrapperDivDOM) {
      // preact, ref时dom有可能无height, offsetTop数据。
      if (!data.height && !singleMonth.wrapperDivDOM.clientHeight) {
        setTimeout(function () {
          return _this3.computeHeight(data, singleMonth);
        }, 500);
        return;
      }

      data.height = singleMonth.wrapperDivDOM.clientHeight || data.height || 0;
      data.y = singleMonth.wrapperDivDOM.offsetTop || data.y || 0;
    }
  };

  _proto.mounted = function mounted() {
    var wrapper = this.$refs['wrapper'];

    if (wrapper) {
      this.$emit('layout', wrapper.clientHeight);
      var scrollHandler = this.createOnScroll();

      wrapper.onscroll = function (evt) {
        scrollHandler({
          client: wrapper.clientHeight,
          full: evt.currentTarget.clientHeight,
          top: evt.currentTarget.scrollTop
        });
      };
    }
  };

  _proto.setTransform = function setTransform(nodeStyle, value) {
    this.transform = value;
    nodeStyle.transform = value;
    nodeStyle.webkitTransform = value;
  };

  _proto.setTransition = function setTransition(nodeStyle, value) {
    nodeStyle.transition = value;
    nodeStyle.webkitTransition = value;
  };

  _proto.render = function render() {
    var _this4 = this;

    var h = arguments[0];
    var _this$prefixCls = this.prefixCls,
        prefixCls = _this$prefixCls === void 0 ? '' : _this$prefixCls,
        _this$locale = this.locale,
        locale = _this$locale === void 0 ? {} : _this$locale;
    var style = {
      transform: this.transform
    };
    var wrapperEvents = {
      touchstart: this.touchHandler.onTouchStart,
      touchmove: this.touchHandler.onTouchMove,
      touchend: this.touchHandler.onTouchEnd,
      touchcancel: this.touchHandler.onTouchCancel
    };
    return h("div", {
      "class": prefixCls + " date-picker"
    }, [h(WeekPanel, {
      "attrs": {
        "locale": locale
      }
    }), h("div", _mergeJSXProps([{
      "class": "wrapper",
      "style": {
        overflowX: 'hidden',
        overflowY: 'visible'
      },
      "ref": "wrapper"
    }, {
      "on": wrapperEvents
    }]), [h("div", {
      "style": style,
      "ref": "panel"
    }, [this.canLoadPrev() && h("div", {
      "class": "load-tip"
    }, [locale.loadPrevMonth]), h("div", {
      "class": "months"
    }, [this.state.months.map(function (m) {
      var hidden = m.height && _this4.visibleMonth.indexOf(m) < 0;

      if (hidden) {
        return h("div", {
          "key": m.title + '_shallow',
          "style": {
            height: m.height
          }
        });
      }

      return m.component;
    })])])])]);
  };

  _createClass(DatePicker, [{
    key: "panel",
    get: function get() {
      return this.$refs['panel'];
    }
  }, {
    key: "touchHandler",
    get: function get() {
      var _this5 = this;

      var initDelta = 0;
      var lastY = 0;
      var delta = initDelta;
      return {
        onTouchStart: function onTouchStart(evt) {
          lastY = evt.touches[0].screenY;
          delta = initDelta;
        },
        onTouchMove: function onTouchMove(evt) {
          var ele = evt.currentTarget;
          var isReachTop = ele.scrollTop === 0;

          if (isReachTop) {
            delta = evt.touches[0].screenY - lastY;

            if (delta > 0) {
              evt.preventDefault();

              if (delta > 80) {
                delta = 80;
              }
            } else {
              delta = 0;
            }

            _this5.setTransform(_this5.panel.style, "translate3d(0," + delta + "px,0)");
          }
        },
        onTouchEnd: function onTouchEnd() {
          _this5.touchHandler.onFinish();
        },
        onTouchCancel: function onTouchCancel() {
          _this5.touchHandler.onFinish();
        },
        onFinish: function onFinish() {
          if (delta > 40 && _this5.canLoadPrev()) {
            _this5.genMonthData(_this5.state.months[0].firstDate, -1);

            _this5.visibleMonth = _this5.state.months.slice(0, _this5.initialMonths);

            _this5.state.months.forEach(function (m) {
              m.updateLayout && m.updateLayout();
            });

            _this5.$forceUpdate();
          }

          _this5.setTransform(_this5.panel.style, "translate3d(0,0,0)");

          _this5.setTransition(_this5.panel.style, '.3s');

          setTimeout(function () {
            _this5.panel && _this5.setTransition(_this5.panel.style, '');
          }, 300);
        }
      };
    }
  }]);

  return DatePicker;
}(mixins(DatePickerBase)), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "displayMode", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default DatePicker;