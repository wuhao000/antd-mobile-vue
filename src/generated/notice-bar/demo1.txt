<template>
  <div>
    <m-notice-bar :marqueeProps="{ loop : true, style : { padding : '0 7.5px' } }">
      Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
    </m-notice-bar>
    <m-white-space size="lg"/>
    <m-notice-bar mode="link"
                  @click="() => alert('1')">
      Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
    </m-notice-bar>
    <m-white-space size="lg"/>
    <m-notice-bar mode="closable">Remove the default icon.</m-notice-bar>
    <m-white-space size="lg"/>
    <m-notice-bar mode="closable">
      <m-icon slot="icon"
              type="check-circle-o"
              size="xxs"/>
      Customized icon.
    </m-notice-bar>
    <m-white-space size="lg"/>
    <m-notice-bar mode="closable">
      <span slot="action"
            :style="{ color : '#a1a1a1' }">不再提示</span>
      Closable demo for `actionText`.
    </m-notice-bar>
    <m-white-space size="lg"/>
    <m-notice-bar mode="link">
      <span slot="action">去看看</span>
      Link demo for `actionText`.
    </m-notice-bar>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MNoticeBar from '../index';

  const a = `
  import { NoticeBar, WhiteSpace, Icon } from 'antd-mobile';

const NoticeBarExample = () => (
  <div>
    <WhiteSpace size="lg" />
    <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
      Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
    </NoticeBar>
    <WhiteSpace size="lg" />
    <NoticeBar mode="link" onClick={() => alert('1')}>
      Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
    </NoticeBar>
    <WhiteSpace size="lg" />
    <NoticeBar mode="closable" icon={null}>Remove the default icon.</NoticeBar>
    <WhiteSpace size="lg" />
    <NoticeBar mode="closable" icon={<Icon type="check-circle-o" size="xxs" />}>
      Customized icon.
    </NoticeBar>
    <WhiteSpace size="lg" />
    <NoticeBar mode="closable" action={<span style={{ color: '#a1a1a1' }}>不再提示</span>}>
      Closable demo for \`actionText\`.
    </NoticeBar>
    <WhiteSpace size="lg" />
    <NoticeBar mode="link" action={<span>去看看</span>}>
      Link demo for \`actionText\`.
    </NoticeBar>
  </div>
);

ReactDOM.render(<NoticeBarExample />, mountNode);
  `;
  Vue.use(MNoticeBar);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {

    public clickCount = 0;
    public messages = ['你点了我', '你点我干嘛', '轻点点', '别再点了'];

    public clicked() {
      this.$message.success(this.messages[this.clickCount % this.messages.length]);
      this.clickCount++;
    }
  }
</script>
<style scoped lang="less">
</style>
