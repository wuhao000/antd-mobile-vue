import { defineComponent, reactive } from 'vue';
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
export default defineComponent({
    name: 'MenuExample',
    props: {},
    setup(props, { emit, slots }) {
        const state = reactive({
            initData: [],
            show: false
        });
        const onChange = (value) => {
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
        };
        const handleClick = (e) => {
            e.preventDefault(); // Fix event propagation on Android
            state.show = !state.show;
            // mock for async data loading
            if (!state.initData.length) {
                setTimeout(() => {
                    state.initData = data;
                }, 500);
            }
        };
        const onMaskClick = () => {
            state.show = false;
        };
        return {
            state, onChange, handleClick, onMaskClick
        };
    },
    render() {
        const { initData, show } = this.state;
        const menuEl = (<m-menu class="single-foo-menu" data={initData} value={['1']} level={1} onChange={this.onChange} height={document.documentElement.clientHeight * 0.6}/>);
        const loadingEl = (<div style={{
            position: 'absolute',
            width: '100%',
            height: document.documentElement.clientHeight * 0.6,
            display: 'flex',
            justifyContent: 'center'
        }}>
        <m-activity-indicator size="large"/>
      </div>);
        return (<div class={show ? 'single-menu-active demo' : 'demo'}>
        <div>
          <m-nav-bar leftContent="Menu" mode="light" onLeftClick={this.handleClick.bind(this)} class="single-top-nav-bar">
            OneLevel menu
          </m-nav-bar>
        </div>
        {show ? initData.length ? menuEl : loadingEl : null}
        {show ? <div class="menu-mask" onClick={this.onMaskClick}/> : null}
      </div>);
    }
});
//# sourceMappingURL=demo2.jsx.map