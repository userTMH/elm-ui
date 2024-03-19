<template>
  <div>
    <m-form label-width="200px" :FormOptions="FormOptions"></m-form>

    <!-- <el-form-item prop="username">
      <el-input v-model="form.username"></el-input>
    </el-form-item> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { FormItem } from "../../components/form/src/types/types";

/**
 * 1. 通过配置项渲染表单
 * 2. 使用component动态渲染组件
 * 3. 通过判断有没有children属性来确定是否使用component的插槽来渲染children的数据
 * 4. 通过ts类型约束来检测表单配置项的数据是否符合约束
 * 5. 处理表单数据的双向绑定
 * 6. 处理表单的校验规则 (定义rules的ts类型, ts类型是源自于async-validator的ts类型, 并且解决了没有trggier的问题)
 * 7. el-form的扩展属性 v-bind="$attrs"
 * 8. 表单项组件的扩展属性, attrs
 */

// 通过的ts类型约束实现表单配置数据的类型检测
const FormOptions = ref<FormItem[]>([
  {
    type: "input",
    label: "用户名",
    placeholder: "请输入用户名",
    prop: "username",
    value: "",
    attrs: {
      clearable: true,
      //   disabled: true,
    },
    rules: [
      {
        required: true,
        message: "请输入用户名",
        trigger: "blur",
      },
      {
        min: 2,
        max: 6,
        message: "请输入2-6位字符",
        trigger: "blur",
      },
    ],
  },
  {
    type: "input",
    label: "密码",
    placeholder: "请输入密码",
    prop: "password",
    rules: [
      {
        required: true,
        message: "请输入用密码",
        trigger: "blur",
      },
      {
        min: 6,
        max: 24,
        message: "请输入6-24位字符",
        trigger: "blur",
      },
    ],
    value: "",
  },
  {
    type: "select",
    label: "职位",
    prop: "job",
    value: "",
    rules: [
      {
        required: true,
        message: "请输入职位",
        trigger: "blur",
      },
    ],
    children: [
      {
        type: "option",
        label: "总监",
        value: "1",
        disabled: true,
        attrs: {
          disabled: false,
        },
      },
      {
        type: "option",
        label: "组长",
        value: "2",
      },
      {
        type: "option",
        label: "员工",
        value: "3",
      },
    ],
  },
  {
    type: "radio-group",
    label: "性别",
    prop: "sex",
    rules: [
      {
        required: true,
        message: "请选择性别",
        trigger: "change",
      },
    ],
    value: "",
    children: [
      {
        type: "radio",
        label: "男",
        value: "1",
      },
      {
        type: "radio",
        label: "女",
        value: "0",
      },
    ],
  },
]);
</script>

<style scoped lang="scss"></style>
