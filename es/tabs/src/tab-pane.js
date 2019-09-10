import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { getPxStyle, getTransformPropValue } from './utils';
var TabPane = (_dec = Component({
  name: 'TabPane'
}), _dec2 = Prop(), _dec3 = Prop(), _dec4 = Prop({
  type: Boolean,
  default: true
}), _dec5 = Prop({
  type: Boolean,
  default: true
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(TabPane, _Vue);

  function TabPane() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _this.offsetX = 0, _this.offsetY = 0, _initializerDefineProperty(_this, "role", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "active", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "fixX", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "fixY", _descriptor4, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = TabPane.prototype;

  _proto.beforeUpdate = function beforeUpdate() {
    if (this.active !== this.active) {
      if (this.active) {
        this.offsetX = 0;
        this.offsetY = 0;
      } else {
        this.offsetX = this.layout.scrollLeft;
        this.offsetY = this.layout.scrollTop;
      }
    }
  };

  _proto.setLayout = function setLayout(div) {
    this.layout = div;
  };

  _proto.render = function render() {
    var h = arguments[0];

    var active = this.active,
        fixX = this.fixX,
        fixY = this.fixY,
        props = _objectWithoutPropertiesLoose(this, ["active", "fixX", "fixY"]);

    var style = _extends({}, fixX && this.offsetX ? getTransformPropValue(getPxStyle(-this.offsetX, 'px', false)) : {}, fixY && this.offsetY ? getTransformPropValue(getPxStyle(-this.offsetY, 'px', true)) : {});

    return h("div", _mergeJSXProps([{}, props, {
      "style": style,
      "ref": this.setLayout
    }]), [this.$slots.default]);
  };

  return TabPane;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "role", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "active", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "fixX", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "fixY", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default TabPane;