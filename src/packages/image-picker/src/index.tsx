import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Flex from '../../m-flex';
import TouchFeedback from '../../vmc-feedback';

function noop() {
}

@Component({
  name: 'ImagePicker'
})
export default class ImagePicker extends Vue {
  @Prop({
    type: String,
    default: 'am-image-picker'
  })
  public prefixCls?: string;
  @Prop({
    default: () => {
      return [];
    }
  })
  public value?: Array<{}>;
  @Prop({
    type: Boolean,
    default: true
  })
  public selectable?: boolean;
  @Prop({
    type: Boolean,
    default: false
  })
  public multiple?: boolean;
  @Prop({
    type: String,
    default: 'image/*'
  })
  public accept?: string;
  @Prop({default: 4})
  public length?: number | string;

  get fileSelectorInput(): HTMLInputElement | null {
    return this.$refs.fileSelectorInput as any;
  }

  public getOrientation(file: any, callback: (_: number) => void) {
    const reader = new FileReader();
    reader.onload = e => {
      const view = new DataView((e.target as any).result);
      if (view.getUint16(0, false) !== 0xffd8) {
        return callback(-2);
      }
      const length = view.byteLength;
      let offset = 2;
      while (offset < length) {
        const marker = view.getUint16(offset, false);
        offset += 2;
        if (marker === 0xffe1) {
          const tmp = view.getUint32((offset += 2), false);
          if (tmp !== 0x45786966) {
            return callback(-1);
          }
          const little = view.getUint16((offset += 6), false) === 0x4949;
          offset += view.getUint32(offset + 4, little);
          const tags = view.getUint16(offset, little);
          offset += 2;
          for (let i = 0; i < tags; i++) {
            if (view.getUint16(offset + i * 12, little) === 0x0112) {
              return callback(view.getUint16(offset + i * 12 + 8, little));
            }
          }
        } else if ((marker & 0xff00) !== 0xff00) {
          break;
        } else {
          offset += view.getUint16(offset, false);
        }
      }
      return callback(-1);
    };
    reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  }

  public getRotation(orientation = 1) {
    let imgRotation = 0;
    switch (orientation) {
      case 3:
        imgRotation = 180;
        break;
      case 6:
        imgRotation = 90;
        break;
      case 8:
        imgRotation = 270;
        break;
      default:
    }
    return imgRotation;
  }

  public removeImage(index: number) {
    const newImages: any[] = [];
    const {value = []} = this;
    value.forEach((image, idx) => {
      if (index !== idx) {
        newImages.push(image);
      }
    });
    this.$emit('input', newImages, 'remove', index);
    this.$emit('change', newImages, 'remove', index);
  }

  public addImage(imgItem: any) {
    console.log(imgItem);
    const {value = []} = this;
    const newImages = value.concat(imgItem);
    this.$emit('input', newImages, 'add');
    this.$emit('change', newImages, 'add');
  }

  public onImageClick(index: number) {
    this.$emit('click', this.value);
  }

  public onFileChange() {
    const fileSelectorEl = this.fileSelectorInput;
    if (fileSelectorEl && fileSelectorEl.files && fileSelectorEl.files.length) {
      const files = fileSelectorEl.files;
      const imageParsePromiseList = [];
      for (let i = 0; i < files.length; i++) {
        imageParsePromiseList.push(this.parseFile(files[i], i));
      }
      Promise.all(imageParsePromiseList)
          .then(imageItems => this.addImage(imageItems))
          .catch(
              error => {
                this.$emit('fail', error);
              }
          );
    }
    if (fileSelectorEl) {
      fileSelectorEl.value = '';
    }
  }

  public parseFile(file: any, index: number) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const dataURL = (e.target as any).result;
        if (!dataURL) {
          reject(`Fail to get the ${index} image`);
          return;
        }

        let orientation = 1;
        this.getOrientation(file, res => {
          // -2: not jpeg , -1: not defined
          if (res > 0) {
            orientation = res;
          }
          resolve({
            url: dataURL,
            orientation,
            file
          });
        });
      };
      reader.readAsDataURL(file);
    });
  }

  public static install: (Vue) => void;

  public render() {
    const {
      prefixCls,
      value = [],
      selectable,
      multiple,
      accept
    } = this;

    const imgItemList: any[] = [];
    let count = parseInt('' + this.length, 10);
    if (count <= 0) {
      count = 4;
    }

    const wrapCls = classnames(`${prefixCls}`);

    value.forEach((image: any, index: number) => {
      const imgStyle = {
        backgroundImage: `url(${image.url})`,
        transform: `rotate(${this.getRotation(image.orientation)}deg)`
      };
      const itemStyle = {};

      imgItemList.push(
          <Flex.Item
              key={`item-${index}`}
              style={itemStyle}
          >
            <div key={index} class={`${prefixCls}-item`}>
              <div
                  class={`${prefixCls}-item-remove`}
                  role="button"
                  aria-label="Click and Remove this image"
                  // tslint:disable-next-line:jsx-no-multiline-js
                  onClick={() => {
                    this.removeImage(index);
                  }}
              />
              <div
                  class={`${prefixCls}-item-content`}
                  role="button"
                  aria-label="Image can be clicked"
                  // tslint:disable-next-line:jsx-no-multiline-js
                  onClick={() => {
                    this.onImageClick(index);
                  }}
                  style={imgStyle}
              />
            </div>
          </Flex.Item>
      );
    });

    const selectEl = (
        <Flex.Item key="select">
          <TouchFeedback activeClassName={`${prefixCls}-upload-btn-active`}>
            <div
                class={`${prefixCls}-item ${prefixCls}-upload-btn`}
                onClick={
                  this.onImageClick
                }
                role="button"
                aria-label="Choose and add image"
            >
              <input
                  ref={'fileSelectorInput'}
                  type="file"
                  accept={accept}
                  // tslint:disable-next-line:jsx-no-multiline-js
                  onchange={this.onFileChange}
                  multiple={multiple}
              />
            </div>
          </TouchFeedback>
        </Flex.Item>
    );

    let allEl = selectable ? imgItemList.concat([selectEl]) : imgItemList;
    const length = allEl.length;
    if (length !== 0 && length % count !== 0) {
      const blankCount = count - length % count;
      const fillBlankEl: any[] = [];
      for (let i = 0; i < blankCount; i++) {
        fillBlankEl.push(<Flex.Item key={`blank-${i}`}/>);
      }
      allEl = allEl.concat(fillBlankEl);
    }
    const flexEl: any[][] = [];
    for (let i = 0; i < allEl.length / count; i++) {
      const rowEl = allEl.slice(i * count, i * count + count);
      flexEl.push(rowEl);
    }
    const renderEl = flexEl.map((item, index) => (
        <Flex key={`flex-${index}`}>{item}</Flex>
    ));

    return (
        <div class={wrapCls}>
          <div class={`${prefixCls}-list`} role="group">
            {renderEl}
          </div>
        </div>
    );
  }
}
