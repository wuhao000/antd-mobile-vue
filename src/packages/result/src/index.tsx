/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Button from '../../button';
import {ResultPropsType} from './props-type';

export interface ResultProps extends ResultPropsType {
  prefixCls?: string;
}

@Component({
  name: 'MResult'
})
export default class Result extends Vue {
  @Prop({
    type: String,
    default: 'am-result'
  })
  public prefixCls?: string;
  @Prop({type: String})
  public imgUrl?: string;
  @Prop({type: [String, Object]})
  public img?: string | VNode;
  @Prop({type: [String, Object]})
  public title?: string | VNode;
  @Prop({type: [String, Object]})
  public message?: string | VNode;
  @Prop({type: String})
  public buttonText?: string;
  @Prop({default: ''})
  public buttonType?: 'primary' | 'ghost';
  public static install: (Vue) => void;

  public render() {
    const {
      prefixCls,
      imgUrl,
      buttonText,
      buttonType
    } = this;

    let imgContent: VNode | null = null;
    const img = this.$slots.img || this.img;
    const title = this.$slots.title || this.title;
    const message = this.$slots.message || this.message;
    if (img) {
      imgContent = <div class={`${prefixCls}-pic`}>{img}</div>;
    } else if (imgUrl) {
      imgContent = (
        <div
          class={`${prefixCls}-pic`}
          style={{backgroundImage: `url(${imgUrl})`}}
        />
      );
    }

    return (
      <div
        class={classnames(prefixCls)}
        role="alert"
      >
        {imgContent}
        {title ? <div class={`${prefixCls}-title`}>{title}</div> : null}
        {message ? (
          <div class={`${prefixCls}-message`}>{message}</div>
        ) : null}
        {buttonText ? (
          <div class={`${prefixCls}-button`}>
            {
              // @ts-ignore
              <Button type={buttonType}
                      onClick={() => {
                        this.$emit('click');
                      }}>
                {buttonText}
              </Button>
            }
          </div>
        ) : null}
      </div>
    );
  }
}
