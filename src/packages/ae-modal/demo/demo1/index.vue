<template>
  <div>
    <d-button @click="showPrompt">输入</d-button>
    <d-button @click="showConfirm">确认</d-button>
    <d-button @click="showAlert">警告</d-button>
    <d-button @click="$dalert.info('这是一条消息')">Info</d-button>
    <d-button @click="$dalert.success('这是一条成功消息')">Success</d-button>
    <d-button @click="$dalert.error('这是一条错误消息')">Error</d-button>
    <d-button @click="$dalert.warning('这是一条警告消息')">Warning</d-button>
    <d-button @click="show = !show">
      显示
    </d-button>
    <ae-modal v-model="show"
              title="这是标题"
              @cancel="cancelClicked"
              @ok="onOk">
      <div>
        这是一个对话框
      </div>
    </ae-modal>
  </div>
</template>
<script lang="ts">
  import DMessage from '@/packages/d-message';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import AeModal from '../../index';

  Vue.use(DMessage);
  Vue.use(AeModal);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {

    public show = false;
    public treeData = [{
      title: '1',
      key: '1',
      children: [{
        title: '3',
        key: '3',
        isLeaf: true
      }]
    }, {
      title: '2',
      key: '2',
      children: [],
      type: 'dir'
    }];

    public cancelClicked() {
      this.$message.error('cancel clicked');
    }

    public loadTreeData(node) {
      return new Promise(() => {
      });
    }

    public onOk() {
      this.$message.success('ok clicked');
      this.show = false;
    }

    public async showAlert() {
      try {
        await this.$dalert({
          content: '<div>确认</div>',
          dangerousHtml: true
        });
        this.$dalert('确认');
      } catch (e) {
        this.$dalert('取消');
      }
    }

    public async showConfirm() {
      try {
        await this.$dconfirm('确认操作吗？', '确认');
        this.$dalert('确认操作');
      } catch (e) {
        this.$dalert('取消操作');
      } finally {

      }
    }

    public async showPrompt() {
      try {
        const v = await this.$dprompt({
          content: '<div>你好</div>',
          title: '提示',
          inputValue: '23',
          dangerousHtml: true,
          required: true
        });
        if (v === '') {
          throw new Error('必须输入');
        } else {
          this.$message.info('the input value is : ' + v);
        }
      } catch (e) {
      } finally {

      }
    }
  }
</script>
<style scoped lang="less">
</style>
