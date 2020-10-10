import {computed, defineComponent, getCurrentInstance, inject, onMounted, PropType, ref, VNode} from 'vue';
import {IconResProps} from '../../mixins/icon-res';
import getDataAttr from '../../utils/get-data-attr';
import Tab from './tab';

let _uid = 100;

export default defineComponent({
  name: 'MTabBarItem',
  props: {
    badge: {
      type: [String, Number] as PropType<string | number>
    },
    selected: {
      type: Boolean as PropType<boolean>,
      default: undefined
    },
    icon: {
      type: [String, Object] as PropType<string | IconResProps | VNode>
    },
    selectedIcon: {
      type: [String, Object] as PropType<any>
    },
    title: {
      type: [String, Object] as PropType<string>,
      default: ''
    },
    dot: {
      type: Boolean as PropType<boolean>
    },
    prefixCls: {
      type: String as PropType<string>,
      default: 'am-tab-bar'
    }
  },
  setup(props, {emit, slots}) {
    const store: { currentTab: string | number } = inject('store');
    const tabBar: any = inject('tabBar');
    const index = ref(-1);

    const sSelected = computed(() => {
      return props.selected !== undefined ? props.selected : (index.value === store.currentTab);
    });
    const instance = getCurrentInstance();
    onMounted(() => {
      const children = tabBar.slots.default();
      const tabs = children.filter(it => it.props.tag === instance.props.tag);
      index.value = tabs.findIndex(it => it.key === instance.vnode.key);
    });

    return {
      tabBar, sSelected, index,
      _uid: _uid++
    };
  },
  render() {
    const {
      tintColor,
      unselectedTintColor
    } = this.tabBar.props;
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
      <Tab {...props}
           onClick={(e) => {
             this.tabBar.setCurrentTab(this.index);
             this.$emit('click');
           }}
           dataAttrs={getDataAttr(this.$props)}>
        {this.$slots.default()}
      </Tab>
    );
  }
});
