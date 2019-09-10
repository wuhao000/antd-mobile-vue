import alert from './alert';
export default function confirm(title, message, actions, platform) {
  if (actions === void 0) {
    actions = [{
      text: '取消'
    }, {
      text: '确定'
    }];
  }

  if (platform === void 0) {
    platform = 'ios';
  }

  return alert(title, message, actions, platform);
}