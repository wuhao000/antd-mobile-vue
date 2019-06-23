import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import OptionsBasedComponent from '../../../mixins/options-based-component';
import List from '../../m-list';
import RadioItem from './radio-item';

@Component({
  name: 'MRadioList'
})
export default class MRadioList extends OptionsBasedComponent {

  @Prop({})
  public value: any;
  public stateValue = this.value !== undefined ? this.value : null;
  @Prop({type: String})
  private title: string;
  @Prop({type: Number})
  public maxHeightPercentage: number;

  @Watch('value')
  public valueChanged(value: any[]) {
    this.stateValue = value;
  }

  public mounted() {
    if (this.maxHeightPercentage) {
      const windowHeight = document.body.clientHeight;
      const maxHeight = this.maxHeightPercentage;
      if (this.$el.clientHeight > windowHeight * maxHeight) {
        (this.$el as HTMLElement).style.height = windowHeight * maxHeight + 'px';
      }
    }
  }

  public render() {
    // @ts-ignore
    return <List title={this.title}>
      {this.renderOptions()}
    </List>;
  }

  private renderOptions() {
    const options = this.getOptions();
    if (options) {
      return options.map(option => {
        // @ts-ignore
        return <RadioItem
          value={this.stateValue === option.value}
          onChange={(checkState) => {
            this.onChange(checkState, option.value);
          }}>{option.label}</RadioItem>;
      });
    } else {

    }
  }

  private onChange(checkState: any, value: any) {
    if (checkState) {
      this.stateValue = value;
    }
    this.$emit('input', value);
    this.$emit('change', value);
  }
}
