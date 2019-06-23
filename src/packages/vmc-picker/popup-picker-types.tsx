import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'PopupPickerProps'
})
export class PopupPickerProps extends Vue<IPopupPickerProps> {
  @Prop()
  public picker?: any;
  @Prop()
  public value?: any;
  @Prop({type: String, default: 'click'})
  public triggerType?: string;
  @Prop()
  public WrapComponent?: any;
  @Prop()
  public dismissText?: string | VNode; // React.ReactElement only for web
  @Prop()
  public okText?: string | VNode; // React.ReactElement only for web
  @Prop()
  public title?: string | VNode; // React.ReactElement only for web
  @Prop({type: Boolean, default: false})
  public visible?: boolean;
  @Prop({type: Boolean, default: false})
  public disabled?: boolean;
  @Prop()
  public content?: VNode | string;
  @Prop()
  public actionTextUnderlayColor?: string;
  @Prop()
  public actionTextActiveOpacity?: number;
  /** web only */
  @Prop()
  public wrapStyle?: object;
  @Prop()
  public prefixCls?: string;
  @Prop()
  public pickerValueProp?: string;
  @Prop()
  public pickerValueChangeProp?: string;
  @Prop()
  public transitionName?: string;
  @Prop()
  public popupTransitionName?: string;
  @Prop()
  public maskTransitionName?: string;
}

export interface IPopupPickerProps {
  picker?: any;
  value?: any;
  triggerType?: string;
  WrapComponent?: any;
  dismissText?: string | VNode; // React.ReactElement only for web
  okText?: string | VNode; // React.ReactElement only for web
  title?: string | VNode; // React.ReactElement only for web
  visible?: boolean;
  disabled?: boolean;
  style?: any;
  onVisibleChange?: (visible: boolean) => void;
  content?: VNode | string;
  /** react-native only */
  styles?: any;
  actionTextUnderlayColor?: string;
  actionTextActiveOpacity?: number;
  /** web only */
  wrapStyle?: object;
  prefixCls?: string;
  pickerValueProp?: string;
  pickerValueChangeProp?: string;
  transitionName?: string;
  popupTransitionName?: string;
  maskTransitionName?: string;
}
