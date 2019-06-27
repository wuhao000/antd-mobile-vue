/* tslint:disable:jsx-no-multiline-js */
import classnames from 'classnames';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Button from '../../m-button';
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
  @Prop({
    default: () => {
      return () => {
      };
    }
  })
  public onButtonClick?: () => void;
  public static install: (Vue) => void;

  public render() {
    const {
      prefixCls,
      img,
      imgUrl,
      title,
      message,
      buttonText,
      onButtonClick,
      buttonType
    } = this;

    let imgContent: JSX.Element | null = null;
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
              <Button type={buttonType} onClick={onButtonClick}>
                {buttonText}
              </Button>
            }
          </div>
        ) : null}
      </div>
    );
  }
}
