import {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {FormComponent} from '../../../mixins/form-component';
import List from '../../list';
import Slider from './index';

@Component({
  name: 'SliderItem'
})
export default class SliderItem extends FormComponent {
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
  public min?: number;
  @Prop({type: Number})
  public max?: number;
  @Prop({type: Number})
  public step?: number;
  @Prop({})
  public handle?: any;
  @Prop({type: String})
  public title: string;
  public static install: (Vue) => void;

  public render() {
    return (
      <List.Item multipleLine
                 disabled={this.isDisabled}>
        {this.title}
        <List.Item.Brief style={{padding: '15px'}}>
          <Slider props={this.$props}
                  disabled={this.isDisabled}
                  value={this.currentValue}
                  on={{
                    change: (v) => {
                      this.currentValue = v;
                    }
                  }}/>
        </List.Item.Brief>
      </List.Item>
    );
  }
}
