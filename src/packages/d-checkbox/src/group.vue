<template>
  <a-checkbox-group v-bind="customProps"
                    v-model="stateValue"
                    v-on="listeners"
                    :style="cssStyle"
                    @blur="handleBlur"
                    @change="handleChange">
    <slot/>
    <template v-if="options">
      <template v-for="option in getOptions()">
        <d-checkbox-button
            v-if="button"
            :class="checkboxClass"
            :disabled="isDisabled"
            :key="option.value"
            :label="option.label"
            :read-only="isReadonly"
            :size="componentSize"
            :style="checkboxStyle"
            :value="option.value"></d-checkbox-button>
        <a-checkbox
            v-else
            :class="checkboxClass"
            :disabled="isDisabled"
            :key="option.value"
            :label="option.label"
            :read-only="isReadonly"
            :size="componentSize"
            :style="checkboxStyle"
            :value="option.value">{{option.label}}</a-checkbox>
      </template>
    </template>
  </a-checkbox-group>
</template>
<script lang="tsx">
  import Component from 'vue-class-component';
  import {mixins} from 'vue-class-component/lib/util';
  import {Prop, Watch} from 'vue-property-decorator';
  import OptionsBasedComponent from '../../../mixins/options-based-component';
  import Button from './button.vue';

  @Component({
    name: 'DCheckboxGroup',
    components: {
      ACheckboxGroup: window.antd.Checkbox.Group,
      DCheckboxButton: Button,
      ACheckbox: window.antd.Checkbox
    }
  })
  export default class DCheckboxGroup extends mixins(OptionsBasedComponent) {

    /**
     * 是否使用按钮样式
     */
    @Prop({type: Boolean, default: false})
    public button: boolean;
    @Prop({type: String, default: ''})
    public checkboxClass: string;
    /**
     * 单个选项的样式
     */
    @Prop({type: Object, default: () => ({})})
    public checkboxStyle: object;

    @Watch('value')
    public valueChanged(value: any) {
      if (this.stateValue !== this.convertValue(value)) {
        this.stateValue = this.convertValue(value) || [];
      }
    }

    get customProps() {
      const props: any = {};
      const thisProps = this['props'];
      Object.keys(thisProps).forEach(key => {
        if (key !== 'options') {
          props[key] = thisProps[key];
        }
      });
      return props;
    }

  }
</script>
