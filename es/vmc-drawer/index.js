import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _extends from "@babel/runtime/helpers/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;

import { getPanDirection } from '../tabs/src';
import { setPxStyle } from '../tabs/src/utils';
import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

function getOffset(ele) {
  var el = ele;
  var _x = 0;
  var _y = 0;

  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }

  return {
    top: _y,
    left: _x
  };
}

var CANCEL_DISTANCE_ON_SCROLL = 20;
var Index = (_dec = Component({
  name: 'Drawer'
}), _dec2 = Prop({
  type: String,
  default: 'rmc-drawer'
}), _dec3 = Prop({
  default: function _default() {
    return {};
  }
}), _dec4 = Prop({
  default: function _default() {
    return {};
  }
}), _dec5 = Prop({
  default: function _default() {
    return {};
  }
}), _dec6 = Prop({
  default: function _default() {
    return {};
  }
}), _dec7 = Prop({}), _dec8 = Prop({
  type: Boolean,
  default: false
}), _dec9 = Prop({
  type: Boolean,
  default: false
}), _dec10 = Prop({
  type: Boolean,
  default: true
}), _dec11 = Prop({
  type: Boolean,
  default: true
}), _dec12 = Prop({
  type: Boolean,
  default: true
}), _dec13 = Prop({
  default: 'left'
}), _dec14 = Prop({
  type: Number,
  default: 30
}), _dec15 = Prop({
  default: function _default() {
    return function () {};
  }
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Index, _Vue);

  function Index() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "sidebarStyle", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "contentStyle", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "overlayStyle", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "dragHandleStyle", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "sidebar", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "docked", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "open", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "transitions", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "touch", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "enableDragHandle", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "position", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "dragToggleDistance", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onOpenChange", _descriptor14, _assertThisInitialized(_this)), _this.state = {
      // the detected width of the sidebar in pixels
      sidebarWidth: 0,
      sidebarHeight: 0,
      sidebarTop: 0,
      dragHandleTop: 0,
      // keep track of touching params
      touchIdentifier: null,
      touchStartX: null,
      touchStartY: null,
      touchCurrentX: null,
      touchCurrentY: null,
      // if touch is supported by the browser
      touchSupported: typeof window === 'object' && 'ontouchstart' in window,
      notTouch: true
    }, _this.isMoving = false, _this.startX = 0, _this.startY = 0, _this.touchOffsetX = 0, _this.touchOffsetY = 0, _this.transformOffset = 0, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Index.prototype;

  _proto.mounted = function mounted() {
    this.saveSidebarSize();
  };

  _proto.updated = function updated() {
    // filter out the updates when we're touching
    if (!this.isTouching()) {
      this.saveSidebarSize();
    }
  };

  _proto.onOverlayClicked = function onOverlayClicked() {
    var _this2 = this;

    if (this.open) {
      // see https://github.com/react-component/drawer/issues/9
      setTimeout(function () {
        _this2.$emit('open', false, {
          overlayClicked: true
        });
      }, 0);
    }
  };

  _proto.onTouchStart = function onTouchStart(ev) {
    // filter out if a user starts swiping with a second finger
    if (!this.isTouching()) {
      var touch = ev.targetTouches[0];
      this.state.touchIdentifier = this.state.notTouch ? touch.identifier : null;
      this.state.touchStartX = touch.clientX;
      this.state.touchStartY = touch.clientY;
      this.state.touchCurrentX = touch.clientX;
      this.state.touchCurrentY = touch.clientY;
    }
  };

  _proto.onTouchMove = function onTouchMove(ev) {
    // ev.preventDefault(); // cannot touchmove with FastClick
    if (this.isTouching()) {
      for (var ind = 0; ind < ev.targetTouches.length; ind++) {
        // we only care about the finger that we are tracking
        if (ev.targetTouches[ind].identifier === this.state.touchIdentifier) {
          this.state.touchCurrentX = ev.targetTouches[ind].clientX;
          this.state.touchCurrentY = ev.targetTouches[ind].clientY;
          break;
        }
      }
    }
  };

  _proto.onTouchEnd = function onTouchEnd() {
    this.state.notTouch = false;

    if (this.isTouching()) {
      // trigger a change to open if sidebar has been dragged beyond dragToggleDistance
      var touchWidth = this.touchSidebarWidth();

      if (this.open && touchWidth < this.state.sidebarWidth - this.dragToggleDistance || !this.open && touchWidth > this.dragToggleDistance) {
        this.$emit('open', !this.open);
      }

      var touchHeight = this.touchSidebarHeight();

      if (this.open && touchHeight < this.state.sidebarHeight - this.dragToggleDistance || !this.open && touchHeight > this.dragToggleDistance) {
        this.$emit('open', !this.open);
      }

      this.state.touchIdentifier = null;
      this.state.touchStartX = null;
      this.state.touchStartY = null;
      this.state.touchCurrentX = null;
      this.state.touchCurrentY = null;
    }
  };

  _proto.onScroll = function onScroll() {
    if (this.isTouching() && this.inCancelDistanceOnScroll()) {
      this.state.touchIdentifier = null;
      this.state.touchStartX = null;
      this.state.touchStartY = null;
      this.state.touchCurrentX = null;
      this.state.touchCurrentY = null;
    }
  };

  _proto.inCancelDistanceOnScroll = function inCancelDistanceOnScroll() {
    var cancelDistanceOnScroll;

    switch (this.position) {
      case 'right':
        cancelDistanceOnScroll = Math.abs(this.state.touchCurrentX - this.state.touchStartX) < CANCEL_DISTANCE_ON_SCROLL;
        break;

      case 'bottom':
        cancelDistanceOnScroll = Math.abs(this.state.touchCurrentY - this.state.touchStartY) < CANCEL_DISTANCE_ON_SCROLL;
        break;

      case 'top':
        cancelDistanceOnScroll = Math.abs(this.state.touchStartY - this.state.touchCurrentY) < CANCEL_DISTANCE_ON_SCROLL;
        break;

      case 'left':
      default:
        cancelDistanceOnScroll = Math.abs(this.state.touchStartX - this.state.touchCurrentX) < CANCEL_DISTANCE_ON_SCROLL;
    }

    return cancelDistanceOnScroll;
  };

  _proto.isTouching = function isTouching() {
    return this.state.touchIdentifier !== null;
  };

  _proto.saveSidebarSize = function saveSidebarSize() {
    var sidebar = this.$refs.sidebar;
    var width = sidebar.offsetWidth;
    var height = sidebar.offsetHeight;
    var sidebarTop = getOffset(this.$refs.sidebar).top;
    var dragHandleTop = getOffset(this.$refs.dragHandle).top;

    if (width !== this.state.sidebarWidth) {
      this.state.sidebarWidth = width;
    }

    if (height !== this.state.sidebarHeight) {
      this.state.sidebarHeight = height;
    }

    if (sidebarTop !== this.state.sidebarTop) {
      this.state.sidebarTop = sidebarTop;
    }

    if (dragHandleTop !== this.state.dragHandleTop) {
      this.state.dragHandleTop = dragHandleTop;
    }
  };

  _proto.touchSidebarWidth = function touchSidebarWidth() {
    // if the sidebar is open and start point of drag is inside the sidebar
    // we will only drag the distance they moved their finger
    // otherwise we will move the sidebar to be below the finger.
    if (this.position === 'right') {
      if (this.open && window.innerWidth - this.state.touchStartX < this.state.sidebarWidth) {
        if (this.state.touchCurrentX > this.state.touchStartX) {
          return this.state.sidebarWidth + this.state.touchStartX - this.state.touchCurrentX;
        }

        return this.state.sidebarWidth;
      }

      return Math.min(window.innerWidth - this.state.touchCurrentX, this.state.sidebarWidth);
    }

    if (this.position === 'left') {
      if (this.open && this.state.touchStartX < this.state.sidebarWidth) {
        if (this.state.touchCurrentX > this.state.touchStartX) {
          return this.state.sidebarWidth;
        }

        return this.state.sidebarWidth - this.state.touchStartX + this.state.touchCurrentX;
      }

      return Math.min(this.state.touchCurrentX, this.state.sidebarWidth);
    }
  };

  _proto.touchSidebarHeight = function touchSidebarHeight() {
    // if the sidebar is open and start point of drag is inside the sidebar
    // we will only drag the distance they moved their finger
    // otherwise we will move the sidebar to be below the finger.
    if (this.position === 'bottom') {
      if (this.open && window.innerHeight - this.state.touchStartY < this.state.sidebarHeight) {
        if (this.state.touchCurrentY > this.state.touchStartY) {
          return this.state.sidebarHeight + this.state.touchStartY - this.state.touchCurrentY;
        }

        return this.state.sidebarHeight;
      }

      return Math.min(window.innerHeight - this.state.touchCurrentY, this.state.sidebarHeight);
    }

    if (this.position === 'top') {
      var touchStartOffsetY = this.state.touchStartY - this.state.sidebarTop;

      if (this.open && touchStartOffsetY < this.state.sidebarHeight) {
        if (this.state.touchCurrentY > this.state.touchStartY) {
          return this.state.sidebarHeight;
        }

        return this.state.sidebarHeight - this.state.touchStartY + this.state.touchCurrentY;
      }

      return Math.min(this.state.touchCurrentY - this.state.dragHandleTop, this.state.sidebarHeight);
    }
  };

  _proto.renderStyle = function renderStyle(_ref) {
    var _ref$sidebarStyle = _ref.sidebarStyle,
        sidebarStyle = _ref$sidebarStyle === void 0 ? null : _ref$sidebarStyle,
        _ref$isTouching = _ref.isTouching,
        isTouching = _ref$isTouching === void 0 ? null : _ref$isTouching,
        _ref$overlayStyle = _ref.overlayStyle,
        overlayStyle = _ref$overlayStyle === void 0 ? null : _ref$overlayStyle,
        _ref$contentStyle = _ref.contentStyle,
        contentStyle = _ref$contentStyle === void 0 ? null : _ref$contentStyle;

    if (this.position === 'right' || this.position === 'left') {
      sidebarStyle.transform = "translateX(0%)";
      sidebarStyle.WebkitTransform = "translateX(0%)";

      if (isTouching) {
        var percentage = this.touchSidebarWidth() / this.state.sidebarWidth; // slide open to what we dragged

        if (this.position === 'right') {
          sidebarStyle.transform = "translateX(" + (1 - percentage) * 100 + "%)";
          sidebarStyle.WebkitTransform = "translateX(" + (1 - percentage) * 100 + "%)";
        }

        if (this.position === 'left') {
          sidebarStyle.transform = "translateX(-" + (1 - percentage) * 100 + "%)";
          sidebarStyle.WebkitTransform = "translateX(-" + (1 - percentage) * 100 + "%)";
        } // fade overlay to match distance of drag


        overlayStyle.opacity = percentage;
        overlayStyle.visibility = 'visible';
      }

      if (contentStyle) {
        contentStyle[this.position] = this.state.sidebarWidth + "px";
      }
    }

    if (this.position === 'top' || this.position === 'bottom') {
      sidebarStyle.transform = "translateY(0%)";
      sidebarStyle.WebkitTransform = "translateY(0%)";

      if (isTouching) {
        var _percentage = this.touchSidebarHeight() / this.state.sidebarHeight; // slide open to what we dragged


        if (this.position === 'bottom') {
          sidebarStyle.transform = "translateY(" + (1 - _percentage) * 100 + "%)";
          sidebarStyle.WebkitTransform = "translateY(" + (1 - _percentage) * 100 + "%)";
        }

        if (this.position === 'top') {
          sidebarStyle.transform = "translateY(-" + (1 - _percentage) * 100 + "%)";
          sidebarStyle.WebkitTransform = "translateY(-" + (1 - _percentage) * 100 + "%)";
        } // fade overlay to match distance of drag


        overlayStyle.opacity = _percentage;
        overlayStyle.visibility = 'visible';
      }

      if (contentStyle) {
        contentStyle[this.position] = this.state.sidebarHeight + "px";
      }
    }
  };

  _proto.render = function render() {
    var _rootCls,
        _this3 = this;

    var h = arguments[0];
    var prefixCls = this.prefixCls,
        position = this.position,
        transitions = this.transitions,
        touch = this.touch,
        enableDragHandle = this.enableDragHandle,
        sidebar = this.sidebar,
        docked = this.docked,
        open = this.open;

    var sidebarStyle = _extends({}, this.sidebarStyle);

    var contentStyle = _extends({}, this.contentStyle);

    var overlayStyle = _extends({}, this.overlayStyle);

    var rootCls = (_rootCls = {}, _rootCls[prefixCls] = true, _rootCls[prefixCls + "-" + position] = true, _rootCls);
    var rootProps = {};
    var isTouching = this.isTouching();

    if (isTouching) {
      this.renderStyle({
        sidebarStyle: sidebarStyle,
        isTouching: true,
        overlayStyle: overlayStyle
      });
    } else if (this.docked) {
      if (this.open) {
        rootCls[prefixCls + "-docked"] = true;
        this.renderStyle({
          sidebarStyle: sidebarStyle,
          contentStyle: contentStyle
        });
      }
    } else if (open && !docked) {
      rootCls[prefixCls + "-open"] = true;
      this.renderStyle({
        sidebarStyle: sidebarStyle
      });
      overlayStyle.opacity = 1;
      overlayStyle.visibility = 'visible';
    }

    if (isTouching || !transitions) {
      sidebarStyle.transition = undefined;
      sidebarStyle.webkitTransition = undefined;
      contentStyle.transition = undefined;
      overlayStyle.transition = undefined;
    }

    var dragHandle = null;

    if (this.state.touchSupported && touch) {
      if (open) {
        rootProps.touchstart = function (ev) {
          _this3.state.notTouch = true;

          _this3.onTouchStart(ev);
        };

        rootProps.touchmove = this.onTouchMove;
        rootProps.touchend = this.onTouchEnd;
        rootProps.touchcancel = this.onTouchEnd;
        rootProps.scroll = this.onScroll;
      } else if (enableDragHandle) {
        dragHandle = h("div", {
          "class": prefixCls + "-draghandle",
          "style": this.dragHandleStyle,
          "on": {
            "touchStart": this.onTouchStart.bind(this),
            "touchMove": this.onTouchMove.bind(this),
            "touchEnd": this.onTouchEnd.bind(this),
            "touchCancel": this.onTouchEnd.bind(this)
          },
          "ref": "dragHandle"
        });
      }
    }

    return h("div", _mergeJSXProps([{
      "class": classNames(rootCls)
    }, {
      "on": rootProps
    }]), [h("div", {
      "class": prefixCls + "-sidebar",
      "style": sidebarStyle,
      "ref": "sidebar"
    }, [sidebar]), h("div", {
      "class": prefixCls + "-overlay",
      "style": overlayStyle,
      "attrs": {
        "role": "presentation"
      },
      "ref": "overlay",
      "on": {
        "click": this.onOverlayClicked.bind(this)
      }
    }), h("div", {
      "class": prefixCls + "-content",
      "style": contentStyle,
      "ref": "content"
    }, [dragHandle, this.$slots.default])]);
  };

  _createClass(Index, [{
    key: "contentRef",
    get: function get() {
      return this.$refs.content;
    }
  }, {
    key: "overlayRef",
    get: function get() {
      return this.$refs.overlay;
    }
  }, {
    key: "onPan",
    get: function get() {
      var _this4 = this;

      var lastOffset = 0;
      var finalOffset = 0;
      var panDirection;

      var getLastOffset = function getLastOffset() {
        var offset = +("" + lastOffset).replace('%', '');

        if (("" + lastOffset).indexOf('%') >= 0) {
          offset /= 100;
          offset *= _this4.overlayRef.clientWidth;
        }

        return offset;
      };

      return {
        onPanStart: function onPanStart(status) {
          panDirection = getPanDirection(status.direction);
          _this4.isMoving = true;
        },
        onPanMove: function onPanMove(status) {
          if (!status.moveStatus) {
            return;
          }

          var offset = getLastOffset();
          offset += panDirection === 'vertical' ? 0 : status.moveStatus.x;
          var canScrollOffset = -_this4.overlayRef.scrollWidth + _this4.overlayRef.clientWidth;
          offset = Math.min(offset, 0);
          offset = Math.max(offset, canScrollOffset);
          setPxStyle(_this4.overlayRef, offset, 'px', false, false);
          finalOffset = offset;
        },
        onPanEnd: function onPanEnd() {
          lastOffset = finalOffset; // const offsetIndex = this.getOffsetIndex(finalOffset, this.overlayRef.clientWidth);

          _this4.isMoving = false;
        },
        setCurrentOffset: function setCurrentOffset(offset) {
          return lastOffset = offset;
        }
      };
    }
  }]);

  return Index;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "sidebarStyle", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "contentStyle", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "overlayStyle", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "dragHandleStyle", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "sidebar", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "docked", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "open", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "transitions", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "touch", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "enableDragHandle", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "position", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "dragToggleDistance", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "onOpenChange", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Index as default };