import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Icon from '../../icon';
import RMCInputNumber from '../../vmc-input-number';

@Component({
  name: 'MStepper'
})

class MStepper extends Vue {
  @Prop({
    type: String,
    default: 'am-stepper'
  })
  public prefixCls?: string;
  @Prop({
    type: Boolean,
    default: true
  })
  public showNumber?: boolean;
  @Prop({type: Number})
  public min?: number;
  @Prop({type: Number})
  public max?: number;
  @Prop({default: 1})
  public step?: number | string;
  @Prop({
    type: Boolean,
    default: false
  })
  public readOnly?: boolean;
  @Prop({type: Boolean})
  public disabled?: boolean;
  @Prop({type: Boolean})
  public autoFocus?: boolean;
  @Prop({type: Number})
  public value?: number;
  @Prop({type: Number})
  public defaultValue?: number;
  @Prop({type: Boolean, default: false})
  public valueEditable: boolean;
  @Prop({})
  public upStyle?: {};
  @Prop({})
  public downStyle?: {};
  @Prop({})
  public inputStyle?: {};
  @Prop({type: String})
  public name?: string;
  public static install: (Vue) => void;

  public render() {
    const {showNumber, ...restProps} = this.$props;
    const stepperClass = classnames({
      showNumber: !!showNumber
    });
    restProps.upHandler = <Icon type="plus" size="xxs"/>;
    restProps.downHandler = <Icon type="minus" size="xxs"/>;
    return (
      <RMCInputNumber
        on={this.$listeners}
        props={restProps} class={stepperClass}/>
    );
  }
}

export default MStepper as any;
