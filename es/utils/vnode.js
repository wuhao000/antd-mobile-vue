import _extends from "@babel/runtime/helpers/extends";
var camelizeRE = /-(\w)/g;

var camelize = function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
};

var parseStyleText = function parseStyleText(cssText, camel) {
  if (cssText === void 0) {
    cssText = '';
  }

  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);

      if (tmp.length > 1) {
        var k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });
  return res;
};

export function isEmptyElement(c) {
  return !(c.tag || c.text && c.text.trim() !== '');
}
export function filterEmpty(children) {
  if (children === void 0) {
    children = [];
  }

  return children.filter(function (c) {
    return !isEmptyElement(c);
  });
}
export function isVNode(obj) {
  return obj.context && obj.context['_isVue'];
}
export function children(children, props) {
  return children.map(function (child) {
    return cloneElement(child, props, false);
  });
}
export function cloneVNode(vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var data = vnode.data;
  var listeners = {};

  if (componentOptions && componentOptions.listeners) {
    listeners = _extends({}, componentOptions.listeners);
  }

  var on = {};

  if (data && data.on) {
    on = _extends({}, data.on);
  }

  var cloned = new vnode.constructor(vnode.tag, data ? _extends({}, data, {
    on: on
  }) : data, vnode.children, vnode.text, vnode.elm, vnode.context, componentOptions ? _extends({}, componentOptions, {
    listeners: listeners
  }) : componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;

  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }

    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }

  return cloned;
}
export function cloneVNodes(vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);

  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }

  return res;
}
export function setListeners(vnode, listeners) {
  if (listeners === void 0) {
    listeners = {};
  }

  if (vnode.componentOptions) {
    if (!vnode.componentOptions.listeners) {
      vnode.componentOptions.listeners = {};
    }

    Object.keys(listeners).forEach(function (key) {
      var orgListener = vnode.componentOptions.listeners[key];
      var newListener = listeners[key];

      vnode.componentOptions.listeners[key] = function () {
        if (newListener) {
          newListener.apply(void 0, arguments);
        }

        if (orgListener) {
          orgListener.apply(void 0, arguments);
        }
      };
    });
  } else if (vnode.data) {
    if (!vnode.data.on) {
      vnode.data.on = {};
    }

    Object.keys(listeners).forEach(function (key) {
      var orgListener = vnode.data.on[key];
      var newListener = listeners[key];

      vnode.data.on[key] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (newListener) {
          newListener.apply(void 0, args);
        }

        if (orgListener) {
          if (typeof orgListener === 'function') {
            orgListener.apply(void 0, args);
          } else if (Array.isArray(orgListener)) {
            orgListener.forEach(function (it) {
              it.apply(void 0, args);
            });
          }
        }
      };
    });
  }
}
export function setProps(vnode, nodeProps) {
  if (nodeProps === void 0) {
    nodeProps = {};
  }

  if (vnode.componentOptions) {
    if (!vnode.componentOptions.propsData) {
      vnode.componentOptions.propsData = {};
    }

    Object.keys(nodeProps).forEach(function (key) {
      vnode.componentOptions.propsData[key] = nodeProps[key];
    });
  }
}
export function cloneElement(n, nodeProps, deep) {
  if (nodeProps === void 0) {
    nodeProps = {};
  }

  var ele = n;

  if (Array.isArray(n)) {
    ele = filterEmpty(n)[0];
  }

  if (!ele) {
    return null;
  }

  var node = cloneVNode(ele, deep);
  var _nodeProps = nodeProps,
      _nodeProps$props = _nodeProps.props,
      props = _nodeProps$props === void 0 ? {} : _nodeProps$props,
      key = _nodeProps.key,
      _nodeProps$on = _nodeProps.on,
      on = _nodeProps$on === void 0 ? {} : _nodeProps$on,
      children = _nodeProps.children,
      _nodeProps$directives = _nodeProps.directives,
      directives = _nodeProps$directives === void 0 ? [] : _nodeProps$directives;
  var data = node.data || {};
  var cls = {};
  var style = {};
  var _nodeProps2 = nodeProps,
      _nodeProps2$attrs = _nodeProps2.attrs,
      attrs = _nodeProps2$attrs === void 0 ? {} : _nodeProps2$attrs,
      ref = _nodeProps2.ref,
      _nodeProps2$domProps = _nodeProps2.domProps,
      domProps = _nodeProps2$domProps === void 0 ? {} : _nodeProps2$domProps,
      _nodeProps2$style = _nodeProps2.style,
      tempStyle = _nodeProps2$style === void 0 ? {} : _nodeProps2$style,
      _nodeProps2$class = _nodeProps2.class,
      tempCls = _nodeProps2$class === void 0 ? {} : _nodeProps2$class,
      _nodeProps2$scopedSlo = _nodeProps2.scopedSlots,
      scopedSlots = _nodeProps2$scopedSlo === void 0 ? {} : _nodeProps2$scopedSlo;

  if (typeof data.style === 'string') {
    style = parseStyleText(data.style);
  } else {
    style = _extends({}, data.style, style);
  }

  if (typeof tempStyle === 'string') {
    style = _extends({}, style, parseStyleText(tempStyle));
  } else {
    style = _extends({}, style, tempStyle);
  }

  if (typeof data.class === 'string' && data.class.trim() !== '') {
    data.class.split(' ').forEach(function (c) {
      cls[c.trim()] = true;
    });
  } else {
    cls = _extends({}, data.class, cls);
  }

  if (typeof tempCls === 'string' && tempCls.trim() !== '') {
    tempCls.split(' ').forEach(function (c) {
      cls[c.trim()] = true;
    });
  } else {
    cls = _extends({}, cls, tempCls);
  }

  node.data = _extends({}, data, {
    style: style,
    attrs: _extends({}, data.attrs, attrs),
    class: cls,
    domProps: _extends({}, data.domProps, domProps),
    scopedSlots: _extends({}, data.scopedSlots, scopedSlots),
    directives: [].concat(data.directives || [], directives)
  });

  if (node.componentOptions) {
    node.componentOptions.propsData = node.componentOptions.propsData || {};
    node.componentOptions.listeners = node.componentOptions.listeners || {};
    node.componentOptions.propsData = _extends({}, node.componentOptions.propsData, props);
    node.componentOptions.listeners = _extends({}, node.componentOptions.listeners, on);

    if (children) {
      node.componentOptions.children = children;
    }
  } else {
    node.data.on = _extends({}, node.data.on || {}, on);
  }

  if (key !== undefined) {
    node.key = key;
    node.data.key = key;
  }

  if (typeof ref === 'string') {
    node.data.ref = ref;
  }

  return node;
}
export function getNodeText(node) {
  if (node) {
    if (node.text) {
      return node.text;
    } else if (node.componentOptions && node.componentOptions.children) {
      return node.componentOptions.children.map(function (it) {
        return getNodeText(it);
      }).join('');
    }
  }

  return undefined;
}