import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp2;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import RcCollapse from 'ant-design-vue/lib/vc-collapse';
var Accordion = (_dec = Component({
  name: 'Accordion'
}), _dec2 = Prop({
  default: 'am-accordion'
}), _dec3 = Prop({}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: [String, Array]
}), _dec(_class = (_class2 = (_temp2 = _class3 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Accordion, _Vue);

  function Accordion() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "openAnimation", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "accordion", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "activeKey", _descriptor4, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Accordion.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    return this.$slots.default ? h(RcCollapse, _mergeJSXProps([{}, {
      "attrs": _extends({}, this.$props)
    }, {
      "on": {
        "change": function change() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          _this2.$emit.apply(_this2, ['change'].concat(args));
        }
      }
    }]), [this.$slots.default]) : null;
  };

  return Accordion;
}(Vue), _class3.Panel = RcCollapse.Panel, _temp2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "openAnimation", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "accordion", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "activeKey", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Accordion as default };