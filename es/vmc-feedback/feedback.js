import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var TouchFeedback = (_dec = Component({
  name: 'TouchFeedback'
}), _dec2 = Prop({
  type: Boolean,
  default: false
}), _dec3 = Prop({
  type: String
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(TouchFeedback, _Vue);

  function TouchFeedback() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "disabled", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "activeClassName", _descriptor2, _assertThisInitialized(_this)), _this.active = false, _temp) || _assertThisInitialized(_this);
  }

  var _proto = TouchFeedback.prototype;

  _proto.updated = function updated() {
    if (this.disabled && this.active) {
      this.active = false;
    }
  };

  _proto.triggerEvent = function triggerEvent(type, isActive, ev) {
    var eventType = "on" + type;
    var children = this.$slots.default && this.$slots.default[0];

    if (children[eventType]) {
      children[eventType](ev);
    }

    if (isActive !== this.active) {
      this.active = isActive;
    }

    this.$emit(type.toLowerCase(), ev);
  };

  _proto.onTouchStart = function onTouchStart(e) {
    this.triggerEvent('TouchStart', true, e);
  };

  _proto.onTouchMove = function onTouchMove(e) {
    this.triggerEvent('TouchMove', false, e);
  };

  _proto.onTouchEnd = function onTouchEnd(e) {
    this.triggerEvent('TouchEnd', false, e);
  };

  _proto.onTouchCancel = function onTouchCancel(e) {
    this.triggerEvent('TouchCancel', false, e);
  };

  _proto.onMouseDown = function onMouseDown(e) {
    // pc simulate mobile
    this.triggerEvent('MouseDown', true, e);
  };

  _proto.onMouseUp = function onMouseUp(e) {
    this.triggerEvent('MouseUp', false, e);
  };

  _proto.onMouseLeave = function onMouseLeave(e) {
    this.triggerEvent('MouseLeave', false, e);
  };

  _proto.render = function render() {
    var disabled = this.disabled,
        activeClassName = this.activeClassName;
    var events = disabled ? undefined : {
      touchstart: this.onTouchStart,
      touchmove: this.onTouchMove,
      touchend: this.onTouchEnd,
      touchcancel: this.onTouchCancel,
      mousedown: this.onMouseDown,
      mouseup: this.onMouseUp,
      mouseleave: this.onMouseLeave
    };
    var child = this.$slots.default[0];

    if (!disabled && this.active) {
      if (child.elm) {
        var elm = child.elm;

        if (!elm.classList.contains(activeClassName)) {
          elm.classList.add(activeClassName);
        }
      }
    } else {
      if (child.elm) {
        var _elm = child.elm;

        if (_elm.classList.contains(activeClassName)) {
          _elm.classList.remove(activeClassName);
        }
      }
    }

    var on = child.data.on;
    child.data.on = on ? _extends(on, events) : events;
    return child;
  };

  return TouchFeedback;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "activeClassName", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default TouchFeedback;