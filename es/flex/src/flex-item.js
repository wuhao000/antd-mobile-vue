import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var FlexItem = (_dec = Component({
  name: 'FlexItem'
}), _dec2 = Prop({
  type: Boolean,
  default: false
}), _dec3 = Prop({
  type: String,
  default: 'am-flexbox'
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(FlexItem, _Vue);

  function FlexItem() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "disabled", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor2, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = FlexItem.prototype;

  _proto.render = function render() {
    var h = arguments[0];

    var prefixCls = this.prefixCls,
        restProps = _objectWithoutPropertiesLoose(this, ["prefixCls"]);

    var wrapCls = classnames(prefixCls + "-item");
    return h("div", {
      "class": wrapCls,
      "props": _extends({}, restProps)
    }, [this.$slots.default]);
  };

  return FlexItem;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { FlexItem as default };