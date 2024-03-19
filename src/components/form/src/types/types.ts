// rules验证规则的ts类型
import { RuleItem } from "./rule";

// css样式的ts类型
import type { CSSProperties } from "vue";

// 表单配置数据ts类型
export interface FormOptions {
  // 表单项显示的元素
  type:
    | "cascader"
    | "checkbox"
    | "checkbox-group"
    | "checkbox-button"
    | "color-picker"
    | "date-picker"
    | "input"
    | "input-number"
    | "radio"
    | "radio-group"
    | "radio-button"
    | "rate"
    | "select"
    | "option"
    | "slider"
    | "switch"
    | "time-picker"
    | "time-select"
    | "transfer"
    | "upload"
    | "editor";

  // 表单项值
  value?: any;

  // 表单项标题
  label?: string;

  // 表单项标识
  prop?: string;

  // 表单项的占位符
  placeholder?: string;

  // 表单项的验证规则
  rules?: RuleItem[];

  // 表单元素特有的属性
  attrs?: {
    style?: CSSProperties;
    // 是否清空
    clearable?: boolean;
    // 是否显示密码
    showPassword?: boolean;
    // 是否禁用
    disabled?: boolean;
  };

  // 表单项的子元素
  children?: FormOptions[];

  // 上传组件的特有属性
  uploadAttrs?: {
    action: string;
    headers?: object;
    method?: "post" | "put" | "patch";
    multiple?: boolean;
    data?: any;
    name?: string;
    withCredentials?: boolean;
    showFileList?: boolean;
    drag?: boolean;
    accept?: string;
    thumbnailMode?: boolean;
    fileList?: any[];
    listType?: "text" | "picture" | "picture-card";
    autoUpload?: boolean;
    disabled?: boolean;
    limit?: number;
  };

  // 富文本编辑器类型
  editorConfig?: any;
  toolbarConfig?: any;
}
