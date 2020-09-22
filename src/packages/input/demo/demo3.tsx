import {Options, Vue} from 'vue-class-component';
import List from '../../list';
import InputItem from '../index';

// 通过自定义 moneyKeyboardWrapProps 修复虚拟键盘滚动穿透问题
// https://github.com/ant-design/ant-design-mobile/issues/307
// https://github.com/ant-design/ant-design-mobile/issues/163
const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault()
  };
}

@Options({
  name: 'H5NumberInputExample'
})
export default class H5NumberInputExample extends Vue {
  public state = {
    type: 'money'
  };

  public render(): any {
    const {type} = this.state;
    return (
      <div>
        <List>
          <InputItem
            type={type}
            value={100}
            placeholder="start from left"
            clear
            moneyKeyboardAlign="left"
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >光标在左</InputItem>
          <InputItem
            type={type}
            placeholder="start from right"
            clear
            onChange={(v) => {
              console.log('onChange', v);
            }}
            onBlur={(v) => {
              console.log('onBlur', v);
            }}
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >光标在右</InputItem>
          <InputItem
            type={type}
            placeholder="money format"
            ref="input"
            onConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
            clear
            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
          >数字键盘</InputItem>
          <List.Item>
            <div
              style={{width: '100%', color: '#108ee9', textAlign: 'center'}}
              onClick={() => (this.$refs.input as any).focus()}
            >
              click to focus
            </div>
          </List.Item>
        </List>
      </div>
    );
  }
}
