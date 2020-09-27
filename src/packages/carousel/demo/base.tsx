import {reactive} from 'vue';

export const useBaseDemo = () => {
  const state = reactive({
    data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
    imgHeight: '176px',
    slideIndex: 2
  });
  return {
    state,
    afterChange(index) {
      state.slideIndex = index;
    },
    beforeChange(from, to) {
      console.log(`slide from ${from} to ${to}`);
    },
    onLoad() {
      // fire window resize event to change height
      window.dispatchEvent(new Event('resize'));
      state.imgHeight = 'auto';
    }
  };
};
