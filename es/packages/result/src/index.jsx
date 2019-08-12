import * as tslib_1 from "tslib";
/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import Button from '../../button';
let Result = class Result extends Vue {
    render() {
        const { prefixCls, imgUrl, buttonText, buttonType } = this;
        let imgContent = null;
        const img = this.$slots.img || this.img;
        const title = this.$slots.title || this.title;
        const message = this.$slots.message || this.message;
        if (img) {
            imgContent = <div class={`${prefixCls}-pic`}>{img}</div>;
        }
        else if (imgUrl) {
            imgContent = (<div class={`${prefixCls}-pic`} style={{ backgroundImage: `url(${imgUrl})` }}/>);
        }
        return (<div class={classnames(prefixCls)} role="alert">
        {imgContent}
        {title ? <div class={`${prefixCls}-title`}>{title}</div> : null}
        {message ? (<div class={`${prefixCls}-message`}>{message}</div>) : null}
        {buttonText ? (<div class={`${prefixCls}-button`}>
            {
        // @ts-ignore
        <Button type={buttonType} onClick={() => {
            this.$emit('click');
        }}>
                {buttonText}
              </Button>}
          </div>) : null}
      </div>);
    }
};
tslib_1.__decorate([
    Prop({
        type: String,
        default: 'am-result'
    })
], Result.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Result.prototype, "imgUrl", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Object] })
], Result.prototype, "img", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Object] })
], Result.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: [String, Object] })
], Result.prototype, "message", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], Result.prototype, "buttonText", void 0);
tslib_1.__decorate([
    Prop({ default: '' })
], Result.prototype, "buttonType", void 0);
Result = tslib_1.__decorate([
    Component({
        name: 'MResult'
    })
], Result);
export default Result;
//# sourceMappingURL=index.jsx.map