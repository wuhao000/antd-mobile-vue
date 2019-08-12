import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide, Watch } from 'vue-property-decorator';
import Tabs from '../../tabs';
import Item from './item';
let TabBar = class TabBar extends Vue {
    constructor() {
        super(...arguments);
        this.tabBar = this;
        this.store = {
            currentTab: -10000
        };
        this.content = [];
    }
    valueChanged(value) {
        this.store.currentTab = value;
    }
    setCurrentTab(tab) {
        this.store.currentTab = tab;
    }
    currentTabChanged(value) {
        if (this.$listeners.input) {
            this.$emit('input', value);
        }
        console.log(this.store.currentTab);
    }
    renderTabBar() {
        let cls = `${this.prefixCls}-bar`;
        if (this.hidden) {
            cls += ` ${this.prefixCls}-bar-hidden-${this.tabBarPosition}`;
        }
        return <div class={cls} style={{ backgroundColor: this.barTintColor }}>
      {this.$slots.default}
    </div>;
    }
    getTabs() {
        return this.$slots.default.map((c, index) => {
            const props = Object.assign({}, c.componentOptions.propsData);
            if (props.icon && !props.selectedIcon) {
                props.selectedIcon = props.icon;
            }
            return {
                props,
                onClick: () => {
                    this.store.currentTab = index;
                }
            };
        });
    }
    mounted() {
        if (this.$slots.default) {
            this.content = this.$slots.default.filter(it => it.context).map(it => it.componentInstance.$slots.default || it.componentInstance.$slots.content || '');
        }
    }
    render() {
        const { prefixCls, animated, swipeable, noRenderContent, prerenderingSiblingsNumber, tabBarPosition } = this;
        const tabs = this.getTabs();
        return (<div class={prefixCls}>
        <Tabs tabs={tabs} renderTabBar={this.renderTabBar} tabBarPosition={tabBarPosition} page={this.store.currentTab < 0 ? undefined : this.store.currentTab} animated={animated} swipeable={swipeable} noRenderContent={noRenderContent} prerenderingSiblingsNumber={prerenderingSiblingsNumber}>
          {this.content}
        </Tabs>
      </div>);
    }
};
TabBar.Item = Item;
tslib_1.__decorate([
    Prop({ default: 'am-tab-bar' })
], TabBar.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop()
], TabBar.prototype, "className", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], TabBar.prototype, "hidden", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '正在加载' })
], TabBar.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Prop()
], TabBar.prototype, "noRenderContent", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 1 })
], TabBar.prototype, "prerenderingSiblingsNumber", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'white' })
], TabBar.prototype, "barTintColor", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '#108ee9' })
], TabBar.prototype, "tintColor", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '#888' })
], TabBar.prototype, "unselectedTintColor", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'bottom' })
], TabBar.prototype, "tabBarPosition", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], TabBar.prototype, "animated", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], TabBar.prototype, "swipeable", void 0);
tslib_1.__decorate([
    Provide('tabBar')
], TabBar.prototype, "tabBar", void 0);
tslib_1.__decorate([
    Provide('store')
], TabBar.prototype, "store", void 0);
tslib_1.__decorate([
    Prop({ type: [Number, String] })
], TabBar.prototype, "value", void 0);
tslib_1.__decorate([
    Watch('value', { immediate: true })
], TabBar.prototype, "valueChanged", null);
tslib_1.__decorate([
    Watch('store.currentTab')
], TabBar.prototype, "currentTabChanged", null);
TabBar = tslib_1.__decorate([
    Component({
        name: 'MTabBar'
    })
], TabBar);
export default TabBar;
//# sourceMappingURL=index.jsx.map