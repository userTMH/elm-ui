<template>
  <el-form
    ref="form"
    v-bind="$attrs"
    :validate-on-rule-change="false"
    v-if="model"
    :model="model"
    :rules="rules"
  >
    <template v-for="(item, index) in options">
      <!-- 没有children -->
      <el-form-item
        v-if="!item.children || !item.children!.length"
        :prop="item.prop!"
        :label="item.label"
      >
        <component
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          v-bind="item.attrs"
          v-model="model[item.prop!]"
          :key="index"
          :placeholder="item.placeholder"
          :is="`el-${item.type}`"
        ></component>

        <!-- 上传组件 -->
        <el-upload
          v-bind="item.uploadAttrs"
          v-if="item.type === 'upload'"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :before-remove="beforeRemove"
          :on-exceed="onExceed"
          :http-request="httpRequest"
        >
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>

        <!-- 富文本编辑器组件 -->
        <div v-if="item.type === 'editor'" style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :defaultConfig="item.toolbarConfig"
            mode="default"
          />
          <Editor
            style="height: 500px; overflow-y: hidden"
            v-model="model[item.prop!]"
            :defaultConfig="{
              autoLineBreak: false,
              placeholder: item.placeholder,
              editorConfig: item.editorConfig,
            }"
            mode="default"
            @onCreated="handleCreated"
          />
        </div>
      </el-form-item>
      <!-- 有children -->
      <el-form-item
        :prop="item.prop"
        :label="item.label"
        v-if="item.children && item.children!.length"
      >
        <component
          v-bind="item.attrs"
          v-model="model[item.prop!]"
          :placeholder="item.placeholder"
          :is="`el-${item.type}`"
        >
          <!-- 渲染children的数据 -->
          <component
            :is="`el-${child.type}`"
            :label="child.label"
            :value="child.value"
            v-for="(child, i) in item.children"
            :key="i"
          ></component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import {
  onMounted,
  ref,
  type PropType,
  watch,
  shallowRef,
  onBeforeUnmount,
} from "vue";
import type { FormOptions } from "./types/types";
import cloneDeep from "lodash/cloneDeep";
import { FormInstance } from "element-plus";

import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// const toolbarConfig = {};
// const editorConfig = {};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

// 接收父组件传递的表单配置项数据
let props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  httpRequest: {
    type: Function,
  },
});

// 定义表单的实例
const form = ref<FormInstance | null>();

// 表单的数据
let model = ref<any>(null);
// 表单校验规则
let rules = ref<any>(null);

// 初始化表单数据与校验规则方法
let initForm = () => {
  // 判断表单配置项的数据是否存在
  if (props.options && props.options.length) {
    // 保存的是表单配置项中表单的数据
    let m: any = {};
    // 保存的是表单配置项中表单的校验规则
    let r: any = {};

    // 遍历表单配置项的数据
    props.options.forEach((item) => {
      m[item.prop!] = item.value;
      r[item.prop!] = item.rules;
      if (item.type === "editor") {
        m[item.prop!] = "";
      }
    });

    // 将表单的数据进行深拷贝,赋值给model
    model.value = cloneDeep(m);
    console.log("model", model.value);
    // 将表单的校验规则进行深拷贝, 赋值给rules
    rules.value = cloneDeep(r);
    // model.value.desc = "";
  }

  console.log("rules", rules.value);
};

// 子传父
const emits = defineEmits([
  "on-preview",
  "on-remove",
  "on-success",
  "on-error",
  "on-progress",
  "on-change",
  "before-upload",
  "before-remove",
  "on-exceed",
]);

// 点击文件列表中已上传的文件时的钩子
let onPreview = (file: File) => {
  emits("on-preview", file);
};

// 文件列表移除文件时的钩子
let onRemove = (file: File, fileList: FileList) => {
  emits("on-remove", { file, fileList });
};

// 文件上传成功时的钩子
let onSuccess = (response: any, file: File, fileList: FileList) => {
  // 上传图片成功 给表单上传项赋值
  let uploadItem = props.options.find((item) => item.type === "upload")!;
  model.value[uploadItem.prop!] = { response, file, fileList };

  // 上传图片成功 给表单上传项赋值
  emits("on-success", { response, file, fileList });
};

// 文件上传失败时的钩子
let onError = (err: any, file: File, fileList: FileList) => {
  emits("on-error", { err, file, fileList });
};
// 文件上传时的钩子
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits("on-progress", { event, file, fileList });
};
// 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
let onChange = (file: File, fileList: FileList) => {
  emits("on-change", { file, fileList });
};
// 上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
let beforeUpload = (file: File) => {
  emits("before-upload", file);
};
// 删除文件之前的钩子，参数为上传的文件和文件列表， 若返回 false 或者返回 Promise 且被 reject，则停止删除。
let beforeRemove = (file: File, fileList: FileList) => {
  emits("before-remove", { file, fileList });
};
// 当超出限制时，执行的钩子函数
let onExceed = (files: File, fileList: FileList) => {
  emits("on-exceed", { files, fileList });
};

onMounted(() => {
  initForm();
});

watch(
  () => props.options,
  () => {
    initForm();
  },
  {
    deep: true,
  }
);
</script>

<style scoped lang="scss"></style>
