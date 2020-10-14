import { defineComponent, ref } from 'vue';
import List from '../../list';
import TextareaItem from '../index';
export default defineComponent({
    name: 'Demo1',
    setup(props, { emit, slots }) {
        const value = ref('');
        const autoFocusInst = ref(null);
        const customFocusInst = ref(null);
        return {
            value, setAutoFocusInst(el) {
                autoFocusInst.value = el;
            },
            setCustomFocusInst(el) {
                customFocusInst.value = el;
            },
            customFocusInst
        };
    },
    render() {
        return <div>
      <List renderHeader={() => 'Customize to focus'}>
        <TextareaItem title="标题" placeholder="auto focus in Alipay client" data-seed="logId" ref={this.setAutoFocusInst} autoHeight/>
        <TextareaItem title="标题" placeholder="click the button below to focus" data-seed="logId" autoHeight ref={this.setCustomFocusInst}/>
        <List.Item>
          <div style={{ width: '100%', color: '#108ee9', textAlign: 'center' }} onClick={() => this.customFocusInst.focus()}>
            click to focus
          </div>
        </List.Item>
      </List>
      <List title={'Whether is controlled'}>
        <TextareaItem title="受控组件" placeholder="controlled"/>
        <TextareaItem title="非受控组件" placeholder="please input content" clear/>
      </List>
      <List title={'Auto / Fixed height'}>
        <TextareaItem title="高度自适应" autoHeight labelNumber={5}/>
        <TextareaItem rows={3} placeholder="fixed number of lines"/>
      </List>
      <List title={'Show clear'}>
        <TextareaItem clear title="标题" placeholder="displayed clear while typing"/>
      </List>
      <List renderHeader={() => 'Custom title（text / image / empty）'}>
        <TextareaItem title={<img src="https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png" style={{ width: '28px', height: '28px' }} alt=""/>} placeholder="title can be customized"/>
      </List>
      <List renderHeader={() => 'Limited value length'}>
        <TextareaItem placeholder="can enter up to 10 characters" count={10}/>
      </List>
      <List renderHeader={() => 'Count'}>
        <TextareaItem rows={5} count={100}/>
      </List>
      <List renderHeader={() => 'Not editable / Disabled'}>
        <TextareaItem title="姓名" editable={false}/>
        <TextareaItem value="disabled style" title="姓名" disabled/>
      </List>
    </div>;
    }
});
//# sourceMappingURL=demo1.jsx.map