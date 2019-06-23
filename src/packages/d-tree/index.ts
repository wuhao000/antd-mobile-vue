import DTree from './src';

DTree.install = Vue => {
  Vue.component('DTree', DTree);
  Vue.component('DTreeNode', DTree.TreeNode);
  Vue.component('DDirectoryTree', DTree.DirectoryTree);
};

export default DTree;
