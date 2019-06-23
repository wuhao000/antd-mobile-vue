<template>
  <div>
    <div>
      <m-button inline
                size="small"
                type="info"
                @click="registerAPI">注册API
      </m-button>
      <m-button inline
                v-if="showRequest"
                class="m-l"
                size="small"
                type="info"
                @click="requestAPI">测试接口请求
      </m-button>
    </div>
    <div class="m-t">
      <div v-codemirror.format="code"
           v-if="apiResult"
           type="json">
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import message from '@/packages/d-message';
  import AegisUI from '@/packages/global';
  import HttpMethod from '@/packages/http-method';
  import MButton from '@/packages/m-button';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {ApiResponse} from '../../../../../types';
  import Codemirror from '../../../codemirror-directive';

  Vue.use(message);
  Vue.use(Codemirror);

  @Component({
    name: 'Demo1',
    components: {MButton}
  })
  export default class Demo1 extends Vue {
    private apiResult: any = null;
    private showRequest: boolean = false;

    get code() {
      if (this.apiResult) {
        return JSON.stringify(this.apiResult);
      } else {
        return '';
      }
    }

    public registerAPI() {
      AegisUI.proxyAPI({
        user: {
          get: {
            url: 'https://oa.aegis-info.com/api/management/info',
            method: HttpMethod.GET
          }
        }
      }, {
        basePath: '/api',
        httpStatusErrorHandler: () => {
        },
        logicErrorHandler: (data: ApiResponse<any>, code: number): boolean => {
          return false;
        },
        pathSuffix: ''
      });
      if (this.$api) {
        this.showRequest = true;
      }
    }

    public async requestAPI() {
      try {
        this.apiResult = await this.$api['user']['get'].r();
      } catch (e) {
        this.$message.success('接口请求完成');
        this.apiResult = e;
      } finally {

      }
    }

  }
</script>
