import { __decorate } from "tslib";
import { Options, Vue } from 'vue-class-component';
import Icon from '../icon';
const httpReg = /^http(s)?:\/\//;
let IconRes = class IconRes extends Vue {
    render() {
        const icon = this.type;
        if (typeof icon === 'string') {
            if (httpReg.test(icon)) {
                return <img src={icon} alt={''}/>;
            }
            else {
                return <Icon type={icon} size={'md'}/>;
            }
        }
        else if (typeof icon === 'object') {
            if (icon.context) {
                return icon;
            }
            else if (icon.iconType === 'img') {
                return <img src={icon} {...icon} alt={''}/>;
            }
            else if (icon.iconType === 'icon') {
                return <Icon {...icon}/>;
            }
        }
    }
};
IconRes = __decorate([
    Options({
        name: 'IconRes',
        props: {
            type: [String, Object]
        }
    })
], IconRes);
export default IconRes;
//# sourceMappingURL=icon-res.jsx.map