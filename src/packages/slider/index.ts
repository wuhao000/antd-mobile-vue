import Slider from './src';
import Item from './src/slider-item';
import './style';

Slider.Item = Item;
Slider.install = Vue => {
  Vue.component('MSlider', Slider);
  Vue.component('MSliderItem', Slider.Item);
};
export default Slider;
