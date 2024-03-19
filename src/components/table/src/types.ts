// 定义表格配置项数据的ts类型
export interface TableOptions {
  type?: "selection" | "index" | "expand";
  // 字段名称
  prop?: string;
  // 表头
  label?: string;
  // 对应列的宽度
  width?: string | number;
  // 对齐方式
  align?: "left" | "center" | "right";
  // 是否开启插槽
  slot?: string;
  // 是否是操作项
  action?: boolean;
  // 是否是可编辑项
  editable?: boolean;
}
