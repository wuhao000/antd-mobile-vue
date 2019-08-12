import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import List from '../../list';
import Switch from './switch';
const ListItem = List.Item;
let SwitchItem = class SwitchItem extends Vue {
    constructor() {
        super(...arguments);
        this.state = {
            value: this.value
        };
    }
    valueChanged(value) {
        this.state.value = value;
    }
    stateValueChanged(value, oldValue) {
        this.$emit('input', value);
        if (value !== oldValue) {
            this.$emit('change', value);
        }
    }
    onClick(e) {
        if (!this.disabled) {
            this.$emit('click');
        }
    }
    render() {
        const _a = this.$props, { listPrefixCls, disabled, switchProps } = _a, otherProps = tslib_1.__rest(_a, ["listPrefixCls", "disabled", "switchProps"]);
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
        const extra = <Switch vModel={this.state.value} attrs={Object.assign({}, switchProps, extraProps, this.$attrs)} onClick={this.onClick}/>;
        return (<ListItem attrs={Object.assign({}, otherProps)} prefixCls={listPrefixCls} class={wrapCls} extra={extra}>
        {this.$slots.default}
      </ListItem>);
    }
};
tslib_1.__decorate([
    Prop({ default: 'am-switch' })
], SwitchItem.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ default: 'am-list' })
], SwitchItem.prototype, "listPrefixCls", void 0);
tslib_1.__decorate([
    Prop({
        default: () => {
            return {};
        }
    })
], SwitchItem.prototype, "switchProps", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], SwitchItem.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], SwitchItem.prototype, "value", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], SwitchItem.prototype, "title", void 0);
tslib_1.__decorate([
    Watch('value')
], SwitchItem.prototype, "valueChanged", null);
tslib_1.__decorate([
    Watch('state.value')
], SwitchItem.prototype, "stateValueChanged", null);
SwitchItem = tslib_1.__decorate([
    Component({
        name: 'SwitchItem'
    })
], SwitchItem);
export default SwitchItem;
//# sourceMappingURL=switch-item.jsx.map