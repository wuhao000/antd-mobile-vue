const tabs = [
    { title: '1 Tab', key: 't1' },
    { title: '2 Tab', key: 't2' },
    { title: '3 Tab', key: 't3' }
];
export default {
    render() {
        return <div style={{ height: '200px' }}>
      <m-white-space />
      <m-tabs tabs={tabs} initialPage={'t2'} tabBarPosition="left" tabDirection="vertical">
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
      <m-white-space />
    </div>;
    }
};
//# sourceMappingURL=demo5.jsx.map