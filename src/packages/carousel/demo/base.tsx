import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'BaseDemo'
})
export default class BaseDemo extends Vue {

  public state = {
    data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    imgHeight: '176px',
    slideIndex: 2
  };

  public afterChange(index) {
    this.state.slideIndex = index;
  }

  public beforeChange(from, to) {
    console.log(`slide from ${from} to ${to}`);
  }

  public onLoad() {
    // fire window resize event to change height
    window.dispatchEvent(new Event('resize'));
    this.state.imgHeight = 'auto';
  }

}
