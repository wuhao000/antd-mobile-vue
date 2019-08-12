import * as tslib_1 from "tslib";
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import OptionsBasedComponent from '../../../mixins/options-based-component';
import List from '../../list';
import Popup from '../../popup';
import RadioList from './radio-list';
let MRadioPopupList = class MRadioPopupList extends OptionsBasedComponent {
    constructor() {
        super(...arguments);
        this.popupVisible = false;
    }
    onCancel() {
        this.closePopup();
    }
    onChange(value) {
        this.$emit('input', value);
        this.$emit('change', value);
        this.popupVisible = false;
    }
    onClick() {
        if (!this.disabled && !this.readOnly) {
            this.popupVisible = true;
        }
    }
    get optionText() {
        const options = this.getOptions();
        const value = this.stateValue;
        const selectedOption = options.find(it => value === it.value);
        return selectedOption && selectedOption.label;
    }
    onClear() {
        this.$emit('clear');
        this.$emit('input', null);
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
        {
        // @ts-ignore
        <RadioList attrs={listProps} maxHeightPercentage={0.7} on={{ change: this.onChange }}/>}
      </MPopup>
      <span slot="extra">{(this['stateValue'] !== undefined && this['stateValue'] !== null) ? this.optionText : this.placeholder}</span>
      <span>{this.title}</span>
    </Item>;
    }
    closePopup() {
        this.popupVisible = false;
    }
};
tslib_1.__decorate([
    Prop({ type: String })
], MRadioPopupList.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], MRadioPopupList.prototype, "placeholder", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], MRadioPopupList.prototype, "clearable", void 0);
MRadioPopupList = tslib_1.__decorate([
    Component({
        name: 'MRadioPopupList'
    })
], MRadioPopupList);
export default MRadioPopupList;
//# sourceMappingURL=radio-popup-list.jsx.map