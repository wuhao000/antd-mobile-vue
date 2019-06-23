/**
 * @Author : ChangJun
 * @Date : 2019/3/15
 * @Version : 1.0
 * @Content : 全国省市区
 */

export class Area {
  public value: string;
  public label: string;
  public children?: Area[];
} // 区域对象

import china from './static/china.json';
export const Data: Area[] = china; // require('./static/china.json'); // 数据源

export default {
  /**
   * value 转 名称
   * @param province 省
   * @param city 市
   * @param district 区
   */
  valueToName(province: string, city?: string, district?: string): string[] {
    const areas: string[] = [];
    const p: Area = Data.find((_x) => _x.value === province);
    areas.push(p && p.label);
    if (p && city) {
      const c: Area = p.children.find((_x) => _x.value === city);
      areas.push(c && c.label);
      if (p && c && district) {
        const d: Area = c.children.find((_x) => _x.value === district);
        areas.push(d && d.label);
      }
    }
    return areas;
  }
};
