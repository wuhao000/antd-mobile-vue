import ImagePicker from './src';
import './style';

ImagePicker.install = function (Vue) {
  Vue.component('MImagePicker', ImagePicker);
};

export default ImagePicker;