import Vue from 'vue';
import Component from 'vue-class-component';
import List from '../../list';
import WhiteSpace from '../../white-space';
import InputItem from '../index';

@Component({
  name: 'BasicInputExample'
})
export default class BasicInputExample extends Vue {

  public componentDidMount() {
    // this.autoFocusInst.focus();
  }

  public handleClick() {
    this.inputRef.focus();
  }

  get inputRef(): any {
    return this.$refs.inputRef as any;
  }

  get labelFocusInst(): any {
    return this.$refs.labelFocusInst;
  }

  public render() {
    return (
        <div>
          <List renderHeader={() => 'Customize to focus'}>
            <InputItem
                clear
                placeholder="auto focus"
                ref="autoFocusInst"
            >标题</InputItem>
            <InputItem
                clear
                placeholder="click the button below to focus"
                ref="inputRef"
            >标题</InputItem>
            <List.Item>
              <div
                  style={{width: '100%', color: '#108ee9', textAlign: 'center'}}
                  onClick={this.handleClick.bind(this)}>
                click to focus
              </div>
            </List.Item>
          </List>
          <List renderHeader={() => 'Whether is controlled'}>
            <InputItem
                placeholder="controled input"
            >受控组件</InputItem>
            <InputItem
                defaultValue="Title"
                placeholder="please input content"
                data-seed="logId"
            >非受控组件</InputItem>
          </List>
          <WhiteSpace/>
          <List renderHeader={() => 'Click label to focus input'}>
            <InputItem
                placeholder="click label to focus input"
                ref="labelFocusInst"
            >
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
          <List title="错误提示">
            <InputItem error errorMessage="出错啦" title="带校验的输入框"/>
          </List>
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
                type="phone"
                placeholder="186 1234 1234"
            >手机号码</InputItem>
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
}
