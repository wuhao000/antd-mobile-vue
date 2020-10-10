import {defineComponent, reactive} from 'vue';
import {Button, Icon, List, Modal, WhiteSpace, WingBlank} from '../../index';

function closest(el, selector) {
  let copyEl = el;
  const matchesSelector = copyEl.matches || copyEl.webkitMatchesSelector || copyEl.mozMatchesSelector || copyEl.msMatchesSelector;
  while (copyEl) {
    if (matchesSelector.call(copyEl, selector)) {
      return copyEl;
    }
    copyEl = copyEl.parentElement;
  }
  return null;
}

export default defineComponent({
  name: 'ModalExample',
  props: {},
  setup(props, {emit, slots}) {
    const state = reactive({
      modal1: false,
      modal2: false
    });


    const showModal = (key) => {
      return (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        state[key] = true;
      };
    };
    const onClose = (key) => {
      return () => {
        state[key] = false;
      };
    };
    const onWrapTouchStart = (e) => {
      // fix touch to scroll background page on iOS
      if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return;
      }
      const pNode = closest(e.target, '.am-modal-content');
      if (!pNode) {
        e.preventDefault();
      }
    };


    return {
      showModal, state, onClose, onWrapTouchStart
    };
  },
  render() {
    return (
      <WingBlank>
        <Button onClick={this.showModal('modal1')}><Icon type="up"/>basic<Icon type="up"/></Button>
        <WhiteSpace/>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal1')}
          title="Title"
          footer={[{
            text: 'Ok', onPress: () => {
              console.log('ok');
              this.onClose('modal1')();
            }
          }]}
          wrapProps={{onTouchStart: this.onWrapTouchStart}}
          afterClose={() => {
            alert('afterClose');
          }}
        >
          <div style={{height: 100, overflow: 'scroll'}}>
            scoll content...<br/>
            scoll content...<br/>
            scoll content...<br/>
            scoll content...<br/>
            scoll content...<br/>
            scoll content...<br/>
          </div>
        </Modal>
        <Button onClick={this.showModal('modal2')}>popup</Button>
        <WhiteSpace/>
        <Modal
          popup
          visible={this.state.modal2}
          onClose={this.onClose('modal2')}
          animationType="slide-up"
          afterClose={() => {
            alert('afterClose');
          }}
        >
          <List renderHeader={() => <div>委托买入</div>} className="popup-list">
            {['股票名称', '股票代码', '买入价格'].map((i, index) => (
              <List.Item key={index}>{i}</List.Item>
            ))}
            <Button type="primary" onClick={this.onClose('modal2')}>买入</Button>
          </List>
        </Modal>
      </WingBlank>
    );
  }
});
