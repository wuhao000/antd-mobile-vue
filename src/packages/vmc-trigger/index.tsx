import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import Trigger from './trigger';

function noop() {
}

function returnEmptyString() {
  return '';
}

function returnDocument() {
  return window.document;
}

@Component({
  name: ''
})

class TriggerWrap extends Vue {

  public static displayName = 'TriggerWrap';
  public triggerRef: any;

  @Prop({type: Boolean, default: false})
  public visible: boolean;
  public state = {
    popupVisible: this.visible
  };

  @Watch('visible')
  public popupVisibleChanged(visible: boolean) {
    this.state.popupVisible = visible;
  }

  public setPopupVisible(visible) {
    if (this.state.popupVisible !== visible) {
      this.state.popupVisible = visible;
      this.$emit('update:visible', visible);
    }
  }

  public onTargetClick() {
    this.setPopupVisible(!this.state.popupVisible);
  }

  public onClose() {
    this.setPopupVisible(false);
  }

  public render() {
    return (
        <Trigger
            ref={el => this.triggerRef = el}
            {...this}
            visible={this.state.popupVisible}
            onTargetClick={this.onTargetClick.bind(this)}
            onClose={this.onClose.bind(this)}
        />
    );
  }
}

export default TriggerWrap;
