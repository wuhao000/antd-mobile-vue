/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import { defineComponent } from 'vue';
import Button from '../../button';
export default defineComponent({
    install: null,
    name: 'MResult',
    props: {
        prefixCls: {
            type: String,
            default: 'am-result'
        },
        imgUrl: {
            type: String
        },
        img: {
            type: [String, Object]
        },
        title: {
            type: [String, Object]
        },
        message: {
            type: [String, Object]
        },
        buttonText: {
            type: String
        },
        buttonType: {
            default: ''
        }
    },
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
});
//# sourceMappingURL=index.jsx.map