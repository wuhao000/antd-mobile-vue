import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import List from '../../list';
import Slider from './index';

@Component({
  name: 'SliderItem'
})
export default class SliderItem extends Vue {
  @Prop({
    type: String,
    default: 'am-slider'
  })
  public prefixCls?: string;
  @Prop({})
  public marks?: { [key: number]: string };
  @Prop({type: Boolean})
  public dots?: boolean;
  @Prop({type: Boolean})
  public included?: boolean;
  @Prop({})
  public maximumTrackStyle?: any;
  @Prop({})
  public minimumTrackStyle?: any;
  @Prop({})
  public handleStyle?: any;
  @Prop({})
  public trackStyle?: any;
  @Prop({})
  public railStyle?: any;
  @Prop({})
  public tipFormatter?: (value?: string) => VNode;
  @Prop({type: Number})
  public value?: number;
  @Prop({type: Number})
  public min?: number;
  @Prop({type: Number})
  public max?: number;
  @Prop({type: Number})
  public step?: number;
  @Prop({type: Boolean})
  public disabled?: boolean;
  @Prop({})
  public handle?: any;
  @Prop({type: String})
  public title: string;
  public static install: (Vue) => void;

  public render() {
    return (
        <List.Item title={this.title}>
          <Slider slot="extra" props={this.$props} on={{
            ...this.$listeners,
            change: (value) => {
              this.$emit('input', value);
              this.$emit('change', value);
            }
          }}/>
        </List.Item>
    );
  }
}
