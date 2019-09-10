import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var AnimateWrapper = (_dec = Component({
  name: 'AnimateWrapper'
}), _dec2 = Prop({
  type: Boolean
}), _dec3 = Prop({
  type: String
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(AnimateWrapper, _Vue);

  function AnimateWrapper() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "visible", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "displayType", _descriptor2, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = AnimateWrapper.prototype;

  _proto.render = function render() {
    var h = arguments[0];
    var displayType = this.displayType,
        visible = this.visible;
    return h("div", {
      "class": "animate",
      "style": {
        display: visible ? displayType : 'none'
      }
    }, [visible && this.$slots.default]);
  };

  return AnimateWrapper;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "visible", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "displayType", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { AnimateWrapper as default };