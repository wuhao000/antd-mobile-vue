import {computed, defineComponent, PropType, ref, Ref, watch} from 'vue';
import {Models} from '../../../types/models';
import Gesture, {IGestureStatus} from '../../vmc-gesture';
import {getPxStyle, getTransformPropValue, setPxStyle} from './utils';

const DefaultTabBar = defineComponent({
  inheritAttrs: false,
  name: 'DefaultTabBar',
  props: {
    card: {
      type: Boolean as PropType<boolean>
    },
    activeCardColor: {
      type: String as PropType<string>
    },
    prefixCls: {
      default: 'am-tabs-default-bar'
    },
    /** call this function to switch tab */
    goToTab: {
      type: Function,
      default: () => {
      }
    },
    tabs: {
      default: () => {
        return [];
      }
    },
    /** 当前激活的标签页 */
    activeTab: {
      default: 0
    },
    animated: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    renderTab: {
      type: Function as PropType<(tab) => any>
    },
    renderUnderline: {
      type: Boolean as PropType<boolean>,
      default: true
    },
    page: {
      default: 5
    },
    tabBarPosition: {
      type: String as PropType<'top' | 'bottom' | 'left' | 'right'>,
      default: 'top'
    },
    tabBarUnderlineStyle: {
      default: () => {
        return {};
      }
    },
    tabBarBackgroundColor: {
      default: '#fff'
    },
    tabBarActiveTextColor: {
      default: ''
    },
    tabBarInactiveTextColor: {
      default: ''
    },
    tabBarTextStyle: {
      default: () => {
        return {};
      }
    }
  },
  setup(props, {emit}) {
    const instanceId: Ref<number> = ref(null);
    const isMoving: Ref<boolean> = ref(false);
    const showPrev: Ref<boolean> = ref(false);
    const showNext: Ref<boolean> = ref(false);
    const transform: Ref<string> = ref('');
    watch(() => props.activeTab, () => {
      getTransformByIndex();
    });
    watch(() => props.tabs, () => {
      getTransformByIndex();
    });
    const layoutRef = ref(null);
    const onPan = computed(() => {
      let lastOffset: number | string = 0;
      let finalOffset = 0;

      const getLastOffset = (isVertical = isTabBarVertical()) => {
        let offset = +`${lastOffset}`.replace('%', '');
        if (`${lastOffset}`.indexOf('%') >= 0) {
          offset /= 100;
          offset *= isVertical ? layoutRef.value.clientHeight : layoutRef.value.clientWidth;
        }
        return offset;
      };

      return {
        onPanStart: () => {
          isMoving.value = true;
        },

        onPanMove: (status: IGestureStatus) => {
          if (!status.moveStatus || !layoutRef.value.value) {
            return;
          }
          const isVertical = isTabBarVertical();
          let offset = getLastOffset() + (isVertical ? status.moveStatus.y : status.moveStatus.x);
          const canScrollOffset = isVertical ?
            -layoutRef.value.scrollHeight + layoutRef.value.clientHeight :
            -layoutRef.value.scrollWidth + layoutRef.value.clientWidth;
          offset = Math.min(offset, 0);
          offset = Math.max(offset, canScrollOffset);
          setPxStyle(layoutRef.value.value, offset, 'px', isVertical);
          finalOffset = offset;
          showPrev.value = -offset > 0;
          showNext.value = offset > canScrollOffset;
        },

        onPanEnd: () => {
          const isVertical = isTabBarVertical();
          lastOffset = finalOffset;
          isMoving.value = false;
          transform.value = getPxStyle(finalOffset, 'px', isVertical);
        },

        setCurrentOffset: (offset: number | string) => lastOffset = offset
      };
    });
    const getTransformByIndex = () => {
      const {activeTab, tabs, page = 0} = props;
      const isVertical = isTabBarVertical();
      const size = getTabSize(page, tabs.length);
      const center = page / 2;
      const pos = Math.min(activeTab, tabs.length - center - .5);
      const skipSize = Math.min(-(pos - center + .5) * size, 0);
      onPan.value.setCurrentOffset(`${skipSize}%`);
      transform.value = getPxStyle(skipSize, '%', isVertical);
      showPrev.value = activeTab > center - .5 && tabs.length > page;
      showNext.value = activeTab < tabs.length - center - .5 && tabs.length > page;
    };
    const onPress = (index: number) => {
      const {goToTab, tabs} = props;
      emit('tabClick', tabs[index], index);
      goToTab && goToTab(index);
    };
    const isTabBarVertical = (position = props.tabBarPosition) => {
      return position === 'left' || position === 'right';
    };
    const nativeRenderTab = (t: Models.TabData, i: number, size: number, isTabBarVertical: boolean) => {
      const {
        prefixCls, renderTab, activeTab,
        tabBarTextStyle,
        tabBarActiveTextColor,
        tabBarInactiveTextColor

      } = props;

      const textStyle = {...tabBarTextStyle} as any;
      let cls = `${prefixCls}-tab`;
      let ariaSelected = false;
      const style: any = {
        ...textStyle,
        ...isTabBarVertical ? {height: `${size}%`} : {width: `${size}%`}
      };
      if (props.card && props.activeCardColor) {
        style.borderColor = props.activeCardColor;
      }
      if (props.card) {
        cls += ` ${cls}-card`;
      }
      if (activeTab === i) {
        cls += ` ${cls}-active`;
        ariaSelected = true;
        if (tabBarActiveTextColor) {
          textStyle.color = tabBarActiveTextColor;
        }
        style.backgroundColor = props.activeCardColor;
      } else if (tabBarInactiveTextColor) {
        textStyle.color = tabBarInactiveTextColor;
      }
      return <div key={`t_${i}`}
                  style={style}
                  id={`m-tabs-${instanceId.value}-${i}`}
                  role="tab"
                  aria-selected={ariaSelected}
                  class={cls}
                  onClick={() => onPress(i)}>
        {renderTab ? renderTab(t) : t.title}
      </div>;
    };
    const getTabSize = (page: number, tabLength: number) => {
      return 100 / Math.min(page, tabLength);
    };
    {
      getTransformByIndex();
      instanceId.value = instanceId.value++;
    }

    return {
      setLayout(el) {
        layoutRef.value = el;
      },
      isTabBarVertical,
      getTabSize,
      nativeRenderTab,
      isMoving,
      transform,
      showNext,
      showPrev,
      onPan
    };
  },
  render() {
    const {
      prefixCls, animated, tabs = [], page = 0, activeTab = 0,
      tabBarBackgroundColor, tabBarUnderlineStyle, tabBarPosition
    } = this;
    const renderUnderline = !this.card && this.renderUnderline;
    const {isMoving, transform, showNext, showPrev} = this;
    const isTabBarVertical = this.isTabBarVertical();

    const needScroll = tabs.length > page;
    const size = this.getTabSize(page, tabs.length);
    const Tabs = tabs.map((t, i) => {
      return this.nativeRenderTab(t, i, size, isTabBarVertical);
    });
    let cls = prefixCls;
    if (animated && !isMoving) {
      cls += ` ${prefixCls}-animated`;
    }

    const style = {
      backgroundColor: tabBarBackgroundColor || ''
    } as any;

    const transformStyle = needScroll ? {
      ...getTransformPropValue(transform)
    } : {};

    const {setCurrentOffset, ...onPan} = this.onPan;
    const underlineProps = {
      style: {
        ...isTabBarVertical ? {height: `${size}%`} : {width: `${size}%`},
        ...isTabBarVertical ? {top: `${size * activeTab}%`} : {left: `${size * activeTab}%`},
        ...tabBarUnderlineStyle
      },
      class: `${prefixCls}-underline`
    };

    return <div class={`${cls} ${prefixCls}-${tabBarPosition}`} style={style}>
      {showPrev && <div class={`${prefixCls}-prevpage`}/>}
      <Gesture {...onPan}
               direction={isTabBarVertical ? 'vertical' : 'horizontal'}>
        <div role="tablist" class={`${prefixCls}-content`}
             style={transformStyle}
             ref={this.setLayout}>
          {Tabs}
          {
            renderUnderline ? <div {...underlineProps}/> : ''
          }
        </div>
      </Gesture>
      {showNext && <div class={`${prefixCls}-nextpage`}/>}
    </div>;
  }
});

export default DefaultTabBar as any;
