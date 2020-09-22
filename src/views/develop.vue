<template>
  <div class="home">
    <markdown :source="content"></markdown>
    <markdown style="margin-top:50px;"
              :source="version"></markdown>
  </div>
</template>
<script lang="ts">
  import '@/styles/github-markdown.less';
  import version from '../documents/change-log/README.md';
  import Markdown from '@/components/markdown.vue';
  import md from '../documents/develop.md';
  import {Options, Vue} from 'vue-class-component';

  @Options({
    name: 'Home',
    components: {
      Markdown
    }
  })
  export default class Home extends Vue {
    public content: any = md;
    public form = {};
    public version: any = version;

    public mounted() {
      this.form = {value: '2'};
    }
  }
</script>

