import { __decorate } from "tslib";
import classNames from 'classnames';
import { Options, Vue } from 'vue-class-component';
import Item from './item';
let List = class List extends Vue {
    constructor() {
        super(...arguments);
        this.fields = [];
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
        const wrapCls = classNames(prefixCls, {
            [prefixCls + '-section']: this.section
        });
        const children = [];
        if (this.$slots.default) {
            this.$slots.default().forEach((it, index) => {
                if (index < this.$slots.default().length - 1) {
                    if (this.section && it.props) {
                        if (it.props.style) {
                            it.props.style.marginBottom = this.spaceBetweenSection + 'px';
                        }
                        else {
                            it.props.style = { marginBottom: this.spaceBetweenSection + 'px' };
                        }
                    }
                }
                children.push(it);
            });
        }
        return (<div class={wrapCls}>
          {this.$slots.title || this.title ? <div class={classNames(`${prefixCls}-header`, {
            [`${prefixCls}-required`]: this.required
        })}>
            {this.$slots.title ? this.$slots.title() : this.title}
          </div> : ''}
          {children.length ? (<div class={`${prefixCls}-body`}>{children}</div>) : null}
          {this.$slots.footer ? this.$slots.footer() : null}
        </div>);
    }
};
List.Item = Item;
List = __decorate([
    Options({
        inheritAttrs: false,
        name: 'MList',
        props: {
            section: { type: Boolean, default: false },
            prefixCls: { default: 'am-list' },
            role: { type: String },
            title: { type: [String, Object] },
            spaceBetweenSection: { type: Number, default: 8 },
            touchFeedback: { type: Boolean, default: true },
            model: { type: Object },
            rules: { type: Object },
            disabled: { type: Boolean, default: false },
            editable: { type: Boolean, default: true },
            required: { type: Boolean, default: false }
        },
        provide() {
            return {
                list: this
            };
        }
    })
], List);
export default List;
//# sourceMappingURL=index.jsx.map