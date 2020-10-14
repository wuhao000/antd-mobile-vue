import { __decorate } from "tslib";
import { Options, Vue } from 'vue-class-component';
let Demo1 = class Demo1 extends Vue {
    constructor() {
        super(...arguments);
        this.dataList = [
            { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
            { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
            { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
            { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
            { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' }
        ].map(obj => ({
            icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }}/>,
            title: obj.title
        }));
    }
    render() {
        return <>
      <m-button>showActionSheet</m-button>
      <m-white-space></m-white-space>
      <m-button>showActionSheet&Badge</m-button>
      <m-white-space></m-white-space>
      <m-button>showShareActionSheet</m-button>
      <m-white-space></m-white-space>
      <m-button>showShareActionSheetMultipleLine</m-button>
      <m-white-space></m-white-space>
      <m-action-sheet value={true} menus={[{ label: 'a' }, { label: 'b' }]}>
      </m-action-sheet>
    </>;
    }
};
Demo1 = __decorate([
    Options({
        name: 'Demo1'
    })
], Demo1);
export default Demo1;
//# sourceMappingURL=demo1.jsx.map