import * as tslib_1 from "tslib";
/* tslint:disable:jsx-no-multiline-js */
import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import TouchFeedback from '../../vmc-feedback';
let Brief = class Brief extends Vue {
    render() {
        return (<div class={'am-list-brief'}>
          {this.$slots.default}
        </div>);
    }
};
tslib_1.__decorate([
    Prop()
], Brief.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop()
], Brief.prototype, "role", void 0);
Brief = tslib_1.__decorate([
    Component({
        name: 'Brief'
    })
], Brief);
export { Brief };
let ListItem = class ListItem extends Vue {
    constructor() {
        super(...arguments);
        this.coverRippleStyle = { display: 'none' };
        this.rippleClicked = false;
    }
    beforeDestroy() {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = null;
        }
    }
    onClick(ev) {
        const isAndroid = this.platform === 'android';
        if (isAndroid) {
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
                this.debounceTimeout = null;
            }
            const Item = ev.currentTarget;
            const RippleWidth = Math.max(Item.offsetHeight, Item.offsetWidth);
            const ClientRect = ev.currentTarget.getBoundingClientRect();
            const pointX = ev.clientX - ClientRect.left - Item.offsetWidth / 2;
            const pointY = ev.clientY - ClientRect.top - Item.offsetWidth / 2;
            this.coverRippleStyle = {
                width: `${RippleWidth}px`,
                height: `${RippleWidth}px`,
                left: `${pointX}px`,
                top: `${pointY}px`
            };
            this.rippleClicked = true;
            this.debounceTimeout = setTimeout(() => {
                this.coverRippleStyle = { display: 'none' };
                this.rippleClicked = false;
            }, 1000);
        }
        this.$emit('click');
    }
    render() {
        const { prefixCls, activeStyle, error, align, wrap, disabled, multipleLine, thumb, arrow } = this.$props;
        const { coverRippleStyle, rippleClicked } = this;
        const section = this.$parent['section'];
        const wrapCls = classNames(`${prefixCls}-item`, `${prefixCls}-item-label-` + this.labelPosition, {
            [`${prefixCls}-item-disabled`]: disabled,
            [`${prefixCls}-item-error`]: error,
            [`${prefixCls}-item-top`]: align === 'top',
            [`${prefixCls}-item-middle`]: align === 'middle',
            [`${prefixCls}-item-bottom`]: align === 'bottom',
            [`${prefixCls}-item-section`]: section,
            [`${prefixCls}-item-extra-left`]: this.extraPosition === 'left',
            [`${prefixCls}-item-extra-center`]: this.extraPosition === 'center',
            [`${prefixCls}-item-extra-right`]: this.extraPosition === 'right'
        });
        const rippleCls = classNames(`${prefixCls}-ripple`, {
            [`${prefixCls}-ripple-animate`]: rippleClicked
        });
        const lineCls = classNames(`${prefixCls}-line`, {
            [`${prefixCls}-line-multiple`]: multipleLine,
            [`${prefixCls}-line-wrap`]: wrap
        });
        const arrowCls = classNames(`${prefixCls}-arrow`, {
            [`${prefixCls}-arrow-horizontal`]: arrow === 'horizontal',
            [`${prefixCls}-arrow-vertical`]: arrow === 'down' || arrow === 'up',
            [`${prefixCls}-arrow-vertical-up`]: arrow === 'up'
        });
        const content = (<div onClick={ev => {
            this.onClick(ev);
        }} class={wrapCls}>
          {this.renderThumb()}
          <div class={lineCls}>
            {this.renderLabel()}
            {this.renderExtra()}
            {this.error ? (<div class={`${prefixCls}-error-extra`} onClick={(e) => {
            if (this.errorMessage && this.$toast) {
                this.$toast.info(this.errorMessage);
            }
            this.$emit('error-click', e);
        }}/>) : null}
            {arrow && <div class={arrowCls} aria-hidden={'true'}/>}
          </div>
          <div style={coverRippleStyle} class={rippleCls}/>
        </div>);
        return (
        // @ts-ignore
        <TouchFeedback disabled={disabled || !this.$listeners.click || !this.touchFeedback || (this.list && !this.list.touchFeedback)} activeStyle={activeStyle} activeClassName={`${prefixCls}-item-active`}>
          {content}
        </TouchFeedback>);
    }
    renderExtra() {
        return (this.$slots.extra !== undefined || this.extra) ? (<div style={this.extraStyle} class={classNames(`${this.prefixCls}-extra`, {
            [this.prefixCls + '-extra-text']: this.text
        })}>{this.$slots.extra || this.extra}</div>) : null;
    }
    renderThumb() {
        const { thumb, prefixCls } = this;
        if (this.$slots.thumb) {
            return <div class={`${prefixCls}-thumb`}>{this.$slots.thumb}</div>;
        }
        else if (thumb) {
            return <div class={`${prefixCls}-thumb`}>
        {typeof thumb === 'string' ? <img src={thumb}/> : thumb}
      </div>;
        }
        else {
            return null;
        }
    }
    renderLabel() {
        if (this.$slots.default !== undefined) {
            return (<div class={`${this.prefixCls}-content`} style={this.contentStyle}>{this.$slots.default}</div>);
        }
        else if (this.title) {
            return (<div class={`${this.prefixCls}-content`} style={this.contentStyle}>{this.title}</div>);
        }
        else {
            return null;
        }
    }
};
ListItem.Brief = Brief;
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], ListItem.prototype, "text", void 0);
tslib_1.__decorate([
    Prop({ default: 'am-list' })
], ListItem.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], ListItem.prototype, "role", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'iOS' })
], ListItem.prototype, "platform", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Object] })
], ListItem.prototype, "thumb", void 0);
tslib_1.__decorate([
    Prop([String, Object])
], ListItem.prototype, "extra", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'right' })
], ListItem.prototype, "extraPosition", void 0);
tslib_1.__decorate([
    Prop({ type: Object })
], ListItem.prototype, "activeStyle", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], ListItem.prototype, "multipleLine", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], ListItem.prototype, "error", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], ListItem.prototype, "errorMessage", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], ListItem.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'middle' })
], ListItem.prototype, "align", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], ListItem.prototype, "wrap", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], ListItem.prototype, "arrow", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '' })
], ListItem.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'left' })
], ListItem.prototype, "labelPosition", void 0);
tslib_1.__decorate([
    Inject({
        from: 'list', default: undefined
    })
], ListItem.prototype, "list", void 0);
tslib_1.__decorate([
    Prop({
        type: Object, default: () => {
            return {};
        }
    })
], ListItem.prototype, "contentStyle", void 0);
tslib_1.__decorate([
    Prop({
        type: Object, default: () => {
            return {};
        }
    })
], ListItem.prototype, "extraStyle", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], ListItem.prototype, "touchFeedback", void 0);
ListItem = tslib_1.__decorate([
    Component({
        name: 'ListItem'
    })
], ListItem);
export default ListItem;
//# sourceMappingURL=list-item.jsx.map