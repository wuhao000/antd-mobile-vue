const tabs2 = [
  {title: 'First Tab', sub: '1'},
  {title: 'Second Tab', sub: '2'},
  {title: 'Third Tab', sub: '3'}
];

import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'TabBarExample'
})
export default class TabBarExample extends Vue {

  get tabs() {
    return [
      {title: <m-badge text={'3'}>First Tab</m-badge>},
      {title: <m-badge text={'今日(20)'}>Second Tab</m-badge>},
      {title: <m-badge dot>Third Tab</m-badge>}
    ];
  }

  public render() {
    return <div>
      <m-tabs tabs={this.tabs}
              initialPage={1}
              onChange={(tab, index) => {
                console.log('onChange', index, tab);
              }}
              onTabClick={(tab, index) => {
                console.log('onTabClick', index, tab);
              }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '150px',
          backgroundColor: '#fff'
        }}>
          Content of first tab
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '150px',
          backgroundColor: '#fff'
        }}>
          Content of second tab
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '150px',
          backgroundColor: '#fff'
        }}>
          Content of third tab
        </div>
      </m-tabs>
      <m-white-space/>
      <m-tabs tabs={tabs2}
              initialPage={1}
              tabBarPosition="bottom"
              renderTab={tab => <span>{tab.title}</span>}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '150px',
          backgroundColor: '#fff'
        }}>
          Content of first tab
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '150px',
          backgroundColor: '#fff'
        }}>
          Content of second tab
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '150px',
          backgroundColor: '#fff'
        }}>
          Content of third tab
        </div>
      </m-tabs>
      <m-white-space/>
    </div>;
  }
}
