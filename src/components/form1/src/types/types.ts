import type { RuleItem } from "./rule";


interface NewRuleItem extends RuleItem {
  trigger? : string | string[]
}

export interface FormItem {
    type:
      | "autocomplete"
      | "cascader"
      | "checkbox"
      | "checkbox-group"
      | "input"
      | "select"
      | "radio-group"
      | "slider"
      | "option"
      | "radio";
    label?: string;
    placeholder?: string;
    children?: FormItem[];
    value?: string;
    prop? : string
    rules? : NewRuleItem[],
    disabled? : boolean,
    attrs? : {
      disabled? : boolean
      clearable? : boolean
      showPassword? : boolean
    }

}
  