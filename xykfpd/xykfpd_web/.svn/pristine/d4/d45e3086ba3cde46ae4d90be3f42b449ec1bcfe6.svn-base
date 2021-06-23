/* 用vue-uploader-component封装的组件 */
<template>
  <file-upload
    class="btn btn-primary"
    extensions="gif,jpg,jpeg,png,webp"
    :multiple="true"
    :size="1024 * 1024 * 10"
    v-model="files"
    @input="inputFile"
    ref="upload"
  >
    <i class="el-lhsoft-shangchuang"></i>
    上传附件
  </file-upload>
</template>

<script>
import VueUploadComponent from "vue-upload-component";
export default {
  name: "uploadComponentVUC",
};
</script>

<style>
</style>