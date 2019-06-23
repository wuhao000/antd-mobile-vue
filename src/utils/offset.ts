function getOffsetAncestors(element: HTMLElement, rootEl: HTMLElement) {
  let tmp: HTMLElement = element;
  const offsetAncestors: HTMLElement[] = [];
  while (tmp && tmp !== rootEl) {
    offsetAncestors.push(tmp);
    tmp = tmp.offsetParent as HTMLElement;
  }
  return offsetAncestors;
}

function getAncestorsUtil(element: HTMLElement,
                          rootEl: HTMLElement) {
  let tmp: HTMLElement = element;
  const ancestors: HTMLElement[] = [];
  while (tmp && tmp !== rootEl) {
    ancestors.push(tmp);
    tmp = tmp.parentElement as HTMLElement;
  }
  return ancestors;
}

export const calcOffsetToAncestor = (element: HTMLElement,
                                     rootEl: HTMLElement): {
  left: number,
  top: number
} => {
  const offsetAncestors: HTMLElement[] = getOffsetAncestors(element, rootEl);
  const ancestors = getAncestorsUtil(element, rootEl);
  const scrollTop = ancestors.map(it => it.scrollTop).reduce((a, b) => a + b);
  const scrollLeft = ancestors.map(it => it.scrollLeft).reduce((a, b) => a + b);
  const left = offsetAncestors.map(item => item.offsetLeft).reduce((a, b) => a + b)
      - scrollLeft;
  const top = offsetAncestors.map(item => item.offsetTop).reduce((a, b) => a + b)
      - scrollTop;
  return {
    left, top
  };
};
