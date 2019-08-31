import {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {FormComponent} from '../../../mixins/form-component';
import List from '../../list';
import Range from './index';

@Component({
  name: 'RangeItem'
})
export default class RangeItem extends FormComponent {

  @Prop({type: [String, Object]})
  public title: string | VNode;

  public render() {
    return <List.Item multipleLine
                      disabled={this.isDisabled}>
      {this.title}
      <List.Item.Brief style={{padding: '15px', flex: 1}}>
        <Range attrs={Object.assign({}, this.$attrs, this.$props)}
               disabled={this.isDisabled}
               value={this.currentValue}
               on={{
                 change: (v) => {
                   this.currentValue = v;
                 }
               }}/>
      </List.Item.Brief>
    </List.Item>;
  }
}
