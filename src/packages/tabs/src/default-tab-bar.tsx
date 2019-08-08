import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Gesture, {IGestureStatus} from '../../vmc-gesture';
import {Models} from './models';
import {getPxStyle, getTransformPropValue, setPxStyle} from './utils';

let instanceId: number = 0;
@Component({
  name: 'DefaultTabBar'
})
export default class DefaultTabBar extends Vue {

  @Prop({type: Boolean})
  public card: boolean;
  @Prop(String)
  public activeCardColor: string;
  @Prop({default: 'am-tabs-default-bar'})
  public prefixCls: string;
  /** call this function to switch tab */
  @Prop({
    default: () => {
    }
  })
  public goToTab: (index: number) => void;
  @Prop({
    default: () => {
      return [];
    }
  })
  /** tabs data */
  public tabs: Models.TabData[];
  /** 当前激活的标签页 */
  @Prop({default: 0})
  public activeTab: number;
  @Prop({type: Boolean, default: true})
  /** use animate | default: true */
  public animated: boolean;
  @Prop()
  /** render the tab of tabbar */
  public renderTab?: any;
  @Prop({type: Boolean, default: true})
  /** render the underline of tabbar */
  public renderUnderline?: boolean;
  @Prop({default: 5})
  /** page size of tabbar's tab | default: 5 */
  public page?: number;
  @Prop({type: String, default: 'top'})
  /** tabBar's position | defualt: top */
  public tabBarPosition?: 'top' | 'bottom' | 'left' | 'right';
  @Prop({
    default: () => {
      return {};
    }
  })
  // TabBar shortcut settings.
  /** tabBar underline style */
  public tabBarUnderlineStyle?: any;
  @Prop({default: '#fff'})
  /** tabBar background color */
  public tabBarBackgroundColor?: string;
  @Prop({default: ''})
  /** tabBar active text color */
  public tabBarActiveTextColor?: string;
  @Prop({default: ''})
  /** tabBar inactive text color */
  public tabBarInactiveTextColor?: string;
  @Prop({
    default: () => {
      return {};
    }
  })
  /** tabBar text style */
  public tabBarTextStyle?: any;
  public instanceId: number;

  get layout(): HTMLDivElement {
    return this.$refs['layout'] as HTMLDivElement;
  }

  get onPan() {
    let lastOffset: number | string = 0;
    let finalOffset = 0;

    const getLastOffset = (isVertical = this.isTabBarVertical()) => {
      let offset = +`${lastOffset}`.replace('%', '');
      if (`${lastOffset}`.indexOf('%') >= 0) {
        offset /= 100;
        offset *= isVertical ? this.layout.clientHeight : this.layout.clientWidth;
      }
      return offset;
    };

    return {
      onPanStart: () => {
        this.isMoving = true;
      },

      onPanMove: (status: IGestureStatus) => {
        if (!status.moveStatus || !this.layout) {
          return;
        }
        const isVertical = this.isTabBarVertical();
        let offset = getLastOffset() + (isVertical ? status.moveStatus.y : status.moveStatus.x);
        const canScrollOffset = isVertical ?
            -this.layout.scrollHeight + this.layout.clientHeight :
            -this.layout.scrollWidth + this.layout.clientWidth;
        offset = Math.min(offset, 0);
        offset = Math.max(offset, canScrollOffset);
        setPxStyle(this.layout, offset, 'px', isVertical);
        finalOffset = offset;
        this.showPrev = -offset > 0;
        this.showNext = offset > canScrollOffset;
      },

      onPanEnd: () => {
        const isVertical = this.isTabBarVertical();
        lastOffset = finalOffset;
        this.isMoving = false;
        this.transform = getPxStyle(finalOffset, 'px', isVertical);
      },

      setCurrentOffset: (offset: number | string) => lastOffset = offset
    };
  }

  private isMoving: boolean = false;
  private showPrev: boolean = false;
  private showNext: boolean = false;
  private transform: string = '';

  public created() {
    this.getTransformByIndex();
    this.instanceId = instanceId++;
  }

  public beforeUpdate() {
    if (
        this.activeTab !== this.activeTab ||
        this.tabs !== this.tabs ||
        this.tabs.length !== this.tabs.length
    ) {
      this.getTransformByIndex();
    }
  }

  public getTransformByIndex() {
    const {activeTab, tabs, page = 0} = this;
    const isVertical = this.isTabBarVertical();

    const size = this.getTabSize(page, tabs.length);
    const center = page / 2;
    const pos = Math.min(activeTab, tabs.length - center - .5);
    const skipSize = Math.min(-(pos - center + .5) * size, 0);
    this.onPan.setCurrentOffset(`${skipSize}%`);
    this.transform = getPxStyle(skipSize, '%', isVertical);
    this.showPrev = activeTab > center - .5 && tabs.length > page;
    this.showNext = activeTab < tabs.length - center - .5 && tabs.length > page;
  }

  public onPress(index: number) {
    const {goToTab, tabs} = this;
    this.$emit('tabClick', tabs[index], index);
    goToTab && goToTab(index);
  }

  public isTabBarVertical(position = this.tabBarPosition) {
    return position === 'left' || position === 'right';
  }

  public nativeRenderTab(t: Models.TabData, i: number, size: number, isTabBarVertical: boolean) {
    const {
      prefixCls, renderTab, activeTab,
      tabBarTextStyle,
      tabBarActiveTextColor,
      tabBarInactiveTextColor,
      instanceId
    } = this;

    const textStyle = {...tabBarTextStyle} as any;
    let cls = `${prefixCls}-tab`;
    let ariaSelected = false;
    const style: any = {
      ...textStyle,
      ...isTabBarVertical ? {height: `${size}%`} : {width: `${size}%`}
    };
    if (this.card && this.activeCardColor) {
      style.borderColor = this.activeCardColor;
    }
    if (this.card) {
      cls += ` ${cls}-card`;
    }
    if (activeTab === i) {
      cls += ` ${cls}-active`;
      ariaSelected = true;
      if (tabBarActiveTextColor) {
        textStyle.color = tabBarActiveTextColor;
      }
      style.backgroundColor = this.activeCardColor;
    } else if (tabBarInactiveTextColor) {
      textStyle.color = tabBarInactiveTextColor;
    }
    return <div key={`t_${i}`}
                style={style}
                id={`m-tabs-${instanceId}-${i}`}
                role={'tab'}
                aria-selected={ariaSelected}
                class={cls}
                onClick={() => this.onPress(i)}>
      {renderTab ? renderTab(t) : t.title}
    </div>;
  }

  public getTabSize(page: number, tabLength: number) {
    return 100 / Math.min(page, tabLength);
  }

  public render() {
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
        <div role={'tablist'} class={`${prefixCls}-content`} style={transformStyle}
             ref={'layout'}>
          {Tabs}
          {
            renderUnderline ? <div {...underlineProps}/> : ''
          }
        </div>
      </Gesture>
      {showNext && <div class={`${prefixCls}-nextpage`}/>}
    </div>;
  }
}
