import { Button, Modal, WhiteSpace, WingBlank } from '../../index';
const operation = Modal.operation;
export default {
    render() {
        return <WingBlank size="lg">
      <WhiteSpace size="lg"/>
      <Button onClick={() => operation([
            { text: '标为未读', onPress: () => console.log('标为未读被点击了') },
            { text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了') }
        ])}>operation</Button>
      <WhiteSpace size="lg"/>
    </WingBlank>;
    }
};
//# sourceMappingURL=demo4.jsx.map