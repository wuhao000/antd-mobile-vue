import {PluginObject, VueConstructor} from 'vue';
import ColorPicker from './src/index.vue';

// 为组件提供 install 安装方法，供按需引入

type AegisUIComponent = VueConstructor<any> & PluginObject<any>;

(ColorPicker as AegisUIComponent).install = (Vue) => {
  Vue.component(ColorPicker.name, ColorPicker);
};

// 默认导出组件
export default ColorPicker as AegisUIComponent;
