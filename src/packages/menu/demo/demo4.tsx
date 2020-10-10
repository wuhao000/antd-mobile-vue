/* eslint global-require:0, no-nested-ternary:0 */
import {defineComponent, reactive} from 'vue';
import './demo4.less';

const data = [
  {
    value: '1',
    label: 'Food'
  }, {
    value: '2',
    label: 'Supermarket'
  },
  {
    value: '3',
    label: 'Extra',
    isLeaf: true
  }
];
export default defineComponent({
  name: 'MenuExample',
  props: {},
  setup(props, {emit, slots}) {
    const state = reactive({
      initData: null,
      show: false
    });


    const onChange = (value) => {
      console.log(value);
    };
    const onOk = (value) => {
      console.log(value);
      onCancel();
    };
    const onCancel = () => {
      state.show = false;
    };
    const handleClick = (e) => {
      e.preventDefault(); // Fix event propagation on Android
      state.show = !state.show;
      // mock for async data loading
      if (!state.initData) {
        setTimeout(() => {
          state.initData = data;
        }, 500);
      }
    };
    const onMaskClick = () => {
      state.show = false;
    };
    return {
      state, onChange, onOk, onCancel, handleClick, onMaskClick
    };
  },
  render() {
    const {initData, show} = this.state;
    const menuEl = (
      <m-menu
        class="single-multi-foo-menu"
        data={initData}
        value={['1']}
        level={1}
        onChange={this.onChange}
        onOk={this.onOk.bind(this)}
        onCancel={this.onCancel}
        height={document.documentElement.clientHeight * 0.6}
        multiSelect={true}
      />
    );
    const loadingEl = (
      <div style={{
        position: 'absolute',
        width: '100%',
        height: document.documentElement.clientHeight * 0.6,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <m-activity-indicator size="large"/>
      </div>
    );
    return (
      <div class={show ? 'single-multi-menu-active' : ''}>
        <div>
          <m-nav-bar
            leftContent="Menu"
            mode="light"
            onLeftClick={this.handleClick.bind(this)}
            class="single-multi-top-nav-bar">
            Single Multi menu
          </m-nav-bar>
        </div>
        {show ? initData ? menuEl : loadingEl : null}
        {show ? <div class="menu-mask" onClick={this.onMaskClick.bind(this)}/> : null}
      </div>
    );
  }
});
