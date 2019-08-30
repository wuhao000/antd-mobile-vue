import Vue from 'vue';
import {Prop} from 'vue-property-decorator';
import Component from 'vue-class-component';
import Tooltip from '../../vmc-tooltip';
import Item from 'popover/src/Item';
import { PopoverPropsType } from './props-type';

export interface PopOverPropsType extends PopoverPropsType {
  prefixCls?: string;
  visible?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  placement?:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight';
  mask?: boolean;
}

function recursiveCloneChildren(
  children: any,
  cb = (ch: React.ReactChild, _: number) => ch,
): React.ReactChild[] {
  return React.Children.map(children, (child, index) => {
    const newChild = cb(child, index);
    if (
      typeof newChild !== 'string' &&
      typeof newChild !== 'number' &&
      newChild &&
      newChild.props &&
      newChild.props.children
    ) {
      return React.cloneElement(
        newChild,
        {},
        recursiveCloneChildren(newChild.props.children, cb),
      );
    }
    return newChild;
  });
}

export default @Component({
  name: ''
})

class Popover extends Vue {
  @Prop({
    type: String,
    default: 'am-popover'
  })
  public prefixCls?: string;
  @Prop({type: Boolean})
  public visible?: boolean;
  @Prop({})
  public onVisibleChange?: (visible: boolean) => void;
  @Prop({default: 'bottomRight'})
  public placement?:
      'left'
  'right'
  'top'
  'bottom'
  'topLeft'
  'topRight'
  'bottomLeft'
  'bottomRight';
  @Prop({type: Boolean})
  public mask?: boolean;
  @Prop({})
  public onSelect?: (node: any, index?: number) => void;
  @Prop({})
  public overlay: VNode;
  @Prop({type: Boolean})
  public disabled?: boolean;
  public static Item = Item;

  public render() {
    const {
      overlay, onSelect = () => {
      }, ...restProps
    } = this;

    const overlayNode = recursiveCloneChildren(overlay, (child, index) => {
      const extraProps: any = {firstItem: false};
      if (
          child &&
          typeof child !== 'string' &&
          typeof child !== 'number' &&
          child.type &&
          // Fixme: not sure where the `myName` came from.
          (child.type as any).myName === 'PopoverItem' &&
          !child.props.disabled
      ) {
        extraProps.onClick = () => onSelect(child, index);
        extraProps.firstItem = index === 0;
        return React.cloneElement(child, extraProps);
      }
      return child;
    });
    const wrapperNode = (
        <div className={`${this.prefixCls}-inner-wrapper`}>
          {overlayNode}
        </div>
    );
    return <Tooltip {...restProps} overlay={wrapperNode}/>;
  }
}
