import { __decorate } from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { ImagePicker, SegmentedControl, WingBlank } from '../../index';
const data = [{
        url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
        id: '2121'
    }, {
        url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
        id: '2122'
    }];
let ImagePickerExample = class ImagePickerExample extends Vue {
    constructor() {
        super(...arguments);
        this.state = {
            files: data,
            multiple: false
        };
    }
    onChange(files, type, index) {
        this.state.files = files;
    }
    onSegChange(index) {
        this.state.multiple = index === 1;
    }
    render() {
        const { files } = this.state;
        return (<WingBlank>
        <SegmentedControl values={['切换到单选', '切换到多选']} selectedIndex={this.state.multiple ? 1 : 0} onChange={this.onSegChange}/>
        <ImagePicker value={files} onChange={this.onChange} onImageClick={(index, fs) => console.log(index, fs)} selectable={files.length < 7} onFail={(msg) => {
            this.$toast.fail(msg);
        }} multiple={this.state.multiple}/>
      </WingBlank>);
    }
};
ImagePickerExample = __decorate([
    Component({
        name: 'ImagePickerExample'
    })
], ImagePickerExample);
export default ImagePickerExample;
//# sourceMappingURL=demo1.jsx.map