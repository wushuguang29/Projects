<!--
 * 原生input的上传组件,用formData
 -->
<template>
  <div class="upload-button">
    <label for="file">
      <i class="iconfont el-lhsoft-shangchuan"></i>
      <span>上传附件</span>
    </label>
    <input type="file" name="file" id="file" multiple @change="inputFile" />
  </div>
</template>

<script>
import { getAttachmentFileList, uploadFile } from "@/api/attachment.js";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "uploadPrimitive",
  methods: {
    ...mapGetters(["getAttachmentFolderListParams"]),
    ...mapActions(["getAttachmentFileListData", "getAttachmentFolderListData"]),
    inputFile(e) {
      const files = e.target.files;
      let params = this.getAttachmentFolderListParams();
      const formData = new FormData();
      files.forEach((each, index) => {
        if (index != "length") formData.append("files[]", each);
      });
      formData.append("bound_folder_id", params.bound_folder_id);
      formData.append("target_id", params.target_id);
      formData.append("folder_id", params.folder_id);
      formData.append("affiliation_type", params.affiliation_type);
      uploadFile(formData).then((res) => {
        this.getAttachmentFileListData(params);
        this.getAttachmentFolderListData({
          resources_id: params.resources_id,
          target_id: params.target_id,
        });
      });
    },
  },
};
</script>

<style lang="scss"  scope>
.upload-button {
  label {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
    display: inline-block;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    color: #ffffff;
    background-color: #4277fc;
    border-color: #4277fc;
  }
  input {
    display: none;
  }
}
</style>