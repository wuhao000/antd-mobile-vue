/* eslint global-require:0, no-nested-ternary:0 */
import Vue from 'vue';
import Component from 'vue-class-component';
import './demo3.less';

const data = [
  {
    value: '1',
    label: 'Food',
    children: [
      {
        label: 'American Foods',
        value: '1',
        disabled: false
      },
      {
        label: 'Chinese Food',
        value: '2'
      }, {
        label: 'Hot Pot',
        value: '3'
      }, {
        label: 'Buffet',
        value: '4'
      }, {
        label: 'Fast Food',
        value: '5'
      }, {
        label: 'Snack',
        value: '6'
      }, {
        label: 'Bread',
        value: '7'
      }, {
        label: 'Fruit',
        value: '8'
      }, {
        label: 'Noodle',
        value: '9'
      }, {
        label: 'Leisure Food',
        value: '10'
      }]
  }, {
    value: '2',
    label: 'Supermarket',
    children: [
      {
        label: 'All Supermarkets',
        value: '1'
      }, {
        label: 'Supermarket',
        value: '2',
        disabled: true
      }, {
        label: 'C-Store',
        value: '3'
      }, {
        label: 'Personal Care',
        value: '4'
      }]
  },
  {
    value: '3',
    label: 'Extra',
    isLeaf: true,
    children: [
      {
        label: 'you can not see',
        value: '1'
      }
    ]
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
            class="multi-foo-menu"
            data={initData}
            value={['1', ['3', '4']]}
            onChange={this.onChange}
            onOk={this.onOk}
            onCancel={this.onCancel}
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
        <div class={show ? 'multi-menu-active demo' : 'demo'}>
          <div>
            <m-nav-bar
                leftContent="Menu"
                mode="light"
                onLeftClick={this.handleClick.bind(this)}
                class="multi-top-nav-bar">
              Multi select menu
            </m-nav-bar>
          </div>
          {show ? initData ? menuEl : loadingEl : null}
          {show ? <div class="menu-mask" onClick={this.onMaskClick.bind(this)}/> : null}
        </div>
    );
  }
}
