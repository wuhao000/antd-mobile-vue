import { __rest } from "tslib";
import classnames from 'classnames';
import { defineComponent } from 'vue';
import Icon from '../../icon';
import RMCInputNumber from '../../vmc-input-number';
const MStepper = defineComponent({
    install: null,
    name: 'MStepper',
    props: {
        prefixCls: {
            type: String,
            default: 'am-stepper'
        },
        showNumber: {
            type: Boolean,
            default: true
        },
        min: {
            type: Number
        },
        max: {
            type: Number
        },
        step: {
            default: 1
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean
        },
        autoFocus: {
            type: Boolean
        },
        value: {
            type: [Number, String]
        },
        defaultValue: {
            type: Number
        },
        valueEditable: {
            type: Boolean,
            default: true
        },
        upStyle: {},
        downStyle: {},
        inputStyle: {},
        name: {
            type: String
        }
    },
    setup(props, { emit, slots }) {
        const getCurrentValue = () => {
            const value = props.value;
            let currentValue = null;
            if (typeof value === 'string') {
                if (value === '') {
                    currentValue = null;
                }
                else {
                    currentValue = parseInt(value);
                }
            }
            else {
                currentValue = value;
            }
            return currentValue;
        };
        return {
            getCurrentValue
        };
    },
    render() {
        const _a = this.$props, { showNumber, value } = _a, restProps = __rest(_a, ["showNumber", "value"]);
        const stepperClass = classnames({
            showNumber: !!showNumber
        });
        const props = Object.assign({}, restProps);
        props.upHandler = <Icon type="plus" size="xxs"/>;
        props.downHandler = <Icon type="minus" size="xxs"/>;
        return (<RMCInputNumber {...Object.assign(Object.assign(Object.assign({}, this.$attrs), props), { value: this.getCurrentValue() })} class={stepperClass}/>);
    }
});
export default MStepper;
//# sourceMappingURL=index.jsx.map