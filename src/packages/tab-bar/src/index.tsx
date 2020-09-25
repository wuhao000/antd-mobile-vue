import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Provide, Watch} from 'vue-property-decorator';
import Tabs from '../../tabs';
import Item from './item';


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

  @Watch('value', {immediate: true})
  public valueChanged(value: number | string) {
    this.store.currentTab = value;
  }

  public setCurrentTab(tab: number | string) {
    this.store.currentTab = tab;
  }

  @Watch('store.currentTab')
  public currentTabChanged(value: number | string) {
    if (this.$listeners.input) {
      this.$emit('update:value', value);
    }
    console.log(this.store.currentTab);
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
