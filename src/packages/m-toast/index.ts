import Toast from './src';
import './style';

Toast.install = (Vue) => {
  if (!Vue.prototype.$toast) {
    Object.defineProperties(Vue.prototype, {
      $toast: {
        get() {
          return Toast;
        }
      }
    });
  }
};

export default Toast;
