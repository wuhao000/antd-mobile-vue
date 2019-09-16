import {Button, Modal, Toast, WhiteSpace, WingBlank} from '../../index';

const alert = Modal.alert;

const showAlert = () => {
  const alertInstance = alert('Delete', 'Are you sure???', [
    {text: 'Cancel', onPress: () => console.log('cancel'), style: 'default'},
    {text: 'OK', onPress: () => console.log('ok')}
  ]);
  setTimeout(() => {
    // 可以调用close方法以在外部close
    console.log('auto close');
    alertInstance.close();
  }, 500000);
};

export default {
  name: 'Example',
  render() {
    return <WingBlank size="lg">
      <WhiteSpace size="lg"/>
      <Button onClick={showAlert}>customized buttons</Button>
      <WhiteSpace size="lg"/>
      <Button
        onClick={() =>
          alert('Delete', 'Are you sure???', [
            {text: 'Cancel', onPress: () => console.log('cancel')},
            {text: 'Ok', onPress: () => console.log('ok')}
          ])
        }
      >
        confirm
      </Button>
      <WhiteSpace size="lg"/>
      <Button
        onClick={() =>
          alert('Much Buttons', <div>More than two buttons</div>, [
            {text: 'Button1', onPress: () => console.log('第0个按钮被点击了')},
            {text: 'Button2', onPress: () => console.log('第1个按钮被点击了')},
            {text: 'Button3', onPress: () => console.log('第2个按钮被点击了')}
          ])
        }
      >
        more than two buttons
      </Button>
      <WhiteSpace size="lg"/>
      <Button
        onClick={() =>
          alert('Delete', 'Are you sure???', [
            {text: 'Cancel', onPress: () => console.log('cancel')},
            {
              text: 'Ok',
              onPress: () =>
                new Promise((resolve) => {
                  Toast.info('onPress Promise', 1);
                  setTimeout(resolve, 1000);
                })
            }
          ])
        }
      >
        promise
      </Button>
      <WhiteSpace size="lg"/>
    </WingBlank>;
  }
};
