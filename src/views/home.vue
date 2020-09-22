<template>
  <div class="home">
    <markdown :source="content"></markdown>
  </div>
</template>
<script lang="ts">
import Markdown from '@/components/markdown.vue';
import '@/styles/github-markdown.less';
import {Options, Vue} from 'vue-class-component';
import md from './../../README.md';

@Options({
  name: 'Home',
  components: {Markdown}
})
export default class Home extends Vue {
  public content: any = md;
}
</script>

