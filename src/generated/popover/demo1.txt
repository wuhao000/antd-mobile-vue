import Vue from 'vue';
import Component from 'vue-class-component';
import {Icon, NavBar, Popover} from '../../index';

const Item = Popover.Item;

@Component({
  name: 'PopoverExample'
})
export default class PopoverExample extends Vue {

  public state = {
    visible: true,
    selected: '',
    maskClosable: true,
    mask: true,
    placement: 'bottomRight'
  };

  public onSelect(opt) {
    this.state.visible = false;
    this.state.selected = opt.props.value;
  }

  public handleVisibleChange(visible) {
    this.state.visible = visible;
  }

  public myImg(src) {
    return <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} class="am-icon am-icon-xs" alt=""/>;
  }

  public onItemClick() {
    this.state.visible = false;
  }

  public render() {
    return (<div>
      <NavBar
        mode="light"
        leftContent={this.state.visible.toString()}
        rightContent={
          <Popover
            mask={this.state.mask}
            placement={this.state.placement}
            maskClosable={this.state.maskClosable}
            vModel={this.state.visible}>
            <div slot="content">
              <Item key="4"
                    value="scan"
                    onClick={this.onItemClick}
                    icon={this.myImg('tOtXhkIWzwotgGSeptou')}>Scan</Item>
              <Item key="5"
                    value="special" icon={this.myImg('PKAgAqZWJVNwKsAJSmXd')}
                    style={{whiteSpace: 'nowrap'}}>My Qrcode</Item>
              <Item key="6" value="button ct" icon={this.myImg('uQIYTFeRrjPELImDRrPt')}>
                <span style={{marginRight: 5}}>Help</span>
              </Item>
            </div>
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center'
            }}
                 onClick={() => {
                   console.log(1);
                 }}
            >
              <Icon type="ellipsis"/>
            </div>
          </Popover>
        }
      >
        NavBar
      </NavBar>
      <m-white-space/>
      <m-switch-item title="是否点击遮罩层关闭" vModel={this.state.maskClosable}/>
      <m-switch-item title="是否显示遮罩层" vModel={this.state.mask}/>
      <m-radio-popup-list title="气泡显示的位置" v-model={this.state.placement} options={[
        {label: '上', value: 'tpo'},
        {label: '下', value: 'bottom'},
        {label: '左', value: 'left'},
        {label: '右', value: 'right'},
        {label: '左上', value: 'topLeft'},
        {label: '右上', value: 'topRight'},
        {label: '左下', value: 'bottomLeft'},
        {label: '右下', value: 'bottomRight'},
      ]}>
      </m-radio-popup-list>
    </div>);
  }
}
