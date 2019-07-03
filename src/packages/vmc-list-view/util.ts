export function getOffsetTop(elem) {
  let offsetTop = 0;
  /* eslint no-cond-assign: 0 */
  do {
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop;
    }
  } while (elem = elem.offsetParent);
  return offsetTop;
}

export function _event(e) {
  if (e.touches && e.touches.length) {
    return e.touches[0];
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0];
  }
  return e;
}

export function throttle(fn, delay) {
  let delayFlag = true;
  let firstInvoke = true;
  // console.log('exec once');
  return function _throttle(e) {
    if (delayFlag) {
      delayFlag = false;
      setTimeout(() => {
        delayFlag = true;
        // console.log('exec delay time');
        fn(e);
      }, delay);
      if (firstInvoke) {
        // console.log('first invoke');
        fn(e);
        firstInvoke = false;
      }
    }
  };
}

export function setTransform(nodeStyle, value) {
  nodeStyle.transform = value;
  nodeStyle.webkitTransform = value;
  nodeStyle.MozTransform = value;
}

export function setTransformOrigin(nodeStyle, value) {
  nodeStyle.transformOrigin = value;
  nodeStyle.webkitTransformOrigin = value;
  nodeStyle.MozTransformOrigin = value;
}
