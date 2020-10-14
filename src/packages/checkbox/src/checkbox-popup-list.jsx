import { computed, defineComponent, ref, watch } from 'vue';
import List from '../../list';
import { optionsBasedComponentProps, useOptionsBaseComponent } from '../../mixins/options-based-component';
import Popup from '../../popup';
import CheckboxList from './checkbox-list';
export default defineComponent({
    name: 'MCheckboxPopupList',
    props: Object.assign(Object.assign({}, optionsBasedComponentProps), { title: {
            type: [String, Object]
        }, placeholder: {
            type: String
        }, clearable: {
            type: Boolean,
            default: false
        }, separator: {
            type: String,
            default: '、'
        }, visible: {
            type: Boolean,
            default: false
        }, searchable: {
            type: Boolean,
            default: false
        } }),
    setup(props, { emit, slots, attrs }) {
        const { getOptions, searchKeyword, isReadonly, stateValue, isDisabled } = useOptionsBaseComponent(props, {
            emit,
            slots,
            attrs
        });
        const popupVisible = ref(props.visible);
        watch(() => props.visible, (visible) => {
            popupVisible.value = visible;
        });
        watch(() => popupVisible.value, (popupVisible) => {
            emit('update:visible', popupVisible);
        });
        const optionText = computed(() => {
            const options = getOptions();
            // @ts-ignore
            const value = stateValue.value;
            const array = [];
            if (value) {
                value.forEach((v, index) => {
                    const option = options.find(it => it.value === v);
                    if (option) {
                        array.push(option.label);
                    }
                    else {
                        array.push(v);
                    }
                    if (index < value.length - 1) {
                        array.push(props.separator);
                    }
                });
            }
            return array;
        });
        const onChange = (value) => {
            stateValue.value = value;
            emit('update:value', stateValue.value);
            emit('change', stateValue.value);
        };
        const onClick = () => {
            if (!isDisabled.value && !isReadonly.value) {
                popupVisible.value = true;
            }
        };
        const onClear = () => {
            emit('clear');
            emit('update:value', []);
            closePopup();
        };
        const closePopup = () => {
            popupVisible.value = false;
        };
        const renderSearch = () => {
            return props.searchable ? <m-search-bar value={searchKeyword.value} onInput={(v) => {
                searchKeyword.value = v;
            }}/> : null;
        };
        return {
            onChange, stateValue, getOptions,
            onClick, isDisabled, isReadonly, closePopup,
            onClear, renderSearch, popupVisible, optionText
        };
    },
    render() {
        const listProps = Object.assign(Object.assign(Object.assign({}, this.$attrs), this.$props), { options: this.getOptions() });
        const { stateValue, placeholder } = this;
        listProps.title = undefined;
        const cancelButton = <div onClick={this.onClear} class={`am-popup-item am-popup-header-left`}>清除</div>;
        const slots = {
            extra: () => {
                return <span>{stateValue && stateValue.length ? this.optionText : placeholder}</span>;
            },
            default: () => {
                return [
                    <Popup value={this.isDisabled ? false : this.popupVisible} showCancel={this.clearable} disabled={this.isDisabled || this.isReadonly} cancelButton={cancelButton} title={this.title} onOk={this.closePopup} onCancel={this.closePopup}>
            {this.renderSearch()}
            <CheckboxList {...listProps} maxHeightPercentage={0.7} onChange={this.onChange}/>
          </Popup>,
                    <span>{this.title}</span>
                ];
            }
        };
        return <List.Item onClick={this.onClick} touchFeedback={!this.isReadonly && !this.isDisabled} required={this.required} text={!!this.optionText} v-slots={slots} disabled={this.isDisabled}>
    </List.Item>;
    }
});
//# sourceMappingURL=checkbox-popup-list.jsx.map