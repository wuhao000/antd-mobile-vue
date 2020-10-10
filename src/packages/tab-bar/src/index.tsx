import {defineComponent, getCurrentInstance, onMounted, PropType, provide, reactive, ref, Ref, VNode, watch} from 'vue';
import Tabs from '../../tabs';
import Item from './item';


const TabBar = defineComponent({
  Item: Item,
  name: 'MTabBar',
  props: {
    prefixCls: {
      default: 'am-tab-bar'
    },
    className: {},
    hidden: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    placeholder: {
      type: String as PropType<string>,
      default: '正在加载'
    },
    noRenderContent: {},
    prerenderingSiblingsNumber: {
      type: Number as PropType<number>,
      default: 1
    },
    barTintColor: {
      type: String as PropType<string>,
      default: 'white'
    },
    tintColor: {
      type: String as PropType<string>,
      default: '#108ee9'
    },
    unselectedTintColor: {
      type: String as PropType<string>,
      default: '#888'
    },
    tabBarPosition: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'bottom'
    },
    animated: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    swipeable: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    value: {
      type: [Number, String] as PropType<string | number>
    }
  },
  setup(props, {emit, slots}) {
    const store = reactive({
      currentTab: -10000 as number | string
    });
    watch(() => props.value, (value: number | string) => {
      store.currentTab = value;
    }, {immediate: true});
    watch(() => store.currentTab, (value: number | string) => {
      emit('update:value', value);
    });

    const setCurrentTab = (tab: number | string) => {
      store.currentTab = tab;
    };
    const renderTabBar = () => {
      let cls = `${props.prefixCls}-bar`;
      if (props.hidden) {
        cls += ` ${props.prefixCls}-bar-hidden-${props.tabBarPosition}`;
      }
      return <div class={cls} style={{backgroundColor: props.barTintColor}}>
        {slots.default()}
      </div>;
    };
    const getTabs = () => {
      return slots.default().map((c: VNode, index: number) => {
        const props = Object.assign({}, c.props as any);
        if (props.icon && !props.selectedIcon) {
          props.selectedIcon = props.icon;
        }
        return {
          props,
          onClick: () => {
            store.currentTab = index;
          }
        };
      });
    };
    const instance = getCurrentInstance();
    provide('tabBar', instance);
    provide('store', store);
    return {
      getTabs, store, renderTabBar
    };
  },
  render() {
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
          {this.$slots.default()}
        </Tabs>
      </div>
    );
  }
});

export default TabBar;
