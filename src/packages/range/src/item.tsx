import FormComponent from '../../mixins/form-component';
import {useSimpleFormComponent} from '../../mixins/simple-form-component';
import {Options, Vue} from 'vue-class-component';
import {VNode} from 'vue';
import List from '../../list';
import Range from './index';

@Options({
  name: 'RangeItem',
  props: {
    title: {type: [String, Object]}
  },
  setup(props) {
    const {isDisabled, componentSize, isReadonly} = useSimpleFormComponent(props);
    return {isDisabled, componentSize, isReadonly}
  }
})
export default class RangeItem extends FormComponent {
  public title: string | VNode;
  public isDisabled: boolean;
  public isReadonly: boolean;
  public componentSize: any;

  public render(): any {
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
