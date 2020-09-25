import {computed, defineComponent, ref} from 'vue';
import List from '../../list';
import WhiteSpace from '../../white-space';
import InputItem from '../index';

export default defineComponent({
  name: 'BasicInputExample',
  props: {},
  setup(props) {
    const inputRef = ref(null);
    const labelFocusInst = ref(null);
    const handleClick = () => {
      inputRef.value.focus();
    };
    const value = ref('222');
    return {
      inputRef, labelFocusInst, handleClick, value
    };
  },
  render() {
    return (
      <div>
        <List renderHeader={() => 'Customize to focus'}>
          <InputItem
            placeholder="auto focus"
            ref="autoFocusInst"
          >标题</InputItem>
          <InputItem
            placeholder="click the button below to focus"
            ref={(el) => {
              this.inputRef = el;
            }}
          >标题</InputItem>
          <List.Item>
            <div
              style={{width: '100%', color: '#108ee9', textAlign: 'center'}}
              onClick={this.handleClick}>
              click to focus
            </div>
          </List.Item>
        </List>
        <List renderHeader={() => 'Whether is controlled'}>
          <InputItem
            v-model={[this.value, 'value']}
            placeholder="controled input"
          >受控组件</InputItem>
          <InputItem
            defaultValue="Title"
            placeholder="please input content"
          >非受控组件</InputItem>
        </List>
        <WhiteSpace/>
        <List renderHeader={() => 'Click label to focus input'}>
          <InputItem
            placeholder="click label to focus input"
            ref={(el) => {
              this.labelFocusInst = el
            }}>
            <div onClick={() => this.labelFocusInst.focus()}>标题</div>
          </InputItem>
        </List>
        <List title={'Show clear'}>
          <InputItem
            clearable
            placeholder="displayed clear while typing"
          >标题</InputItem>
        </List>
        <WhiteSpace/>
        <List renderHeader={() => 'Number of words for title'}>
          <InputItem
            placeholder="limited title length"
            labelNumber={5}
          >标题过长超过默认的5个字</InputItem>
        </List>
        <WhiteSpace/>
        <List renderHeader={() => 'Custom title（text / image / empty)'}>
          <InputItem
            placeholder="no label"
          />
          <InputItem
            placeholder="title can be icon，image or text"
          >
            <div style={{
              backgroundImage: 'url(https://zos.alipayobjects.com/rmsportal/DfkJHaJGgMghpXdqNaKF.png)',
              backgroundSize: 'cover',
              height: '22px',
              width: '22px'
            }}/>
          </InputItem>
        </List>
        <WhiteSpace/>
        <List renderHeader={() => 'Customize the extra content in the right'}>
          <InputItem
            placeholder="0.00"
            extra="¥"
          >价格</InputItem>
        </List>
        <WhiteSpace/>
        <List renderHeader={() => 'Format'}>
          <InputItem
            value="8888 8888 8888 8888"
            type="bankCard"
          >银行卡</InputItem>
          <InputItem
            type="password"
            placeholder="****"
          >密码</InputItem>
          <InputItem
            type="number"
            placeholder="click to show number keyboard"
          >数字键盘</InputItem>
          <InputItem
            type="digit"
            placeholder="click to show native number keyboard"
          >数字键盘</InputItem>
        </List>
        <WhiteSpace/>
        <List renderHeader={() => 'Not editable / Disabled'}>
          <InputItem
            value="not editable"
            editable={false}
          >姓名</InputItem>
          <InputItem
            value="style of disabled `InputItem`"
            disabled
          >姓名</InputItem>
        </List>
      </div>
    );
  }
});
