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

interface IMultiPickerProps {
  prefixCls?: string;
  selectedValue?: any[];
  className?: string;
  rootNativeProps?: any;
  onValueChange?: (v?: any, i?: number) => void;
  children?: any;
  style?: any;
  onScrollChange?: (v?: any, i?: number) => void;
}

export default IMultiPickerProps;
