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
  type: String
}), _dec3 = Prop({}), _dec4 = Prop({
  type: Boolean
}), _dec5 = Prop({
  default: 'X'
}), _dec6 = Prop({}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Header, _Vue);

  function Header() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "locale", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showClear", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "closeIcon", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "clearIcon", _descriptor5, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Header.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    var title = this.title,
        _this$locale = this.locale,
        locale = _this$locale === void 0 ? {} : _this$locale,
        showClear = this.showClear,
        closeIcon = this.closeIcon,
        clearIcon = this.clearIcon;
    return h("div", {
      "class": "header"
    }, [h("span", {
      "class": "left",
      "on": {
        "click": function click() {
          return _this2.$emit('cancel');
        }
      }
    }, [closeIcon]), h("span", {
      "class": "title"
    }, [title || locale.title]), showClear && h("span", {
      "class": "right",
      "on": {
        "click": function click() {
          return _this2.$emit('clear');
        }
      }
    }, [clearIcon || locale.clear])]);
  };

  return Header;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "showClear", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "closeIcon", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "clearIcon", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default Header;