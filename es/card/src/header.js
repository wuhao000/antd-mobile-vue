import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var Header = (_dec = Component({
  name: 'Header'
}), _dec2 = Prop({
  default: 'am-card'
}), _dec3 = Prop({
  default: function _default() {
    return {};
  }
}), _dec4 = Prop({
  type: String
}), _dec5 = Prop({
  type: String
}), _dec6 = Prop({
  type: String
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Header, _Vue);

  function Header() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "thumbStyle", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "thumb", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "extra", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor5, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Header.prototype;

  _proto.render = function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls,
        thumb = this.thumb,
        thumbStyle = this.thumbStyle,
        extra = this.extra,
        title = this.title;
    var wrapCls = prefixCls + "-header";
    return h("div", {
      "class": wrapCls
    }, [h("div", {
      "class": prefixCls + "-header-content"
    }, [this.$slots.thumb ? this.$slots.thumb : this.thumb ? h("img", {
      "style": thumbStyle,
      "attrs": {
        "src": thumb
      }
    }) : null, this.$slots.default ? this.$slots.default : title]), this.$slots.extra || extra ? // tslint:disable-next-line:jsx-no-multiline-js
    h("div", {
      "class": prefixCls + "-header-extra"
    }, [this.$slots.extra ? this.$slots.extra : extra]) : null]);
  };

  return Header;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "thumbStyle", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "thumb", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "extra", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Header as default };