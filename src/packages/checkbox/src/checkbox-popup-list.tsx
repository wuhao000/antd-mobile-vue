import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import OptionsBasedComponent from '../../../mixins/options-based-component';
import List from '../../list';
import Popup from '../../popup';
import CheckboxList from './checkbox-list';

@Component({
  name: 'MCheckboxPopupList'
})
export default class MCheckboxPopupList extends OptionsBasedComponent {

  @Prop({type: String})
  public title: string;
  @Prop({type: String})
  public placeholder: string;
  @Prop({type: Boolean, default: false})
  private clearable: boolean;
  @Prop({type: String, default: '、'})
  public separator: string;

  public popupVisible: boolean = false;

  private onChange(value: any[]) {
    this.stateValue = value;
    this.$emit('input', this.stateValue);
    this.$emit('change', this.stateValue);
  }

  public onClick() {
    if (!this.disabled && !this.readOnly) {
      this.popupVisible = true;
    }
  }

  get optionText() {
    const options = this.getOptions();
    // @ts-ignore
    const value = this.stateValue;
    const array = [];
    value.forEach((v, index) => {
      const option = options.find(it => it.value === v);
      if (option) {
        array.push(option.label);
      } else {
        array.push(v);
      }
      if (index < value.length - 1) {
        array.push(this.separator);
      }
    });
    return array;
  }

  public onClear() {
    this.$emit('clear');
    this.$emit('input', []);
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
              onCancel={this.closePopup}>
        <CheckboxList
          attrs={
            listProps
          }
          maxHeightPercentage={0.7}
          onChange={this.onChange}
        />
      </MPopup>
      <span slot={'extra'}>{this.stateValue && this.stateValue.length ? this.optionText : this.placeholder}</span>
      <span>{this.title}</span>
    </Item>;
  }

  private closePopup() {
    this.popupVisible = false;
  }
}
