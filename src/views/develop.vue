<template>
  <div class="home">
    <m-input v-model="form.value"/>
    <markdown :source="content"></markdown>
    <markdown style="margin-top:50px;"
              :source="version"></markdown>
  </div>
</template>
<script lang="ts">
  import Markdown from '@/components/markdown.vue';
  import Input from '@/packages/input';
  import '@/styles/github-markdown.less';
  import {Component, Vue} from 'vue-property-decorator';
  import version from '../documents/change-log/README.md';
  import md from '../documents/develop.md';

  Vue.use(Input);
  Vue.component('Markdown', Markdown);
  @Component({
    name: 'Home'
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

