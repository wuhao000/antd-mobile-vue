import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var Badge = (_dec = Component({
  name: 'Badge'
}), _dec2 = Prop({
  default: 'am-badge'
}), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Prop({
  type: String,
  default: 'small'
}), _dec5 = Prop({
  type: Number,
  default: 99
}), _dec6 = Prop({
  type: Boolean,
  default: false
}), _dec7 = Prop({
  type: Boolean,
  default: false
}), _dec8 = Prop({
  type: [String, Number]
}), _dec9 = Prop({
  type: Object
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Badge, _Vue);

  function Badge() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "hot", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "size", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "overflowCount", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "corner", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "dot", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "text", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "textStyle", _descriptor8, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Badge.prototype;

  _proto.render = function render() {
    var _classnames, _classnames2;

    var h = arguments[0];
    var overflowCount = this.overflowCount,
        text = this.text;
    var prefixCls = this.prefixCls,
        size = this.size,
        dot = this.dot,
        corner = this.corner,
        hot = this.hot;
    overflowCount = overflowCount;
    text = typeof text === 'number' && text > overflowCount ? overflowCount + "+" : text; // dot mode don't need text

    if (dot) {
      text = '';
    }

    var scrollNumberCls = classnames((_classnames = {}, _classnames[prefixCls + "-dot"] = dot, _classnames[prefixCls + "-dot-large"] = dot && size === 'large', _classnames[prefixCls + "-text"] = !dot && !corner, _classnames[prefixCls + "-corner"] = corner, _classnames[prefixCls + "-corner-large"] = corner && size === 'large', _classnames));
    var badgeCls = classnames(prefixCls, (_classnames2 = {}, _classnames2[prefixCls + "-not-a-wrapper"] = !this.$slots.default, _classnames2[prefixCls + "-corner-wrapper"] = corner, _classnames2[prefixCls + "-hot"] = hot, _classnames2[prefixCls + "-corner-wrapper-large"] = corner && size === 'large', _classnames2));
    return h("span", {
      "class": badgeCls
    }, [this.$slots.default, (text || dot) && // tslint:disable-next-line:jsx-no-multiline-js
    h("sup", {
      "class": scrollNumberCls,
      "style": this.textStyle
    }, [text])]);
  };

  return Badge;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "hot", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "overflowCount", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "corner", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "dot", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "text", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "textStyle", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Badge as default };