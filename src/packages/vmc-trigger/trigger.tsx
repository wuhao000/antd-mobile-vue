import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import Popup from '../popup';
import {setProps} from '../utils/vnode';
import {getAlignFromPlacement, getPopupClassNameFromAlign} from './utils';
import contains from './contains';
import addEventListener from './add-event-listener';

function noop() {
}

function returnEmptyString() {
  return '';
}

function returnDocument() {
  return window.document;
}

export interface IProptypes {
  visible: boolean;
  onTargetClick: () => void;
  onClose: () => void;
}

@Component({
  name: 'VmcTrigger'
})
export default class Trigger extends Vue {

  public touchOutsideHandler: any;
  public popupRef: any;
  public _component: any;
  public _container: any;
  @Prop({type: Boolean})
  public visible: boolean;
  @Prop()
  public getDocument: any;
  @Prop()
  public popupPlacement: any;
  @Prop()
  public builtinPlacements: any;
  @Prop()
  public popupAlign: any;
  @Prop({type: String, default: 'vmc-trigger'})
  public prefixCls: string;
  @Prop()
  public destroyPopupOnHide: any;
  @Prop()
  public getPopupContainer: any;
  @Prop({type: Boolean, default: false})
  public mask: boolean;
  @Prop({type: Boolean, default: true})
  public maskClosable: boolean;

  public mounted() {
    if (this.visible) {
      this.componentDidUpdate();
    }
  }

  public beforeDestroy() {
    this.clearOutsideHandler();
  }

  public componentDidUpdate() {
    if (this.visible) {
      // always hide on mobile
      if (!this.touchOutsideHandler) {
        // add setTimeout for preact
        // prevent in here before setTimeout callback
        this.touchOutsideHandler = setTimeout(() => {
          const currentDocument = this.getDocument!();
          this.touchOutsideHandler = addEventListener(currentDocument, 'touchend', this.onDocumentClick);
        });
      }
      return;
    }

    this.clearOutsideHandler();
  }

  public clearOutsideHandler() {
    if (this.touchOutsideHandler) {
      if (this.touchOutsideHandler.remove) {
        this.touchOutsideHandler.remove();
      }
      this.touchOutsideHandler = null;
    }
  }

  public onDocumentClick(event) {
    if (this.mask && !this.maskClosable) {
      return;
    }
    const target = event.target;
    const root = this.$el;
    const popupNode = this.getPopupDomNode();
    if (!contains(root, target) && !contains(popupNode, target)) {
      this.close();
    }
  }

  public getPopupDomNode() {
    // for test
    if (this._component && this._component.getPopupDomNode) {
      return this._component.getPopupDomNode();
    }
    return null;
  }

  public getPopupAlign() {
    const {popupPlacement, popupAlign, builtinPlacements} = this;
    if (popupPlacement && builtinPlacements) {
      return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
    }
    return popupAlign;
  }

  public getRootDomNode() {
    return this.$root.$el;
  }

  public getPopupClassNameFromAlign(align) {
    const className: string[] = [];
    const props = this;
    const {popupPlacement, builtinPlacements, prefixCls} = props;
    if (popupPlacement && builtinPlacements) {
      className.push(getPopupClassNameFromAlign(builtinPlacements, prefixCls, align));
    }
    if (props.getPopupClassNameFromAlign) {
      className.push(props.getPopupClassNameFromAlign(align));
    }
    return className.join(' ');
  }

  public saveRef(el, visible) {
    this.popupRef = el;
    this._component = el;
    this.$emit('update:visible', visible);
  }

  public getComponent(visible) {
    const props = this.$props;
    ['visible', 'onAnimateLeave'].forEach(key => {
      if (props.hasOwnProperty(key)) {
        delete props[key];
      }
    });
    return (
        <Popup
            key="popup"
            ref={el => this.saveRef(el, visible)}
            prefixCls={props.prefixCls}
            destroyPopupOnHide={props.destroyPopupOnHide}
            visible={visible}
            className={props.popupClassName}
            align={this.getPopupAlign()}
            onAlign={props.onPopupAlign}
            animation={props.popupAnimation}
            getClassNameFromAlign={this.getPopupClassNameFromAlign.bind(this)}
            getRootDomNode={this.getRootDomNode.bind(this)}
            style={props.popupStyle}
            mask={props.mask}
            zIndex={props.zIndex}
            transitionName={props.popupTransitionName}
            maskAnimation={props.maskAnimation}
            maskTransitionName={props.maskTransitionName}
            onAnimateLeave={this.onAnimateLeave}
        >
          {typeof props.popup === 'function' ? props.popup() : props.popup}
        </Popup>
    );
  }

  public close() {
    this.$emit('close');
  }

  public onAnimateLeave = () => {
    if (this.destroyPopupOnHide) {
      const container = this._container;
      if (container) {
        container.destroy();
        container.parentNode.removeChild(container);
      }
    }
  };

  public removeContainer() {
    const container = document.querySelector(`#${this.prefixCls}-container`);
    if (container) {
      container.remove();
      (container as any).parentNode.removeChild(container);
    }
  }

  public getContainer() {
    if (!this._container) {
      const props = this;
      const popupContainer = document.createElement('div');
      // Make sure default popup container will never cause scrollbar appearing
      // https://github.com/react-component/trigger/issues/41
      popupContainer.style.position = 'absolute';
      popupContainer.style.top = '0';
      popupContainer.style.left = '0';
      popupContainer.style.width = '100%';
      const mountNode = props.getPopupContainer ?
          props.getPopupContainer(this.$el) : props.getDocument!().body;
      mountNode.appendChild(popupContainer);
      this._container = popupContainer;
    }
    return this._container;
  }

  public render() {
    const props = this;
    const children = this.$slots.default;
    const child = this.$slots.default && this.$slots.default.length === 1 ? this.$slots.default[0] : null;
    const newChildProps: any = {
      onClick: this.$listeners.click,
      key: 'trigger'
    };
    return setProps(child, newChildProps);
  }
}
