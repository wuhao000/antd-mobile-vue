<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div class="code-box">
    <section class="code-box-demo">
      <slot name="demo"/>
    </section>
    <markdown class="code-box-meta"
              :source="markdown"></markdown>
    <pre v-hljs
         v-show="showCode"
         class="code-box-code markdown-body clearfix">
      <ae-layout>
        <ae-icon v-clipboard:copy="code"
                 v-clipboard:success="copied"
                 class="copy-btn"
                 type="copy"></ae-icon>
        <code v-text="code"></code>
      </ae-layout>
    </pre>
    <div class="show-code-btn">
      <d-button block
                icon="plus"
                style="border:none;"
                @click="showCode = !showCode">
        <span v-text="showCode ? '隐藏代码' : '显示代码'"></span>
      </d-button>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {Prop} from 'vue-property-decorator';

  @Component({
    name: 'CodeBox'
  })
  export default class CodeBox extends Vue {
    @Prop(String)
    public code: string;
    @Prop(String)
    public markdown: string;
    public showCode = false;

    public copied() {
      this.$message.success('已复制');
    }
  }
</script>
<style lang="less">
  .code-box {
    border: 1px solid #ebedf0;
    border-radius: 2px;
    display: inline-block;
    width: 100%;
    position: relative;
    margin: 0 0 16px;
    transition: all 0.2s;
  }

  .code-box-demo {
    border-bottom: 1px solid #ebedf0;
    padding: 22px 24px 30px;
    color: rgba(0, 0, 0, 0.65);
  }

  .code-box-code {
    padding: 0 22px;
    position: relative;

    .copy-btn {
      position: absolute;
      cursor: pointer;
      right: 30px;
      top: 0;
    }

    & > code {
      position: absolute;
      width: 100%;
      top: 0;
    }
  }

  .code-box-meta.markdown-body {
    position: relative;
    padding: 18px 22px;
    border-radius: 0 0 2px 2px;
    transition: background-color 0.4s;
    width: 100%;
    font-size: 14px;
  }

  .code-box-meta > h4 {
    position: absolute;
    top: -14px;
    padding: 1px 8px;
    margin-left: -8px;
    color: #777;
    border-radius: 2px 2px 0 0;
    background: #fff;
    font-size: 14px;
    width: auto;
  }

  .markdown-body {
    color: #314659;
    font-size: 14px;
    line-height: 2;
  }

  .show-code-btn {
    text-align: center;
    border-top: 1px solid #eee;
  }
</style>
