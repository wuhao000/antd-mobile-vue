import * as tslib_1 from "tslib";
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import OptionsBasedComponent from '../../../mixins/options-based-component';
import List from '../../list';
import Popup from '../../popup';
import CheckboxList from './checkbox-list';
let MCheckboxPopupList = class MCheckboxPopupList extends OptionsBasedComponent {
    constructor() {
        super(...arguments);
        this.popupVisible = false;
    }
    onChange(value) {
        this.$emit('input', value);
        this.$emit('change', value);
    }
    onClick() {
        if (!this.disabled && !this.readOnly) {
            this.popupVisible = true;
        }
    }
    get optionText() {
        const options = this.getOptions();
        // @ts-ignore
        const value = this.stateValue;
        const selectedOptions = options.filter(it => value.includes(it.value));
        return selectedOptions.map(it => it.label).join('、');
    }
    onClear() {
        this.$emit('clear');
        this.$emit('input', []);
        this.closePopup();
    }
    render() {
        const MPopup = Popup;
        const Item = List.Item;
        const listProps = Object.assign({}, this.$attrs, this.$props, { options: this.getOptions() });
        listProps['title'] = undefined;
        const cancelButton = <div onclick={this.onClear} class={`am-popup-item am-popup-header-left`}>清除</div>;
        return <Item onClick={this.onClick} touchFeedback={!this.readOnly && !this.disabled} disabled={this.disabled} extraStyle={{ flexBasis: '60%' }}>
      <MPopup value={this.popupVisible} showCancel={this.clearable} cancelButton={cancelButton} title={this.title} onOk={this.closePopup} onCancel={this.closePopup}>
        <CheckboxList attrs={listProps} maxHeightPercentage={0.7} onChange={this.onChange}/>
      </MPopup>
      <span slot={'extra'}>{this.stateValue && this.stateValue.length ? this.optionText : this.placeholder}</span>
      <span>{this.title}</span>
    </Item>;
    }
    closePopup() {
        this.popupVisible = false;
    }
};
tslib_1.__decorate([
    Prop({ type: String })
], MCheckboxPopupList.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], MCheckboxPopupList.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], MCheckboxPopupList.prototype, "clearable", void 0);
MCheckboxPopupList = tslib_1.__decorate([
    Component({
        name: 'MCheckboxPopupList'
    })
], MCheckboxPopupList);
export default MCheckboxPopupList;
//# sourceMappingURL=checkbox-popup-list.jsx.map