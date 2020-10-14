import {cloneVNode, Slot, VNode} from 'vue';

const camelizeRE = /-(\w)/g;
const camelize = str => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
};
const parseStyleText = (cssText = '', camel?) => {
  const res = {};
  const listDelimiter = /;(?![^(]*\))/g;
  const propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiter);
      if (tmp.length > 1) {
        const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });
  return res;
};

export function isEmptyElement(node: VNode) {
  return node.shapeFlag === 0;
}

export function filterEmpty(children = []) {
  return children.filter(c => !isEmptyElement(c));
}

export function isEmptySlot(slot: Slot): boolean {
  if (!slot) {
    return true;
  }
  return slot().filter(it => !isEmptyElement(it)).length === 0;
}

export function cloneVNodes(vnodes, deep?) {
  const len = vnodes.length;
  const res = new Array(len);
  for (let i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res;
}

export function setListeners(vnode: VNode, listeners: any = {}) {
  if (!vnode.props) {
    vnode.props = {};
  }
  Object.keys(listeners).forEach(key => {
    const orgListener = vnode.props[key];
    const newListener = listeners[key];
    vnode.props[key] = (...args) => {
      if (newListener) {
        newListener(...args);
      }
      if (orgListener) {
        orgListener(...args);
      }
    };
  });
}

export function setProps(vnode: VNode, nodeProps: any = {}) {
  if (vnode.props) {
    Object.keys(nodeProps).forEach(key => {
      vnode.props[key] = nodeProps[key];
    });
  }
}

export function getNodeText(node: VNode): string | undefined {
  if (node) {

    if (typeof node.children === 'string') {
      return node.children;
    } else if (Array.isArray(node.children)) {
      return node.children.map(it => getNodeText(it as VNode)).join('');
    } else if (typeof node.children === 'object') {
      const defaultSlot = node.children.default as any;
      if (node.children.default) {
        return defaultSlot().map(it => getNodeText(it)).join('');
      } else {
        return '';
      }
    }
  }
  return undefined;
}
