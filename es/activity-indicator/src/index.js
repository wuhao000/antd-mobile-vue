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
var ActivityIndicator = (_dec = Component({
  name: 'ActivityIndicator'
}), _dec2 = Prop({
  type: String,
  default: 'am-activity-indicator'
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: Boolean,
  default: true
}), _dec5 = Prop({
  type: Boolean,
  default: false
}), _dec6 = Prop({
  default: 'small'
}), _dec7 = Prop({
  type: String
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(ActivityIndicator, _Vue);

  function ActivityIndicator() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "className", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "animating", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "toast", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "size", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "text", _descriptor6, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = ActivityIndicator.prototype;

  _proto.render = function render() {
    var _classnames, _classnames2;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        className = this.className,
        animating = this.animating,
        toast = this.toast,
        size = this.size,
        text = this.text;
    var wrapClass = classnames(prefixCls, className, (_classnames = {}, _classnames[prefixCls + "-lg"] = size === 'large', _classnames[prefixCls + "-sm"] = size === 'small', _classnames[prefixCls + "-toast"] = toast, _classnames));
    var spinnerClass = classnames(prefixCls + "-spinner", (_classnames2 = {}, _classnames2[prefixCls + "-spinner-lg"] = toast || size === 'large', _classnames2));

    if (animating) {
      if (toast) {
        return h("div", {
          "class": wrapClass
        }, [text ? h("div", {
          "class": prefixCls + "-content"
        }, [h("span", {
          "class": spinnerClass,
          "attrs": {
            "aria-hidden": "true"
          }
        }), h("span", {
          "class": prefixCls + "-toast"
        }, [text])]) : h("div", {
          "class": prefixCls + "-content"
        }, [h("span", {
          "class": spinnerClass,
          "attrs": {
            "aria-label": "Loading"
          }
        })])]);
      } else {
        return text ? h("div", {
          "class": wrapClass
        }, [h("span", {
          "class": spinnerClass,
          "attrs": {
            "aria-hidden": "true"
          }
        }), h("span", {
          "class": prefixCls + "-tip"
        }, [text])]) : h("div", {
          "class": wrapClass
        }, [h("span", {
          "class": spinnerClass,
          "attrs": {
            "aria-label": "loading"
          }
        })]);
      }
    } else {
      return null;
    }
  };

  return ActivityIndicator;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "className", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "animating", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "toast", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "text", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default ActivityIndicator;