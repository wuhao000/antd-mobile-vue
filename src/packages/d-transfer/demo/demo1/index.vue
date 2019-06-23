<template>
  <div>
    <div>
      <d-transfer searchable
                  v-model="selectedKeys"
                  :data-source="mockData"
                  :disabled="disabled"
                  :titles="['Source', 'Target']"
                  @change="valueChanged">
        <d-switch v-model="disabled"
                  slot="footer"
                  style="margin-top: 16px"/>
        <div slot="left-footer">
          <d-button @click="selectAll">全选</d-button>
        </div>
        <div slot="right-footer">
          这是右边
        </div>
      </d-transfer>
    </div>
  </div>
</template>
<script lang="ts">
  import DButton from '@/packages/d-button';
  import Switch from '@/packages/d-switch';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import DTransfer from '../../index';

  Vue.use(DButton);
  Vue.use(Switch);
  Vue.use(DTransfer);
  @Component({
    name: 'Demo1'
  })
  export default class Demo1 extends Vue {

    public disabled: boolean = false;
    public mockData = [];
    public selectedKeys: string[] = ['1', '4'];
    public targetKeys: any[] = [];

    public created() {
      const mockData = [];
      for (let i = 0; i < 20; i++) {
        mockData.push({
          key: i.toString(),
          title: `content${i + 1}`,
          description: `description of content${i + 1}`,
          disabled: i % 3 < 1
        });
      }
      const oriTargetKeys = mockData
        .filter(item => +item.key % 3 > 1)
        .map(item => item.key);
      this.mockData = mockData;
      this.targetKeys = oriTargetKeys;
    }

    public selectAll() {
      this.selectedKeys = this.mockData.map(it => it.key);
    }

    public valueChanged(v) {
      console.log('value changed: ' + v);
    }
  }
</script>
<style scoped lang="less">
</style>
