import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import OptionsBasedComponent from '../../mixins/options-based-component';
import List from '../../list';
import Popup from '../../popup';
import RadioList from './radio-list';

@Component({
  name: 'MRadioPopupList'
})
export default class MRadioPopupList extends OptionsBasedComponent {

  @Prop({type: [String, Object]})
  public title: string;
  @Prop({type: String})
  public placeholder: string;
  public popupVisible: boolean = false;
  @Prop({type: Boolean, default: false})
  private clearable: boolean;

  private onCancel(): any {
    this.closePopup();
  }

  private onChange(value: any) {
    this.stateValue = value;
    this.popupVisible = false;
  }

  public onClick() {
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

  public onClear() {
    this.$emit('clear');
    this.$emit('input', null);
    this.closePopup();
  }

  public render() {
    const listProps: any = {
      ...this.$attrs,
      ...this.$props,
      options: this.getOptions()
    };
    listProps.title = undefined;
    const cancelButton = <div onclick={this.onClear}
                              class={`am-popup-item am-popup-header-left`}>清除</div>;
    const {optionText, placeholder, stateValue, closePopup, title, clearable, onClick, readOnly, isDisabled, disabled} = this;
    return <List.Item onClick={onClick}
                      text={!!optionText}
                      required={this.required}
                      touchFeedback={!readOnly && !disabled}
                      disabled={isDisabled}>
      <Popup value={isDisabled ? false : this.popupVisible}
             showCancel={clearable}
             cancelButton={cancelButton}
             title={title}
             onOk={closePopup}
             onCancel={closePopup}>
        {
          // @ts-ignore
          <RadioList
            attrs={listProps}
            maxHeightPercentage={0.7}
            onChange={this.onChange}/>
        }
      </Popup>
      <span slot="extra">{(stateValue !== undefined && stateValue !== null) ? optionText : placeholder}</span>
      <span>{title}</span>
    </List.Item>;
  }

  private closePopup() {
    this.popupVisible = false;
  }
}
