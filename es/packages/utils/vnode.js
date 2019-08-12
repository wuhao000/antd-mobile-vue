const camelizeRE = /-(\w)/g;
const camelize = str => {
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
};
const parseStyleText = (cssText = '', camel) => {
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
export function isEmptyElement(c) {
    return !(c.tag || (c.text && c.text.trim() !== ''));
}
export function filterEmpty(children = []) {
    return children.filter(c => !isEmptyElement(c));
}
export function isVNode(obj) {
    return obj.context && obj.context['_isVue'];
}
export function children(children, props) {
    return children.map(child => cloneElement(child, props, false));
}
export function cloneVNode(vnode, deep) {
    const componentOptions = vnode.componentOptions;
    const data = vnode.data;
    let listeners = {};
    if (componentOptions && componentOptions.listeners) {
        listeners = Object.assign({}, componentOptions.listeners);
    }
    let on = {};
    if (data && data.on) {
        on = Object.assign({}, data.on);
    }
    const cloned = new vnode.constructor(vnode.tag, data ? Object.assign({}, data, { on }) : data, vnode.children, vnode.text, vnode.elm, vnode.context, componentOptions ? Object.assign({}, componentOptions, { listeners }) : componentOptions, vnode.asyncFactory);
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
    const len = vnodes.length;
    const res = new Array(len);
    for (let i = 0; i < len; i++) {
        res[i] = cloneVNode(vnodes[i], deep);
    }
    return res;
}
export function setListeners(vnode, listeners = {}) {
    if (vnode.componentOptions) {
        if (!vnode.componentOptions.listeners) {
            vnode.componentOptions.listeners = {};
        }
        Object.keys(listeners).forEach(key => {
            vnode.componentOptions.listeners[key] = listeners[key];
        });
    }
}
export function setProps(vnode, nodeProps = {}) {
    if (vnode.componentOptions) {
        if (!vnode.componentOptions.propsData) {
            vnode.componentOptions.propsData = {};
        }
        Object.keys(nodeProps).forEach(key => {
            vnode.componentOptions.propsData[key] = nodeProps[key];
        });
    }
}
export function cloneElement(n, nodeProps = {}, deep) {
    let ele = n;
    if (Array.isArray(n)) {
        ele = filterEmpty(n)[0];
    }
    if (!ele) {
        return null;
    }
    const node = cloneVNode(ele, deep);
    const { props = {}, key, on = {}, children, directives = [] } = nodeProps;
    const data = node.data || {};
    let cls = {};
    let style = {};
    const { attrs = {}, ref, domProps = {}, style: tempStyle = {}, class: tempCls = {}, scopedSlots = {} } = nodeProps;
    if (typeof data.style === 'string') {
        style = parseStyleText(data.style);
    }
    else {
        style = Object.assign({}, data.style, style);
    }
    if (typeof tempStyle === 'string') {
        style = Object.assign({}, style, parseStyleText(tempStyle));
    }
    else {
        style = Object.assign({}, style, tempStyle);
    }
    if (typeof data.class === 'string' && data.class.trim() !== '') {
        data.class.split(' ').forEach(c => {
            cls[c.trim()] = true;
        });
    }
    else {
        cls = Object.assign({}, data.class, cls);
    }
    if (typeof tempCls === 'string' && tempCls.trim() !== '') {
        tempCls.split(' ').forEach(c => {
            cls[c.trim()] = true;
        });
    }
    else {
        cls = Object.assign({}, cls, tempCls);
    }
    node.data = Object.assign({}, data, {
        style,
        attrs: Object.assign({}, data.attrs, attrs),
        class: cls,
        domProps: Object.assign({}, data.domProps, domProps),
        scopedSlots: Object.assign({}, data.scopedSlots, scopedSlots),
        directives: [...(data.directives || []), ...directives]
    });
    if (node.componentOptions) {
        node.componentOptions.propsData = node.componentOptions.propsData || {};
        node.componentOptions.listeners = node.componentOptions.listeners || {};
        node.componentOptions.propsData = Object.assign({}, node.componentOptions.propsData, props);
        node.componentOptions.listeners = Object.assign({}, node.componentOptions.listeners, on);
        if (children) {
            node.componentOptions.children = children;
        }
    }
    else {
        node.data.on = Object.assign({}, (node.data.on || {}), on);
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
        }
        else if (node.componentOptions && node.componentOptions.children) {
            return node.componentOptions.children.map(it => getNodeText(it)).join('');
        }
    }
    return undefined;
}
//# sourceMappingURL=vnode.js.map