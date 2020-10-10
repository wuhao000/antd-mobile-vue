import {defineComponent} from 'vue';
import {Sticky, StickyContainer} from '../../sticky';
import Tabs from '../src';

const tabs = [
  {title: 'First Tab', key: 't1'},
  {title: 'Second Tab', key: 't2'},
  {title: 'Third Tab', key: 't3'}
];

export default defineComponent({
  name: 'TabsExample',
  props: {},
  setup() {
    const renderTabBar = (props) => {
      return <Sticky>
        <div style={{zIndex: 1}}><Tabs.DefaultTabBar {...props}/></div>
      </Sticky>;
    };
    return {renderTabBar};
  },
  render() {
    return <div>
      <m-white-space/>
      <StickyContainer>
        <m-tabs tabs={tabs}
                initialPage="t2"
                renderTabBar={this.renderTabBar}>
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
      </StickyContainer>
      <m-white-space/>
    </div>;
  }
});
