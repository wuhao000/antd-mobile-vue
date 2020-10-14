import { defineComponent, onMounted, reactive, ref } from 'vue';
import { PullRefresh, Button } from '../../index';
function genData(dataArr = []) {
    const len = dataArr.length;
    for (let i = 0; i < 20; i++) {
        dataArr.push(i + len);
    }
    return dataArr.reverse();
}
export default defineComponent({
    setup() {
        const state = reactive({
            refreshing: false,
            down: true,
            height: document.documentElement.clientHeight,
            data: []
        });
        const ptrRef = ref(null);
        onMounted(() => {
            const hei = state.height - ptrRef.value.$el.offsetTop;
            setTimeout(() => {
                state.height = hei;
                state.data = genData(state.data);
            }, 0);
        });
        return {
            state, ptrRef
        };
    },
    render() {
        return (<div>
      <Button style={{ marginBottom: '15px' }} onClick={() => {
            this.state.down = !this.state.down;
        }}>
        direction: {this.state.down ? 'down' : 'up'}
      </Button>
      <PullRefresh damping={60} ref={el => this.ptrRef = el} style={{
            height: this.state.height,
            overflow: 'auto'
        }} indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }} direction={this.state.down ? 'down' : 'up'} value={this.state.refreshing} onRefresh={() => {
            this.state.refreshing = true;
            setTimeout(() => {
                this.state.data = genData(this.state.data);
                this.state.refreshing = false;
            }, 1000);
        }}>
        {this.state.data.map(i => (<div key={i} style={{ textAlign: 'center', padding: '20px' }}>
              {this.state.down ? 'pull down' : 'pull up'} {i}
            </div>))}
      </PullRefresh>
    </div>);
    }
});
//# sourceMappingURL=demo1.jsx.map