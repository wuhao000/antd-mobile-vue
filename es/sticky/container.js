import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor;

import raf from 'raf';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Provide } from 'vue-property-decorator';
var Container = (_dec = Component({
  name: 'Container'
}), _dec2 = Provide('stickyContext'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Container, _Vue);

  function Container() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _this.framePending = false, _initializerDefineProperty(_this, "context", _descriptor, _assertThisInitialized(_this)), _this.events = ['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'], _this.subscribers = [], _this.rafHandle = null, _temp) || _assertThisInitialized(_this);
  }

  var _proto = Container.prototype;

  _proto.subscribe = function subscribe(handler) {
    this.subscribers = this.subscribers.concat(handler);
  };

  _proto.unsubscribe = function unsubscribe(handler) {
    this.subscribers = this.subscribers.filter(function (current) {
      return current !== handler;
    });
  };

  _proto.notifySubscribers = function notifySubscribers(evt) {
    var _this2 = this;

    if (!this.framePending) {
      var currentTarget = evt.currentTarget;
      this.rafHandle = raf(function () {
        _this2.framePending = false;

        var _this2$node$getBoundi = _this2.node.getBoundingClientRect(),
            top = _this2$node$getBoundi.top,
            bottom = _this2$node$getBoundi.bottom;

        _this2.subscribers.forEach(function (handler) {
          return handler({
            distanceFromTop: top,
            distanceFromBottom: bottom,
            eventSource: currentTarget === window ? document.body : _this2.node
          });
        });
      });
      this.framePending = true;
    }
  };

  _proto.getParent = function getParent() {
    return this.node;
  };

  _proto.mounted = function mounted() {
    var _this3 = this;

    this.events.forEach(function (event) {
      window.addEventListener(event, _this3.notifySubscribers);
      document.body.addEventListener(event, _this3.notifySubscribers);
    });
  };

  _proto.beforeDestroy = function beforeDestroy() {
    var _this4 = this;

    if (this.rafHandle) {
      raf.cancel(this.rafHandle);
      this.rafHandle = null;
    }

    this.events.forEach(function (event) {
      window.removeEventListener(event, _this4.notifySubscribers);
      document.body.removeEventListener(event, _this4.notifySubscribers);
    });
  };

  _proto.render = function render() {
    var h = arguments[0];
    return h("div", _mergeJSXProps([{}, this.$props, {
      "ref": "node"
    }, {
      "on": {
        scroll: this.notifySubscribers
      }
    }, {
      "on": {
        "touchStart": this.notifySubscribers,
        "touchMove": this.notifySubscribers,
        "touchEnd": this.notifySubscribers
      }
    }]), [this.$slots.default]);
  };

  _createClass(Container, [{
    key: "node",
    get: function get() {
      return this.$refs.node;
    }
  }]);

  return Container;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "context", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
      getParent: this.getParent
    };
  }
})), _class2)) || _class);
export { Container as default };