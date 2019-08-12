import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Gesture from '../../vmc-gesture';
import { DIRECTION_DOWN, DIRECTION_LEFT, DIRECTION_RIGHT, DIRECTION_UP } from '../../vmc-gesture/config';
import DefaultTabBar from './default-tab-bar';
import TabPane from './tab-pane';
import { getTransformPropValue, setPxStyle, setTransform } from './utils';
let instanceId = 0;
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
let Tabs = class Tabs extends Vue {
    constructor() {
        super(...arguments);
        this.contentPos = '';
        this.isMoving = false;
        this.tabCache = {};
        this.currentTab = this.getTabIndex();
    }
    created() {
        this.nextCurrentTab = this.currentTab;
        this.instanceId = instanceId++;
        this.contentPos = this.getContentPosByIndex(this.getTabIndex(), this.isTabVertical(this.tabDirection), this.useLeftInsteadTransform);
    }
    pageChanged(page) {
        if (page !== undefined && page !== null) {
            this.currentTab = page;
        }
    }
    currentTabChanged(index) {
        this.$emit('input', index);
    }
    /** on tab click */
    onTabClick(tab, index) {
        this.$emit('tab-click', index);
    }
    getTabIndex() {
        const { page, value, tabs } = this;
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
    }
    isTabVertical(direction = this.tabDirection) {
        return direction === 'vertical';
    }
    shouldRenderTab(idx) {
        const { prerenderingSiblingsNumber = 0 } = this;
        const { currentTab = 0 } = this;
        return currentTab - prerenderingSiblingsNumber <= idx && idx <= currentTab + prerenderingSiblingsNumber;
    }
    beforeUpdate() {
        if (this.page !== this.page && this.page !== undefined) {
            this.baseGoToTab(this.getTabIndex(), true, {});
        }
    }
    componentDidMount() {
        this.prevCurrentTab = this.currentTab;
    }
    updated() {
        this.prevCurrentTab = this.currentTab;
    }
    getOffsetIndex(current, width, threshold = this.distanceToChangeTab || 0) {
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
    baseGoToTab(index, force = false, newState = {}) {
        if (!force && this.nextCurrentTab === index) {
            return false;
        }
        this.nextCurrentTab = index;
        const { tabs } = this;
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
    getTabBarBaseProps() {
        const { animated, tabBarActiveTextColor, tabBarBackgroundColor, tabBarInactiveTextColor, tabBarPosition, tabBarTextStyle, tabBarUnderlineStyle, tabs } = this;
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
    getSubElements() {
        const children = this.$slots.default;
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
    }
    getSubElement(tab, index, defaultPrefix = '$i$-', allPrefix = '$ALL$') {
        const key = (tab.key !== null && tab.key !== undefined && tab.key !== '') ? tab.key : `${defaultPrefix}${index}`;
        const getSubElements = this.getSubElements();
        const elements = getSubElements(defaultPrefix, allPrefix);
        let component = elements[key] || elements[allPrefix];
        if (component instanceof Function) {
            component = component(tab, index);
        }
        return component || null;
    }
    get layout() {
        return this.$refs['layout'];
    }
    get onPan() {
        let lastOffset = 0;
        let finalOffset = 0;
        let panDirection;
        const getLastOffset = (isVertical = this.isTabVertical()) => {
            let offset = +`${lastOffset}`.replace('%', '');
            if (`${lastOffset}`.indexOf('%') >= 0) {
                offset /= 100;
                offset *= isVertical ? this.layout.clientHeight : this.layout.clientWidth;
            }
            return offset;
        };
        return {
            onPanStart: (status) => {
                if (!this.swipeable || !this.animated) {
                    return;
                }
                panDirection = getPanDirection(status.direction);
                this.isMoving = true;
            },
            onPanMove: (status) => {
                const { swipeable, animated, useLeftInsteadTransform } = this;
                if (!status.moveStatus || !this.layout || !swipeable || !animated) {
                    return;
                }
                const isVertical = this.isTabVertical();
                let offset = getLastOffset();
                if (isVertical) {
                    offset += panDirection === 'horizontal' ? 0 : status.moveStatus.y;
                }
                else {
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
                        setTransform(this.layout.style, this.getContentPosByIndex(offsetIndex, this.isTabVertical(), this.useLeftInsteadTransform));
                    }
                }
                else {
                    this.goToTab(offsetIndex);
                }
            },
            setCurrentOffset: (offset) => lastOffset = offset
        };
    }
    goToTab(index, force = false, usePaged = this.usePaged) {
        const { tabDirection, useLeftInsteadTransform } = this;
        let newState = {};
        if (usePaged) {
            newState = {
                contentPos: this.getContentPosByIndex(index, this.isTabVertical(tabDirection), useLeftInsteadTransform)
            };
        }
        return this.baseGoToTab(index, force, newState);
    }
    tabClickGoToTab(index) {
        this.goToTab(index, false, true);
    }
    getContentPosByIndex(index, isVertical, useLeft = false) {
        const value = `${-index * 100}%`;
        this.onPan.setCurrentOffset(value);
        if (useLeft) {
            return `${value}`;
        }
        else {
            const translate = isVertical ? `0px, ${value}` : `${value}, 0px`;
            // fix: content overlay TabBar on iOS 10. ( 0px -> 1px )
            return `translate3d(${translate}, 1px)`;
        }
    }
    onSwipe(status) {
        const { tabBarPosition, swipeable, usePaged } = this;
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
    renderContent() {
        const { prefixCls, tabs, animated, destroyInactiveTab, useLeftInsteadTransform } = this;
        const { currentTab, isMoving, contentPos } = this;
        const isTabVertical = this.isTabVertical();
        let contentCls = `${prefixCls}-content-wrap`;
        if (animated && !isMoving) {
            contentCls += ` ${contentCls}-animated`;
        }
        const contentStyle = animated ? (useLeftInsteadTransform ? Object.assign({ position: 'relative' }, this.isTabVertical() ? { top: contentPos } : { left: contentPos }) : getTransformPropValue(contentPos)) : Object.assign({ position: 'relative' }, this.isTabVertical() ? { top: `${-currentTab * 100}%` } : { left: `${-currentTab * 100}%` });
        const { instanceId } = this.getTabBarBaseProps();
        return <div class={contentCls} style={contentStyle} ref={'layout'}>
      {tabs && tabs.map((tab, index) => {
            let cls = `${prefixCls}-pane-wrap`;
            if (this.currentTab === index) {
                cls += ` ${cls}-active`;
            }
            else {
                cls += ` ${cls}-inactive`;
            }
            const key = tab.key || `tab_${index}`;
            // update tab cache
            if (this.shouldRenderTab(index)) {
                this.tabCache[index] = this.getSubElement(tab, index);
            }
            else if (destroyInactiveTab) {
                this.tabCache[index] = undefined;
            }
            return <TabPane key={key} class={cls} active={currentTab === index} role={'tabpanel'} aria-hidden={currentTab !== index} aria-labelledby={`m-tabs-${instanceId}-${index}`} fixX={isTabVertical} fixY={!isTabVertical}>
            {this.tabCache[index]}
          </TabPane>;
        })}
    </div>;
    }
    render() {
        const { prefixCls, tabBarPosition, tabDirection, useOnPan } = this;
        const isTabVertical = this.isTabVertical(tabDirection);
        const tabBarProps = Object.assign({}, this.getTabBarBaseProps());
        const onPan = !isTabVertical && useOnPan ? this.onPan : {};
        const content = [
            <div key={'tabBar'} class={`${prefixCls}-tab-bar-wrap`}>
        {this.renderTabBar ? this.renderTabBar(tabBarProps)
                : <DefaultTabBar attrs={tabBarProps} on={{
                    tabClick: (tab, index) => {
                        this.onTabClick(tab, index);
                    }
                }}/>}
      </div>,
            <Gesture key={'$content'} onSwipe={this.onSwipe} {...{ props: onPan }}>
        {this.renderContent()}
      </Gesture>
        ];
        return <div class={`${prefixCls} ${prefixCls}-${tabDirection} ${prefixCls}-${tabBarPosition}`}>
      {tabBarPosition === 'top' || tabBarPosition === 'left' ? content : content.reverse()}
    </div>;
    }
};
Tabs.DefaultTabBar = DefaultTabBar;
tslib_1.__decorate([
    Prop({ type: Boolean })
], Tabs.prototype, "card", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Tabs.prototype, "activeCardColor", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-tabs' })
], Tabs.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], Tabs.prototype, "useOnPan", void 0);
tslib_1.__decorate([
    Prop()
], Tabs.prototype, "renderTabBar", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return [];
        }
    })
], Tabs.prototype, "tabs", void 0);
tslib_1.__decorate([
    Prop({ default: 'top' })
], Tabs.prototype, "tabBarPosition", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Number], default: 0 })
], Tabs.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ type: Number })
], Tabs.prototype, "page", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], Tabs.prototype, "swipeable", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 1 })
], Tabs.prototype, "prerenderingSiblingsNumber", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], Tabs.prototype, "animated", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Tabs.prototype, "destroyInactiveTab", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 0.3 })
], Tabs.prototype, "distanceToChangeTab", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], Tabs.prototype, "usePaged", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'horizontal' })
], Tabs.prototype, "tabDirection", void 0);
tslib_1.__decorate([
    Prop({ type: Object })
], Tabs.prototype, "tabBarUnderlineStyle", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Tabs.prototype, "tabBarBackgroundColor", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Tabs.prototype, "tabBarActiveTextColor", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Tabs.prototype, "tabBarInactiveTextColor", void 0);
tslib_1.__decorate([
    Prop({ type: Object })
], Tabs.prototype, "tabBarTextStyle", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Tabs.prototype, "useLeftInsteadTransform", void 0);
tslib_1.__decorate([
    Watch('page')
], Tabs.prototype, "pageChanged", null);
tslib_1.__decorate([
    Watch('currentTab')
], Tabs.prototype, "currentTabChanged", null);
Tabs = tslib_1.__decorate([
    Component({
        name: 'Tabs'
    })
], Tabs);
export default Tabs;
//# sourceMappingURL=index.jsx.map