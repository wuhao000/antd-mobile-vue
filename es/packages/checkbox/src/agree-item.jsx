import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import getDataAttr from '../../utils/get-data-attr';
import Checkbox from './checkbox';
let AgreeItem = class AgreeItem extends Vue {
    render() {
        const restProps = tslib_1.__rest(this.$props, []);
        const { prefixCls } = restProps;
        const wrapCls = classnames(`${prefixCls}-agree`);
        return (<div {...getDataAttr(restProps)} class={wrapCls}>
          <Checkbox {...restProps} class={`${prefixCls}-agree-label`}>
            {this.$slots.default}
          </Checkbox>
        </div>);
    }
};
tslib_1.__decorate([
    Prop({ type: String, default: 'am-checkbox' })
], AgreeItem.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], AgreeItem.prototype, "name", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean })
], AgreeItem.prototype, "wrapLabel", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], AgreeItem.prototype, "defaultChecked", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], AgreeItem.prototype, "checked", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], AgreeItem.prototype, "disabled", void 0);
AgreeItem = tslib_1.__decorate([
    Component({
        name: 'MAgreeItem'
    })
], AgreeItem);
export default AgreeItem;
//# sourceMappingURL=agree-item.jsx.map