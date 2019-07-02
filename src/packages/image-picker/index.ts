import 'antd-mobile/es/image-picker/style/index.css';
import ImagePicker from './src';

ImagePicker.install = Vue => {
  Vue.component('MImagePicker', ImagePicker);
};

export default ImagePicker;
