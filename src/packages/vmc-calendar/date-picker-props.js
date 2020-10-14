export default {
    /** 默认日期，default: today */
    defaultDate: { type: Date },
    /** 选择值 */
    endDate: { type: Date },
    /** 日期扩展数据 */
    getDateExtra: { type: Function },
    /** 无限滚动优化（大范围选择），default: false */
    infiniteOpt: { type: Boolean },
    /** 初始化月个数，default: 6 */
    initialMonths: { type: Number },
    /** 本地化 */
    locale: { type: Object },
    /** 最大日期 */
    maxDate: { type: Date },
    /** 最小日期 */
    minDate: { type: Date },
    /** 选择区间包含不可用日期 */
    onSelectHasDisableDate: { type: Function },
    /** (web only) 样式前缀 */
    prefixCls: { type: String },
    /** 行大小 */
    rowSize: { type: String },
    /** 选择值 */
    startDate: { type: Date },
    /** 选择类型，default: range，one: 单日，range: 日期区间 */
    type: { type: String }
};
//# sourceMappingURL=date-picker-props.js.map