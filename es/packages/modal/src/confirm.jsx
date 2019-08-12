import alert from './alert';
export default function confirm(title, message, actions = [{ text: '取消' }, { text: '确定' }], platform = 'ios') {
    return alert(title, message, actions, platform);
}
//# sourceMappingURL=confirm.jsx.map