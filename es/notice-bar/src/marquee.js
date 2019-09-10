import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
/*
 * https://github.com/jasonslyvia/react-marquee
 * remove PC
 * support React Element for text prop
*/

var Marquee = (_dec = Component({
  name: 'Marquee'
}), _dec2 = Prop({
  type: String
}), _dec3 = Prop({
  type: [String, Object],
  default: ''
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: Number,
  default: 500
}), _dec6 = Prop({
  type: Number,
  default: 800
}), _dec7 = Prop({
  type: Number,
  default: 40
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Marquee, _Vue);

  function Marquee() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "text", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "loop", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "leading", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "trailing", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "fps", _descriptor6, _assertThisInitialized(_this)), _this.state = {
      animatedWidth: 0,
      overflowWidth: 0
    }, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Marquee.prototype;

  _proto.mounted = function mounted() {
    this._measureText();

    this._startAnimation();
  };

  _proto.updated = function updated() {
    this._measureText();

    if (!this._marqueeTimer) {
      this._startAnimation();
    }
  };

  _proto.beforeDestroy = function beforeDestroy() {
    clearTimeout(this._marqueeTimer);
  };

  _proto.render = function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls,
        text = this.text;
    var style = {
      position: 'relative',
      right: this.state.animatedWidth + 'px',
      whiteSpace: 'nowrap',
      display: 'inline-block'
    };
    return h("div", {
      "class": prefixCls + "-marquee-wrap",
      "style": {
        overflow: 'hidden'
      },
      "attrs": {
        "role": "marquee"
      }
    }, [h("div", {
      "ref": "textRef",
      "class": prefixCls + "-marquee",
      "style": style
    }, [text])]);
  };

  _proto._startAnimation = function _startAnimation() {
    var _this2 = this;

    if (this._marqueeTimer) {
      window.clearTimeout(this._marqueeTimer);
    }

    var fps = this.fps;
    var TIMEOUT = 1 / fps * 1000;
    var isLeading = this.state.animatedWidth === 0;
    var timeout = isLeading ? this.leading : TIMEOUT;

    var animate = function animate() {
      var overflowWidth = _this2.state.overflowWidth;
      var animatedWidth = _this2.state.animatedWidth + 1;
      var isRoundOver = animatedWidth > overflowWidth;

      if (isRoundOver) {
        if (_this2.loop) {
          animatedWidth = 0;
        } else {
          return;
        }
      }

      if (isRoundOver && _this2.trailing) {
        _this2._marqueeTimer = window.setTimeout(function () {
          _this2.state.animatedWidth = animatedWidth;
          _this2._marqueeTimer = window.setTimeout(animate, TIMEOUT);
        }, _this2.trailing);
      } else {
        _this2.state.animatedWidth = animatedWidth;
        _this2._marqueeTimer = window.setTimeout(animate, TIMEOUT);
      }
    };

    if (this.state.overflowWidth !== 0) {
      this._marqueeTimer = window.setTimeout(animate, timeout);
    }
  };

  _proto._measureText = function _measureText() {
    var container = this.$el;
    var node = this.textRef;

    if (container && node) {
      var containerWidth = container.offsetWidth;
      var textWidth = node.offsetWidth;
      this.state.overflowWidth = textWidth - containerWidth;
    }
  };

  _createClass(Marquee, [{
    key: "textRef",
    get: function get() {
      return this.$refs.textRef;
    }
  }]);

  return Marquee;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "text", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "loop", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "leading", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "trailing", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "fps", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default Marquee;