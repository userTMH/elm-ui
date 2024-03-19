<template>
  <m-form
    @on-change="handleChange"
    @before-upload="handleBeforeUpload"
    @on-preview="handlePreview"
    @on-remove="handleRemove"
    @before-remove="beforeRemove"
    @on-success="handleSuccess"
    @on-exceed="handleExceed"
    label-width="120px"
    :options="options"
  >
    <template #uploadArea>
      <el-button type="primary">Click to upload</el-button>
    </template>
    <template #uploadTip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500KB.
      </div>
    </template>

    <template #action="scope">
      <el-button type="primary" @click="submitForm(scope)"> 提交 </el-button>
      <el-button @click="resetForm(scope)">重置</el-button>
    </template>
  </m-form>
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox, FormInstance } from "element-plus";
import { FormOptions } from "../../components/form/src/types/types";
import { ref } from "vue";

interface Scope {
  form: FormInstance;
  model: any;
}

// 表单提交
const submitForm = (scope: Scope) => {
  scope.form.validate((valid: boolean) => {
    if (valid) {
      console.log("scope", scope.model);
      ElMessage.success("submit!");
    } else {
      ElMessage.error("表单填写有误,请检查");
      return false;
    }
  });
};

// 表单重置
const resetForm = (scope: Scope) => {
  console.log("reset", scope);
  scope.form.resetFields();
};

let options = ref<FormOptions[]>([
  // 用户名
  {
    type: "input",
    placeholder: "请输入用户名",
    label: "用户名",
    value: "",
    prop: "username",
    rules: [
      { required: true, message: "请输入用户名", trigger: "blur" },
      {
        min: 2,
        max: 6,
        message: "用户名在2-6位之间",
        trigger: "blur",
      },
    ],
    attrs: {
      clearable: true,
      //   disabled: true,
    },
  },
  // 密码
  {
    type: "input",
    placeholder: "请输入密码",
    label: "密码",
    value: "",
    prop: "password",
    rules: [
      {
        required: true,
        message: "密码不能为空",
        trigger: "blur",
      },
      {
        min: 6,
        max: 15,
        message: "密码在6-15位之间",
        trigger: "blur",
      },
    ],
    attrs: {
      clearable: true,
      showPassword: true,
    },
  },
  // 下拉框
  {
    type: "select",
    placeholder: "请选择职位",
    value: "",
    prop: "role",
    label: "职位",
    attrs: {
      style: {
        width: "100%",
        // height: "100px",
        // background: "red",
      },
    },
    rules: [
      {
        required: true,
        message: "职位不能为空",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "option",
        label: "经理",
        value: "1",
      },
      {
        type: "option",
        label: "主管",
        value: "2",
      },
      {
        type: "option",
        label: "员工",
        value: "3",
      },
    ],
  },
  // 多选框
  {
    type: "checkbox-group",
    value: [],
    label: "爱好",
    prop: "like",
    rules: [
      {
        required: true,
        message: "爱好不能为空",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "checkbox",
        label: "足球",
        value: "1",
      },
      {
        type: "checkbox",
        label: "蓝球",
        value: "2",
      },
      {
        type: "checkbox",
        label: "排球",
        value: "3",
      },
    ],
  },
  // 单选框
  {
    type: "radio-group",
    value: "",
    label: "性别",
    prop: "sex",
    rules: [
      {
        required: true,
        message: "性别不能为空",
        trigger: "change",
      },
    ],
    children: [
      {
        type: "radio",
        label: "男",
        value: "1",
      },
      {
        type: "radio",
        label: "女",
        value: "2",
      },
    ],
  },
  // 上传按钮
  {
    type: "upload",
    prop: "pic",
    label: "上传",
    uploadAttrs: {
      //   action: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
      action: "https://jsonplaceholder.typicode.com/posts/",
      multiple: true,
      limit: 3,
    },
    // rules: [
    //   {
    //     required: true,
    //     message: "请上传图片",
    //     trigger: "change",
    //   },
    // ],
  },
  // 富文本编辑器
  {
    type: "editor",
    placeholder: "请输入描述内容",
    label: "内容",
    // value: "",
    prop: "desc",
    editorConfig: {},
    toolbarConfig: {},
    rules: [
      {
        required: true,
        message: "请输入描述内容",
        trigger: "blur",
      },
    ],
  },
]);

// 监听文件移除时的钩子
let handleRemove = (file: File, fileList: FileList) => {
  console.log("handleRemove");
  console.log(file, fileList);
};

// 文件预览钩子
let handlePreview = (file: any) => {
  console.log("handlePreview");
  console.log(file);
};
// 移除文件之前触发的钩子
let beforeRemove = (val: any) => {
  console.log("beforeRemove");
  return ElMessageBox.confirm(`Cancel the transfert of ${val.file.name} ?`);
};
// 超出上传限制触发的钩子
let handleExceed = (val: any) => {
  console.log("handleExceed", val);
  ElMessage.warning(
    `The limit is 3, you selected ${
      val.files.length
    } files this time, add up to ${
      val.files.length + val.fileList.length
    } totally`
  );
};
// 上传成功的钩子
let handleSuccess = (val: any) => {
  console.log("success");
  console.log(val);
};
// 选择触发的钩子
let handleChange = (val: any) => {
  console.log("change");
  console.log(val);
};
// 上传之前触发的钩子
let handleBeforeUpload = (val: any) => {
  console.log("handleBeforeUpload");
  console.log(val);
};

// 自定义上传

const httpRequest = (file: File) => {
  console.log("666");
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", "a");

  // 调用接口
};
</script>

<style scoped lang="scss"></style>
