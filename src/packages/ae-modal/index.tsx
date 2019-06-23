import Vue, {VNode} from 'vue';
import {AeAlert, AePrompt, ModalOptions} from '../../../types/components/ae-modal';
import DButton from '../d-button';
import DForm from '../d-form';
import DInput from '../d-input';
import AeModal from './src';

Vue.use(DForm);
Vue.use(DInput);
const Modal = window.antd.Modal;
const defaultConfirmOptions: ModalOptions = {
  centered: true,
  okText: '确认',
  cancelText: '取消'
};

function createPromptContent(copyOptions: {} & ModalOptions, onChange?) {
  const rules = (copyOptions.rules || []).concat(
    copyOptions.required ? [{required: true, message: '必须输入', trigger: 'change'}] : []
  );
  const h = new Vue().$createElement;
  return h('DForm', {
    props: {
      model: {
        inputValue: copyOptions.inputValue
      }
    }
  }, [
    h('DFormItem', {
      props: {
        rules,
        prop: 'inputValue'
      }
    }, [h('DInput', {
      props: {
        value: copyOptions.inputValue
      },
      on: {
        input: (e) => {
          if (typeof e === 'string') {
            copyOptions.inputValue = e;
            if (onChange) {
              onChange(e);
            }
          }
        }
      }
    })])]);
}

type Type = 'confirm' | 'alert' | 'info' | 'success' | 'error' | 'warning' | 'prompt';

function createModal(message: string | ModalOptions, title: string, icon: string, options: ModalOptions, type: Type) {
  const copyOptions = typeof message === 'object' ? Object.assign({}, defaultConfirmOptions, message) : (options || Object.assign({}, defaultConfirmOptions));
  if (typeof message === 'string') {
    copyOptions.content = message;
    if (title) {
      copyOptions.title = title;
    }
    if (icon) {
      copyOptions.iconType = icon;
    }
  }
  return new Promise((resolve, reject) => {
    if (!copyOptions.onOk) {
      copyOptions.onOk = (e) => {
        resolve(e);
        if (typeof e === 'function') {
          e();
        }
      };
    } else {
      const func = copyOptions.onOk;
      copyOptions.onOk = (e) => {
        resolve(e);
        func();
      };
    }
    if (!copyOptions.onCancel) {
      copyOptions.onCancel = () => {
        reject();
      };
    } else {
      const func = copyOptions.onCancel;
      copyOptions.onCancel = () => {
        reject();
        func();
      };
    }
    if (type === 'confirm') {
      copyOptions.title = copyOptions.title || '确认';
      Modal.confirm(copyOptions);
    } else if (type === 'alert') {
      copyOptions.title = copyOptions.title || '提示';
      copyOptions.okCancel = false;
      Modal.confirm(copyOptions);
    } else if (type === 'prompt') {
      let modal = null;
      copyOptions.title = copyOptions.title || '输入';
      copyOptions.content = createPromptContent(copyOptions, (value) => {
        if (copyOptions.content) {
          (copyOptions.content as VNode).componentOptions.propsData = {
            inputValue: value
          };
          if (modal) {
            modal.update();
          }
        }
      });
      copyOptions.onOk = (e) => {
        resolve(copyOptions.inputValue);
        if (typeof e === 'function') {
          e();
        }
      };
      modal = Modal.confirm(copyOptions);
    } else if (type === 'info') {
      copyOptions.title = copyOptions.title || '信息';
      Modal.info(copyOptions);
    } else if (type === 'success') {
      copyOptions.title = copyOptions.title || '成功';
      Modal.success(copyOptions);
    } else if (type === 'error') {
      copyOptions.title = copyOptions.title || '错误';
      Modal.error(copyOptions);
    } else if (type === 'warning') {
      copyOptions.title = copyOptions.title || '警告';
      Modal.warning(copyOptions);
    }
  });
}

AeModal.install = (Vue) => {
  Vue.component('AeModal', AeModal);
  Vue.use(DButton);
  const alert: AeAlert = (message: string | ModalOptions,
                          title?: string,
                          icon?: string,
                          options?: ModalOptions) => {
    return createModal(message, title, icon, options, 'alert');
  };
  const prompt: AePrompt = (message: string, title?: string,
                            value?: string,
                            icon?: string, options?: ModalOptions) => {
    const ops = options || {};
    if (value !== undefined) {
      ops.inputValue = value;
    }
    return createModal(message, title, icon, ops, 'prompt');

  };
  alert.info = (message: string | ModalOptions,
                title: string) => {
    return createModal(message, title, null, null, 'info');
  };
  alert.success = (message: string | ModalOptions,
                   title: string) => {
    return createModal(message, title, null, null, 'success');
  };
  alert.error = (message: string | ModalOptions,
                 title: string) => {
    return createModal(message, title, null, null, 'error');
  };
  alert.warning = (message: string | ModalOptions,
                   title: string) => {
    return createModal(message, title, null, null, 'warning');
  };
  const confirm = (message: string | ModalOptions,
                   title: string,
                   icon: string,
                   options: ModalOptions) => {
    return createModal(message, title, icon, options, 'confirm');
  };
  Vue.prototype.$dprompt = prompt;
  Vue.prototype.$dalert = alert;
  Vue.prototype.$dconfirm = confirm;
  AeModal.confirm = confirm;
  AeModal.alert = alert;
  AeModal.info = alert.info;
  AeModal.success = alert.success;
  AeModal.error = alert.error;
  AeModal.warning = alert.warning;
  AeModal.prompt = prompt;
};

export default AeModal;
