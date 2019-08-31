import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import OptionsBasedComponent from '../../../mixins/options-based-component';
import List from '../../list';
import CheckboxItem from './checkbox-item';

@Component({
  name: 'MCheckboxList'
})
class MCheckboxList extends OptionsBasedComponent {

  @Prop({type: Array})
  public value: any[];
  public stateValue = this.value || [];
  @Prop({type: String})
  private title: string;
  @Prop({type: Number})
  public maxHeightPercentage: number;

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
    return options.map(option => {
      return <CheckboxItem
        value={this.stateValue.includes(option.value)}
        disabled={option.disabled || this.isDisabled}
        on={
          {
            change: (checkState) => {
              this.onChange(checkState, option.value);
            }
          }
        }>{option.label}</CheckboxItem>;
    });
  }

  private onChange(checkState: any, value: any) {
    if (checkState) {
      if (this.$props.value) {
        if (!this.$props.value.includes(value)) {
          const array = [].concat(this.$props.value);
          array.push(value);
          this.$emit('input', array);
          this.$emit('change', array);
        }
      } else {
        if (!this.stateValue.includes(value)) {
          this.stateValue.push(value);
        }
      }
    } else {
      if (this.$props.value) {
        if (this.$props.value.includes(value)) {
          const array = [].concat(this.$props.value);
          array.splice(array.indexOf(value), 1);
          this.$emit('input', array);
          this.$emit('change', array);
        }
      } else {
        if (this.stateValue.includes(value)) {
          this.stateValue.splice(this.stateValue.indexOf(value), 1);
        }
      }
    }
  }
}

export default MCheckboxList as any;
