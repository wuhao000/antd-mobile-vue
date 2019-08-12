import * as tslib_1 from "tslib";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
const Icon = aegis.AeIcon;
const httpReg = /^http(s)?:\/\//;
let IconRes = class IconRes extends Vue {
    render() {
        const icon = this.type;
        if (typeof icon === 'string') {
            if (httpReg.test(icon)) {
                return <img src={icon} alt={''}/>;
            }
            else {
                return <Icon mobile={true} type={icon} size={'md'}/>;
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
                return <Icon {...{ props: icon }}/>;
            }
        }
    }
};
tslib_1.__decorate([
    Prop({ type: [String, Object] })
], IconRes.prototype, "type", void 0);
IconRes = tslib_1.__decorate([
    Component({
        name: 'IconRes'
    })
], IconRes);
export default IconRes;
//# sourceMappingURL=icon-res.jsx.map