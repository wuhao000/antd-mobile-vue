import { defineComponent, getCurrentInstance, provide, reactive, watch } from 'vue';
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
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: '正在加载'
        },
        noRenderContent: {},
        prerenderingSiblingsNumber: {
            type: Number,
            default: 1
        },
        barTintColor: {
            type: String,
            default: 'white'
        },
        tintColor: {
            type: String,
            default: '#108ee9'
        },
        unselectedTintColor: {
            type: String,
            default: '#888'
        },
        tabBarPosition: {
            type: String,
            default: 'bottom'
        },
        animated: {
            type: Boolean,
            default: false
        },
        swipeable: {
            type: Boolean,
            default: false
        },
        value: {
            type: [Number, String]
        }
    },
    setup(props, { emit, slots }) {
        const store = reactive({
            currentTab: -10000
        });
        watch(() => props.value, (value) => {
            store.currentTab = value;
        }, { immediate: true });
        watch(() => store.currentTab, (value) => {
            emit('update:value', value);
        });
        const setCurrentTab = (tab) => {
            store.currentTab = tab;
        };
        const renderTabBar = () => {
            let cls = `${props.prefixCls}-bar`;
            if (props.hidden) {
                cls += ` ${props.prefixCls}-bar-hidden-${props.tabBarPosition}`;
            }
            return <div class={cls} style={{ backgroundColor: props.barTintColor }}>
        {slots.default()}
      </div>;
        };
        const getTabs = () => {
            return slots.default().map((c, index) => {
                const props = Object.assign({}, c.props);
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
        const { prefixCls, animated, swipeable, noRenderContent, prerenderingSiblingsNumber, tabBarPosition } = this;
        const tabs = this.getTabs();
        return (<div class={prefixCls}>
        <Tabs tabs={tabs} renderTabBar={this.renderTabBar} tabBarPosition={tabBarPosition} page={this.store.currentTab < 0 ? undefined : this.store.currentTab} animated={animated} swipeable={swipeable} noRenderContent={noRenderContent} prerenderingSiblingsNumber={prerenderingSiblingsNumber}>
          {this.$slots.default()}
        </Tabs>
      </div>);
    }
});
export default TabBar;
//# sourceMappingURL=index.jsx.map