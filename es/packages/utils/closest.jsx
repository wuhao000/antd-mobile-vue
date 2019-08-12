export default function closest(el, selector) {
    const matchesSelector = el.matches ||
        el.webkitMatchesSelector ||
        el.mozMatchesSelector ||
        el.msMatchesSelector;
    let p = el;
    while (p) {
        if (matchesSelector.call(p, selector)) {
            return p;
        }
        p = p.parentElement;
    }
    return null;
}
//# sourceMappingURL=closest.jsx.map