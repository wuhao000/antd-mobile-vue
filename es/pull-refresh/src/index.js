import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Icon from '../../icon';
import { getScrollEventTarget, getScrollTop } from './util';

function setTransform(nodeStyle, value) {
  nodeStyle.transform = value;
  nodeStyle.webkitTransform = value;
  nodeStyle.MozTransform = value;
}

var isWebView = typeof navigator !== 'undefined' && /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
var DOWN = 'down';
var UP = 'up';
var INDICATOR = {
  activate: 'release',
  deactivate: 'pull',
  release: 'loading',
  finish: 'finish'
};
var supportsPassive = false;

try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('test', null, opts);
} catch (e) {// empty
}

var willPreventDefault = supportsPassive ? {
  passive: false
} : false; // const willNotPreventDefault = supportsPassive ? { passive: true } : false;

var PullToRefresh = (_dec = Component({
  name: 'PullToRefresh'
}), _dec2 = Prop({
  type: String,
  default: '松开刷新'
}), _dec3 = Prop({
  type: String,
  default: '取消刷新'
}), _dec4 = Prop({
  type: String,
  default: '刷新完成'
}), _dec5 = Prop({
  default: function _default() {
    return function () {
      return undefined;
    };
  }
}), _dec6 = Prop({
  type: String,
  default: DOWN
}), _dec7 = Prop(), _dec8 = Prop({
  type: Number,
  default: 35
}), _dec9 = Prop({
  type: String,
  default: 'am-pull-to-refresh'
}), _dec10 = Prop({
  type: Number,
  default: 80
}), _dec11 = Prop({
  type: Number,
  default: 40
}), _dec12 = Prop(), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(PullToRefresh, _Vue);

  function PullToRefresh() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "activateText", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "deactivateText", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "finishText", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "getScrollContainer", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "direction", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "distanceToRefresh", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prefixCls", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "damping", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "indicatorHeight", _descriptor10, _assertThisInitialized(_this)), _this.currSt = 'deactivate', _this.dragOnEdge = false, _this._isMounted = false, _initializerDefineProperty(_this, "className", _descriptor11, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = PullToRefresh.prototype;

  _proto.updated = function updated() {
    if (!this.value) {
      // triggerPullToRefresh 需要尽可能减少 setState 次数
      this.triggerPullToRefresh();
    }
  };

  _proto.mounted = function mounted() {
    var _this2 = this;

    this.scrollEl = getScrollEventTarget(this.$el); // `getScrollContainer` most likely return React.Node at the next tick. Need setTimeout

    setTimeout(function () {
      _this2.init(_this2.getScrollContainer() || _this2.containerRef);

      _this2.triggerPullToRefresh();

      _this2._isMounted = true;
    });
  };

  _proto.beforeDestroy = function beforeDestroy() {
    // Should have no setTimeout here!
    this.destroy(this.getScrollContainer() || this.containerRef);
  };

  _proto.triggerPullToRefresh = function triggerPullToRefresh() {
    // 在初始化时、用代码 自动 触发 pullToRefresh
    // 注意：当 direction 为 up 时，当 visible length < content length 时、则看不到效果
    // 添加this._isMounted的判断，否则组建一实例化，currSt就会是finish
    if (!this.dragOnEdge && this._isMounted) {
      if (this.value) {
        if (this.direction === UP) {
          this._lastScreenY = -this.distanceToRefresh - 1;
        }

        if (this.direction === DOWN) {
          this._lastScreenY = this.distanceToRefresh + 1;
        } // change dom need after setState


        this.currSt = 'release';
        this.setContentStyle(this._lastScreenY);
      } else {
        this.currSt = 'finish';
        this.reset();
      }
    }
  };

  _proto.init = function init(ele) {
    var _this3 = this;

    if (!ele) {
      // like return in destroy fn ???!!
      return;
    }

    this._to = {
      touchstart: this.onTouchStart.bind(this).bind(this, ele),
      touchmove: this.onTouchMove.bind(this).bind(this, ele),
      touchend: this.onTouchEnd.bind(this).bind(this, ele),
      touchcancel: this.onTouchEnd.bind(this).bind(this, ele)
    };
    Object.keys(this._to).forEach(function (key) {
      ele.addEventListener(key, _this3._to[key], willPreventDefault);
    });
  };

  _proto.destroy = function destroy(ele) {
    var _this4 = this;

    if (!this._to || !ele) {
      // componentWillUnmount fire before componentDidMount, like forceUpdate ???!!
      return;
    }

    Object.keys(this._to).forEach(function (key) {
      ele.removeEventListener(key, _this4._to[key]);
    });
  };

  _proto.onTouchStart = function onTouchStart(_ele, e) {
    this._ScreenY = this._startScreenY = e.touches[0].screenY; // 一开始 value 为 true 时 this._lastScreenY 有值

    this._lastScreenY = this._lastScreenY || 0;
  };

  _proto.isEdge = function isEdge() {
    var direction = this.direction;
    var container = this.getScrollContainer() || this.containerRef;

    if (container && container === document.body) {
      // In chrome61 `document.body.scrollTop` is invalid
      var scrollNode = document.scrollingElement ? document.scrollingElement : document.body;

      if (direction === UP) {
        return scrollNode.scrollHeight - scrollNode.scrollTop <= window.innerHeight;
      }

      if (direction === DOWN) {
        return scrollNode.scrollTop <= 0;
      }
    }

    var scrollTop = getScrollTop(this.scrollEl);

    if (direction === UP) {
      return this.scrollEl.scrollHeight - scrollTop === this.scrollEl.clientHeight;
    }

    if (direction === DOWN) {
      return scrollTop <= 0;
    }

    return undefined;
  };

  _proto.dampingFunc = function dampingFunc(dy) {
    if (Math.abs(this._lastScreenY) > this.damping) {
      return 0;
    }

    var ratio = Math.abs(this._ScreenY - this._startScreenY) / window.screen.height;
    return dy * (1 - ratio) * 0.6;
  };

  _proto.onTouchMove = function onTouchMove(ele, e) {
    // 使用 pageY 对比有问题
    var _screenY = e.touches[0].screenY; // 拖动方向不符合的不处理

    if (this.direction === UP && this._startScreenY < _screenY || this.direction === DOWN && this._startScreenY > _screenY) {
      return;
    }

    if (this.isEdge()) {
      if (!this.dragOnEdge) {
        // 当用户开始往上滑的时候isEdge还是false的话，会导致this._ScreenY不是想要的，只有当isEdge为true时，再上滑，才有意义
        // 下面这行代码解决了上面这个问题
        this._ScreenY = this._startScreenY = e.touches[0].screenY;
        this.dragOnEdge = true;
      }

      e.preventDefault(); // add stopPropagation with fastclick will trigger content onClick event. why?
      // ref https://github.com/ant-design/ant-design-mobile/issues/2141
      // e.stopPropagation();

      var _diff = Math.round(_screenY - this._ScreenY);

      this._ScreenY = _screenY;
      this._lastScreenY += this.dampingFunc(_diff);
      this.setContentStyle(this._lastScreenY);

      if (Math.abs(this._lastScreenY) < this.distanceToRefresh) {
        if (this.currSt !== 'deactivate') {
          this.currSt = 'deactivate';
        }
      } else {
        if (this.currSt === 'deactivate') {
          this.currSt = 'activate';
        }
      } // https://github.com/ant-design/ant-design-mobile/issues/573#issuecomment-339560829
      // iOS UIWebView issue, It seems no problem in WKWebView


      if (isWebView && e.changedTouches[0].clientY < 0) {
        this.onTouchEnd();
      }
    }
  };

  _proto.onTouchEnd = function onTouchEnd() {
    var _this5 = this;

    if (this.dragOnEdge) {
      this.dragOnEdge = false;
    }

    if (this.currSt === 'activate') {
      this.currSt = 'release';
      this._timer = setTimeout(function () {
        if (!_this5.value) {
          _this5.currSt = 'finish';

          _this5.reset();
        }

        _this5._timer = undefined;
      }, 1000);
      this.setContentStyle(this.indicatorHeight);
      this.$emit('refresh');
      this.$emit('input', true);
    } else {
      this.reset();
    }
  };

  _proto.reset = function reset() {
    this._lastScreenY = 0;
    this.setContentStyle(0);
  };

  _proto.setContentStyle = function setContentStyle(ty) {
    // todos: Why sometimes do not have `this.contentRef` ?
    if (this.contentRef) {
      setTransform(this.contentRef.style, "translate3d(0px," + ty + "px,0)");
    }
  };

  _proto.render = function render() {
    var _this6 = this;

    var h = arguments[0];

    var prefixCls = this.prefixCls,
        getScrollContainer = this.getScrollContainer,
        direction = this.direction,
        value = this.value,
        indicator = this.indicator,
        distanceToRefresh = this.distanceToRefresh,
        restProps = _objectWithoutPropertiesLoose(this, ["prefixCls", "getScrollContainer", "direction", "value", "indicator", "distanceToRefresh"]);

    var renderChildren = h("div", [this.$slots.default]);

    var renderRefresh = function renderRefresh(cls) {
      var cla = classNames(cls, !_this6.dragOnEdge && prefixCls + "-transition");
      return h("div", {
        "class": prefixCls + "-content-wrapper"
      }, [h("div", {
        "class": cla,
        "ref": 'content'
      }, [direction === UP ? renderChildren : null, h("div", {
        "class": prefixCls + "-indicator"
      }, [indicator[_this6.currSt] || INDICATOR[_this6.currSt]]), direction === DOWN ? renderChildren : null])]);
    };

    if (getScrollContainer()) {
      return renderRefresh(prefixCls + "-content " + prefixCls + "-" + direction);
    }

    return h("div", _mergeJSXProps([{
      "ref": 'container',
      "class": classNames(this.className, prefixCls, prefixCls + "-" + direction)
    }, restProps]), [renderRefresh(prefixCls + "-content")]);
  };

  _createClass(PullToRefresh, [{
    key: "containerRef",
    get: function get() {
      return this.$refs['container'];
    }
  }, {
    key: "contentRef",
    get: function get() {
      return this.$refs['content'];
    }
  }, {
    key: "indicator",
    get: function get() {
      var h = this.$createElement;
      return {
        activate: this.activateText,
        deactivate: this.deactivateText,
        release: h(Icon, {
          "attrs": {
            "type": 'loading'
          }
        }),
        finish: this.finishText
      };
    }
  }]);

  return PullToRefresh;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "activateText", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "deactivateText", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "finishText", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "getScrollContainer", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "direction", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "distanceToRefresh", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "damping", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "indicatorHeight", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "className", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { PullToRefresh as default };