import {IconResProps} from '../../mixins/icon-res';
import Tab from './tab';
import getDataAttr from '../../utils/get-data-attr';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';

@Component({
  name: 'Item'
})
export default class Item extends Vue {
  @Prop({type: [String, Number]})
  public badge?: string | number;
  @Prop({type: Boolean, default: undefined})
  public selected?: boolean;
  @Prop({type: [String, Object]})
  public icon?: string | IconResProps | VNode;
  @Prop({type: [String, Object]})
  public selectedIcon?: any;
  @Prop({type: String, default: ''})
  public title: string;
  @Prop({type: Boolean})
  public dot?: boolean;
  @Prop({type: String, default: 'am-tab-bar'})
  public prefixCls?: string;
  @Inject('store')
  public store: { currentTab: string | number };
  @Inject('tabBar')
  public tabBar: any;
  public index = -1;

  get sSelected() {
    return this.selected !== undefined ? this.selected : (this.index === this.store.currentTab);
  }

  public mounted() {
    const tabs = this.$parent.$children.filter(it => it.$vnode.componentOptions.tag === this.$vnode.componentOptions.tag);
    this.index = tabs.findIndex(it => it['_uid'] === this['_uid']);
  }

  public render() {
    const {
      tintColor,
      unselectedTintColor
    } = this.tabBar;
    const icon = this.$slots.icon ? this.$slots.icon[0] : this.icon;
    const selectedIcon = this.$slots.selectedIcon ? this.$slots.selectedIcon : (this.selectedIcon || icon);
    const props = {
      ...this.$props,
      prefixCls: `${this.prefixCls}-tab`,
      tintColor,
      unselectedTintColor,
      icon,
      selectedIcon,
      selected: this.sSelected
    };
    return (
      <Tab props={props}
           onClick={(e) => {
             this.tabBar.setCurrentTab(this.index);
             this.$emit('click');
           }}
           dataAttrs={getDataAttr(this.$props)}>
        {this.$slots.default}
      </Tab>
    );
  }
}
