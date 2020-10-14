var ShapFlags;
(function (ShapFlags) {
    ShapFlags[ShapFlags["Comment"] = 0] = "Comment";
    ShapFlags[ShapFlags["Fragment"] = 16] = "Fragment";
})(ShapFlags || (ShapFlags = {}));
export function isFragment(nodeElement) {
    return nodeElement.shapeFlag === ShapFlags.Fragment;
}
export const unwrapFragment = (node) => {
    if (node.length === 1 && isFragment(node[0])) {
        return unwrapFragment(node[0].children);
    }
    return node;
};
//# sourceMappingURL=vue.js.map