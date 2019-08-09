const tabs = [
  {title: 'First Tab', key: 't1'},
  {title: 'Second Tab', key: 't2'},
  {title: 'Third Tab', key: 't3'}
];

export default {
  render() {
    return <div>
      <m-white-space/>
      <div style={{height: '200px'}}>
        <m-tabs tabs={tabs}
                initialPage={'t2'}>
          <div key="t1" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '250px',
            backgroundColor: '#fff'
          }}>
            Content of first tab
          </div>
          <div key="t2" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '250px',
            backgroundColor: '#fff'
          }}>
            Content of second tab
          </div>
          <div key="t3" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '250px',
            backgroundColor: '#fff'
          }}>
            Content of third tab
          </div>
        </m-tabs>
      </div>
    </div>;
  }
};
