import { computed, defineComponent, getCurrentInstance, inject, onMounted, ref } from 'vue';
import getDataAttr from '../../utils/get-data-attr';
import Tab from './tab';
let _uid = 100;
export default defineComponent({
    name: 'MTabBarItem',
    props: {
        badge: {
            type: [String, Number]
        },
        selected: {
            type: Boolean,
            default: undefined
        },
        icon: {
            type: [String, Object]
        },
        selectedIcon: {
            type: [String, Object]
        },
        title: {
            type: [String, Object],
            default: ''
        },
        dot: {
            type: Boolean
        },
        prefixCls: {
            type: String,
            default: 'am-tab-bar'
        }
    },
    setup(props, { emit, slots }) {
        const store = inject('store');
        const tabBar = inject('tabBar');
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
        const { tintColor, unselectedTintColor } = this.tabBar.props;
        const icon = this.$slots.icon ? this.$slots.icon[0] : this.icon;
        const selectedIcon = this.$slots.selectedIcon ? this.$slots.selectedIcon : (this.selectedIcon || icon);
        const props = Object.assign(Object.assign({}, this.$props), { prefixCls: `${this.prefixCls}-tab`, tintColor,
            unselectedTintColor,
            icon,
            selectedIcon, selected: this.sSelected });
        return (<Tab {...props} onClick={(e) => {
            this.tabBar.setCurrentTab(this.index);
            this.$emit('click');
        }} dataAttrs={getDataAttr(this.$props)}>
        {this.$slots.default()}
      </Tab>);
    }
});
//# sourceMappingURL=item.jsx.map