import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

import Tab from './tab';
import getDataAttr from '../../utils/get-data-attr';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
var Item = (_dec = Component({
  name: 'Item'
}), _dec2 = Prop({
  type: [String, Number]
}), _dec3 = Prop({
  type: Boolean,
  default: undefined
}), _dec4 = Prop({
  type: [String, Object]
}), _dec5 = Prop({
  type: [String, Object]
}), _dec6 = Prop({
  type: [String, Object],
  default: ''
}), _dec7 = Prop({
  type: Boolean
}), _dec8 = Prop({
  type: String,
  default: 'am-tab-bar'
}), _dec9 = Inject('store'), _dec10 = Inject('tabBar'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Item, _Vue);

  function Item() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "badge", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "selected", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "icon", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "selectedIcon", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "dot", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "store", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBar", _descriptor9, _assertThisInitialized(_this)), _this.index = -1, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Item.prototype;

  _proto.mounted = function mounted() {
    var _this2 = this;

    var tabs = this.$parent.$children.filter(function (it) {
      return it.$vnode.componentOptions.tag === _this2.$vnode.componentOptions.tag;
    });
    this.index = tabs.findIndex(function (it) {
      return it['_uid'] === _this2['_uid'];
    });
  };

  _proto.render = function render() {
    var _this3 = this;

    var h = arguments[0];
    var _this$tabBar = this.tabBar,
        tintColor = _this$tabBar.tintColor,
        unselectedTintColor = _this$tabBar.unselectedTintColor;
    var icon = this.$slots.icon ? this.$slots.icon[0] : this.icon;
    var selectedIcon = this.$slots.selectedIcon ? this.$slots.selectedIcon : this.selectedIcon || icon;

    var props = _extends({}, this.$props, {
      prefixCls: this.prefixCls + "-tab",
      tintColor: tintColor,
      unselectedTintColor: unselectedTintColor,
      icon: icon,
      selectedIcon: selectedIcon,
      selected: this.sSelected
    });

    return h(Tab, _mergeJSXProps([{}, {
      "props": props
    }, {
      "on": {
        "click": function click(e) {
          _this3.tabBar.setCurrentTab(_this3.index);

          _this3.$emit('click');
        }
      },
      "attrs": {
        "dataAttrs": getDataAttr(this.$props)
      }
    }]), [this.$slots.default]);
  };

  _createClass(Item, [{
    key: "sSelected",
    get: function get() {
      return this.selected !== undefined ? this.selected : this.index === this.store.currentTab;
    }
  }]);

  return Item;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "badge", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "selected", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "icon", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "selectedIcon", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "dot", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "tabBar", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Item as default };