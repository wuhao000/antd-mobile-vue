import Component from 'vue-class-component';
import BaseFormComponent from '../../../mixins/base-input-component';

const Menu = window.antd.Menu;

@Component({
  name: 'DMenu',
  inheritAttrs: false
})
export default class DMenu extends BaseFormComponent {

  public static Item = Menu.Item;
  public static SubMenu = Menu.SubMenu;
  public static Divider = Menu.Divider;
  public static ItemGroup = Menu.ItemGroup;
  public static install: (Vue) => void;

  public getInputComponent() {
    return Menu;
  }

}
