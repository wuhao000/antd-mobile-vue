<template>
  <div class="home">
    <markdown :source="content"></markdown>
    <div class="markdown-body">
      <div v-for="c in components"
          :key="c.name">
        <h2 class="m-t-b">v<span v-text="c.name"></span></h2>
        <div class="m-b">
          <code v-text="c.time"></code>
        </div>
        <markdown :source="c.source"></markdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import Markdown from '@/components/markdown.vue';
  import '@/styles/github-markdown.less';
  import {Options, Vue} from 'vue-class-component';
  import md from '../documents/change-log/index.md';
  import VersionMap from '../documents/change-log/map.json';

  @Options({
    name: 'Home',
    components: {
      Markdown
    }
  })
  export default class Home extends Vue {

    public components = [];
    public content: any = md;

    public created() {
      Object.keys(VersionMap).forEach(version => {
        import(`../documents/change-log/${version}.md`).then(comp => {
          this.components.push(Object.assign({
            name: version,
            source: comp.default
          }, VersionMap[version]));
        });
      });
    }
  }
</script>

