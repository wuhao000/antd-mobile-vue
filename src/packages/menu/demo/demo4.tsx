/* eslint global-require:0, no-nested-ternary:0 */
import Vue from 'vue';
import Component from 'vue-class-component';
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
@Component({
  name: 'MenuExample'
})
export default class MultiMenuExample extends Vue {
  public state = {
    initData: null,
    show: false
  };

  public onChange(value) {
    console.log(value);
  }

  public onOk(value) {
    console.log(value);
    this.onCancel();
  }

  public onCancel() {
    this.state.show = false;
  }

  public handleClick(e) {
    e.preventDefault(); // Fix event propagation on Android
    this.state.show = !this.state.show;
    // mock for async data loading
    if (!this.state.initData) {
      setTimeout(() => {
        this.state.initData = data;
      }, 500);
    }
  }

  public onMaskClick() {
    this.state.show = false;
  }

  public render() {
    const {initData, show} = this.state;
    const menuEl = (
        <m-menu
            class="single-multi-foo-menu"
            data={initData}
            value={['1']}
            level={1}
            onChange={this.onChange.bind(this)}
            onOk={this.onOk.bind(this)}
            onCancel={this.onCancel.bind(this)}
            height={document.documentElement.clientHeight * 0.6}
            multiSelect
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
}
