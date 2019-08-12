const createContent = (el, binding, vnode) => {
    const bindValue = binding.value;
    let text = '';
    const format = 'YYYY-MM-DD HH:mm:ss';
    let date;
    if (typeof bindValue === 'string') {
        const reg1 = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
        if (reg1.test(bindValue)) {
            date = moment(bindValue, 'YYYY-MM-DDTHH:mm:ss.sZ').toDate();
            date.setHours(date.getHours() + 8);
        }
        else {
            text = bindValue;
        }
    }
    else {
        const value = binding.value;
        date = new Date(value);
        if (!value) {
            text = '';
        }
        else {
            text = moment(value).format(format);
            if (vnode.data.attrs) {
                if (vnode.data.attrs.format) {
                    text = moment(value).format(vnode.data.attrs.format);
                }
            }
        }
    }
    // @ts-ignore
    if (binding.modifiers.pretty && date) {
        const now = new Date();
        const nowTime = now.getTime();
        const difference = nowTime - date.getTime();
        if (difference > 0) {
            if (difference < 1000) {
                text = '刚刚';
            }
            else if (difference < 60 * 1000) {
                text = `${Math.floor(difference / 1000)}秒前`;
            }
            else if (difference < 60 * 1000 * 60) {
                text = `${Math.floor(difference / 1000 / 60)}分钟前`;
            }
            else if (now.getFullYear() === date.getFullYear()) {
                if (now.getMonth() === date.getMonth()
                    && now.getDay() === date.getDay()) {
                    text = moment(date).format('HH:mm:ss');
                }
                else {
                    text = moment(date).format('MM-DD HH:mm:ss');
                }
            }
        }
        else if (now.getFullYear() === date.getFullYear()) {
            if (now.getMonth() === date.getMonth()
                && now.getDay() === date.getDay()) {
                text = moment(date).format('HH:mm:ss');
            }
            else {
                text = moment(date).format('MM-DD HH:mm:ss');
            }
        }
    }
    el.innerHTML = text;
};
export default {
    bind(el, binding, vnode) {
        createContent(el, binding, vnode);
    },
    update(el, binding, vnode) {
        createContent(el, binding, vnode);
    }
};
//# sourceMappingURL=index.js.map