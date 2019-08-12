import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Popup from '../../popup';
import TouchFeedback from '../../vmc-feedback';
let ActionSheet = class ActionSheet extends Vue {
    constructor() {
        super(...arguments);
        this.$tabbar = null;
        this.hasHeaderSlot = false;
        this.show = this.value || false;
    }
    cancelClick() {
        this.$emit('input', false);
        this.show = false;
    }
    showChanged(val) {
        this.$emit('input', val);
        if (val) {
            this.fixIos(-1);
        }
        else {
            setTimeout(() => {
                this.fixIos(100);
            }, 200);
        }
    }
    valueChanged(val) {
        this.show = val;
    }
    mounted() {
        this.hasHeaderSlot = !!this.$slots.header;
        this.$nextTick(() => {
            this.$tabbar = document.querySelector('.weui-tabbar');
            this.$refs.iOSMenu && this.$refs.iOSMenu.addEventListener('transitionend', this.onTransitionEnd);
        });
    }
    beforeDestroy() {
        this.fixIos(100);
        this.$refs.iOSMenu && this.$refs.iOSMenu.removeEventListener('transitionend', this.onTransitionEnd);
    }
    emitEvent(event, menu, item) {
        if (event === 'on-click-menu' && !/.noop/.test(menu)) {
            let _item = item;
            if (typeof _item === 'object') {
                _item = JSON.parse(JSON.stringify(_item));
            }
            this.$emit(event, menu, _item);
            this.$emit(`${event}-${menu}`);
            this.closeOnClickingMenu && (this.show = false);
        }
    }
    fixIos(zIndex) {
        if (this.$el.parentNode && this.$el.parentNode.className.indexOf('v-transfer-dom') !== -1) {
            return;
        }
        if (this.$tabbar && /iphone/i.test(navigator.userAgent)) {
            this.$tabbar.style.zIndex = zIndex;
        }
    }
    onClickingMask() {
        this.$emit('click-mask');
        this.closeOnClickingMask && (this.show = false);
    }
    onMenuClick(text, key) {
        if (typeof text === 'string') {
            this.emitEvent('click-menu', key, text);
        }
        else {
            if (text.type !== 'disabled' && text.type !== 'info') {
                if (text.value || text.value === 0) {
                    this.emitEvent('click-menu', text.value, text);
                }
                else {
                    this.emitEvent('click-menu', '', text);
                    this.show = false;
                }
            }
        }
    }
    onTransitionEnd() {
        this.$emit(this.show ? 'on-after-show' : 'on-after-hide');
    }
    get showStyle() {
        const style = {};
        if (!this.show) {
            style.display = 'none';
        }
        return style;
    }
    renderSheet() {
        if (this.theme === 'android') {
            return <div class={'weui-skin_android'}>
        <transition name={'vux-android-actionsheet'} onAfterEnter={() => {
                this.$emit('after-show');
            }} onAfterLeave={() => {
                this.$emit('after-hide');
            }}>
          <div style={this.showStyle} class={'weui-actionsheet'}>
            <div class={'weui-actionsheet__menu'}>
              {this.renderButtons()}
            </div>
          </div>
        </transition>
      </div>;
        }
        else {
            return <div ref={'iOSMenu'}>
        <div class={'am-action-sheet-content'}>
          <div class={'am-action-sheet-body'}>
            <div>
              {this.renderTitle()}
              {this.renderButtons()}
            </div>
          </div>
        </div>
      </div>;
        }
    }
    render() {
        const classes = 'am-action-sheet am-action-sheet-' + this.type;
        // @ts-ignore
        return <Popup value={this.show} wrapClassName={classes} onCancel={this.cancelClick}>
      <div>
        {this.renderSheet()}
      </div>
    </Popup>;
    }
    get listClassPrefix() {
        return this.prefixCls + '-button-list';
    }
    renderButtons() {
        return (<div class={this.listClassPrefix} role={'group'}>
      {this.menus.map(it => this.renderMenu(it))}
      {this.showCancel ? this.renderCancelButton() : null}
    </div>);
    }
    renderTitle() {
        return this.title ? <div class={this.prefixCls + '-message'}>{this.title}</div> : null;
    }
    renderMenu(menu) {
        const MTouchFeedback = TouchFeedback;
        const itemClassPrefix = this.listClassPrefix + '-item';
        const classes = {
            [itemClassPrefix]: true,
            [this.listClassPrefix + '-badge']: menu.badge
        };
        return <MTouchFeedback activeClassName={itemClassPrefix + '-active'}>
      <div class={classes} role={'button'}>
        <span class={itemClassPrefix + '-content'}>{menu.label}</span>
        {this.renderBadge(menu.badge)}
      </div>
    </MTouchFeedback>;
    }
    renderBadge(badge) {
        if (badge) {
            const supClass = typeof badge === 'boolean' ? 'am-badge-dot' : 'am-badge-text';
            return badge ? <span class={'am-badge am-badge-not-a-wrapper'}>
          <sup class={supClass}>
            {typeof badge === 'boolean' ? null : badge}
          </sup>
        </span> : null;
        }
    }
    renderCancelButton() {
        const MTouchFeedback = TouchFeedback;
        const itemClassPrefix = this.listClassPrefix + '-item';
        const classes = itemClassPrefix + ` ${this.prefixCls}-cancel-button`;
        return <MTouchFeedback activeClassName={itemClassPrefix + '-active'}>
      <div class={classes} role={'button'} onClick={this.cancelClick}>
        <span class={itemClassPrefix + '-content'}>取消</span>
        <span class={this.prefixCls + '-cancel-button-mask'}/>
      </div>
    </MTouchFeedback>;
    }
};
tslib_1.__decorate([
    Prop({ type: String, default: 'am-action-sheet' })
], ActionSheet.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '取消' })
], ActionSheet.prototype, "cancelText", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: true
    })
], ActionSheet.prototype, "closeOnClickingMask", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: true
    })
], ActionSheet.prototype, "closeOnClickingMenu", void 0);
tslib_1.__decorate([
    Prop({
        type: [Object, Array],
        default: () => []
    })
], ActionSheet.prototype, "menus", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], ActionSheet.prototype, "showCancel", void 0);
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'ios'
    })
], ActionSheet.prototype, "theme", void 0);
tslib_1.__decorate([
    Prop(Boolean)
], ActionSheet.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'normal' })
], ActionSheet.prototype, "type", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], ActionSheet.prototype, "title", void 0);
tslib_1.__decorate([
    Watch('show')
], ActionSheet.prototype, "showChanged", null);
tslib_1.__decorate([
    Watch('value', {
        immediate: true
    })
], ActionSheet.prototype, "valueChanged", null);
ActionSheet = tslib_1.__decorate([
    Component({
        name: 'ActionSheet'
    })
], ActionSheet);
export default ActionSheet;
//# sourceMappingURL=index.jsx.map