import {VNode, VNodeDirective} from 'vue';
import Toast from '../../m-toast';

const map = new Map();
export default {
  inserted(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
    const value = binding.value;
    if (value) {
      const toast = Toast.loading('加载中');
      map.set(el, toast);
    }
  },
  update(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
    const value = binding.value;
    if (binding.value !== binding.oldValue) {
      if (value) {
        const toast = Toast.loading('加载中', 30);
        map.set(el, toast);
      } else {
        const toast = map.get(el);
        if (toast) {
          toast.destroy();
        }
      }
    }
  }
};
