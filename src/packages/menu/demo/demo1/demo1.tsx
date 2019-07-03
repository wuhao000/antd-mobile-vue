import Vue from 'vue';
import {Prop} from 'vue-property-decorator';
import Component from 'vue-class-component';
/* eslint no-nested-ternary:0 */
import Menu from '../../index';
import ActivityIndicator from '../../../activity-indicator';
import NavBar from '../../../nav-bar';

const data = [
  {
    value: '1',
    label: 'Food',
    children: [
      {
        label: 'All Foods',
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
class MenuExample extends Vue {
  public state = {
    initData: null,
    show: false
  };

  public onChange(value) {
    let label = '';
    data.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        label = dataItem.label;
        if (dataItem.children && value[1]) {
          dataItem.children.forEach((cItem) => {
            if (cItem.value === value[1]) {
              label += ` ${cItem.label}`;
            }
          });
        }
      }
    });
    console.log(label);
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
        <Menu
            class="foo-menu"
            data={initData}
            value={['1', '3']}
            onChange={this.onChange.bind(this)}
            height={document.documentElement.clientHeight * 0.6}
        />
    );
    const loadingEl = (
        <div style={{
          width: '100%',
          height: document.documentElement.clientHeight * 0.6,
          display: 'flex',
          justifyContent: 'center'
        }}>
          <ActivityIndicator size="large"/>
        </div>
    );
    return (
        <div class={show ? 'menu-active' : ''}>
          <div>
            <NavBar
                leftContent="Menu"
                mode="light"
                icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg"
                           class="am-icon am-icon-md" alt=""/>}
                onLeftClick={this.handleClick.bind(this)}
                class="top-nav-bar"
            >
              Here is title
            </NavBar>
          </div>
          {show ? initData ? menuEl : loadingEl : null}
          {show ? <div class="menu-mask" onClick={this.onMaskClick.bind(this)}/> : null}
        </div>
    );
  }
}

export default MenuExample;
