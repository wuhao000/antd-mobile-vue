<template>
  <div class="home">
    <markdown :source="content"></markdown>
    <markdown style="margin-top:50px;"
              :source="version"></markdown>
  </div>
</template>
<script lang="ts">
  import Markdown from '@/components/markdown.vue';
  import '@/styles/github-markdown.less';
  import {Component, Vue} from 'vue-property-decorator';
  import version from '../documents/change-log/README.md';
  import md from '../documents/develop.md';

  Vue.component('Markdown', Markdown);
  @Component({
    name: 'Home'
  })
  export default class Home extends Vue {
    public content: any = md;
    public version: any = version;
  }
</script>

