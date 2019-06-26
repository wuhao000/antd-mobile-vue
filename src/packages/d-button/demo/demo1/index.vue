<template>
  <div>
    <div>
      <d-button>我是一个按钮</d-button>
      <d-button type="primary">我是一个按钮</d-button>
      <d-button type="danger">我是一个按钮</d-button>
      <d-button type="ghost">我是一个按钮</d-button>
      <d-button type="dashed">我是一个按钮</d-button>
    </div>
    <d-form disabled>
      <d-form-item>
        <d-button disabled>我是一个按钮</d-button>
        <d-button disabled
                  type="primary">我是一个按钮
        </d-button>
        <d-button disabled
                  type="danger">我是一个按钮
        </d-button>
        <d-button disabled
                  type="ghost">我是一个按钮
        </d-button>
        <d-button disabled
                  type="dashed">我是一个按钮
        </d-button>
      </d-form-item>
    </d-form>
    <div>
      <d-button text>我是一个按钮</d-button>
      <d-button text
                type="primary">我是一个按钮
      </d-button>
      <d-button text
                type="danger">我是一个按钮
      </d-button>
    </div>
    <div>
      <d-button disabled text>我是一个按钮</d-button>
      <d-button disabled text
                type="primary">我是一个按钮
      </d-button>
      <d-button disabled text
                type="danger">我是一个按钮
      </d-button>
    </div>
    <div style="background: black;">
      <d-button text
                icon="edit">修改
      </d-button>
      <d-button text
                style="color:white;"
                icon="delete">删除
      </d-button>
      <d-button text
                style="color:white;"
                icon="file-text">查看
      </d-button>
    </div>
  </div>
</template>
<script lang="ts">
  import Form from '@/packages/d-form';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DButton from '../../index';

  Vue.use(Form);
  Vue.use(DButton);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {
    // TODO
  }
</script>
<style scoped lang="less">
</style>
