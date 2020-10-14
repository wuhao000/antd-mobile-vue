function getOffsetAncestors(element, rootEl) {
    let tmp = element;
    const offsetAncestors = [];
    while (tmp && tmp !== rootEl) {
        offsetAncestors.push(tmp);
        tmp = tmp.offsetParent;
    }
    return offsetAncestors;
}
function getAncestorsUtil(element, rootEl) {
    let tmp = element;
    const ancestors = [];
    while (tmp && tmp !== rootEl) {
        ancestors.push(tmp);
        tmp = tmp.parentElement;
    }
    return ancestors;
}
export const calcOffsetToAncestor = (element, rootEl) => {
    const offsetAncestors = getOffsetAncestors(element, rootEl);
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
//# sourceMappingURL=offset.js.map