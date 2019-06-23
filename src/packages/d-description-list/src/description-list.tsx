import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {Row} from '../../ae-grid';
import {setProps} from '../../utils/vnode';

@Component({
  name: 'DescriptionList'
})
class DescriptionList extends Vue {

  @Prop({type: String, default: 'd-description-list'})
  public prefixCls: string;
  @Prop({type: String})
  public title: string;
  @Prop({type: Number, default: 32})
  public gutter: number;
  @Prop({type: Number, default: 3})
  public col: number;
  @Prop({type: String, default: 'horizontal'})
  public layout: string;
  @Prop({type: String})
  public size: string;
  public static install: (Vue) => void;
  public static Description: any;

  public render() {
    const {prefixCls, gutter, title, size, layout, col} = this;
    const clsString = classNames(prefixCls + '-descriptionList', prefixCls + '-' + layout, {
      [prefixCls + '-small']: size === 'small',
      [prefixCls + '-large']: size === 'large'
    });
    const column = col > 4 ? 4 : col;
    return (
      <div class={clsString}>
        {title ? <div class={prefixCls + '-title'}>{title}</div> : null}
        <Row gutter={gutter}>
          {
            this.$slots.default ? this.$slots.default.map(child => {
              setProps(child, {column});
              return child;
            }) : null
          }
        </Row>
      </div>
    );
  }
}

export default DescriptionList;
