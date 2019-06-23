/**
 * 这个文件来自vant
 *
 * @author wuhao
 * @since 2019/04/21
 */

type ScrollElement = HTMLElement | Window;

// get nearest scroll element
// http://w3help.org/zh-cn/causes/SD9013
// http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
export function getScrollEventTarget(element: HTMLElement, rootParent: ScrollElement = window) {
  let node: any = element;
  while (
      node &&
      node.tagName !== 'HTML' &&
      node.tagName !== 'BODY' &&
      node.nodeType === 1 &&
      node !== rootParent
      ) {
    const {overflowY} = window.getComputedStyle(node);
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return node;
    }
    node = (node as HTMLElement).parentNode;
  }
  return rootParent;
}

export function getScrollTop(element: ScrollElement): number {
  return 'scrollTop' in element ? element.scrollTop : element.pageYOffset;
}

export function setScrollTop(element: ScrollElement, value: number) {
  'scrollTop' in element ? (element.scrollTop = value) : element.scrollTo(element.scrollX, value);
}

// get distance from element top to page top
export function getElementTop(element: ScrollElement) {
  return (
      (element === window ? 0 : (element as HTMLElement).getBoundingClientRect().top) +
      getScrollTop(window)
  );
}

export function getVisibleHeight(element: ScrollElement) {
  return element === window
      ? element.innerHeight
      : (element as HTMLElement).getBoundingClientRect().height;
}
