import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import List from '../../list';
import Radio from './radio';
const ListItem = List.Item;
let RadioItem = class RadioItem extends Vue {
    onChange(value) {
        this.$emit('change', value);
    }
    onClick(e) {
        if (!this.disabled) {
            this.$emit('click');
        }
    }
    render() {
        const _a = this.$props, { listPrefixCls, disabled, radioProps } = _a, otherProps = tslib_1.__rest(_a, ["listPrefixCls", "disabled", "radioProps"]);
        const { prefixCls } = otherProps;
        const wrapCls = classnames(`${prefixCls}-item`, {
            [`${prefixCls}-item-disabled`]: disabled === true
        });
        const extraProps = {};
        ['name', 'disabled'].forEach(i => {
            if (i in this.$props) {
                extraProps[i] = this.$props[i];
            }
        });
        // @ts-ignore
        const extra = <Radio attrs={Object.assign({}, radioProps, extraProps)} value={this.value} onClick={this.onClick} onChange={this.onChange}/>;
        return (<ListItem attrs={Object.assign({}, otherProps)} prefixCls={listPrefixCls} class={wrapCls} extra={extra}>
        {this.$slots.default}
      </ListItem>);
    }
};
tslib_1.__decorate([
    Prop({ default: 'am-radio' })
], RadioItem.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ default: 'am-list' })
], RadioItem.prototype, "listPrefixCls", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return {};
        }
    })
], RadioItem.prototype, "radioProps", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], RadioItem.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], RadioItem.prototype, "value", void 0);
RadioItem = tslib_1.__decorate([
    Component({
        name: 'MRadioItem'
    })
], RadioItem);
export default RadioItem;
//# sourceMappingURL=radio-item.jsx.map