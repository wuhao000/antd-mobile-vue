import { defineComponent, getCurrentInstance, onMounted, watch } from 'vue';
import List from '../../list';
import { optionsBasedComponentProps, useOptionsBaseComponent } from '../../mixins/options-based-component';
import CheckboxItem from './checkbox-item';
const MCheckboxList = defineComponent({
    name: 'MCheckboxList',
    props: Object.assign(Object.assign({}, optionsBasedComponentProps), { value: {
            type: Array
        }, title: {
            type: String
        }, maxHeightPercentage: {
            type: Number
        } }),
    setup(props, { emit, slots, attrs }) {
        const { getOptions, stateValue, isDisabled } = useOptionsBaseComponent(props, { emit, attrs, slots }, {
            defaultValue: []
        });
        const renderOptions = () => {
            const options = getOptions();
            return options.map(option => {
                return <CheckboxItem value={stateValue.value.includes(option.value)} disabled={option.disabled || isDisabled.value} onChange={(checkState) => {
                    onChange(checkState, option.value);
                }}>{option.label}</CheckboxItem>;
            });
        };
        watch(() => props.value, (v) => {
            stateValue.value = v;
        });
        const onChange = (checkState, value) => {
            if (checkState) {
                if (!stateValue.value.includes(value)) {
                    stateValue.value.push(value);
                }
            }
            else {
                if (stateValue.value.includes(value)) {
                    stateValue.value.splice(stateValue.value.indexOf(value), 1);
                }
            }
        };
        const instance = getCurrentInstance();
        onMounted(() => {
            if (props.maxHeightPercentage) {
                const windowHeight = document.body.clientHeight;
                const maxHeight = props.maxHeightPercentage;
                if (instance.vnode.el.clientHeight > windowHeight * maxHeight) {
                    instance.vnode.el.style.height = windowHeight * maxHeight + 'px';
                }
            }
        });
        return { renderOptions };
    },
    render() {
        return <List required={this.required} title={this.title}>
      {this.renderOptions()}
    </List>;
    }
});
export default MCheckboxList;
//# sourceMappingURL=checkbox-list.jsx.map