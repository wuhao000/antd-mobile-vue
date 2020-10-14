import { defineComponent, onBeforeUnmount, reactive, ref } from 'vue';
import Button from '../../button';
import WhiteSpace from '../../white-space';
import WingBlank from '../../wing-blank';
import './demo1.less';
import ActivityIndicator from '../index';
export default defineComponent({
    setup() {
        const closeTimer = ref(null);
        const state = reactive({
            animating: false
        });
        const showToast = () => {
            state.animating = !state.animating;
            closeTimer.value = setTimeout(() => {
                state.animating = !state.animating;
            }, 1000);
        };
        onBeforeUnmount(() => {
            if (closeTimer.value) {
                clearTimeout(closeTimer.value);
            }
        });
        return {
            showToast, state
        };
    },
    render() {
        return (<div>
        <WingBlank>
          <div class="loading-container">
            <p class="sub-title">Without text</p>
            <div class="loading-example">
              <ActivityIndicator animating/>
            </div>
            <p class="sub-title">With text</p>
            <div class="loading-example">
              <ActivityIndicator text="Loading..."/>
            </div>
            <p class="sub-title">With large size and customized text style</p>
            <div class="loading-example">
              <div class="align">
                <ActivityIndicator size="large"/>
                <span style={{ marginTop: 8 }}>Loading...</span>
              </div>
            </div>
          </div>
          <div class="toast-container">
            <WhiteSpace size="xl"/>
            <Button onClick={this.showToast}>click to show Toast</Button>
            <div class="toast-example">
              <ActivityIndicator toast text="Loading..." animating={this.state.animating}/>
            </div>
          </div>
        </WingBlank>
      </div>);
    }
});
//# sourceMappingURL=demo1.jsx.map