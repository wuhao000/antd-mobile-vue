export function getTransformPropValue(v) {
  return {
    transform: v,
    WebkitTransform: v,
    MozTransform: v
  };
}
export function getPxStyle(value, unit, vertical) {
  if (unit === void 0) {
    unit = 'px';
  }

  if (vertical === void 0) {
    vertical = false;
  }

  var v = vertical ? "0px, " + value + unit + ", 0px" : "" + value + unit + ", 0px, 0px";
  return "translate3d(" + v + ")";
}
export function setPxStyle(el, value, unit, vertical, useLeft) {
  if (unit === void 0) {
    unit = 'px';
  }

  if (vertical === void 0) {
    vertical = false;
  }

  if (useLeft === void 0) {
    useLeft = false;
  }

  if (useLeft) {
    if (vertical) {
      el.style.top = "" + value + unit;
    } else {
      el.style.left = "" + value + unit;
    }
  } else {
    setTransform(el.style, getPxStyle(value, unit, vertical));
  }
}
export function setTransform(style, v) {
  style.transform = v;
  style.webkitTransform = v;
  style.mozTransform = v;
}