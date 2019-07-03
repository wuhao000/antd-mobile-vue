import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop, Provide, Watch} from 'vue-property-decorator';
import {IconResProps} from '../../../mixins/icon-res';
import Tabs from '../../tabs';
import getDataAttr from '../../utils/get-data-attr';
import Tab from './tab';

@Component({
  name: 'Item'
})
export class Item extends Vue {
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
    const Tab2 = Tab as any;
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
      <Tab2
        props={props}
        on={
          {
            click: () => {
              this.tabBar.setCurrentTab(this.index);
              this.$emit('click');
            }
          }
        }
        dataAttrs={getDataAttr(this.$props)}>
        {this.$slots.default}
      </Tab2>
    );
  }
}


@Component({
  name: 'MTabBar'
})
class TabBar extends Vue {
  @Prop({default: 'am-tab-bar'})
  public prefixCls?: string;
  @Prop()
  public className?: string;
  @Prop({type: Boolean, default: false})
  public hidden?: boolean;
  @Prop({type: String, default: '正在加载'})
  public placeholder?: string;
  @Prop()
  public noRenderContent?: boolean;
  @Prop({type: Number, default: 1})
  public prerenderingSiblingsNumber?: number;
  @Prop({type: String, default: 'white'})
  public barTintColor?: string;
  @Prop({type: String, default: '#108ee9'})
  public tintColor?: string;
  @Prop({type: String, default: '#888'})
  public unselectedTintColor?: string;
  @Prop({type: String, default: 'bottom'})
  public tabBarPosition?: 'top' | 'bottom';
  @Prop({type: Boolean, default: false})
  public animated?: boolean;
  @Prop({type: Boolean, default: false})
  public swipeable?: boolean;
  public static Item = Item;
  @Provide('tabBar')
  public tabBar = this;
  @Provide('store')
  public store: { currentTab: string | number } = {
    currentTab: -10000
  };
  @Prop({type: [Number, String]})
  public value: string | number;
  private content: any[] = [];

  @Watch('value')
  public valueChanged(value: number | string) {
    this.store.currentTab = value;
  }

  public setCurrentTab(tab: number | string) {
    this.store.currentTab = tab;
  }

  @Watch('store.currentTab')
  public currentTabChanged(value: number | string) {
    this.$emit('input', value);
  }

  private renderTabBar() {
    let cls = `${this.prefixCls}-bar`;
    if (this.hidden) {
      cls += ` ${this.prefixCls}-bar-hidden-${this.tabBarPosition}`;
    }
    return <div class={cls} style={{backgroundColor: this.barTintColor}}>
      {this.$slots.default}
    </div>;
  }

  public getTabs() {
    return this.$slots.default.map((c: VNode, index: number) => {
      const props = Object.assign({}, c.componentOptions.propsData as any);
      if (props.icon && !props.selectedIcon) {
        props.selectedIcon = props.icon;
      }
      return {
        props,
        onClick: () => {
          this.store.currentTab = index;
        }
      };
    });
  }

  public mounted() {
    if (this.$slots.default) {
      this.content = this.$slots.default.filter(it => it.context).map(it =>
        it.componentInstance.$slots.default || it.componentInstance.$slots.content || ''
      );
    }
  }

  public render() {
    const {
      prefixCls,
      animated,
      swipeable,
      noRenderContent,
      prerenderingSiblingsNumber,
      tabBarPosition
    } = this;
    const tabs = this.getTabs();
    return (
      <div class={prefixCls}>
        <Tabs tabs={tabs}
              renderTabBar={this.renderTabBar}
              tabBarPosition={tabBarPosition}
              page={this.store.currentTab < 0 ? undefined : this.store.currentTab}
              animated={animated}
              swipeable={swipeable}
              noRenderContent={noRenderContent}
              prerenderingSiblingsNumber={prerenderingSiblingsNumber}>
          {this.content}
        </Tabs>
      </div>
    );
  }
}

export default TabBar;
