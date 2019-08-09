export default {
  render() {
    return <m-list style={{margin: '5px 0', backgroundColor: 'white'}}>
      <m-list-item
        extra={<m-button type="ghost" size="small" inline>small</m-button>}
        multipleLine
      >
        Regional manager
        <m-list-item-brief>
          Can be collected, refund, discount management, view data and other operations
        </m-list-item-brief>
      </m-list-item>
      <m-list-item
        extra={<m-button type="primary" size="small" inline>small</m-button>}
        multipleLine
      >
        Regional manager
        <m-list-item-brief>
          Can be collected, refund, discount management, view data and other operations
        </m-list-item-brief>
      </m-list-item>
    </m-list>;
  }
};
