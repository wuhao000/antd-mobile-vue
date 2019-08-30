import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Trigger from '../vmc-trigger';
import {placements} from './placements';

export interface ITooltipProps {
  trigger?: any;
  defaultVisible?: boolean;
  visible?: boolean;
  placement?: string;
  transitionName?: string;
  animation?: any;
  onVisibleChange?: Function;
  afterVisibleChange?: Function;
  overlay: VNode | Function;
  overlayStyle?: {};
  overlayClassName?: string;
  prefixCls?: string;
  getTooltipContainer?: Function;
  destroyTooltipOnHide?: boolean;
  align?: {};
  arrowContent?: any;
}

@Component({
  name: ''
})

class Tooltip extends Vue {
  @Prop({type: Boolean})
  public defaultVisible?: boolean;
  @Prop({type: Boolean})
  public visible?: boolean;
  @Prop({
    type: String,
    default: 'right'
  })
  public placement?: string;
  @Prop({type: String})
  public transitionName?: string;
  @Prop({})
  public animation?: any;
  @Prop({})
  public onVisibleChange?: Function;
  @Prop({})
  public afterVisibleChange?: Function;
  @Prop({})
  public overlay: VNode | Function;
  @Prop({})
  public overlayStyle?: {};
  @Prop({type: String})
  public overlayClassName?: string;
  @Prop({
    type: String,
    default: 'rmc-tooltip'
  })
  public prefixCls?: string;
  @Prop({})
  public getTooltipContainer?: Function;
  @Prop({
    type: Boolean,
    default: false
  })
  public destroyTooltipOnHide?: boolean;
  @Prop({
    default: () => {
      return {};
    }
  })
  public align?: {};
  @Prop({default: null})
  public arrowContent?: any;
  public getPopupElement = () => {
    const {arrowContent, overlay, prefixCls} = this;
    return ([
      <div className={`${prefixCls}-arrow`} key="arrow">
        {arrowContent}
      </div>,
      <div className={`${prefixCls}-inner`} key="content">
        {typeof overlay === 'function' ? overlay() : overlay}
      </div>
    ]);
  };

  public getPopupDomNode() {
    return this.trigger.triggerRef.getPopupDomNode();
  }

  get trigger(): any {
    return this.$refs.trigger;
  }

  public render() {
    const {
      overlayClassName,
      overlayStyle, prefixCls,
      onVisibleChange, afterVisibleChange,
      transitionName, animation,
      placement, align,
      destroyTooltipOnHide,
      defaultVisible, getTooltipContainer,
      ...restProps
    } = this;
    const extraProps: any = {...restProps};
    if ('visible' in this) {
      extraProps.popupVisible = this.visible;
    }
    return (<Trigger
        popupClassName={overlayClassName}
        ref="trigger"
        prefixCls={prefixCls}
        popup={this.getPopupElement}
        builtinPlacements={placements}
        popupPlacement={placement}
        popupAlign={align}
        getPopupContainer={getTooltipContainer}
        onPopupVisibleChange={onVisibleChange}
        afterPopupVisibleChange={afterVisibleChange}
        popupTransitionName={transitionName}
        popupAnimation={animation}
        defaultPopupVisible={defaultVisible}
        destroyPopupOnHide={destroyTooltipOnHide}
        popupStyle={overlayStyle}
        {...extraProps}
    >
      {this.$slots.default}
    </Trigger>);
  }
}

export default Tooltip;
