import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
var Sticky = (_dec = Component({
  name: 'Container'
}), _dec2 = Prop({
  type: Number,
  default: 0
}), _dec3 = Prop({
  type: Number,
  default: 0
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: Boolean,
  default: false
}), _dec6 = Prop({
  type: Boolean,
  default: false
}), _dec7 = Inject({
  from: 'stickyContext',
  default: undefined
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Sticky, _Vue);

  function Sticky() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "topOffset", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "bottomOffset", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "relative", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disableCompensation", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disableHardwareAcceleration", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "context", _descriptor6, _assertThisInitialized(_this)), _this.state = {
      isSticky: false,
      wasSticky: false,
      style: {},
      distanceFromTop: null,
      distanceFromBottom: null,
      calculatedHeight: null
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Sticky.prototype;

  _proto.mounted = function mounted() {
    if (!this.context.subscribe) {
      throw new TypeError('Expected Sticky to be mounted within StickyContainer');
    }

    this.context.subscribe(this.handleContainerEvent);
  };

  _proto.beforeDestroy = function beforeDestroy() {
    this.context.unsubscribe(this.handleContainerEvent);
  };

  _proto.updated = function updated() {
    this.placeholder.style.paddingBottom = this.disableCompensation ? '0' : (this.state.isSticky ? this.state.calculatedHeight : 0) + "px";
  };

  _proto.handleContainerEvent = function handleContainerEvent(_ref) {
    var distanceFromTop = _ref.distanceFromTop,
        distanceFromBottom = _ref.distanceFromBottom,
        eventSource = _ref.eventSource;
    var parent = this.context.getParent();
    var preventingStickyStateChanges = false;
    var distanceFromTopCopy = distanceFromTop;

    if (this.relative) {
      preventingStickyStateChanges = eventSource !== parent;
      distanceFromTopCopy = -(eventSource.scrollTop + eventSource.offsetTop) + this.placeholder.offsetTop;
    }

    var distanceFromBottomCopy = distanceFromBottom;
    var placeholderClientRect = this.placeholder.getBoundingClientRect();
    var contentClientRect = this.content.getBoundingClientRect();
    var calculatedHeight = contentClientRect.height;
    var bottomDifference = distanceFromBottomCopy - this.bottomOffset - calculatedHeight;
    var wasSticky = this.state.isSticky;
    var isSticky = preventingStickyStateChanges ? wasSticky : distanceFromTopCopy <= -this.topOffset && distanceFromBottomCopy > -this.bottomOffset;
    distanceFromBottomCopy = (this.relative ? parent.scrollHeight - parent.scrollTop : distanceFromBottomCopy) - calculatedHeight;
    var style = !isSticky ? {} : {
      position: 'fixed',
      top: bottomDifference > 0 ? this.relative ? parent.offsetTop - parent.offsetParent.scrollTop : 0 : bottomDifference,
      left: placeholderClientRect.left,
      width: placeholderClientRect.width
    };

    if (!this.disableHardwareAcceleration) {
      style.transform = 'translateZ(0)';
    }

    this.state.isSticky = isSticky;
    this.state.wasSticky = wasSticky;
    this.state.distanceFromTop = distanceFromTopCopy;
    this.state.distanceFromBottom = distanceFromBottomCopy;
    this.state.calculatedHeight = calculatedHeight;
    this.state.style = style;
  };

  _proto.render = function render() {
    var h = arguments[0];
    return h("div", [h("div", {
      "ref": "placeholder"
    }), h("div", {
      "style": _extends({
        zIndex: 1,
        width: '100%'
      }, this.state.style)
    }, [this.$slots.default])]);
  };

  _createClass(Sticky, [{
    key: "placeholder",
    get: function get() {
      return this.$refs.placeholder;
    }
  }, {
    key: "content",
    get: function get() {
      var child = this.$slots.default && this.$slots.default[0];

      if (child && child.$el) {
        return child.$el;
      } else if (child && child.elm) {
        return child.elm;
      }

      return child;
    }
  }]);

  return Sticky;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "topOffset", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bottomOffset", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "relative", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "disableCompensation", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "disableHardwareAcceleration", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "context", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Sticky as default };