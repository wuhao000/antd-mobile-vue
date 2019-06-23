<template>
  <div class="home">
    <markdown :source="content"></markdown>
  </div>
</template>
<script lang="ts">
  import Markdown from '@/components/markdown.vue';
  import '@/styles/github-markdown.less';
  import {Component, Vue} from 'vue-property-decorator';
  import md from './../../README.md';

  Vue.component('Markdown', Markdown);
  @Component({
    name: 'Home'
  })
  export default class Home extends Vue {
    public content: any = md;
  }
</script>

