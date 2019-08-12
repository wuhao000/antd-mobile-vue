import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Gesture from '../../vmc-gesture';
import { getPxStyle, getTransformPropValue, setPxStyle } from './utils';
let instanceId = 0;
let DefaultTabBar = class DefaultTabBar extends Vue {
    constructor() {
        super(...arguments);
        this.isMoving = false;
        this.showPrev = false;
        this.showNext = false;
        this.transform = '';
    }
    get layout() {
        return this.$refs['layout'];
    }
    get onPan() {
        let lastOffset = 0;
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
            onPanMove: (status) => {
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
            setCurrentOffset: (offset) => lastOffset = offset
        };
    }
    created() {
        this.getTransformByIndex();
        this.instanceId = instanceId++;
    }
    getTransformByIndex() {
        const { activeTab, tabs, page = 0 } = this;
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
    onPress(index) {
        const { goToTab, tabs } = this;
        this.$emit('tabClick', tabs[index], index);
        goToTab && goToTab(index);
    }
    isTabBarVertical(position = this.tabBarPosition) {
        return position === 'left' || position === 'right';
    }
    nativeRenderTab(t, i, size, isTabBarVertical) {
        const { prefixCls, renderTab, activeTab, tabBarTextStyle, tabBarActiveTextColor, tabBarInactiveTextColor, instanceId } = this;
        const textStyle = Object.assign({}, tabBarTextStyle);
        let cls = `${prefixCls}-tab`;
        let ariaSelected = false;
        const style = Object.assign({}, textStyle, isTabBarVertical ? { height: `${size}%` } : { width: `${size}%` });
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
        }
        else if (tabBarInactiveTextColor) {
            textStyle.color = tabBarInactiveTextColor;
        }
        return <div key={`t_${i}`} style={style} id={`m-tabs-${instanceId}-${i}`} role={'tab'} aria-selected={ariaSelected} class={cls} onClick={() => this.onPress(i)}>
      {renderTab ? renderTab(t) : t.title}
    </div>;
    }
    getTabSize(page, tabLength) {
        return 100 / Math.min(page, tabLength);
    }
    activeTabChanged() {
        this.getTransformByIndex();
    }
    tabsChanged() {
        this.getTransformByIndex();
    }
    render() {
        const { prefixCls, animated, tabs = [], page = 0, activeTab = 0, tabBarBackgroundColor, tabBarUnderlineStyle, tabBarPosition } = this;
        const renderUnderline = !this.card && this.renderUnderline;
        const { isMoving, transform, showNext, showPrev } = this;
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
        };
        const transformStyle = needScroll ? Object.assign({}, getTransformPropValue(transform)) : {};
        const _a = this.onPan, { setCurrentOffset } = _a, onPan = tslib_1.__rest(_a, ["setCurrentOffset"]);
        const underlineProps = {
            style: Object.assign({}, isTabBarVertical ? { height: `${size}%` } : { width: `${size}%` }, isTabBarVertical ? { top: `${size * activeTab}%` } : { left: `${size * activeTab}%` }, tabBarUnderlineStyle),
            class: `${prefixCls}-underline`
        };
        return <div class={`${cls} ${prefixCls}-${tabBarPosition}`} style={style}>
      {showPrev && <div class={`${prefixCls}-prevpage`}/>}
      <Gesture {...onPan} direction={isTabBarVertical ? 'vertical' : 'horizontal'}>
        <div role={'tablist'} class={`${prefixCls}-content`} style={transformStyle} ref={'layout'}>
          {Tabs}
          {renderUnderline ? <div {...underlineProps}/> : ''}
        </div>
      </Gesture>
      {showNext && <div class={`${prefixCls}-nextpage`}/>}
    </div>;
    }
};
tslib_1.__decorate([
    Prop({ type: Boolean })
], DefaultTabBar.prototype, "card", void 0);
tslib_1.__decorate([
    Prop(String)
], DefaultTabBar.prototype, "activeCardColor", void 0);
tslib_1.__decorate([
    Prop({ default: 'am-tabs-default-bar' })
], DefaultTabBar.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
        }
    })
], DefaultTabBar.prototype, "goToTab", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return [];
        }
    })
], DefaultTabBar.prototype, "tabs", void 0);
tslib_1.__decorate([
    Prop({ default: 0 })
], DefaultTabBar.prototype, "activeTab", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], DefaultTabBar.prototype, "animated", void 0);
tslib_1.__decorate([
    Prop()
], DefaultTabBar.prototype, "renderTab", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], DefaultTabBar.prototype, "renderUnderline", void 0);
tslib_1.__decorate([
    Prop({ default: 5 })
], DefaultTabBar.prototype, "page", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'top' })
], DefaultTabBar.prototype, "tabBarPosition", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return {};
        }
    })
], DefaultTabBar.prototype, "tabBarUnderlineStyle", void 0);
tslib_1.__decorate([
    Prop({ default: '#fff' })
], DefaultTabBar.prototype, "tabBarBackgroundColor", void 0);
tslib_1.__decorate([
    Prop({ default: '' })
], DefaultTabBar.prototype, "tabBarActiveTextColor", void 0);
tslib_1.__decorate([
    Prop({ default: '' })
], DefaultTabBar.prototype, "tabBarInactiveTextColor", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return {};
        }
    })
], DefaultTabBar.prototype, "tabBarTextStyle", void 0);
tslib_1.__decorate([
    Watch('activeTab')
], DefaultTabBar.prototype, "activeTabChanged", null);
tslib_1.__decorate([
    Watch('tabs')
], DefaultTabBar.prototype, "tabsChanged", null);
DefaultTabBar = tslib_1.__decorate([
    Component({
        name: 'DefaultTabBar'
    })
], DefaultTabBar);
export default DefaultTabBar;
//# sourceMappingURL=default-tab-bar.jsx.map