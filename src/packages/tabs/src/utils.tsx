export function getTransformPropValue(v: any) {
  return {
    transform: v,
    WebkitTransform: v,
    MozTransform: v
  };
}

export function getPxStyle(value: number | string, unit = 'px', vertical: boolean = false) {
  const v = vertical ? `0px, ${value}${unit}, 0px` : `${value}${unit}, 0px, 0px`;
  return `translate3d(${v})`;
}

export function setPxStyle(el: HTMLElement, value: number | string, unit = 'px', vertical: boolean = false, useLeft = false) {
  if (useLeft) {
    if (vertical) {
      el.style.top = `${value}${unit}`;
    } else {
      el.style.left = `${value}${unit}`;
    }
  } else {
    setTransform(el.style, getPxStyle(value, unit, vertical));
  }
}

export function setTransform(style: any, v: any) {
  style.transform = v;
  style.webkitTransform = v;
  style.mozTransform = v;
}
