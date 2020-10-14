import { defineComponent, reactive } from 'vue';
import './demo1.less';
import { Button, Progress, WhiteSpace, WingBlank } from '../../index';
export default defineComponent({
    setup() {
        const state = reactive({
            percent: 50
        });
        const add = () => {
            let p = state.percent + 10;
            if (state.percent >= 100) {
                p = 0;
            }
            state.percent = p;
        };
        return {
            state, add
        };
    },
    render() {
        const { percent } = this.state;
        return (<div class="progress-container">
          <Progress percent={30} position="fixed"/>
          <div style={{ height: '18px' }}/>
          <Progress percent={40} position="normal" unfilled={false} appearTransition/>
          <div class="show-info">
            <div class="progress"><Progress percent={percent} position="normal"/></div>
            <div aria-hidden="true">{percent}%</div>
          </div>
          <WhiteSpace size="xl"/>
          <WingBlank>
            <Button onClick={this.add}>(+-)10</Button>
          </WingBlank>
        </div>);
    }
});
//# sourceMappingURL=demo1.jsx.map