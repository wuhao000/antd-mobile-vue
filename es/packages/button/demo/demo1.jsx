export default {
    render() {
        return <m-wing-blank>
      <m-button>default</m-button>
      <m-white-space />
      <m-button disabled>default disabled</m-button>
      <m-white-space />
      <m-button type="primary">primary</m-button>
      <m-white-space />
      <m-button type="primary" disabled>primary disabled</m-button>
      <m-white-space />
      <m-button type="warning">warning</m-button>
      <m-white-space />
      <m-button type="warning" disabled>warning disabled</m-button>
      <m-white-space />
      <m-button loading>loading button</m-button>
      <m-white-space />
      <m-button icon="check-circle-o">with icon</m-button>
      <m-white-space />
      <m-button icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/jBfVSpDwPbitsABtDDlB.svg" alt=""/>}>with
        custom
        icon
      </m-button>
      <m-white-space />
      <m-button icon="check-circle-o" inline size="small" style={{ marginRight: '4px' }}>with icon and inline</m-button>
      <m-button icon="check-circle-o" inline size="small">with icon and inline</m-button>
      <m-white-space />
      
      
      <m-white-space />
      <m-button type="primary" inline style={{ marginRight: '4px' }}>inline primary</m-button>
      
      <m-button type="ghost" inline style={{ marginRight: '4px' }} class="am-button-borderfix">inline ghost</m-button>
      <m-white-space />
      <m-button type="primary" inline size="small" style={{ marginRight: '4px' }}>primary</m-button>
      <m-button type="primary" inline size="small" disabled>primary disabled</m-button>
      <m-white-space />
      <m-button type="ghost" inline size="small" style={{ marginRight: '4px' }}>ghost</m-button>
      
      <m-button type="ghost" inline size="small" class="am-button-borderfix" disabled>ghost disabled</m-button>
    </m-wing-blank>;
    }
};
//# sourceMappingURL=demo1.jsx.map
