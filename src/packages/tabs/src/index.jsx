import { unwrapFragment } from '../../utils/vue';
import { computed, defineComponent, onBeforeUpdate, onUpdated, reactive, ref, watch } from 'vue';
import Gesture from '../../vmc-gesture';
import { DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP } from '../../vmc-gesture/config';
import DefaultTabBar from './default-tab-bar';
import TabPane from './tab-pane';
import { getTransformPropValue, setPxStyle, setTransform } from './utils';
export const getPanDirection = (direction) => {
    switch (direction) {
        case DIRECTION_LEFT:
        case DIRECTION_RIGHT:
            return 'horizontal';
        case DIRECTION_UP:
        case DIRECTION_DOWN:
            return 'vertical';
        default:
            return 'none';
    }
};
const Tabs = defineComponent({
    DefaultTabBar: DefaultTabBar,
    name: 'Tabs',
    props: {
        /**
         * 使用卡片样式
         */
        card: {
            type: Boolean
        },
        /**
         * 激活的卡片背景色（未激活卡片的边框色与之相同）
         */
        activeCardColor: {
            type: String
        },
        /**
         * class前缀
         */
        prefixCls: {
            type: String,
            default: 'am-tabs'
        },
        useOnPan: {
            type: Boolean,
            default: true
        },
        renderTabBar: { type: Function },
        /**
         * 标签数据
         */
        tabs: {
            default: () => {
                return [];
            }
        },
        /** TabBar's position | default: top */
        tabBarPosition: {
            default: 'top'
        },
        /**
         * 当前激活的卡片的索引
         */
        value: {
            type: [String, Number],
            default: 0
        },
        page: {
            type: Number
        },
        /**
         * 是否支持手势
         */
        swipeable: {
            type: Boolean,
            default: true
        },
        /**
         * 与当前激活标签相邻的提前渲染的标签数量
         */
        prerenderingSiblingsNumber: {
            type: Number,
            default: 1
        },
        /**
         * 切换标签时是否有动画
         */
        animated: {
            type: Boolean,
            default: true
        },
        /**
         * 是否销毁未激活的标签页
         */
        destroyInactiveTab: {
            type: Boolean,
            default: false
        },
        /**
         * 切换卡片的滑动距离，0-1之间
         */
        distanceToChangeTab: {
            type: Number,
            default: 0.3
        },
        usePaged: {
            type: Boolean,
            default: true
        },
        /**
         * 标签页方向
         */
        tabDirection: {
            type: String,
            default: 'horizontal'
        },
        /** 标签下划线样式 */
        tabBarUnderlineStyle: {
            type: Object
        },
        /** 标签页背景颜色 */
        tabBarBackgroundColor: {
            type: String
        },
        /** 激活的标签页文字颜色 */
        tabBarActiveTextColor: {
            type: String
        },
        /** 未激活的标签页文字颜色 */
        tabBarInactiveTextColor: {
            type: String
        },
        /** 标签栏文字样式 */
        tabBarTextStyle: {
            type: Object
        },
        /** use left instead of transform | default: false */
        useLeftInsteadTransform: {
            type: Boolean
        }
    },
    setup(props, { emit, slots }) {
        const contentPos = ref('');
        const isMoving = ref(false);
        const instanceId = ref(null);
        const prevCurrentTab = ref(null);
        const tabCache = reactive({});
        const getTabIndex = () => {
            const { page, value, tabs } = props;
            const param = (page !== undefined ? page : value) || 0;
            let index = 0;
            if (typeof param === 'string') {
                tabs.forEach((t, i) => {
                    if (t.key === param) {
                        index = i;
                    }
                });
            }
            else {
                index = param || 0;
            }
            return index < 0 ? 0 : index;
        };
        const currentTab = ref(getTabIndex());
        const nextCurrentTab = ref(null);
        const layoutRef = ref(null);
        watch(() => props.page, (page) => {
            if (page !== undefined && page !== null) {
                currentTab.value = page;
            }
        });
        watch(() => currentTab.value, (index) => {
            emit('update:value', index);
        });
        const onPan = computed(() => {
            let lastOffset = 0;
            let finalOffset = 0;
            let panDirection;
            const getLastOffset = (isVertical = isTabVertical()) => {
                let offset = +`${lastOffset}`.replace('%', '');
                if (`${lastOffset}`.indexOf('%') >= 0) {
                    offset /= 100;
                    offset *= isVertical ? layoutRef.clientHeight : layoutRef.value.clientWidth;
                }
                return offset;
            };
            return {
                onPanStart: (status) => {
                    if (!props.swipeable || !props.animated) {
                        return;
                    }
                    panDirection = getPanDirection(status.direction);
                    isMoving.value = true;
                },
                onPanMove: (status) => {
                    const { swipeable, animated, useLeftInsteadTransform } = props;
                    if (!status.moveStatus || !layoutRef.value.value || !swipeable || !animated) {
                        return;
                    }
                    const isVertical = isTabVertical();
                    let offset = getLastOffset();
                    if (isVertical) {
                        offset += panDirection === 'horizontal' ? 0 : status.moveStatus.y;
                    }
                    else {
                        offset += panDirection === 'vertical' ? 0 : status.moveStatus.x;
                    }
                    const canScrollOffset = isVertical ?
                        -layoutRef.value.scrollHeight + layoutRef.value.clientHeight :
                        -layoutRef.value.scrollWidth + layoutRef.value.clientWidth;
                    offset = Math.min(offset, 0);
                    offset = Math.max(offset, canScrollOffset);
                    setPxStyle(layoutRef.value.value, offset, 'px', isVertical, useLeftInsteadTransform);
                    finalOffset = offset;
                },
                onPanEnd: () => {
                    if (!props.swipeable || !props.animated) {
                        return;
                    }
                    lastOffset = finalOffset;
                    const isVertical = isTabVertical();
                    const offsetIndex = getOffsetIndex(finalOffset, isVertical ? layoutRef.value.clientHeight : layoutRef.value.clientWidth);
                    isMoving.value = false;
                    if (offsetIndex === currentTab.value) {
                        if (props.usePaged) {
                            setTransform(layoutRef.value.style, getContentPosByIndex(offsetIndex, isTabVertical(), props.useLeftInsteadTransform));
                        }
                    }
                    else {
                        goToTab(offsetIndex);
                    }
                },
                setCurrentOffset: (offset) => lastOffset = offset
            };
        });
        /** on tab click */
        const onTabClick = (tab, index) => {
            emit('tab-click', index);
        };
        const isTabVertical = (direction = props.tabDirection) => {
            return direction === 'vertical';
        };
        const shouldRenderTab = (idx) => {
            const { prerenderingSiblingsNumber = 0 } = props;
            return currentTab.value - prerenderingSiblingsNumber <= idx && idx <= currentTab.value + prerenderingSiblingsNumber;
        };
        const componentDidMount = () => {
            prevCurrentTab.value = currentTab.value;
        };
        const getOffsetIndex = (current, width, threshold = props.distanceToChangeTab || 0) => {
            const ratio = Math.abs(current / width);
            const direction = ratio > currentTab.value ? '<' : '>';
            const index = Math.floor(ratio);
            switch (direction) {
                case '<':
                    return ratio - index > threshold ? index + 1 : index;
                case '>':
                    return 1 - ratio + index > threshold ? index : index + 1;
                default:
                    return Math.round(ratio);
            }
        };
        const baseGoToTab = (index, force = false, setState = null) => {
            if (!force && nextCurrentTab.value === index) {
                return false;
            }
            nextCurrentTab.value = index;
            const { tabs } = props;
            if (index >= 0 && index < tabs.length) {
                if (!force) {
                    emit('change', tabs[index], index);
                    if (props.page !== undefined) {
                        return false;
                    }
                }
                currentTab.value = index;
                if (setState) {
                    setState();
                }
            }
            return true;
        };
        const getTabBarBaseProps = () => {
            const { animated, tabBarActiveTextColor, tabBarBackgroundColor, tabBarInactiveTextColor, tabBarPosition, tabBarTextStyle, tabBarUnderlineStyle, tabs } = props;
            return {
                activeTab: currentTab.value,
                animated,
                card: props.card,
                activeCardColor: props.activeCardColor,
                goToTab: tabClickGoToTab,
                tabBarActiveTextColor,
                tabBarBackgroundColor,
                tabBarInactiveTextColor,
                tabBarPosition,
                tabBarTextStyle,
                tabBarUnderlineStyle,
                tabs,
                instanceId: instanceId.value
            };
        };
        const getSubElements = () => {
            const children = unwrapFragment(slots.default());
            const subElements = {};
            return (defaultPrefix = '$i$-', allPrefix = '$ALL$') => {
                if (Array.isArray(children)) {
                    children.forEach((child, index) => {
                        if (child.key) {
                            subElements[child.key] = child;
                        }
                        subElements[`${defaultPrefix}${index}`] = child;
                    });
                }
                else if (children) {
                    subElements[allPrefix] = children;
                }
                return subElements;
            };
        };
        const getSubElement = (tab, index, defaultPrefix = '$i$-', allPrefix = '$ALL$') => {
            const key = (tab.key !== null && tab.key !== undefined && tab.key !== '') ? tab.key : `${defaultPrefix}${index}`;
            const getSubElementsFn = getSubElements();
            const elements = getSubElementsFn(defaultPrefix, allPrefix);
            let component = elements[key] || elements[allPrefix];
            if (component instanceof Function) {
                component = component(tab, index);
            }
            return component || null;
        };
        const goToTab = (index, force = false, usePaged = props.usePaged) => {
            const { tabDirection, useLeftInsteadTransform } = props;
            let setState = () => {
            };
            if (usePaged) {
                setState = () => {
                    contentPos.value = getContentPosByIndex(index, isTabVertical(tabDirection), useLeftInsteadTransform);
                };
            }
            return baseGoToTab(index, force, setState);
        };
        const tabClickGoToTab = (index) => {
            goToTab(index, false, true);
        };
        const getContentPosByIndex = (index, isVertical, useLeft = false) => {
            const value = `${-index * 100}%`;
            onPan.value.setCurrentOffset(value);
            if (useLeft) {
                return `${value}`;
            }
            else {
                const translate = isVertical ? `0px, ${value}` : `${value}, 0px`;
                // fix: content overlay TabBar on iOS 10. ( 0px -> 1px )
                return `translate3d(${translate}, 1px)`;
            }
        };
        const onSwipe = (status) => {
            const { tabBarPosition, swipeable, usePaged } = props;
            if (!swipeable || !usePaged || isTabVertical()) {
                return;
            }
            switch (tabBarPosition) {
                case 'top':
                case 'bottom':
                    switch (status.direction) {
                        case DIRECTION_LEFT:
                            if (!isTabVertical()) {
                                goToTab(prevCurrentTab.value + 1);
                            }
                            break;
                        case DIRECTION_UP:
                            if (isTabVertical()) {
                                goToTab(prevCurrentTab.value + 1);
                            }
                            break;
                        case DIRECTION_RIGHT:
                            if (!isTabVertical()) {
                                goToTab(prevCurrentTab.value - 1);
                            }
                            break;
                        case DIRECTION_DOWN:
                            if (isTabVertical()) {
                                goToTab(prevCurrentTab.value - 1);
                            }
                            break;
                    }
                    break;
            }
        };
        const renderContent = () => {
            const { prefixCls, tabs, animated, destroyInactiveTab, useLeftInsteadTransform } = props;
            let contentCls = `${prefixCls}-content-wrap`;
            if (animated && !isMoving.value) {
                contentCls += ` ${contentCls}-animated`;
            }
            const contentStyle = animated ? (useLeftInsteadTransform ? Object.assign({ position: 'relative' }, isTabVertical() ? { top: contentPos.value } : { left: contentPos }) : getTransformPropValue(contentPos.value)) : Object.assign({ position: 'relative' }, isTabVertical() ? { top: `${-currentTab.value * 100}%` } : { left: `${-currentTab * 100}%` });
            const { instanceId } = getTabBarBaseProps();
            return <div class={contentCls} style={contentStyle} ref={(el) => {
                layoutRef.value = el;
            }}>
        {tabs && tabs.map((tab, index) => {
                let cls = `${prefixCls}-pane-wrap`;
                if (currentTab.value === index) {
                    cls += ` ${cls}-active`;
                }
                else {
                    cls += ` ${cls}-inactive`;
                }
                const key = tab.key || `tab_${index}`;
                // update tab cache
                if (shouldRenderTab(index)) {
                    tabCache[index] = getSubElement(tab, index);
                }
                else if (destroyInactiveTab) {
                    tabCache[index] = undefined;
                }
                return <TabPane key={key} class={cls} active={currentTab.value === index} role="tabpanel" aria-hidden={currentTab.value !== index} aria-labelledby={`m-tabs-${instanceId}-${index}`} fixX={isTabVertical} fixY={!isTabVertical}>
              {tabCache[index]}
            </TabPane>;
            })}
      </div>;
        };
        {
            nextCurrentTab.value = currentTab.value;
            instanceId.value = instanceId.value++;
            contentPos.value = getContentPosByIndex(getTabIndex(), isTabVertical(props.tabDirection), props.useLeftInsteadTransform);
        }
        onBeforeUpdate(() => {
            if (props.page !== props.page && props.page !== undefined) {
                baseGoToTab(getTabIndex(), true);
            }
        });
        onUpdated(() => {
            prevCurrentTab.value = currentTab.value;
        });
        return {
            isTabVertical,
            getTabBarBaseProps,
            onPan,
            onTabClick,
            onSwipe,
            renderContent
        };
    },
    render() {
        const { prefixCls, tabBarPosition, tabDirection, useOnPan } = this;
        const isTabVertical = this.isTabVertical(tabDirection);
        const tabBarProps = Object.assign({}, this.getTabBarBaseProps());
        const onPan = !isTabVertical && useOnPan ? this.onPan : {};
        const content = [
            <div key="tabBar" class={`${prefixCls}-tab-bar-wrap`}>
        {this.renderTabBar ? this.renderTabBar(tabBarProps)
                : <DefaultTabBar {...tabBarProps} onTabClick={(tab, index) => {
                    this.onTabClick(tab, index);
                }}/>}
      </div>,
            <Gesture key="$content" onSwipe={this.onSwipe} {...{ onPan }}>
        {this.renderContent()}
      </Gesture>
        ];
        return <div class={`${prefixCls} ${prefixCls}-${tabDirection} ${prefixCls}-${tabBarPosition}`}>
      {tabBarPosition === 'top' || tabBarPosition === 'left' ? content : content.reverse()}
    </div>;
    }
});
export default Tabs;
//# sourceMappingURL=index.jsx.map