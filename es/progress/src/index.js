import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var Progress = (_dec = Component({
  name: 'Progress'
}), _dec2 = Prop({
  type: String,
  default: 'am-progress'
}), _dec3 = Prop({}), _dec4 = Prop({
  type: Number,
  default: 0
}), _dec5 = Prop({
  default: 'fixed'
}), _dec6 = Prop({
  type: Boolean,
  default: true
}), _dec7 = Prop({
  type: Boolean,
  default: false
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Progress, _Vue);

  function Progress() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "barStyle", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "percent", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "position", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "unfilled", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "appearTransition", _descriptor6, _assertThisInitialized(_this)), _this.noAppearTransition = true, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Progress.prototype;

  _proto.mounted = function mounted() {
    var _this2 = this;

    if (this.appearTransition) {
      setTimeout(function () {
        if (_this2.barRef) {
          _this2.barRef.style.width = _this2.percent + "%";
        }
      }, 10);
    }
  };

  _proto.render = function render() {
    var _classnames,
        _this3 = this;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        position = this.position,
        unfilled = this.unfilled,
        _this$barStyle = this.barStyle,
        barStyle = _this$barStyle === void 0 ? {} : _this$barStyle;
    var percentStyle = {
      width: this.noAppearTransition || !this.appearTransition ? this.percent + "%" : 0,
      height: 0
    };
    var wrapCls = classnames(prefixCls + "-outer", (_classnames = {}, _classnames[prefixCls + "-fixed-outer"] = position === 'fixed', _classnames[prefixCls + "-hide-outer"] = !unfilled, _classnames));
    return h("div", {
      "class": wrapCls,
      "attrs": {
        "role": "progressbar",
        "aria-valuenow": this.percent,
        "aria-valuemin": 0,
        "aria-valuemax": 100
      }
    }, [h("div", {
      "ref": function ref(el) {
        return _this3.barRef = el;
      },
      "class": prefixCls + "-bar",
      "style": _extends({}, barStyle, percentStyle)
    })]);
  };

  return Progress;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "barStyle", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "percent", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "position", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "unfilled", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "appearTransition", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default Progress;