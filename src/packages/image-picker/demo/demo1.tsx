import Vue from 'vue';
import Component from 'vue-class-component';
import {ImagePicker, SegmentedControl, WingBlank} from '../../index';

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121'
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122'
}];

@Component({
  name: 'ImagePickerExample'
})

export default class ImagePickerExample extends Vue {

  public state = {
    files: data,
    multiple: false
  };

  public onChange(files, type, index) {
    this.state.files = files;
  }

  public onSegChange(index) {
    this.state.multiple = index === 1;
  }

  public render() {
    const {files} = this.state;
    return (
      <WingBlank>
        <SegmentedControl
          values={['切换到单选', '切换到多选']}
          selectedIndex={this.state.multiple ? 1 : 0}
          onChange={this.onSegChange}
        />
        <ImagePicker
          value={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 7}
          multiple={this.state.multiple}
        />
      </WingBlank>
    );
  }
}
