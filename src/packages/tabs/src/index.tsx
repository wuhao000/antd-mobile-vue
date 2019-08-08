import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import Gesture, {IGestureStatus} from '../../vmc-gesture';
import {DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP} from '../../vmc-gesture/config';
import DefaultTabBar from './default-tab-bar';
import {Models} from './models';
import {TabBarPropsType} from './props-type';
import TabPane from './tab-pane';
import {getTransformPropValue, setPxStyle, setTransform} from './utils';

let instanceId: number = 0;

export const getPanDirection = (direction: number | undefined) => {
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

@Component({
  name: 'Tabs'
})
export default class Tabs extends Vue {

  public static DefaultTabBar: any = DefaultTabBar;
  /**
   * 使用卡片样式
   */
  @Prop({type: Boolean})
  public card: boolean;
  /**
   * 激活的卡片背景色（未激活卡片的边框色与之相同）
   */
  @Prop({type: String})
  public activeCardColor: string;
  /**
   * class前缀
   */
  @Prop({type: String, default: 'am-tabs'})
  public prefixCls: string;
  @Prop({type: Boolean, default: true})
  public useOnPan: boolean;
  public contentPos: string = '';
  public isMoving = false;
  @Prop()
  public renderTabBar: (props: any) => VNode;
  /**
   * 标签数据
   */
  @Prop({
    default: () => {
      return [];
    }
  })
  public tabs: Models.TabData[];
  /** TabBar's position | default: top */
  @Prop({default: 'top'})
  public tabBarPosition?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * 当前激活的卡片的索引
   */
  @Prop({type: [String, Number], default: 0})
  public value?: number | string;
  @Prop({type: Number})
  public page?: number | string;
  /**
   * 是否支持手势
   */
  @Prop({type: Boolean, default: true})
  public swipeable?: boolean;
  /**
   * 与当前激活标签相邻的提前渲染的标签数量
   */
  @Prop({type: Number, default: 1})
  public prerenderingSiblingsNumber?: number;
  /**
   * 切换标签时是否有动画
   */
  @Prop({type: Boolean, default: true})
  public animated?: boolean;
  /**
   * 是否销毁未激活的标签页
   */
  @Prop({type: Boolean, default: false})
  public destroyInactiveTab?: boolean;
  /**
   * 切换卡片的滑动距离，0-1之间
   */
  @Prop({type: Number, default: 0.3})
  public distanceToChangeTab?: number;
  @Prop({type: Boolean, default: true})
  public usePaged?: boolean;
  /**
   * 标签页方向
   */
  @Prop({type: String, default: 'horizontal'})
  public tabDirection?: 'horizontal' | 'vertical';
  /** 标签下划线样式 */
  @Prop({type: Object})
  public tabBarUnderlineStyle?: any;
  /** 标签页背景颜色 */
  @Prop({type: String})
  public tabBarBackgroundColor?: string;
  /** 激活的标签页文字颜色 */
  @Prop({type: String})
  public tabBarActiveTextColor?: string;
  /** 未激活的标签页文字颜色 */
  @Prop({type: String})
  public tabBarInactiveTextColor?: string;
  /** 标签栏文字样式 */
  @Prop({type: Object})
  public tabBarTextStyle?: any;
  /** use left instead of transform | default: false */
  @Prop({type: Boolean})
  public useLeftInsteadTransform?: boolean;

  protected instanceId: number;
  protected prevCurrentTab: number;
  protected tabCache: { [index: number]: any } = {};
  public currentTab: number = this.getTabIndex();
  private nextCurrentTab: number;

  public created() {
    this.nextCurrentTab = this.currentTab;
    this.instanceId = instanceId++;
    this.contentPos = this.getContentPosByIndex(
        this.getTabIndex(),
        this.isTabVertical(this.tabDirection),
        this.useLeftInsteadTransform
    );
  }

  @Watch('page')
  public pageChanged(page: number) {
    if (page !== undefined && page !== null) {
      this.currentTab = page;
    }
  }

  @Watch('currentTab')
  public currentTabChanged(index) {
    this.$emit('input', index);
  }

  /** on tab click */
  public onTabClick(tab: Models.TabData, index: number) {
    this.$emit('tab-click', index);
  }

  public getTabIndex() {
    const {page, value, tabs} = this;
    const param = (page !== undefined ? page : value) || 0;

    let index = 0;
    if (typeof (param as any) === 'string') {
      tabs.forEach((t, i) => {
        if (t.key === param) {
          index = i;
        }
      });
    } else {
      index = param as number || 0;
    }
    return index < 0 ? 0 : index;
  }

  public isTabVertical(direction = this.tabDirection) {
    return direction === 'vertical';
  }

  public shouldRenderTab(idx: number) {
    const {prerenderingSiblingsNumber = 0} = this;
    const {currentTab = 0} = this;
    return currentTab - prerenderingSiblingsNumber <= idx && idx <= currentTab + prerenderingSiblingsNumber;
  }

  public beforeUpdate() {
    if (this.page !== this.page && this.page !== undefined) {
      this.baseGoToTab(this.getTabIndex(), true, {});
    }
  }

  public componentDidMount() {
    this.prevCurrentTab = this.currentTab;
  }

  public updated() {
    this.prevCurrentTab = this.currentTab;
  }

  public getOffsetIndex(current: number, width: number, threshold = this.distanceToChangeTab || 0) {
    const ratio = Math.abs(current / width);
    const direction = ratio > this.currentTab ? '<' : '>';
    const index = Math.floor(ratio);
    switch (direction) {
      case '<':
        return ratio - index > threshold ? index + 1 : index;
      case '>':
        return 1 - ratio + index > threshold ? index : index + 1;
      default:
        return Math.round(ratio);
    }
  }

  public baseGoToTab(index: number, force = false, newState: any = {}) {
    if (!force && this.nextCurrentTab === index) {
      return false;
    }
    this.nextCurrentTab = index;
    const {tabs} = this;
    if (index >= 0 && index < tabs.length) {
      if (!force) {
        this.$emit('change', tabs[index], index);
        if (this.page !== undefined) {
          return false;
        }
      }
      this.currentTab = index;
      Object.keys(newState).forEach(key => {
        this[key] = newState[key];
      });
    }
    return true;
  }

  public getTabBarBaseProps() {
    const {
      animated,
      tabBarActiveTextColor,
      tabBarBackgroundColor,
      tabBarInactiveTextColor,
      tabBarPosition,
      tabBarTextStyle,
      tabBarUnderlineStyle,
      tabs
    } = this;
    return {
      activeTab: this.currentTab,
      animated,
      card: this.card,
      activeCardColor: this.activeCardColor,
      goToTab: this.tabClickGoToTab.bind(this),
      tabBarActiveTextColor,
      tabBarBackgroundColor,
      tabBarInactiveTextColor,
      tabBarPosition,
      tabBarTextStyle,
      tabBarUnderlineStyle,
      tabs,
      instanceId: this.instanceId
    };
  }

  public getSubElements() {
    const children = this.$slots.default;
    const subElements: { [key: string]: any } = {};
    return (defaultPrefix: string = '$i$-', allPrefix: string = '$ALL$') => {
      if (Array.isArray(children)) {
        children.forEach((child: any, index) => {
          if (child.key) {
            subElements[child.key] = child;
          }
          subElements[`${defaultPrefix}${index}`] = child;
        });
      } else if (children) {
        subElements[allPrefix] = children;
      }
      return subElements;
    };
  }

  public getSubElement(tab: Models.TabData,
                       index: number,
                       defaultPrefix: string = '$i$-',
                       allPrefix: string = '$ALL$') {

    const key = (tab.key !== null && tab.key !== undefined && tab.key !== '') ? tab.key : `${defaultPrefix}${index}`;
    const getSubElements = this.getSubElements();
    const elements = getSubElements(defaultPrefix, allPrefix);
    let component = elements[key] || elements[allPrefix];
    if (component instanceof Function) {
      component = component(tab, index);
    }
    return component || null;
  }

  get layout(): HTMLDivElement {
    return this.$refs['layout'] as HTMLDivElement;
  }

  get onPan() {
    let lastOffset: number | string = 0;
    let finalOffset = 0;
    let panDirection: string;

    const getLastOffset = (isVertical = this.isTabVertical()) => {
      let offset = +`${lastOffset}`.replace('%', '');
      if (`${lastOffset}`.indexOf('%') >= 0) {
        offset /= 100;
        offset *= isVertical ? this.layout.clientHeight : this.layout.clientWidth;
      }
      return offset;
    };

    return {
      onPanStart: (status: IGestureStatus) => {
        if (!this.swipeable || !this.animated) {
          return;
        }
        panDirection = getPanDirection(status.direction);
        this.isMoving = true;
      },

      onPanMove: (status: IGestureStatus) => {
        const {swipeable, animated, useLeftInsteadTransform} = this;
        if (!status.moveStatus || !this.layout || !swipeable || !animated) {
          return;
        }
        const isVertical = this.isTabVertical();
        let offset = getLastOffset();
        if (isVertical) {
          offset += panDirection === 'horizontal' ? 0 : status.moveStatus.y;
        } else {
          offset += panDirection === 'vertical' ? 0 : status.moveStatus.x;
        }
        const canScrollOffset = isVertical ?
            -this.layout.scrollHeight + this.layout.clientHeight :
            -this.layout.scrollWidth + this.layout.clientWidth;
        offset = Math.min(offset, 0);
        offset = Math.max(offset, canScrollOffset);
        setPxStyle(this.layout, offset, 'px', isVertical, useLeftInsteadTransform);
        finalOffset = offset;
      },

      onPanEnd: () => {
        if (!this.swipeable || !this.animated) {
          return;
        }
        lastOffset = finalOffset;
        const isVertical = this.isTabVertical();
        const offsetIndex = this.getOffsetIndex(finalOffset, isVertical ? this.layout.clientHeight : this.layout.clientWidth);
        this.isMoving = false;
        if (offsetIndex === this.currentTab) {
          if (this.usePaged) {
            setTransform(
                this.layout.style,
                this.getContentPosByIndex(
                    offsetIndex,
                    this.isTabVertical(),
                    this.useLeftInsteadTransform
                )
            );
          }
        } else {
          this.goToTab(offsetIndex);
        }
      },
      setCurrentOffset: (offset: number | string) => lastOffset = offset
    };
  }

  public goToTab(index: number, force = false, usePaged = this.usePaged) {
    const {tabDirection, useLeftInsteadTransform} = this;
    let newState = {};
    if (usePaged) {
      newState = {
        contentPos: this.getContentPosByIndex(
            index,
            this.isTabVertical(tabDirection),
            useLeftInsteadTransform
        )
      };
    }
    return this.baseGoToTab(index, force, newState);
  }

  public tabClickGoToTab(index: number) {
    this.goToTab(index, false, true);
  }

  public getContentPosByIndex(index: number, isVertical: boolean, useLeft = false) {
    const value = `${-index * 100}%`;
    this.onPan.setCurrentOffset(value);
    if (useLeft) {
      return `${value}`;
    } else {
      const translate = isVertical ? `0px, ${value}` : `${value}, 0px`;
      // fix: content overlay TabBar on iOS 10. ( 0px -> 1px )
      return `translate3d(${translate}, 1px)`;
    }
  }

  public onSwipe(status: IGestureStatus) {
    const {tabBarPosition, swipeable, usePaged} = this;
    if (!swipeable || !usePaged || this.isTabVertical()) {
      return;
    }

    switch (tabBarPosition) {
      case 'top':
      case 'bottom':
        switch (status.direction) {
          case DIRECTION_LEFT:
            if (!this.isTabVertical()) {
              this.goToTab(this.prevCurrentTab + 1);
            }
            break;
          case DIRECTION_UP:
            if (this.isTabVertical()) {
              this.goToTab(this.prevCurrentTab + 1);
            }
            break;
          case DIRECTION_RIGHT:
            if (!this.isTabVertical()) {
              this.goToTab(this.prevCurrentTab - 1);
            }
            break;
          case DIRECTION_DOWN:
            if (this.isTabVertical()) {
              this.goToTab(this.prevCurrentTab - 1);
            }
            break;
        }
        break;
    }
  }

  public renderContent() {
    const {prefixCls, tabs, animated, destroyInactiveTab, useLeftInsteadTransform} = this;
    const {currentTab, isMoving, contentPos} = this;
    const isTabVertical = this.isTabVertical();

    let contentCls = `${prefixCls}-content-wrap`;
    if (animated && !isMoving) {
      contentCls += ` ${contentCls}-animated`;
    }
    const contentStyle: any = animated ? (
        useLeftInsteadTransform ? {
          position: 'relative',
          ...this.isTabVertical() ? {top: contentPos} : {left: contentPos}
        } : getTransformPropValue(contentPos)
    ) : {
      position: 'relative',
      ...this.isTabVertical() ? {top: `${-currentTab * 100}%`} : {left: `${-currentTab * 100}%`}
    };
    const {instanceId} = this.getTabBarBaseProps();
    return <div class={contentCls}
                style={contentStyle}
                ref={'layout'}>
      {
        tabs && tabs.map((tab, index) => {
          let cls = `${prefixCls}-pane-wrap`;
          if (this.currentTab === index) {
            cls += ` ${cls}-active`;
          } else {
            cls += ` ${cls}-inactive`;
          }

          const key = tab.key || `tab_${index}`;

          // update tab cache
          if (this.shouldRenderTab(index)) {
            this.tabCache[index] = this.getSubElement(tab, index);
          } else if (destroyInactiveTab) {
            this.tabCache[index] = undefined;
          }
          const TabPane2 = TabPane as any;
          return <TabPane2 key={key} class={cls}
                           active={currentTab === index}
                           role={'tabpanel'}
                           aria-hidden={currentTab !== index}
                           aria-labelledby={`m-tabs-${instanceId}-${index}`}
                           fixX={isTabVertical} fixY={!isTabVertical}
          >
            {this.tabCache[index]}
          </TabPane2>;
        })
      }
    </div>;
  }

  public render() {
    const {prefixCls, tabBarPosition, tabDirection, useOnPan} = this;
    const isTabVertical = this.isTabVertical(tabDirection);
    const tabBarProps: TabBarPropsType = {
      ...this.getTabBarBaseProps()
    };
    const onPan = !isTabVertical && useOnPan ? this.onPan : {};
    const Gesture2 = Gesture as any;
    const content = [
      this.renderTabBar ? this.renderTabBar(this.$props) : <div key={'tabBar'} class={`${prefixCls}-tab-bar-wrap`}>
        <DefaultTabBar {...{
          props: tabBarProps,
          on: {
            tabClick: (tab, index) => {
              this.onTabClick(tab, index);
            }
          }
        }} />
      </div>,
      <Gesture2 key={'$content'}
                onSwipe={this.onSwipe}
                {...{props: onPan}}>
        {this.renderContent()}
      </Gesture2>
    ];

    return <div class={`${prefixCls} ${prefixCls}-${tabDirection} ${prefixCls}-${tabBarPosition}`}>
      {
        tabBarPosition === 'top' || tabBarPosition === 'left' ? content : content.reverse()
      }
    </div>;
  }
}
