import {useFormComponent} from '../../mixins/form-component';
import {defineComponent, PropType, VNode} from 'vue';
import List from '../../list';
import Range from './index';

const RangeItem = defineComponent({
  name: 'RangeItem',
  props: {
    title: {
      type: [String, Object] as PropType<string | VNode>
    }
  },
  setup(props, {emit}) {
    const {isDisabled, currentValue} = useFormComponent(props, {emit});

    return {isDisabled, currentValue};
  },
  render() {
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
});

export default RangeItem;
