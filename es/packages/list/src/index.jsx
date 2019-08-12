import * as tslib_1 from "tslib";
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide } from 'vue-property-decorator';
import Item from './list-item';
let List = class List extends Vue {
    constructor() {
        super(...arguments);
        this.list = this;
        this.fields = [];
    }
    created() {
        this.$on('d.form.addField', (field) => {
            if (field) {
                this.fields.push(field);
            }
        });
        /* istanbul ignore next */
        this.$on('d.form.removeField', (field) => {
            if (field.prop) {
                this.fields.splice(this.fields.indexOf(field), 1);
            }
        });
    }
    clearValidate(props = []) {
        const fields = props.length
            ? (typeof props === 'string'
                ? this.fields.filter(field => props === field.prop)
                : this.fields.filter(field => props.indexOf(field.prop) > -1)) : this.fields;
        fields.forEach(field => {
            field.clearValidate();
        });
    }
    resetFields() {
        if (!this.model) {
            console.warn('[Element Warn][Form]model is required for resetFields to work.');
            return;
        }
        this.fields.forEach(field => {
            field.resetField();
        });
    }
    validate(callback) {
        if (!this.model) {
            return;
        }
        let promise;
        let copyCallback = callback;
        // if no callback, return promise
        if (typeof copyCallback !== 'function' && Promise) {
            promise = new Promise((resolve, reject) => {
                copyCallback = (valid) => {
                    const errorField = this.fields.find(it => it.validateStatus === 'error');
                    if (errorField) {
                        errorField.focus();
                    }
                    valid ? resolve(valid) : reject(valid);
                };
            });
        }
        let valid = true;
        let count = 0;
        // 如果需要验证的fields为空，调用验证时立刻返回callback
        if (this.fields.length === 0 && copyCallback) {
            copyCallback(true);
        }
        let invalidFields = {};
        this.fields.forEach(field => {
            field.validate('', (message, field) => {
                if (message) {
                    valid = false;
                }
                invalidFields = Object.assign({}, invalidFields, field);
                if (typeof copyCallback === 'function' && ++count === this.fields.length) {
                    copyCallback(valid, invalidFields);
                }
            });
        });
        if (promise) {
            return promise;
        }
    }
    validateField(props, cb) {
        const copyProps = [].concat(props);
        const fields = this.fields.filter(field => copyProps.indexOf(field.prop) !== -1);
        if (!fields.length) {
            console.warn('[Element Warn]please pass correct props!');
            return;
        }
        fields.forEach(field => {
            field.validate('', cb);
        });
    }
    render() {
        const { prefixCls } = this;
        const wrapCls = classnames(prefixCls, {
            [prefixCls + '-section']: this.section
        });
        const children = [];
        if (this.$slots.default) {
            this.$slots.default.forEach((it, index) => {
                if (index < this.$slots.default.length - 1) {
                    if (this.section && it.data) {
                        if (it.data.staticStyle) {
                            it.data.staticStyle.marginBottom = this.spaceBetweenSection + 'px';
                        }
                        else {
                            it.data.staticStyle = { marginBottom: this.spaceBetweenSection + 'px' };
                        }
                    }
                }
                children.push(it);
            });
        }
        return (<div class={wrapCls}>
          {this.$slots.title ? this.$slots.title : (this.title ? <div class={`${prefixCls}-header`}>
                {this.title}
              </div> : null)}
          {children.length ? (<div class={`${prefixCls}-body`}>{children}</div>) : null}
          {this.$slots.footer ? this.$slots.footer : null}
        </div>);
    }
};
List.Item = Item;
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], List.prototype, "section", void 0);
tslib_1.__decorate([
    Prop({ default: 'am-list' })
], List.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], List.prototype, "role", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], List.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: Number, default: 8 })
], List.prototype, "spaceBetweenSection", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], List.prototype, "touchFeedback", void 0);
tslib_1.__decorate([
    Provide('list')
], List.prototype, "list", void 0);
tslib_1.__decorate([
    Prop({ type: Object })
], List.prototype, "model", void 0);
tslib_1.__decorate([
    Prop({ type: Object })
], List.prototype, "rules", void 0);
List = tslib_1.__decorate([
    Component({
        name: 'MList'
    })
], List);
export default List;
//# sourceMappingURL=index.jsx.map