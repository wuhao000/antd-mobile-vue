import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
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
var Flex = (_dec = Component({
  name: 'Flex'
}), _dec2 = Prop(String), _dec3 = Prop({
  type: String,
  default: 'am-flexbox'
}), _dec4 = Prop(String), _dec5 = Prop(String), _dec6 = Prop(String), _dec7 = Prop(String), _dec8 = Prop({
  type: String,
  default: 'center'
}), _dec9 = Prop(Boolean), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Flex, _Vue);

  function Flex() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "alignContent", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "role", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "direction", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "wrap", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "justify", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "align", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor8, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Flex.prototype;

  _proto.render = function render() {
    var _classnames;

    var h = arguments[0];

    var direction = this.direction,
        wrap = this.wrap,
        justify = this.justify,
        align = this.align,
        alignContent = this.alignContent,
        prefixCls = this.prefixCls,
        restProps = _objectWithoutPropertiesLoose(this, ["direction", "wrap", "justify", "align", "alignContent", "prefixCls"]);

    var wrapCls = classnames(prefixCls, (_classnames = {}, _classnames[prefixCls + "-dir-row"] = direction === 'row', _classnames[prefixCls + "-dir-row-reverse"] = direction === 'row-reverse', _classnames[prefixCls + "-dir-column"] = direction === 'column', _classnames[prefixCls + "-dir-column-reverse"] = direction === 'column-reverse', _classnames[prefixCls + "-nowrap"] = wrap === 'nowrap', _classnames[prefixCls + "-wrap"] = wrap === 'wrap', _classnames[prefixCls + "-wrap-reverse"] = wrap === 'wrap-reverse', _classnames[prefixCls + "-justify-start"] = justify === 'start', _classnames[prefixCls + "-justify-end"] = justify === 'end', _classnames[prefixCls + "-justify-center"] = justify === 'center', _classnames[prefixCls + "-justify-between"] = justify === 'between', _classnames[prefixCls + "-justify-around"] = justify === 'around', _classnames[prefixCls + "-align-start"] = align === 'start', _classnames[prefixCls + "-align-center"] = align === 'center', _classnames[prefixCls + "-align-end"] = align === 'end', _classnames[prefixCls + "-align-baseline"] = align === 'baseline', _classnames[prefixCls + "-align-stretch"] = align === 'stretch', _classnames[prefixCls + "-align-content-start"] = alignContent === 'start', _classnames[prefixCls + "-align-content-end"] = alignContent === 'end', _classnames[prefixCls + "-align-content-center"] = alignContent === 'center', _classnames[prefixCls + "-align-content-between"] = alignContent === 'between', _classnames[prefixCls + "-align-content-around"] = alignContent === 'around', _classnames[prefixCls + "-align-content-stretch"] = alignContent === 'stretch', _classnames));
    return h("div", {
      "class": wrapCls,
      "props": _extends({}, restProps)
    }, [this.$slots.default]);
  };

  return Flex;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "alignContent", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "role", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "wrap", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "justify", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "align", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Flex as default };