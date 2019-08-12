import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import './demo1.less';
let SegmentedControlExample = class SegmentedControlExample extends Vue {
    onChange(e) {
        console.log(`selectedIndex:${e.nativeEvent.selectedSegmentIndex}`);
    }
    onValueChange(value) {
        return console.log(value);
    }
    render() {
        return (<m-wing-blank size="lg" className="sc-example">
          <p class="sub-title">Simplest</p>
          <m-segmented-control values={['Segment1', 'Segment2']}/>
          <p class="sub-title">Disabled</p>
          <m-segmented-control values={['Segment1', 'Segment2']} disabled/>
          <p class="sub-title">SelectedIndex</p>
          <m-segmented-control selectedIndex={1} values={['Segment1', 'Segment2', 'Segment3']}/>
          <p class="sub-title">TintColor</p>
          <m-segmented-control values={['Segment1', 'Segment2', 'Segment3']} tintColor={'#ff0000'} style={{ height: '40px', width: '250px' }}/>
          <p class="sub-title">onChange/onValueChange</p>
          <m-segmented-control values={['Segment1', 'Segment2', 'Segment3']} onChange={this.onChange} onValueChange={this.onValueChange}/>
        </m-wing-blank>);
    }
};
SegmentedControlExample = tslib_1.__decorate([
    Component({
        name: 'SegmentedControl'
    })
], SegmentedControlExample);
export default SegmentedControlExample;
//# sourceMappingURL=demo1.jsx.map