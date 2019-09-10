<template>
  <component v-bind="props"
             v-on="listeners"
             :class="cssClass"
             :is="getInputComponent()"
             :style="cssStyle">
    <slot v-for="slot in slotNames"
          v-if="slot !== 'default'"
          :name="slot"
          :slot="slot"/>
    <slot/>
  </component>
</template>
<script lang="ts">
  import Component from 'vue-class-component';
  import Emitter from './emitter';

  @Component({
    name: 'BaseComponent'
  })
  export default class BaseComponent extends Emitter {

    get cssClass() {
      return {};
    }

    get cssStyle() {
      return {};
    }

    get listeners() {
      const listeners: any = {};
      Object.keys(this.$listeners).forEach(listener => {
        if (listener !== 'change') {
          listeners[listener] = this.$listeners[listener];
        }
      });
      return listeners;
    }

    get props() {
      return {
        ...this.getSlotProps(),
        ...this.$attrs,
        ...this.$props,
        ...this.getProps()
      };
    }

    get slotNames() {
      return Object.keys(this.$slots);
    }

    public getInputComponent() {
      return {};
    }

    public getProps() {
      return {};
    }

    public getSlotProps() {
      const props: any = {};
      Object.keys(this.$slots).forEach((slotKey: string) => {
        if (slotKey !== 'default') {
          props[slotKey] = this.$slots[slotKey];
        }
      });
      return props;
    }

  }
</script>
