import {VNode} from 'vue';
import alert from './alert';

export default function confirm(
  title: string | VNode,
  message: string | VNode,
  actions = [{text: '取消'}, {text: '确定'}],
  platform = 'ios'
) {
  return alert(title, message, actions, platform);
}
