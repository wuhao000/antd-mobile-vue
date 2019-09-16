import Notification from 'ant-design-vue/lib/vc-notification';
import classnames from 'classnames';
import {VNode} from 'vue';
import Icon from '../../icon';

const prefixCls = 'am-toast';

function getMessageInstance(mask: boolean,
                            callback: (notification: any) => void) {
  (Notification as any).newInstance(
    {
      prefixCls,
      style: {}, // clear rmc-notification default style
      transitionName: 'am-fade',
      class: classnames({
        [`${prefixCls}-mask`]: mask,
        [`${prefixCls}-nomask`]: !mask
      })
    },
    (notification: any) => callback && callback(notification)
  );
}

function notice(content: string | VNode, type: string,
                duration = 3, onClose: (() => void) | undefined, mask = true) {
  const iconTypes: { [key: string]: string } = {
    info: '',
    success: 'success',
    fail: 'fail',
    offline: 'dislike',
    loading: 'loading'
  };
  const iconType = iconTypes[type];
  const messageInstance: any = {
    $destroy: () => {
      console.error('Toast渲染未完成');
    },
    destroyed: false
  };
  messageInstance.destroy = () => {
    if (!messageInstance.destroyed) {
      messageInstance.destroyed = true;
      messageInstance.$destroy();
    }
  };
  messageInstance.hide = () => {
    if (typeof messageInstance.destroy === 'function') {
      messageInstance.destroy();
    }
  };
  getMessageInstance(mask, notification => {
    messageInstance.$destroy = notification.destroy;
    messageInstance.component = notification.component;
    notification.notice({
      duration,
      style: {},
      onClick: () => {
      },
      content(h) {
        return !!iconType ? (
          <div
            class={`${prefixCls}-text ${prefixCls}-text-icon`}
            role={'alert'}
            aria-live={'assertive'}>
            <Icon type={iconType} size={'lg'}/>
            <div class={`${prefixCls}-text-info`}>{content}</div>
          </div>
        ) : (
          <div class={`${prefixCls}-text`}
               role={'alert'}
               aria-live={'assertive'}>
            <div>{content}</div>
          </div>
        );
      },
      closable: true,
      onClose() {
        if (onClose) {
          onClose();
        }
        if (typeof notification.destroy === 'function') {
          notification.destroy();
        }
        messageInstance.destroy = null;
      }
    });
  });
  return messageInstance;
}

export default {
  install: (any) => {
  },
  show(content: string | VNode, duration?: number, mask?: boolean) {
    return notice(content, 'info', duration, () => {
    }, mask);
  },
  info(
    content: string | VNode,
    duration?: number,
    onClose?: () => void,
    mask: boolean = false
  ) {
    return notice(content, 'info', duration, onClose, mask);
  },
  success(
    content: string | VNode,
    duration?: number,
    onClose?: () => void,
    mask: boolean = false
  ) {
    return notice(content, 'success', duration, onClose, mask);
  },
  fail(
    content: string | VNode,
    duration?: number,
    onClose?: () => void,
    mask: boolean = false
  ) {
    return notice(content, 'fail', duration, onClose, mask);
  },
  offline(
    content: string | VNode,
    duration?: number,
    onClose?: () => void,
    mask: boolean = false
  ) {
    return notice(content, 'offline', duration, onClose, mask);
  },
  loading(content: string | VNode, duration?: number,
          onClose?: () => void, mask?: boolean) {
    return notice(content, 'loading', duration, onClose, mask);
  }
};
