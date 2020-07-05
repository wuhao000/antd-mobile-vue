import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import List from '../../list';
import OptionsBasedComponent from '../../mixins/options-based-component';
import Popup from '../../popup';
import CheckboxList from './checkbox-list';

@Component({
  name: 'MCheckboxPopupList'
})
export default class MCheckboxPopupList extends OptionsBasedComponent {

  @Prop({type: [String, Object]})
  public title: string;
  @Prop({type: String})
  public placeholder: string;
  @Prop({type: Boolean, default: false})
  private clearable: boolean;
  @Prop({type: String, default: '、'})
  public separator: string;
  @Prop({type: Boolean, default: false})
  public visible: boolean;
  public popupVisible: boolean = this.visible;
  @Prop({type: Boolean, default: false})
  private searchable: boolean;

  @Watch('visible')
  public visibleChanged(visible: boolean) {
    this.popupVisible = visible;
  }

  @Watch('popupVisible')
  public popupVisibleChanged(popupVisible: boolean) {
    this.$emit('update:visible', popupVisible);
  }

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
    if (value) {
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
    }
    return array;
  }

  public onClear() {
    this.$emit('clear');
    this.$emit('input', []);
    this.closePopup();
  }

  public render() {
    const listProps: any = {
      ...this.$attrs,
      ...this.$props,
      options: this.getOptions()
    };
    const {stateValue, optionText, placeholder} = this;
    listProps.title = undefined;
    const cancelButton = <div onclick={this.onClear}
                              class={`am-popup-item am-popup-header-left`}>清除</div>;
    return <List.Item onClick={this.onClick}
                      touchFeedback={!this.readOnly && !this.disabled}
                      required={this.required}
                      text={!!optionText}
                      disabled={this.isDisabled}
                      extraStyle={{flexBasis: '60%'}}>
      <Popup value={this.isDisabled ? false : this.popupVisible}
             showCancel={this.clearable}
             disabled={this.disabled || this.isReadonly}
             cancelButton={cancelButton}
             title={this.title}
             onOk={this.closePopup}
             onCancel={this.closePopup}>
        {this.renderSearch()}
        <CheckboxList
          attrs={
            listProps
          }
          maxHeightPercentage={0.7}
          onChange={this.onChange}
        />
      </Popup>
      <span slot="extra">{stateValue && stateValue.length ? optionText : placeholder}</span>
      <span>{this.title}</span>
    </List.Item>;
  }

  private closePopup() {
    this.popupVisible = false;
  }

  @Watch('searchKeyword')
  public searchKeywordChanged(keyword: string) {
    console.log(keyword);
  }

  private renderSearch() {
    return this.searchable ? <m-search-bar
      value={this.searchKeyword}
      onInput={(v) => {
        this.searchKeyword = v;
      }}/> : null;
  }
}
