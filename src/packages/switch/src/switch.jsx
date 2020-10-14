import { __rest } from "tslib";
import { formComponentProps, useFormComponent } from '../../mixins/form-component';
import classnames from 'classnames';
import { defineComponent } from 'vue';
const Switch = defineComponent({
    name: 'MSwitch',
    props: Object.assign(Object.assign({}, formComponentProps), { color: {
            type: String
        }, name: {
            type: String
        }, prefixCls: {
            type: String,
            default: 'am-switch'
        }, platform: {
            type: String,
            default: 'ios'
        } }),
    setup(props, ctx) {
        const { currentValue } = useFormComponent(props, ctx);
        const onChange = (e) => {
            currentValue.value = e.target.checked;
        };
        const onClick = (e) => {
            let val;
            // tslint:disable-next-line:prefer-conditional-expression
            if (e && e.target && e.target.checked !== undefined) {
                val = e.target.checked;
            }
            else {
                val = props.value;
            }
            currentValue.value = val;
        };
        return { currentValue, onChange, onClick };
    },
    render() {
        const _a = this, { prefixCls, name, disabled, platform, color } = _a, restProps = __rest(_a, ["prefixCls", "name", "disabled", "platform", "color"]);
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
        if (color && this.currentValue) {
            style.backgroundColor = color;
        }
        return (<label class={wrapCls}>
        <input type="checkbox" name={name} class={`${prefixCls}-checkbox`} disabled={disabled} checked={this.currentValue} onChange={this.onChange} value={this.currentValue ? 'on' : 'off'} {...(!disabled ? { onClick: this.onClick } : {})} {...globalProps}/>
        <div class={fackInputCls} style={style} {...(disabled ? { onClick: this.onClick } : {})}/>
      </label>);
    }
});
export default Switch;
//# sourceMappingURL=switch.jsx.map