<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div class="code-box code-box-target">
    <markdown class="code-box-meta"
              :source="markdown"></markdown>
    <CopyOutlined class="copy-btn"/>
    <pre class="code-box-code markdown-body clearfix">
      <a-layout>
        <code v-text="code"></code>
      </a-layout>
    </pre>
  </div>
</template>
<script lang="ts">
import {message} from 'ant-design-vue';
import {Options, Vue} from 'vue-class-component';

@Options({
  name: 'CodeBox',
  props: {
    code: String,
    markdown: String
  }
})
export default class CodeBox extends Vue {
  public code: string;
  public markdown: string;
  public showCode = false;

  public copied() {
    message.success('已复制');
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

  &.code-box-target {
    -webkit-box-shadow: 0 0 4px rgba(16, 142, 233, .5);
    box-shadow: 0 0 4px rgba(16, 142, 233, .5);
  }
}

.code-box-demo {
  border-bottom: 1px solid #ebedf0;
  padding: 22px 24px 30px;
  color: rgba(0, 0, 0, 0.65);
}

.copy-btn {
  position: absolute;
  cursor: pointer;
  right: 30px;
  top: 20px;
}

.code-box-code {
  padding: 0 22px;
  position: relative;


  code {
    width: 100%;
    top: 0;
    max-height: 220px;
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
  font-size: 16px;
  color: #777;
  -webkit-transition: all .4s ease;
  transition: all .4s ease;
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
