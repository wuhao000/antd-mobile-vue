import Vue from 'vue';
import Component from 'vue-class-component';
import './demo2.less';

const data = [
  {
    value: '1',
    label: 'Food',
    children: null
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
export default class MenuExample extends Vue {
  public state = {
    initData: [],
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
    if (!this.state.initData.length) {
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
            class="single-foo-menu"
            data={initData}
            value={['1']}
            level={1}
            onChange={this.onChange}
            height={document.documentElement.clientHeight * 0.6}
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
        <div class={show ? 'single-menu-active demo' : 'demo'}>
          <div>
            <m-nav-bar
                leftContent="Menu"
                mode="light"
                onLeftClick={this.handleClick.bind(this)}
                class="single-top-nav-bar"
            >
              OneLevel menu
            </m-nav-bar>
          </div>
          {show ? initData.length ? menuEl : loadingEl : null}
          {show ? <div class="menu-mask" onClick={this.onMaskClick.bind(this)}/> : null}
        </div>
    );
  }
}
