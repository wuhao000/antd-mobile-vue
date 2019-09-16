import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var Footer = (_dec = Component({
  name: 'Footer'
}), _dec2 = Prop({
  default: 'am-card'
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: String
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Footer, _Vue);

  function Footer() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "extra", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "content", _descriptor3, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Footer.prototype;

  _proto.render = function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls,
        content = this.content,
        extra = this.extra;
    var wrapCls = prefixCls + "-footer";
    return h("div", {
      "class": wrapCls
    }, [h("div", {
      "class": prefixCls + "-footer-content"
    }, [this.$slots.default ? this.$slots.default : content]), (this.$slots.extra || extra) && h("div", {
      "class": prefixCls + "-footer-extra"
    }, [this.$slots.extra ? this.$slots.extra : extra])]);
  };

  return Footer;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "extra", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Footer as default };