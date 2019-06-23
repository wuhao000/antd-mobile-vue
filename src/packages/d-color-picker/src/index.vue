<template>
  <div class="d-color-picker">
    <div v-on:click="event => { event.stopPropagation() }" class="m-colorPicker" ref="colorPicker">
      <!-- 颜色显示小方块 -->
      <div
        v-bind:class="{ disabled : disabled }"
        v-bind:style="`background-color: ${showColor}`"
        v-on:click="openStatus = !disabled"
        class="colorBtn"
      ></div>
      <!-- 用以激活HTML5颜色面板 -->
      <input
        v-model="html5Color"
        v-on:change="updataValue(html5Color)"
        ref="html5Color"
        type="color"
      >
      <!-- 颜色色盘 -->
      <div v-bind:class="{ open : openStatus }" class="box">
        <div class="hd">
          <div v-bind:style="`background-color: ${showPanelColor}`" class="colorView"></div>
          <div
            v-on:click="handleDefaultColor"
            v-on:mouseout="hoveColor = null"
            v-on:mouseover="hoveColor = defaultColor"
            class="defaultColor"
          >默认颜色</div>
        </div>
        <div class="bd">
          <h3>主题颜色</h3>
          <ul class="tColor">
            <li
              v-bind:style="{ backgroundColor : color }"
              v-for="(color, index) of tColor"
              v-on:click="updataValue(color)"
              v-on:mouseout="hoveColor = null"
              v-on:mouseover="hoveColor = color"
              :key="index"
            ></li>
          </ul>
          <ul class="bColor">
            <li v-for="(item, index) of colorPanel" :key="index">
              <ul>
                <li
                  v-bind:style="{ backgroundColor : color }"
                  v-for="(color, cindex) of item"
                  v-on:click="updataValue(color)"
                  v-on:mouseout="hoveColor = null"
                  v-on:mouseover="hoveColor = color"
                  :key="cindex"
                ></li>
              </ul>
            </li>
          </ul>
          <h3>标准颜色</h3>
          <ul class="tColor">
            <li
              v-bind:style="{ backgroundColor : color }"
              v-for="(color, index) of bColor"
              v-on:click="updataValue(color)"
              v-on:mouseout="hoveColor = null"
              v-on:mouseover="hoveColor = color"
              :key="index"
            ></li>
          </ul>
          <h3 v-on:click="triggerHtml5Color">更多颜色...</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({
  name: 'DColorPicker'
})
export default class DColorPicker extends Vue {
    // 当前颜色值
    @Prop({type: String, default: '#000000'})
    public defaultColor: string;

    // 默认颜色
    @Prop({type: Boolean, default: false})
    public disabled: boolean;

    // 禁用状态
    @Prop({type: String, required: true})
    public value: string;

    // 面板打开状态
    public html5Color: string = this.value;
    // 鼠标经过的颜色块
    public bColor: string[] = [
      '#c21401',
      '#ff1e02',
      '#ffc12a',
      '#ffff3a',
      '#90cf5b',
      '#00af57',
      '#00afee',
      '#0071be',
      '#00215f',
      '#72349d'
    ];
    // 主题颜色
    public colorConfig: any = [
      ['#7f7f7f', '#f2f2f2'],
      ['#0d0d0d', '#808080'],
      ['#1c1a10', '#ddd8c3'],
      ['#0e243d', '#c6d9f0'],
      ['#233f5e', '#dae5f0'],
      ['#632623', '#f2dbdb'],
      ['#4d602c', '#eaf1de'],
      ['#3f3150', '#e6e0ec'],
      ['#1e5867', '#d9eef3'],
      ['#99490f', '#fee9da']
    ];
    // 颜色面板
    public hoveColor: any = null;
    // 标准颜色
    public openStatus: boolean = false;
    public tColor: string[] = [
      '#000000',
      '#ffffff',
      '#eeece1',
      '#1e497b',
      '#4e81bb',
      '#e2534d',
      '#9aba60',
      '#8165a0',
      '#47acc5',
      '#f9974c'
    ];

    // 显示面板颜色
    get colorPanel() {
      const colorArr = [];
      for (const color of this.colorConfig) {
        colorArr.push(this.gradient(color[1], color[0], 5));
      }
      return colorArr;
    }

    // 显示颜色
    get showColor() {
      if (this.value) {
        return this.value;
      } else {
        return this.defaultColor;
      }
    }

    // 颜色面板
    get showPanelColor() {
      if (this.hoveColor) {
        return this.hoveColor;
      } else {
        return this.showColor;
      }
    }

    public mounted() {
      // 点击页面上其他地方，关闭弹窗
      document.onclick = () => {
        this.openStatus = false;
      };
    }

    // 更新组件的值 value
    public gradient(startColor: any, endColor: any, step: any): any {
      // 讲 hex 转换为 rgb
      const sColor = this.hexToRgb(startColor);
      const eColor = this.hexToRgb(endColor);

      // 计算R\G\B每一步的差值
      const rStep = (eColor[0] - sColor[0]) / step;
      const gStep = (eColor[1] - sColor[1]) / step;
      const bStep = (eColor[2] - sColor[2]) / step;

      const gradientColorArr = [];
      // 计算每一步的hex值
      for (let i = 0; i < step; i++) {
        gradientColorArr.push(
            this.rgbToHex(
                parseInt(rStep * i + sColor[0]),
                parseInt(gStep * i + sColor[1]),
                parseInt(bStep * i + sColor[2])
            )
        );
      }
      return gradientColorArr;
    }

    // 设置默认颜色
    public handleDefaultColor() {
      this.updataValue(this.defaultColor);
    }

    // 格式化 hex 颜色值
    public hexToRgb(hex: any) {
      const copyHex = this.parseColor(hex);
      const rgb = [];
      for (let i = 1; i < 7; i += 2) {
        rgb.push(parseInt('0x' + copyHex.slice(i, i + 2)));
      }
      return rgb;
    }

    // RGB 颜色 转 HEX 颜色
    public parseColor(hexStr: any) {
      if (hexStr.length === 4) {
        return '#' +
            hexStr[1] +
            hexStr[1] +
            hexStr[2] +
            hexStr[2] +
            hexStr[3] +
            hexStr[3];
      } else {
        return hexStr;
      }
    }

    // HEX 转 RGB 颜色
    public rgbToHex(r: any, g: any, b: any): any {
      const hex = ((r << 16) | (g << 8) | b).toString(16);
      return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex;
    }

    // 计算渐变过渡颜色
    public triggerHtml5Color() {
      (this.$refs['html5Color'] as any).click();
    }

    public updataValue(value: any) {
      this.$emit('input', value);
      this.$emit('change', value);
      this.openStatus = false;
    }
}
</script>
<style lang="less" scoped>
.d-color-picker {
  @import url("./style/index.less");
}
</style>
