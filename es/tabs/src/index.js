import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _class3, _temp2;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Gesture from '../../vmc-gesture';
import { DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP } from '../../vmc-gesture/config';
import DefaultTabBar from './default-tab-bar';
import TabPane from './tab-pane';
import { getTransformPropValue, setPxStyle, setTransform } from './utils';
var instanceId = 0;
export var getPanDirection = function getPanDirection(direction) {
  switch (direction) {
    case DIRECTION_LEFT:
    case DIRECTION_RIGHT:
      return 'horizontal';

    case DIRECTION_UP:
    case DIRECTION_DOWN:
      return 'vertical';

    default:
      return 'none';
  }
};
var Tabs = (_dec = Component({
  name: 'Tabs'
}), _dec2 = Prop({
  type: Boolean
}), _dec3 = Prop({
  type: String
}), _dec4 = Prop({
  type: String,
  default: 'am-tabs'
}), _dec5 = Prop({
  type: Boolean,
  default: true
}), _dec6 = Prop(), _dec7 = Prop({
  default: function _default() {
    return [];
  }
}), _dec8 = Prop({
  default: 'top'
}), _dec9 = Prop({
  type: [String, Number],
  default: 0
}), _dec10 = Prop({
  type: Number
}), _dec11 = Prop({
  type: Boolean,
  default: true
}), _dec12 = Prop({
  type: Number,
  default: 1
}), _dec13 = Prop({
  type: Boolean,
  default: true
}), _dec14 = Prop({
  type: Boolean,
  default: false
}), _dec15 = Prop({
  type: Number,
  default: 0.3
}), _dec16 = Prop({
  type: Boolean,
  default: true
}), _dec17 = Prop({
  type: String,
  default: 'horizontal'
}), _dec18 = Prop({
  type: Object
}), _dec19 = Prop({
  type: String
}), _dec20 = Prop({
  type: String
}), _dec21 = Prop({
  type: String
}), _dec22 = Prop({
  type: Object
}), _dec23 = Prop({
  type: Boolean
}), _dec24 = Watch('page'), _dec25 = Watch('currentTab'), _dec(_class = (_class2 = (_temp2 = _class3 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Tabs, _Vue);

  function Tabs() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "card", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "activeCardColor", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "useOnPan", _descriptor4, _assertThisInitialized(_this)), _this.contentPos = '', _this.isMoving = false, _initializerDefineProperty(_this, "renderTabBar", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabs", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBarPosition", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "page", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "swipeable", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prerenderingSiblingsNumber", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "animated", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "destroyInactiveTab", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "distanceToChangeTab", _descriptor14, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "usePaged", _descriptor15, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabDirection", _descriptor16, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBarUnderlineStyle", _descriptor17, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBarBackgroundColor", _descriptor18, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBarActiveTextColor", _descriptor19, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBarInactiveTextColor", _descriptor20, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "tabBarTextStyle", _descriptor21, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "useLeftInsteadTransform", _descriptor22, _assertThisInitialized(_this)), _this.tabCache = {}, _this.currentTab = _this.getTabIndex(), _temp) || _assertThisInitialized(_this);
  }

  var _proto = Tabs.prototype;

  _proto.created = function created() {
    this.nextCurrentTab = this.currentTab;
    this.instanceId = instanceId++;
    this.contentPos = this.getContentPosByIndex(this.getTabIndex(), this.isTabVertical(this.tabDirection), this.useLeftInsteadTransform);
  };

  _proto.pageChanged = function pageChanged(page) {
    if (page !== undefined && page !== null) {
      this.currentTab = page;
    }
  };

  _proto.currentTabChanged = function currentTabChanged(index) {
    this.$emit('input', index);
  }
  /** on tab click */
  ;

  _proto.onTabClick = function onTabClick(tab, index) {
    this.$emit('tab-click', index);
  };

  _proto.getTabIndex = function getTabIndex() {
    var page = this.page,
        value = this.value,
        tabs = this.tabs;
    var param = (page !== undefined ? page : value) || 0;
    var index = 0;

    if (typeof param === 'string') {
      tabs.forEach(function (t, i) {
        if (t.key === param) {
          index = i;
        }
      });
    } else {
      index = param || 0;
    }

    return index < 0 ? 0 : index;
  };

  _proto.isTabVertical = function isTabVertical(direction) {
    if (direction === void 0) {
      direction = this.tabDirection;
    }

    return direction === 'vertical';
  };

  _proto.shouldRenderTab = function shouldRenderTab(idx) {
    var _this$prerenderingSib = this.prerenderingSiblingsNumber,
        prerenderingSiblingsNumber = _this$prerenderingSib === void 0 ? 0 : _this$prerenderingSib;
    var _this$currentTab = this.currentTab,
        currentTab = _this$currentTab === void 0 ? 0 : _this$currentTab;
    return currentTab - prerenderingSiblingsNumber <= idx && idx <= currentTab + prerenderingSiblingsNumber;
  };

  _proto.beforeUpdate = function beforeUpdate() {
    if (this.page !== this.page && this.page !== undefined) {
      this.baseGoToTab(this.getTabIndex(), true, {});
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    this.prevCurrentTab = this.currentTab;
  };

  _proto.updated = function updated() {
    this.prevCurrentTab = this.currentTab;
  };

  _proto.getOffsetIndex = function getOffsetIndex(current, width, threshold) {
    if (threshold === void 0) {
      threshold = this.distanceToChangeTab || 0;
    }

    var ratio = Math.abs(current / width);
    var direction = ratio > this.currentTab ? '<' : '>';
    var index = Math.floor(ratio);

    switch (direction) {
      case '<':
        return ratio - index > threshold ? index + 1 : index;

      case '>':
        return 1 - ratio + index > threshold ? index : index + 1;

      default:
        return Math.round(ratio);
    }
  };

  _proto.baseGoToTab = function baseGoToTab(index, force, newState) {
    var _this2 = this;

    if (force === void 0) {
      force = false;
    }

    if (newState === void 0) {
      newState = {};
    }

    if (!force && this.nextCurrentTab === index) {
      return false;
    }

    this.nextCurrentTab = index;
    var tabs = this.tabs;

    if (index >= 0 && index < tabs.length) {
      if (!force) {
        this.$emit('change', tabs[index], index);

        if (this.page !== undefined) {
          return false;
        }
      }

      this.currentTab = index;
      Object.keys(newState).forEach(function (key) {
        _this2[key] = newState[key];
      });
    }

    return true;
  };

  _proto.getTabBarBaseProps = function getTabBarBaseProps() {
    var animated = this.animated,
        tabBarActiveTextColor = this.tabBarActiveTextColor,
        tabBarBackgroundColor = this.tabBarBackgroundColor,
        tabBarInactiveTextColor = this.tabBarInactiveTextColor,
        tabBarPosition = this.tabBarPosition,
        tabBarTextStyle = this.tabBarTextStyle,
        tabBarUnderlineStyle = this.tabBarUnderlineStyle,
        tabs = this.tabs;
    return {
      activeTab: this.currentTab,
      animated: animated,
      card: this.card,
      activeCardColor: this.activeCardColor,
      goToTab: this.tabClickGoToTab,
      tabBarActiveTextColor: tabBarActiveTextColor,
      tabBarBackgroundColor: tabBarBackgroundColor,
      tabBarInactiveTextColor: tabBarInactiveTextColor,
      tabBarPosition: tabBarPosition,
      tabBarTextStyle: tabBarTextStyle,
      tabBarUnderlineStyle: tabBarUnderlineStyle,
      tabs: tabs,
      instanceId: this.instanceId
    };
  };

  _proto.getSubElements = function getSubElements() {
    var children = this.$slots.default;
    var subElements = {};
    return function (defaultPrefix, allPrefix) {
      if (defaultPrefix === void 0) {
        defaultPrefix = '$i$-';
      }

      if (allPrefix === void 0) {
        allPrefix = '$ALL$';
      }

      if (Array.isArray(children)) {
        children.forEach(function (child, index) {
          if (child.key) {
            subElements[child.key] = child;
          }

          subElements["" + defaultPrefix + index] = child;
        });
      } else if (children) {
        subElements[allPrefix] = children;
      }

      return subElements;
    };
  };

  _proto.getSubElement = function getSubElement(tab, index, defaultPrefix, allPrefix) {
    if (defaultPrefix === void 0) {
      defaultPrefix = '$i$-';
    }

    if (allPrefix === void 0) {
      allPrefix = '$ALL$';
    }

    var key = tab.key !== null && tab.key !== undefined && tab.key !== '' ? tab.key : "" + defaultPrefix + index;
    var getSubElements = this.getSubElements();
    var elements = getSubElements(defaultPrefix, allPrefix);
    var component = elements[key] || elements[allPrefix];

    if (component instanceof Function) {
      component = component(tab, index);
    }

    return component || null;
  };

  _proto.goToTab = function goToTab(index, force, usePaged) {
    if (force === void 0) {
      force = false;
    }

    if (usePaged === void 0) {
      usePaged = this.usePaged;
    }

    var tabDirection = this.tabDirection,
        useLeftInsteadTransform = this.useLeftInsteadTransform;
    var newState = {};

    if (usePaged) {
      newState = {
        contentPos: this.getContentPosByIndex(index, this.isTabVertical(tabDirection), useLeftInsteadTransform)
      };
    }

    return this.baseGoToTab(index, force, newState);
  };

  _proto.tabClickGoToTab = function tabClickGoToTab(index) {
    this.goToTab(index, false, true);
  };

  _proto.getContentPosByIndex = function getContentPosByIndex(index, isVertical, useLeft) {
    if (useLeft === void 0) {
      useLeft = false;
    }

    var value = -index * 100 + "%";
    this.onPan.setCurrentOffset(value);

    if (useLeft) {
      return "" + value;
    } else {
      var translate = isVertical ? "0px, " + value : value + ", 0px"; // fix: content overlay TabBar on iOS 10. ( 0px -> 1px )

      return "translate3d(" + translate + ", 1px)";
    }
  };

  _proto.onSwipe = function onSwipe(status) {
    var tabBarPosition = this.tabBarPosition,
        swipeable = this.swipeable,
        usePaged = this.usePaged;

    if (!swipeable || !usePaged || this.isTabVertical()) {
      return;
    }

    switch (tabBarPosition) {
      case 'top':
      case 'bottom':
        switch (status.direction) {
          case DIRECTION_LEFT:
            if (!this.isTabVertical()) {
              this.goToTab(this.prevCurrentTab + 1);
            }

            break;

          case DIRECTION_UP:
            if (this.isTabVertical()) {
              this.goToTab(this.prevCurrentTab + 1);
            }

            break;

          case DIRECTION_RIGHT:
            if (!this.isTabVertical()) {
              this.goToTab(this.prevCurrentTab - 1);
            }

            break;

          case DIRECTION_DOWN:
            if (this.isTabVertical()) {
              this.goToTab(this.prevCurrentTab - 1);
            }

            break;
        }

        break;
    }
  };

  _proto.renderContent = function renderContent() {
    var _this3 = this;

    var h = this.$createElement;
    var prefixCls = this.prefixCls,
        tabs = this.tabs,
        animated = this.animated,
        destroyInactiveTab = this.destroyInactiveTab,
        useLeftInsteadTransform = this.useLeftInsteadTransform;
    var currentTab = this.currentTab,
        isMoving = this.isMoving,
        contentPos = this.contentPos;
    var isTabVertical = this.isTabVertical();
    var contentCls = prefixCls + "-content-wrap";

    if (animated && !isMoving) {
      contentCls += " " + contentCls + "-animated";
    }

    var contentStyle = animated ? useLeftInsteadTransform ? _extends({
      position: 'relative'
    }, this.isTabVertical() ? {
      top: contentPos
    } : {
      left: contentPos
    }) : getTransformPropValue(contentPos) : _extends({
      position: 'relative'
    }, this.isTabVertical() ? {
      top: -currentTab * 100 + "%"
    } : {
      left: -currentTab * 100 + "%"
    });

    var _this$getTabBarBasePr = this.getTabBarBaseProps(),
        instanceId = _this$getTabBarBasePr.instanceId;

    return h("div", {
      "class": contentCls,
      "style": contentStyle,
      "ref": "layout"
    }, [tabs && tabs.map(function (tab, index) {
      var cls = prefixCls + "-pane-wrap";

      if (_this3.currentTab === index) {
        cls += " " + cls + "-active";
      } else {
        cls += " " + cls + "-inactive";
      }

      var key = tab.key || "tab_" + index; // update tab cache

      if (_this3.shouldRenderTab(index)) {
        _this3.tabCache[index] = _this3.getSubElement(tab, index);
      } else if (destroyInactiveTab) {
        _this3.tabCache[index] = undefined;
      }

      return h(TabPane, {
        "key": key,
        "class": cls,
        "attrs": {
          "active": currentTab === index,
          "role": "tabpanel",
          "aria-hidden": currentTab !== index,
          "aria-labelledby": "m-tabs-" + instanceId + "-" + index,
          "fixX": isTabVertical,
          "fixY": !isTabVertical
        }
      }, [_this3.tabCache[index]]);
    })]);
  };

  _proto.render = function render() {
    var _this4 = this;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        tabBarPosition = this.tabBarPosition,
        tabDirection = this.tabDirection,
        useOnPan = this.useOnPan;
    var isTabVertical = this.isTabVertical(tabDirection);

    var tabBarProps = _extends({}, this.getTabBarBaseProps());

    var onPan = !isTabVertical && useOnPan ? this.onPan : {};
    var content = [h("div", {
      "key": "tabBar",
      "class": prefixCls + "-tab-bar-wrap"
    }, [this.renderTabBar ? this.renderTabBar(tabBarProps) : h(DefaultTabBar, _mergeJSXProps([{}, {
      "attrs": tabBarProps
    }, {}, {
      "on": {
        tabClick: function tabClick(tab, index) {
          _this4.onTabClick(tab, index);
        }
      }
    }]))]), h(Gesture, {
      "key": "$content",
      "on": {
        "swipe": this.onSwipe
      },
      "props": _extends({}, onPan)
    }, [this.renderContent()])];
    return h("div", {
      "class": prefixCls + " " + prefixCls + "-" + tabDirection + " " + prefixCls + "-" + tabBarPosition
    }, [tabBarPosition === 'top' || tabBarPosition === 'left' ? content : content.reverse()]);
  };

  _createClass(Tabs, [{
    key: "layout",
    get: function get() {
      return this.$refs['layout'];
    }
  }, {
    key: "onPan",
    get: function get() {
      var _this5 = this;

      var lastOffset = 0;
      var finalOffset = 0;
      var panDirection;

      var getLastOffset = function getLastOffset(isVertical) {
        if (isVertical === void 0) {
          isVertical = _this5.isTabVertical();
        }

        var offset = +("" + lastOffset).replace('%', '');

        if (("" + lastOffset).indexOf('%') >= 0) {
          offset /= 100;
          offset *= isVertical ? _this5.layout.clientHeight : _this5.layout.clientWidth;
        }

        return offset;
      };

      return {
        onPanStart: function onPanStart(status) {
          if (!_this5.swipeable || !_this5.animated) {
            return;
          }

          panDirection = getPanDirection(status.direction);
          _this5.isMoving = true;
        },
        onPanMove: function onPanMove(status) {
          var swipeable = _this5.swipeable,
              animated = _this5.animated,
              useLeftInsteadTransform = _this5.useLeftInsteadTransform;

          if (!status.moveStatus || !_this5.layout || !swipeable || !animated) {
            return;
          }

          var isVertical = _this5.isTabVertical();

          var offset = getLastOffset();

          if (isVertical) {
            offset += panDirection === 'horizontal' ? 0 : status.moveStatus.y;
          } else {
            offset += panDirection === 'vertical' ? 0 : status.moveStatus.x;
          }

          var canScrollOffset = isVertical ? -_this5.layout.scrollHeight + _this5.layout.clientHeight : -_this5.layout.scrollWidth + _this5.layout.clientWidth;
          offset = Math.min(offset, 0);
          offset = Math.max(offset, canScrollOffset);
          setPxStyle(_this5.layout, offset, 'px', isVertical, useLeftInsteadTransform);
          finalOffset = offset;
        },
        onPanEnd: function onPanEnd() {
          if (!_this5.swipeable || !_this5.animated) {
            return;
          }

          lastOffset = finalOffset;

          var isVertical = _this5.isTabVertical();

          var offsetIndex = _this5.getOffsetIndex(finalOffset, isVertical ? _this5.layout.clientHeight : _this5.layout.clientWidth);

          _this5.isMoving = false;

          if (offsetIndex === _this5.currentTab) {
            if (_this5.usePaged) {
              setTransform(_this5.layout.style, _this5.getContentPosByIndex(offsetIndex, _this5.isTabVertical(), _this5.useLeftInsteadTransform));
            }
          } else {
            _this5.goToTab(offsetIndex);
          }
        },
        setCurrentOffset: function setCurrentOffset(offset) {
          return lastOffset = offset;
        }
      };
    }
  }]);

  return Tabs;
}(Vue), _class3.DefaultTabBar = DefaultTabBar, _temp2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "card", [_dec2], {
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
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "useOnPan", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "renderTabBar", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "tabs", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "tabBarPosition", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "page", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "swipeable", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "prerenderingSiblingsNumber", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "animated", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "destroyInactiveTab", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "distanceToChangeTab", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "usePaged", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "tabDirection", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "tabBarUnderlineStyle", [_dec18], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "tabBarBackgroundColor", [_dec19], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "tabBarActiveTextColor", [_dec20], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "tabBarInactiveTextColor", [_dec21], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "tabBarTextStyle", [_dec22], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "useLeftInsteadTransform", [_dec23], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "pageChanged", [_dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "pageChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentTabChanged", [_dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "currentTabChanged"), _class2.prototype)), _class2)) || _class);
export { Tabs as default };