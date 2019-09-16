import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'MultiPickerProps'
})
export class MultiPickerProps extends Vue {
  @Prop({type: String})
  public prefixCls?: string;
  @Prop()
  public selectedValue?: any[];
}
