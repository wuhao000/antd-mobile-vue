import {VNode} from 'vue';

enum ShapFlags {
  Comment = 0,
  Fragment = 1 << 4
}


export function isFragment(nodeElement: VNode) {
  return nodeElement.shapeFlag === ShapFlags.Fragment;
}

export const unwrapFragment = (node: VNode[]): VNode[] => {
  if (node.length === 1 && isFragment(node[0])) {
    return unwrapFragment(node[0].children as VNode[]);
  }
  return node;
};
