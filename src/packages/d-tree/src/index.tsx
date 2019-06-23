import PureInputComponent from '../../../mixins/pure-input-component';
import Component from 'vue-class-component';

const Tree = window.antd.Tree;
@Component({
  name: 'DTree',
  inheritAttrs: false
})
export default class DTree extends PureInputComponent {

  public static TreeNode = Tree.TreeNode;
  public static DirectoryTree = Tree.DirectoryTree;
  public static install: (Vue) => void;

  public getProps(): {} {
    return {
      checkedKeys: this.stateValue
    };
  }

  public getListeners(): { [p: string]: (...args: any) => any } {
    return {
      check: (selectedKeys: any[]) => {
        this.stateValue = selectedKeys;
        this.$emit('check', selectedKeys);
      }
    };
  }

  public getInputComponent() {
    return Tree;
  }

}
