import { optionsBasedComponentProps, useOptionsBaseComponent } from '../../mixins/options-based-component';
import { computed, defineComponent, ref } from 'vue';
import List from '../../list';
import Popup from '../../popup';
import RadioList from './radio-list';
export default defineComponent({
    name: 'MRadioPopupList',
    props: Object.assign(Object.assign({}, optionsBasedComponentProps), { title: {
            type: [String, Object]
        }, placeholder: {
            type: String
        }, clearable: {
            type: Boolean,
            default: false
        } }),
    setup(props, { emit, slots, attrs }) {
        const popupVisible = ref(false);
        const { getOptions, isDisabled, isReadonly, stateValue } = useOptionsBaseComponent(props, { emit, slots, attrs });
        const optionText = computed(() => {
            const options = getOptions();
            const value = stateValue.value;
            const selectedOption = options.find(it => value === it.value);
            return selectedOption && selectedOption.label;
        });
        const onCancel = () => {
            closePopup();
        };
        const onChange = (value) => {
            stateValue.value = value;
            popupVisible.value = false;
        };
        const onClick = () => {
            if (!isDisabled.value && !isReadonly.value) {
                popupVisible.value = true;
            }
        };
        const onClear = () => {
            emit('clear');
            emit('update:value', null);
            closePopup();
        };
        const closePopup = () => {
            popupVisible.value = false;
        };
        return {
            onClick, onChange, onCancel, onClear, getOptions, stateValue, closePopup,
            optionText, popupVisible, isDisabled
        };
    },
    render() {
        const listProps = Object.assign(Object.assign(Object.assign({}, this.$attrs), this.$props), { options: this.getOptions() });
        listProps.title = undefined;
        const cancelButton = <div onClick={this.onClear} class={`am-popup-item am-popup-header-left`}>清除</div>;
        const { optionText, placeholder, stateValue, closePopup, title, clearable, onClick, readOnly, isDisabled, disabled } = this;
        return <List.Item onClick={onClick} text={!!optionText} required={this.required} touchFeedback={!readOnly && !disabled} disabled={isDisabled}>
      <Popup value={isDisabled ? false : this.popupVisible} showCancel={clearable} cancelButton={cancelButton} title={title} onOk={closePopup} onCancel={closePopup}>
        {
        // @ts-ignore
        <RadioList {...listProps} maxHeightPercentage={0.7} onChange={this.onChange}/>}
      </Popup>
      <span slot="extra">{(stateValue !== undefined && stateValue !== null) ? optionText : placeholder}</span>
      <span>{title}</span>
    </List.Item>;
    }
});
//# sourceMappingURL=radio-popup-list.jsx.map