import { useFormComponent } from '../../mixins/form-component';
import { defineComponent } from 'vue';
import List from '../../list';
import Range from './index';
const RangeItem = defineComponent({
    name: 'RangeItem',
    props: {
        title: {
            type: [String, Object]
        }
    },
    setup(props, { emit }) {
        const { isDisabled, currentValue } = useFormComponent(props, { emit });
        return { isDisabled, currentValue };
    },
    render() {
        return <List.Item multipleLine disabled={this.isDisabled}>
      {this.title}
      <List.Item.Brief style={{ padding: '15px', flex: 1 }}>
        <Range {...Object.assign({}, this.$attrs, this.$props)} disabled={this.isDisabled} value={this.currentValue} {...{
            onChange: (v) => {
                this.currentValue = v;
            }
        }}/>
      </List.Item.Brief>
    </List.Item>;
    }
});
export default RangeItem;
//# sourceMappingURL=item.jsx.map