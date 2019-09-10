import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";

var _dec, _class;

import Vue from 'vue';
import Component from 'vue-class-component';

function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

var Emitter = (_dec = Component({
  name: 'Emitter'
}), _dec(_class =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(Emitter, _Vue);

  function Emitter() {
    return _Vue.apply(this, arguments) || this;
  }

  var _proto = Emitter.prototype;

  _proto.dispatch = function dispatch(componentName, eventName, params) {
    var parent = this.$parent || this.$root;
    var name = parent.$options.name;

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;

      if (parent) {
        name = parent.$options.name;
      }
    }

    if (parent) {
      parent.$emit.apply(parent, params ? [eventName].concat(params) : [eventName]);
    }
  };

  _proto.broadcast = function broadcast(componentName, eventName, params) {
    _broadcast.call(this, componentName, eventName, params);
  };

  return Emitter;
}(Vue)) || _class);
export { Emitter as default };