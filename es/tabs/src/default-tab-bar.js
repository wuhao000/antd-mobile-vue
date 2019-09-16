import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Gesture from '../../vmc-gesture';
import { getPxStyle, getTransformPropValue, setPxStyle } from './utils';
var instanceId = 0;
var DefaultTabBar = (_dec = Component({
  name: 'DefaultTabBar'
}), _dec2 = Prop({
  type: Boolean
}), _dec3 = Prop(String), _dec4 = Prop({
  default: 'am-tabs-default-bar'
}), _dec5 = Prop({
  default: function _default() {}
}), _dec6 = Prop({
  default: function _default() {
    return [];
  }
}), _dec7 = Prop({
  default: 0
}), _dec8 = Prop({
  type: Boolean,
  default: true
}), _dec9 = Prop(), _dec10 = Prop({
  type: Boolean,
  default: true
}), _dec11 = Prop({
  default: 5
}), _dec12 = Prop({
  type: String,
  default: 'top'
}), _dec13 = Prop({
  default: function _default() {
    return {};
  }
}), _dec14 = Prop({
  default: '#fff'
}), _dec15 = Prop({
  default: ''
}), _dec16 = Prop({
  default: ''
}), _dec17 = Prop({
  default: function _default() {
    return {};
  }
}), _dec18 = Watch('activeTab'), _dec19 = Watch('tabs'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(DefaultTabBar, _Vue);

  function DefaultTabBar() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "card", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "activeCardColor", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "goToTab", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabs", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "activeTab", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "animated", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "renderTab", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "renderUnderline", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "page", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBarPosition", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBarUnderlineStyle", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBarBackgroundColor", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBarActiveTextColor", _descriptor14, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBarInactiveTextColor", _descriptor15, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBarTextStyle", _descriptor16, _assertThisInitialized(_this)), _this.isMoving = false, _this.showPrev = false, _this.showNext = false, _this.transform = '', _temp) || _assertThisInitialized(_this);
  }

  var _proto = DefaultTabBar.prototype;

  _proto.created = function created() {
    this.getTransformByIndex();
    this.instanceId = instanceId++;
  };

  _proto.getTransformByIndex = function getTransformByIndex() {
    var activeTab = this.activeTab,
        tabs = this.tabs,
        _this$page = this.page,
        page = _this$page === void 0 ? 0 : _this$page;
    var isVertical = this.isTabBarVertical();
    var size = this.getTabSize(page, tabs.length);
    var center = page / 2;
    var pos = Math.min(activeTab, tabs.length - center - .5);
    var skipSize = Math.min(-(pos - center + .5) * size, 0);
    this.onPan.setCurrentOffset(skipSize + "%");
    this.transform = getPxStyle(skipSize, '%', isVertical);
    this.showPrev = activeTab > center - .5 && tabs.length > page;
    this.showNext = activeTab < tabs.length - center - .5 && tabs.length > page;
  };

  _proto.onPress = function onPress(index) {
    var goToTab = this.goToTab,
        tabs = this.tabs;
    this.$emit('tabClick', tabs[index], index);
    goToTab && goToTab(index);
  };

  _proto.isTabBarVertical = function isTabBarVertical(position) {
    if (position === void 0) {
      position = this.tabBarPosition;
    }

    return position === 'left' || position === 'right';
  };

  _proto.nativeRenderTab = function nativeRenderTab(t, i, size, isTabBarVertical) {
    var _this2 = this;

    var h = this.$createElement;
    var prefixCls = this.prefixCls,
        renderTab = this.renderTab,
        activeTab = this.activeTab,
        tabBarTextStyle = this.tabBarTextStyle,
        tabBarActiveTextColor = this.tabBarActiveTextColor,
        tabBarInactiveTextColor = this.tabBarInactiveTextColor,
        instanceId = this.instanceId;

    var textStyle = _extends({}, tabBarTextStyle);

    var cls = prefixCls + "-tab";
    var ariaSelected = false;

    var style = _extends({}, textStyle, isTabBarVertical ? {
      height: size + "%"
    } : {
      width: size + "%"
    });

    if (this.card && this.activeCardColor) {
      style.borderColor = this.activeCardColor;
    }

    if (this.card) {
      cls += " " + cls + "-card";
    }

    if (activeTab === i) {
      cls += " " + cls + "-active";
      ariaSelected = true;

      if (tabBarActiveTextColor) {
        textStyle.color = tabBarActiveTextColor;
      }

      style.backgroundColor = this.activeCardColor;
    } else if (tabBarInactiveTextColor) {
      textStyle.color = tabBarInactiveTextColor;
    }

    return h("div", {
      "key": "t_" + i,
      "style": style,
      "attrs": {
        "id": "m-tabs-" + instanceId + "-" + i,
        "role": "tab",
        "aria-selected": ariaSelected
      },
      "class": cls,
      "on": {
        "click": function click() {
          return _this2.onPress(i);
        }
      }
    }, [renderTab ? renderTab(t) : t.title]);
  };

  _proto.getTabSize = function getTabSize(page, tabLength) {
    return 100 / Math.min(page, tabLength);
  };

  _proto.activeTabChanged = function activeTabChanged() {
    this.getTransformByIndex();
  };

  _proto.tabsChanged = function tabsChanged() {
    this.getTransformByIndex();
  };

  _proto.render = function render() {
    var _this3 = this;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        animated = this.animated,
        _this$tabs = this.tabs,
        tabs = _this$tabs === void 0 ? [] : _this$tabs,
        _this$page2 = this.page,
        page = _this$page2 === void 0 ? 0 : _this$page2,
        _this$activeTab = this.activeTab,
        activeTab = _this$activeTab === void 0 ? 0 : _this$activeTab,
        tabBarBackgroundColor = this.tabBarBackgroundColor,
        tabBarUnderlineStyle = this.tabBarUnderlineStyle,
        tabBarPosition = this.tabBarPosition;
    var renderUnderline = !this.card && this.renderUnderline;
    var isMoving = this.isMoving,
        transform = this.transform,
        showNext = this.showNext,
        showPrev = this.showPrev;
    var isTabBarVertical = this.isTabBarVertical();
    var needScroll = tabs.length > page;
    var size = this.getTabSize(page, tabs.length);
    var Tabs = tabs.map(function (t, i) {
      return _this3.nativeRenderTab(t, i, size, isTabBarVertical);
    });
    var cls = prefixCls;

    if (animated && !isMoving) {
      cls += " " + prefixCls + "-animated";
    }

    var style = {
      backgroundColor: tabBarBackgroundColor || ''
    };
    var transformStyle = needScroll ? _extends({}, getTransformPropValue(transform)) : {};

    var _this$onPan = this.onPan,
        setCurrentOffset = _this$onPan.setCurrentOffset,
        onPan = _objectWithoutPropertiesLoose(_this$onPan, ["setCurrentOffset"]);

    var underlineProps = {
      style: _extends({}, isTabBarVertical ? {
        height: size + "%"
      } : {
        width: size + "%"
      }, isTabBarVertical ? {
        top: size * activeTab + "%"
      } : {
        left: size * activeTab + "%"
      }, tabBarUnderlineStyle),
      class: prefixCls + "-underline"
    };
    return h("div", {
      "class": cls + " " + prefixCls + "-" + tabBarPosition,
      "style": style
    }, [showPrev && h("div", {
      "class": prefixCls + "-prevpage"
    }), h(Gesture, _mergeJSXProps([{}, onPan, {
      "attrs": {
        "direction": isTabBarVertical ? 'vertical' : 'horizontal'
      }
    }]), [h("div", {
      "attrs": {
        "role": "tablist"
      },
      "class": prefixCls + "-content",
      "style": transformStyle,
      "ref": "layout"
    }, [Tabs, renderUnderline ? h("div", _mergeJSXProps2([{}, underlineProps])) : ''])]), showNext && h("div", {
      "class": prefixCls + "-nextpage"
    })]);
  };

  _createClass(DefaultTabBar, [{
    key: "layout",
    get: function get() {
      return this.$refs['layout'];
    }
  }, {
    key: "onPan",
    get: function get() {
      var _this4 = this;

      var lastOffset = 0;
      var finalOffset = 0;

      var getLastOffset = function getLastOffset(isVertical) {
        if (isVertical === void 0) {
          isVertical = _this4.isTabBarVertical();
        }

        var offset = +("" + lastOffset).replace('%', '');

        if (("" + lastOffset).indexOf('%') >= 0) {
          offset /= 100;
          offset *= isVertical ? _this4.layout.clientHeight : _this4.layout.clientWidth;
        }

        return offset;
      };

      return {
        onPanStart: function onPanStart() {
          _this4.isMoving = true;
        },
        onPanMove: function onPanMove(status) {
          if (!status.moveStatus || !_this4.layout) {
            return;
          }

          var isVertical = _this4.isTabBarVertical();

          var offset = getLastOffset() + (isVertical ? status.moveStatus.y : status.moveStatus.x);
          var canScrollOffset = isVertical ? -_this4.layout.scrollHeight + _this4.layout.clientHeight : -_this4.layout.scrollWidth + _this4.layout.clientWidth;
          offset = Math.min(offset, 0);
          offset = Math.max(offset, canScrollOffset);
          setPxStyle(_this4.layout, offset, 'px', isVertical);
          finalOffset = offset;
          _this4.showPrev = -offset > 0;
          _this4.showNext = offset > canScrollOffset;
        },
        onPanEnd: function onPanEnd() {
          var isVertical = _this4.isTabBarVertical();

          lastOffset = finalOffset;
          _this4.isMoving = false;
          _this4.transform = getPxStyle(finalOffset, 'px', isVertical);
        },
        setCurrentOffset: function setCurrentOffset(offset) {
          return lastOffset = offset;
        }
      };
    }
  }]);

  return DefaultTabBar;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "card", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "activeCardColor", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "goToTab", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "tabs", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "activeTab", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "animated", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "renderTab", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "renderUnderline", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "page", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "tabBarPosition", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "tabBarUnderlineStyle", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "tabBarBackgroundColor", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "tabBarActiveTextColor", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "tabBarInactiveTextColor", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "tabBarTextStyle", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "activeTabChanged", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "activeTabChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "tabsChanged", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "tabsChanged"), _class2.prototype)), _class2)) || _class);
export default DefaultTabBar;