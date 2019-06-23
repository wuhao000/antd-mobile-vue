import Vue from 'vue';
import Component from 'vue-class-component';

const Menu = window.antd.Menu;

@Component({
  name: 'Wrapper'
})
export default class Wrapper extends Vue {

  public itemHeight = 40;
  public initCount = 30;
  public currentNodes = [];
  public itemsBeforeCount = 0;

  private onScroll(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    const target = e.target as HTMLDivElement;
    let itemsBeforeCount = parseInt((target.scrollTop / this.itemHeight).toString());
    if (itemsBeforeCount > this.$slots.default.length - this.initCount) {
      itemsBeforeCount = this.$slots.default.length - this.initCount;
    }
    if (this.itemsBeforeCount !== itemsBeforeCount) {
      this.itemsBeforeCount = itemsBeforeCount;
      this.currentNodes = this.$slots.default.slice(this.itemsBeforeCount, this.itemsBeforeCount + this.initCount);
    }
    console.log(this.$el.scrollHeight);
  }

  get topPlaceholderHeight() {
    return this.itemsBeforeCount * this.itemHeight;
  }

  get placeholderHeight() {
    return (this.$slots.default.length - this.currentNodes.length - this.itemsBeforeCount) * this.itemHeight;
  }

  public created() {
    this.currentNodes = this.$slots.default.slice(0, this.initCount);
    console.log(this.currentNodes.length);
  }

  public mounted() {
  }

  public render() {
    return <div onScroll={this.onScroll}>
      {<div style={{height: this.topPlaceholderHeight + 'px'}}/>}
      <Menu>
        {this.currentNodes}
      </Menu>
      {<div style={{height: this.placeholderHeight + 'px'}}/>}
    </div>;
  }
}
