import * as tslib_1 from "tslib";
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import BaseFormComponent from '../../../mixins/base-input-component';
import Touchable from '../../vmc-feedback/feedback';
let MPopup = class MPopup extends BaseFormComponent {
    onCancel() {
        // @ts-ignore
        if (this.value !== undefined) {
            this.$emit('input', false);
        }
        else {
            // @ts-ignore
            this.stateValue = false;
        }
        this.$emit('cancel');
    }
    onOk() {
        // @ts-ignore
        if (this.value !== undefined) {
            this.$emit('input', false);
        }
        else {
            // @ts-ignore
            this.stateValue = false;
        }
        this.$emit('ok');
    }
    valueChanged(value) {
        this.stateValue = value;
    }
    getProps() {
        return {
            title: this.renderHeader(),
            height: this.height || 'auto',
            width: this.width || 'auto',
            placement: this.placement,
            visible: this.stateValue
        };
    }
    getListeners() {
        return {
            close: (e) => {
                this.$emit('cancel');
                // @ts-ignore
                this.stateValue = false;
            }
        };
    }
    getInputComponent() {
        return window.antd.Drawer;
    }
    renderHeader() {
        return <div class={this.prefixCls + '-title-wrap'}>
      {this.renderCancel()}
      <div class={`${this.prefixCls}-item ${this.prefixCls}-title`}>{this.title}</div>
      {this.renderOk()}
    </div>;
    }
    renderCancel() {
        return this.showCancel ?
            <Touchable activeClassName={`${this.prefixCls}-item-active`}>
          {this.cancelButton ? this.cancelButton
                : <div onclick={this.onCancel} class={`${this.prefixCls}-item ${this.prefixCls}-header-left`}>
                  {this.cancelText}
                </div>}
        </Touchable> : null;
    }
    renderOk() {
        return this.showOk ?
            <Touchable activeClassName={`${this.prefixCls}-item-active`}>
          <div onclick={this.onOk} class={`${this.prefixCls}-item ${this.prefixCls}-header-right`}>确定</div>
        </Touchable> : null;
    }
};
tslib_1.__decorate([
    Prop({ type: String, default: '取消' })
], MPopup.prototype, "cancelText", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], MPopup.prototype, "showCancel", void 0);
tslib_1.__decorate([
    Prop({ type: Object })
], MPopup.prototype, "cancelButton", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], MPopup.prototype, "showOk", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: '' })
], MPopup.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'am-popup' })
], MPopup.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], MPopup.prototype, "height", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], MPopup.prototype, "width", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'bottom' })
], MPopup.prototype, "placement", void 0);
tslib_1.__decorate([
    Watch('value')
], MPopup.prototype, "valueChanged", null);
MPopup = tslib_1.__decorate([
    Component({
        name: 'MPopup'
    })
], MPopup);
export default MPopup;
//# sourceMappingURL=index.jsx.map