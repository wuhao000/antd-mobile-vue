import { defineComponent, ref } from 'vue';
import List from '../../list';
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
        return (<div>
        <List renderHeader={() => 'Confirm when typing'}>
          <InputItem error={true} errorMessage={"手机号码格式不正确"} type="phone" placeholder="186 1234 1234">手机号码</InputItem>
          <InputItem error errorMessage="出错啦" title="带校验的输入框"/>
        </List>
      </div>);
    }
});
//# sourceMappingURL=demo3.jsx.map