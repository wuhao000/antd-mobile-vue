import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import OptionsBasedComponent from '../../../mixins/options-based-component';
import List from '../../m-list';
import Popup from '../../m-popup';
import RadioList from './radio-list';

@Component({
  name: 'MRadioPopupList'
})
export default class MRadioPopupList extends OptionsBasedComponent {

  @Prop({type: String})
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
    this.$emit('input', value);
    this.$emit('change', value);
    this.popupVisible = false;
  }

  public onClick() {
    if (!this.disabled && !this.readOnly) {
      this.popupVisible = true;
    }
  }

  get optionText() {
    const options = this.getOptions() as any;
    // @ts-ignore
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
    const MPopup = Popup as any;
    const Item = List.Item as any;
    const listProps = {
      ...this.$attrs,
      ...this.$props,
      options: this.getOptions()
    };
    listProps['title'] = undefined;
    const cancelButton = <div onclick={this.onClear}
                              class={`am-popup-item am-popup-header-left`}>清除</div>;
    return <Item onClick={this.onClick}
                 touchFeedback={!this.readOnly && !this.disabled}
                 disabled={this.disabled}
                 extraStyle={{flexBasis: '60%'}}>
      <MPopup value={this.popupVisible}
              showCancel={this.clearable}
              cancelButton={cancelButton}
              title={this.title}
              onOk={this.closePopup}
              onClose={this.closePopup}>
        {
          // @ts-ignore
          <RadioList
            attrs={
              listProps
            }
            maxHeightPercentage={0.7}
            on={
              {change: this.onChange}
            }/>
        }
      </MPopup>
      <span
        slot='extra'>{(this['stateValue'] !== undefined && this['stateValue'] !== null) ? this.optionText : this.placeholder}</span>
      <span>{this.title}</span>
    </Item>;
  }

  private closePopup() {
    this.popupVisible = false;
  }
}
