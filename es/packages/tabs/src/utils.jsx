export function getTransformPropValue(v) {
    return {
        transform: v,
        WebkitTransform: v,
        MozTransform: v
    };
}
export function getPxStyle(value, unit = 'px', vertical = false) {
    const v = vertical ? `0px, ${value}${unit}, 0px` : `${value}${unit}, 0px, 0px`;
    return `translate3d(${v})`;
}
export function setPxStyle(el, value, unit = 'px', vertical = false, useLeft = false) {
    if (useLeft) {
        if (vertical) {
            el.style.top = `${value}${unit}`;
        }
        else {
            el.style.left = `${value}${unit}`;
        }
    }
    else {
        setTransform(el.style, getPxStyle(value, unit, vertical));
    }
}
export function setTransform(style, v) {
    style.transform = v;
    style.webkitTransform = v;
    style.mozTransform = v;
}
//# sourceMappingURL=utils.jsx.map