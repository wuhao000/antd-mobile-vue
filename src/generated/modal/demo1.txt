<template>
  <div>
    <m-button @click="operation">操作</m-button>
    <m-button @click="confirm">确认</m-button>
    <m-button @click="alert">提示</m-button>
    <m-button @click="prompt">输入</m-button>
    <m-button @click="showPopup = true">弹窗</m-button>
    <m-modal v-model="showPopup"
             popup
             mask-closable
             animation-type="slide-up">
      <m-list>
        <m-list-item>
          操作1
        </m-list-item>
      </m-list>
    </m-modal>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import MModal from '../../index';

  Vue.use(MModal);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    public showPopup = false;
    public async alert() {
      await MModal.alert('警告', '操作很危险，确定继续吗');
      console.log('alert');
    }

    public async confirm() {
      try {
        await MModal.alert('警告', '操作很危险，确定继续吗', [{
          text: '取消'
        }, {
          text: '确认'
        }]);
        console.log('confirmed');
      } catch (e) {
        console.log('confirm canceled');
      } finally {
        console.log('finally handle');
      }

    }

    public operation() {
      MModal.operation([{text: '标为未读', onPress: () => console.log('标为未读被点击了')},
        {text: '置顶聊天', onPress: () => console.log('置顶聊天被点击了')}]);
    }

    public async prompt() {
      const value = await MModal.prompt('提示', '请输入');
      console.log('输入值为：' + value);
    }
  }
</script>
<style scoped lang="less">
</style>
