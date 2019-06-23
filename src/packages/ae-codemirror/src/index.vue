<template>
  <div>
    <div ref="el"></div>
  </div>
</template>
<script lang="tsx">
  import {EditorConfiguration} from 'codemirror';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {Prop, Watch} from 'vue-property-decorator';
  import beautify from '../../../utils/beautify';

  @Component({
    name: 'CodemirrorEditor',
    methods: {}
  })
  export default class CodeMirrorComponent extends Vue {
    /**
     * 是否对初始值进行格式化
     */
    @Prop({type: Boolean, default: false})
    public beautify: boolean;
    /**
     * 选项配置，具体参见codemirror配置
     */
    @Prop({
      type: Object, default() {
        return {};
      }
    })
    public config: any;
    /**
     * 编辑区高度
     */
    @Prop(String)
    public height: string;
    /**
     * 是否显示代码提示
     */
    @Prop({type: Boolean, default: false})
    public hint: boolean;
    /**
     * 代码类型（同codemirror的mode）
     */
    @Prop(String)
    public mode: 'json' | 'shell' | 'powershell' | 'python' | 'javascript' | 'kotlin' | 'html' | 'nginx' | string;
    /**
     * 主题
     */
    @Prop({type: String, default: '3024-day'})
    public theme: string;
    /**
     * 编辑的内容，支持v-model
     */
    @Prop(String)
    public value: any;
    /**
     * 编辑区域宽度，默认自动
     */
    @Prop(String)
    public width: string;
    public changed: boolean = false;
    private types = {
      nginx: 'text/x-nginx-conf',
      json: 'application/ld+json',
      shell: 'application/x-sh',
      powershell: 'application/x-powershell',
      python: 'text/x-python',
      javascript: 'text/javascript',
      kotlin: 'text/x-kotlin',
      html: 'text/html'
    };
    public viewer = null as CodeMirror.Editor;

    @Watch('mode')
    public modeChanged() {
      if (this.viewer) {
        this.viewer.setOption('mode', this.getRealMode());
      }
    }

    @Watch('theme')
    public themeChanged(value: string) {
      if (this.viewer) {
        this.viewer.setOption('theme', value);
      }
    }

    @Watch('value', {immediate: true})
    public valueChanged(value, old) {
      if (this.viewer) {
        const currentValue = this.viewer.getValue();
        if (currentValue !== value) {
          this.viewer.setValue(value);
          this.viewer.refresh();
        }
      }
      if (old && value !== old) {
        this.changed = true;
      }
    }

    public mounted() {
      let config = {
        readOnly: false,
        size: [this.width || 'auto', this.height || 'auto']
      };
      if (this.config) {
        config = Object.assign({}, config, this.config);
      }
      let value = this.value || '';
      if (this.beautify) {
        value = beautify(value, {format: this.mode || 'json'});
      }
      const defaultConfig: EditorConfiguration = {
        value,
        lineNumbers: true,
        lineWrapping: false,
        tabSize: 2,
        indentWithTabs: false,
        foldGutter: true,
        theme: this.theme,
        readOnly: true,
        extraKeys: {F3: 'autocomplete'},
        mode: {name: this.getRealMode(), globalVars: true}
      };
      this.viewer = window.CodeMirror(this.$refs.el as HTMLElement, Object.assign(defaultConfig, config));
      this.viewer.on('change', (editor, change) => {
        const content = this.viewer.getValue();
        this.$emit('input', content);
        if (this.hint && this.changed) {
          if (editor.getOption('showHint')) {
            if (change.text.length && change.text[0].trim()) {
              (this.viewer as any).showHint(null);
            }
          } else {
            editor.setOption('showHint', true);
          }
        }
        this.changed = false;
      });
      if (config.size) {
        this.viewer.setSize(config.size[0], config.size[1]);
      }
      this.viewer.setValue(value);
      this.viewer.refresh();
    }

    public getRealMode() {
      return this.types[this.mode] || this.mode || 'application/ld+json';
    }

    public refresh() {
      this.viewer.refresh();
    }
  }
</script>

