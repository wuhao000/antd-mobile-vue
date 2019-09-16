import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _class3, _temp2;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide, Watch } from 'vue-property-decorator';
import Tabs from '../../tabs';
import Item from './item';
var TabBar = (_dec = Component({
  name: 'MTabBar'
}), _dec2 = Prop({
  default: 'am-tab-bar'
}), _dec3 = Prop(), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: String,
  default: '正在加载'
}), _dec6 = Prop(), _dec7 = Prop({
  type: Number,
  default: 1
}), _dec8 = Prop({
  type: String,
  default: 'white'
}), _dec9 = Prop({
  type: String,
  default: '#108ee9'
}), _dec10 = Prop({
  type: String,
  default: '#888'
}), _dec11 = Prop({
  type: String,
  default: 'bottom'
}), _dec12 = Prop({
  type: Boolean,
  default: false
}), _dec13 = Prop({
  type: Boolean,
  default: false
}), _dec14 = Provide('tabBar'), _dec15 = Provide('store'), _dec16 = Prop({
  type: [Number, String]
}), _dec17 = Watch('value', {
  immediate: true
}), _dec18 = Watch('store.currentTab'), _dec(_class = (_class2 = (_temp2 = _class3 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(TabBar, _Vue);

  function TabBar() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "className", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "hidden", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "placeholder", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "noRenderContent", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prerenderingSiblingsNumber", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "barTintColor", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tintColor", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "unselectedTintColor", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBarPosition", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "animated", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "swipeable", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBar", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "store", _descriptor14, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor15, _assertThisInitialized(_this)), _this.content = [], _temp) || _assertThisInitialized(_this);
  }

  var _proto = TabBar.prototype;

  _proto.valueChanged = function valueChanged(value) {
    this.store.currentTab = value;
  };

  _proto.setCurrentTab = function setCurrentTab(tab) {
    this.store.currentTab = tab;
  };

  _proto.currentTabChanged = function currentTabChanged(value) {
    if (this.$listeners.input) {
      this.$emit('input', value);
    }

    console.log(this.store.currentTab);
  };

  _proto.renderTabBar = function renderTabBar() {
    var h = this.$createElement;
    var cls = this.prefixCls + "-bar";

    if (this.hidden) {
      cls += " " + this.prefixCls + "-bar-hidden-" + this.tabBarPosition;
    }

    return h("div", {
      "class": cls,
      "style": {
        backgroundColor: this.barTintColor
      }
    }, [this.$slots.default]);
  };

  _proto.getTabs = function getTabs() {
    var _this2 = this;

    return this.$slots.default.map(function (c, index) {
      var props = _extends({}, c.componentOptions.propsData);

      if (props.icon && !props.selectedIcon) {
        props.selectedIcon = props.icon;
      }

      return {
        props: props,
        onClick: function onClick() {
          _this2.store.currentTab = index;
        }
      };
    });
  };

  _proto.mounted = function mounted() {
    if (this.$slots.default) {
      this.content = this.$slots.default.filter(function (it) {
        return it.context;
      }).map(function (it) {
        return it.componentInstance.$slots.default || it.componentInstance.$slots.content || '';
      });
    }
  };

  _proto.render = function render() {
    var h = arguments[0];
    var prefixCls = this.prefixCls,
        animated = this.animated,
        swipeable = this.swipeable,
        noRenderContent = this.noRenderContent,
        prerenderingSiblingsNumber = this.prerenderingSiblingsNumber,
        tabBarPosition = this.tabBarPosition;
    var tabs = this.getTabs();
    return h("div", {
      "class": prefixCls
    }, [h(Tabs, {
      "attrs": {
        "tabs": tabs,
        "renderTabBar": this.renderTabBar,
        "tabBarPosition": tabBarPosition,
        "page": this.store.currentTab < 0 ? undefined : this.store.currentTab,
        "animated": animated,
        "swipeable": swipeable,
        "noRenderContent": noRenderContent,
        "prerenderingSiblingsNumber": prerenderingSiblingsNumber
      }
    }, [this.content])]);
  };

  return TabBar;
}(Vue), _class3.Item = Item, _temp2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "className", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "hidden", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "noRenderContent", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "prerenderingSiblingsNumber", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "barTintColor", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "tintColor", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "unselectedTintColor", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "tabBarPosition", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "animated", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "swipeable", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "tabBar", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return this;
  }
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      currentTab: -10000
    };
  }
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentTabChanged", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "currentTabChanged"), _class2.prototype)), _class2)) || _class);
export default TabBar;