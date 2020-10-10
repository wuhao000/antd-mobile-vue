import {defineComponent} from 'vue';


const tabs = [
  {title: 'First Tab', key: 't1'},
  {title: 'Second Tab', key: 't2'},
  {title: 'Third Tab', key: 't3'}
];

export default defineComponent({
  name: 'TabBarExample',
  render() {
    return <div>
      <m-white-space/>
      <m-tabs tabs={tabs} initialPage={2} animated={false} useOnPan={false}>
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
      <m-white-space/>
    </div>;
  }
});
