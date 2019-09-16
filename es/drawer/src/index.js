import _extends from "@babel/runtime/helpers/extends";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import RmcDrawer from '../../vmc-drawer';
var Drawer = (_dec = Component({
  name: 'Drawer'
}), _dec2 = Prop({
  type: Object
}), _dec3 = Prop({
  type: Object
}), _dec4 = Prop({
  type: Object
}), _dec5 = Prop({
  type: Object
}), _dec6 = Prop({
  type: Boolean
}), _dec7 = Prop({
  type: Boolean
}), _dec8 = Prop({
  type: Boolean,
  default: true
}), _dec9 = Prop({
  type: Number
}), _dec10 = Prop({
  type: String,
  default: 'am-drawer'
}), _dec11 = Prop({}), _dec12 = Prop({
  type: Boolean
}), _dec13 = Prop({
  type: String,
  default: 'left'
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Drawer, _Vue);

  function Drawer() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "sidebarStyle", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "contentStyle", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "overlayStyle", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "dragHandleStyle", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "docked", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "transitions", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "touch", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "dragToggleDistance", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "sidebar", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "position", _descriptor12, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Drawer.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var h = arguments[0];
    // @ts-ignore
    return h(RmcDrawer, _mergeJSXProps([{}, {
      "attrs": _extends({}, this.$props, this.$attrs, {
        sidebar: this.$slots.sidebar || this.sidebar
      })
    }, {
      "attrs": {
        "open": this.value
      }
    }, {
      "on": _extends({}, this.$listeners, {
        open: function open(value) {
          _this2.$emit('input', value);

          _this2.$emit('open', value);
        }
      })
    }]), [this.$slots.default]);
  };

  return Drawer;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sidebarStyle", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "contentStyle", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "overlayStyle", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "dragHandleStyle", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "docked", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "transitions", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "touch", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "dragToggleDistance", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "sidebar", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "position", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Drawer as default };