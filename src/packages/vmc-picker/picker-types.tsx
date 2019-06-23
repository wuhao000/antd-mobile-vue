import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'PickerProps'
})
export class PickerProps extends Vue {
  @Prop({type: Boolean, default: false})
  public disabled?: boolean;
  @Prop()
  public selectedValue?: any;
  @Prop()
  public itemStyle?: any;
  /** web only */
  @Prop()
  public prefixCls?: string;
  @Prop()
  public indicatorStyle?: any;
  @Prop()
  public indicatorClassName?: string;
  @Prop()
  public defaultSelectedValue?: any;
}
