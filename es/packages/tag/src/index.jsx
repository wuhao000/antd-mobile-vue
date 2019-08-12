import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import Icon from '../../icon';
import getDataAttr from '../../utils/get-data-attr';
import TouchFeedback from '../../vmc-feedback';
let Tag = class Tag extends Vue {
    constructor() {
        super(...arguments);
        this.state = {
            selected: this.selected,
            closed: false
        };
    }
    selectedChanged(selected) {
        this.state.selected = selected;
    }
    onClick() {
        const { disabled } = this;
        if (disabled) {
            return;
        }
        const isSelect = this.state.selected;
        this.state.selected = !isSelect;
        this.$emit('change', !isSelect);
    }
    onTagClose() {
        this.state.closed = true;
        this.$emit('close');
    }
    render() {
        const { prefixCls, disabled, closable, small } = this;
        const wrapCls = classnames(prefixCls, {
            [`${prefixCls}-normal`]: !disabled && (!this.state.selected || small || closable),
            [`${prefixCls}-small`]: small,
            [`${prefixCls}-active`]: this.state.selected && !disabled && !small && !closable,
            [`${prefixCls}-disabled`]: disabled,
            [`${prefixCls}-closable`]: closable
        });
        const closableDom = closable && !disabled && !small ? (<TouchFeedback activeClassName={`${prefixCls}-close-active`}>
              <div class={`${prefixCls}-close`} role="button" onClick={this.onTagClose.bind(this)} aria-label="remove tag">
                <Icon type="cross-circle" size="xs" aria-hidden="true"/>
              </div>
            </TouchFeedback>) : null;
        return !this.state.closed ? (<div {...getDataAttr(this.$props)} class={wrapCls} onClick={this.onClick.bind(this)}>
          <div class={`${prefixCls}-text`}>{this.$slots.default}</div>
          {closableDom}
        </div>) : null;
    }
};
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'am-tag'
    })
], Tag.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Tag.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Tag.prototype, "selected", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Tag.prototype, "closable", void 0);
tslib_1.__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Tag.prototype, "small", void 0);
tslib_1.__decorate([
    Watch('selected')
], Tag.prototype, "selectedChanged", null);
Tag = tslib_1.__decorate([
    Component({
        name: 'Tag'
    })
], Tag);
export default Tag;
//# sourceMappingURL=index.jsx.map