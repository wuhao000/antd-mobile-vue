import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
let Switch = class Switch extends Vue {
    constructor() {
        super(...arguments);
        this.stateValue = this.value;
    }
    valueChanged(value) {
        this.stateValue = value;
    }
    stateValueChanged(value) {
        this.$emit('input', value);
        this.$emit('change', value);
    }
    onChange(e) {
        this.stateValue = e.target.checked;
    }
    onClick(e) {
        let val;
        // tslint:disable-next-line:prefer-conditional-expression
        if (e && e.target && e.target.checked !== undefined) {
            val = e.target.checked;
        }
        else {
            val = this.value;
        }
        this.stateValue = val;
    }
    render() {
        const _a = this, { prefixCls, name, disabled, platform, color } = _a, restProps = tslib_1.__rest(_a, ["prefixCls", "name", "disabled", "platform", "color"]);
        const wrapCls = classnames(prefixCls, {
            [`${prefixCls}-android`]: platform === 'android'
        });
        const fackInputCls = classnames('checkbox', {
            [`checkbox-disabled`]: disabled
        });
        const globalProps = Object.keys(restProps).reduce((prev, key) => {
            if (key.substr(0, 5) === 'aria-' ||
                key.substr(0, 5) === 'data-' ||
                key === 'role') {
                prev[key] = restProps[key];
            }
            return prev;
        }, {});
        const style = {};
        if (color && this.stateValue) {
            style.backgroundColor = color;
        }
        return (<label class={wrapCls}>
        <input type={'checkbox'} name={name} class={`${prefixCls}-checkbox`} disabled={disabled} checked={this.stateValue} onChange={this.onChange} value={this.stateValue ? 'on' : 'off'} {...(!disabled ? { onClick: this.onClick.bind(this) } : {})} {...globalProps}/>
        <div class={fackInputCls} style={style} {...(disabled ? { onClick: this.onClick.bind(this) } : {})}/>
      </label>);
    }
};
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], Switch.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Switch.prototype, "color", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Switch.prototype, "name", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-switch' })
], Switch.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'ios' })
], Switch.prototype, "platform", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], Switch.prototype, "value", void 0);
tslib_1.__decorate([
    Watch('value')
], Switch.prototype, "valueChanged", null);
tslib_1.__decorate([
    Watch('stateValue')
], Switch.prototype, "stateValueChanged", null);
Switch = tslib_1.__decorate([
    Component({
        name: 'MSwitch'
    })
], Switch);
export default Switch;
//# sourceMappingURL=switch.jsx.map