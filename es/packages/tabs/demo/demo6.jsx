import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import Tabs from '../src';
let TabsExample = class TabsExample extends Vue {
    renderContent(tab) {
        return (<div key={tab.key} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '150px',
            backgroundColor: '#fff'
        }}>
      <p>Content of {tab.title}</p>
    </div>);
    }
    render() {
        const tabs = [
            { title: '1st Tab', key: '1' },
            { title: '2nd Tab', key: '2' },
            { title: '3rd Tab', key: '3' },
            { title: '4th Tab', key: '4' },
            { title: '5th Tab', key: '5' },
            { title: '6th Tab', key: '6' },
            { title: '7th Tab', key: '7' },
            { title: '8th Tab', key: '8' },
            { title: '9th Tab', key: '9' }
        ];
        return (<div>
        <m-white-space />
        <m-tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar attrs={props} page={3}/>}>
          {tabs.map(tab => this.renderContent(tab))}
        </m-tabs>
        <m-white-space />
      </div>);
    }
};
TabsExample = tslib_1.__decorate([
    Component({
        name: 'TabsExample'
    })
], TabsExample);
export default TabsExample;
//# sourceMappingURL=demo6.jsx.map