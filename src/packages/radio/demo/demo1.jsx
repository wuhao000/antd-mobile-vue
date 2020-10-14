import { defineComponent, reactive } from 'vue';
import Flex from '../../flex';
import List from '../../list';
import WhiteSpace from '../../white-space';
import Radio from '../index';
const RadioItem = Radio.RadioItem;
export default defineComponent({
    name: 'RadioExample',
    props: {},
    setup(props) {
        const state = reactive({
            value: 0,
            value2: 0,
            value3: 0,
            value4: 0,
            value5: false,
            value6: 2,
            value7: null
        });
        const onChange = (value) => {
            console.log('checkbox');
            state.value = value;
        };
        const onChange2 = (value) => {
            console.log('checkbox');
            state.value2 = value;
        };
        const onChange3 = (value) => {
            state.value3 = value;
        };
        const onChange4 = (value) => {
            state.value4 = value;
        };
        return { state, onChange, onChange2, onChange3, onChange4 };
    },
    render() {
        const { value, value2, value3, value4 } = this.state;
        const data = [
            { value: 0, label: 'doctor' },
            { value: 1, label: 'bachelor' }
        ];
        const data2 = [
            { value: 0, label: 'basketball', extra: 'details' },
            { value: 1, label: 'football', extra: 'details' }
        ];
        return (<div>
      <m-radio-list title="选项列表" vModel={this.state.value6} options={[{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }]}/>
      <m-radio-list title="选项列表（部分选项禁用）" vModel={this.state.value6} options={[{ label: '选项1', value: 1 }, { label: '选项2', value: 2, disabled: true }]}/>
      <List title="弹出单选">
        <m-radio-popup-list title="请选择" vModel={this.state.value6} options={[{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }]}/>
        <m-radio-popup-list title="部分选项禁用" placeholder="请选择" vModel={this.state.value7} options={[{ label: '选项1', value: 1 }, { label: '选项2', value: 2, disabled: true }]}/>
      </List>
      <List title="RadioItem demo">
        {data.map(i => (<RadioItem key={i.value} value={value === i.value} onChange={() => this.onChange(i.value)}>
            {i.label}
          </RadioItem>))}
      </List>
      <WhiteSpace size="lg"/>
      <List>
        {data2.map(i => (<RadioItem key={i.value} value={value2 === i.value} onChange={() => this.onChange2(i.value)}>
            {i.label}<List.Item.Brief>{i.extra}</List.Item.Brief>
          </RadioItem>))}
      </List>
      <List title="Disabled">
        {data.map(i => (<RadioItem key={i.value} value={value3 === i.value} onChange={() => this.onChange3(i.value)} disabled>
            {i.label}
          </RadioItem>))}
      </List>
      <WhiteSpace size="lg"/>
      <List>
        {data2.map(i => (<RadioItem key={i.value} value={value4 === i.value} onChange={() => this.onChange4(i.value)} disabled>
            {i.label}<List.Item.Brief>{i.extra}</List.Item.Brief>
          </RadioItem>))}
      </List>
      <Flex style={{ padding: '15px' }}>
        <Flex.Item style={{ padding: '15px 0', color: '#888', flex: 'none' }}>Radio demo(dustomized style)</Flex.Item>
        <Flex.Item>
          <Radio class="my-radio" value={this.state.value5} onChange={e => this.state.value5 = true}>Agree</Radio>
        </Flex.Item>
      </Flex>
    </div>);
    }
});
//# sourceMappingURL=demo1.jsx.map