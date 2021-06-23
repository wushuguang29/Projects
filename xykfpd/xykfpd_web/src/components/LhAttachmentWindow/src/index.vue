<template>
  <el-dialog
    title="附件"
    :visible.sync="attchmentDialogVisible"
    width="80%"
    class="attachment-content"
    :modal-append-to-body="false"
    :before-close="attachmentHandleClose"
    :close-on-click-modal="false"
  >
    <el-container class="attachment-content">
      <el-main class="list-container">
        <template v-if="attachmentIsFolderView">
          <div class="attachment-box">
            <template v-for="item in getAttachmentFolderListStore">
              <div @dblclick="folderClick(item)" class="folder-box">
                <span>{{ item.number ? item.number : 0 }}</span>
                <img
                  :src="require('@/assets/img/files.png')"
                  alt
                  data-ptip="双击查看文件列表"
                />
                <h3 :title="item.folder_name">{{ item.folder_name }}</h3>
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <el-checkbox-group v-model="checkboxGroup">
            <div class="checkbox-group-div">
              <el-checkbox-button
                v-for="item in getAttachmentFolderFileListStore"
                :label="item.attachment_file_id"
                :key="item.attachment_file_id"
                :data-id="item.attachment_file_id"
                :data-type="item.type"
                @change="changeChecked"
              >
                <img
                  v-if="item.type == 1"
                  :src="item.path"
                  alt
                  data-ptip="双击预览图片"
                  @dblclick.capture="
                    imageClick(item.bound_folder_id, item.attachment_file_id)
                  "
                />
                <img
                  v-else-if="item.type == 2"
                  :src="require('@/assets/img/word.png')"
                />
                <img
                  v-else-if="item.type == 3"
                  :src="require('@/assets/img/excel.png')"
                />
                <img
                  v-else-if="item.type == 4"
                  :src="require('@/assets/img/ppt.png')"
                />
                <img
                  v-else-if="item.type == 5"
                  :src="require('@/assets/img/cad.png')"
                />
                <img
                  v-else-if="item.type == 6"
                  :src="require('@/assets/img/pdf.png')"
                />
                <img
                  v-else="item.type == 7"
                  :src="require('@/assets/img/unknow.png')"
                />
                <h3 :title="item.file_name">
                  <input
                    type="text"
                    :value="item.file_name | fileName"
                    @change="renameFile(item.attachment_file_id, $event)"
                  />
                </h3>
              </el-checkbox-button>
            </div>
          </el-checkbox-group>
        </template>
      </el-main>
      <el-footer v-show="!attachmentIsFolderView">
        <el-button
          type="primary"
          icon="iconfont el-icon-s-order"
          @click="checkedAll"
          >{{ checkedAllStatus ? "全选" : "取消全选" }}</el-button
        >
        <el-button
          type="primary"
          icon="iconfont el-icon-s-release"
          @click="checkedOthers"
          >反选</el-button
        >
        <file-upload></file-upload>
        <el-button
          type="primary"
          icon="iconfont el-icon-download"
          @click="downloadAttachment"
          >下载</el-button
        >
        <!-- <el-button
        type="primary"
        icon="iconfont el-icon-camera"
        v-if="camera"
        @click="cameraAttachment"
        >拍照</el-button
      > -->
        <el-button
          type="danger"
          icon="iconfont el-icon-delete"
          @click="deleteAttachment"
          >删除</el-button
        >
        <!-- <el-popconfirm
        confirm-button-text="好的"
        cancel-button-text="不用了"
        icon="el-icon-info"
        icon-color="red"
        title="这是一段内容确定删除吗？"
      >
        <el-button
          slot="reference"
          type="danger"
          icon="iconfont el-icon-delete"
          @click="deleteAttachment"
          >删除</el-button
        >
      </el-popconfirm> -->
        <el-button
          type="primary"
          icon="iconfont el-icon-arrow-left"
          @click="goBack"
          >返回</el-button
        >
      </el-footer>
      <lh-image-preview
        v-if="!attachmentIsFolderView"
        ref="imagePreviewRef"
        @loading-image="loadingImage"
      ></lh-image-preview>
    </el-container>
  </el-dialog>
</template>
<script>
import { MessageBox, Message } from "element-ui";
import uploadPrimitiveBtn from "./UploadPrimitive";
import {
  uploadFile,
  deleteFile,
  downloadFile,
  renameFile,
  getPreviewImageList,
  getAttachmentFolderList,
} from "@/api/attachment.js";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "LhAttachmentWindow",
  components: {
    FileUpload: uploadPrimitiveBtn,
  },
  props: {
    attchmentDialogVisible: {
      type: Boolean,
      default: false,
    },
    rowData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      "getAttachmentIsFolderView",
      "getAttachmentFolderFileListStore",
      "getAttachmentFolderListStore",
    ]),
    attachmentIsFolderView: function () {
      return this.getAttachmentIsFolderView;
    },
    getFileListMainKeyArr() {
      let arr = [];
      this.getAttachmentFolderFileListStore.forEach((each) =>
        arr.push(each.attachment_file_id)
      );
      return arr;
    },
    getFileListArrayLength() {
      return this.getAttachmentFolderFileListStore.length;
    },
  },
  filters: {
    fileName: function (value) {
      if (!value) return "";
      let val = value.split(".");
      return val[0];
    },
  },
  data() {
    return {
      checkboxGroup: [], //绑定的选中的path/id的arr
      checkedAllStatus: true,
      allImages: [],
    };
  },
  methods: {
    ...mapGetters([
      "getAttachmentFolderListParams",
      "getPreviewFileListParams",
      "getPreviewCacheFolderId",
    ]),
    ...mapMutations([
      "setAttachmentIsFolderView",
      "setAttachmentFolderListParams",
      "setPreviewImageList",
      "setPreviewCurrentFolderId",
      "resetPreviewCacheFolderId",
      "setPreviewCacheFolderId",
      "setPreviewFolderList",
      "setPreviewFileListParams",
      "setMorePreviewImageList",
      "setLoadData",
    ]),
    ...mapActions(["getAttachmentFolderListData", "getAttachmentFileListData"]),
    folderClick(row) {
      this.setAttachmentIsFolderView(false);
      this.setAttachmentFolderListParams(row);
      let params = this.getAttachmentFolderListParams();
      params.needPush = false;
      params.start = 0;
      this.getAttachmentFileListData(params);
    },
    goBack() {
      this.setAttachmentIsFolderView(true);
    },
    checkedAll() {
      const arr = [...this.getFileListMainKeyArr];
      arr.forEach((item) => {
        if (this.checkedAllStatus) {
          this.checkboxGroup = arr;
        } else {
          this.checkboxGroup = [];
        }
      });
      this.checkedAllStatus = !this.checkedAllStatus;
    },
    checkedOthers() {
      let arr = [...this.getFileListMainKeyArr];
      const hasCheckedArr = [...this.checkboxGroup];
      hasCheckedArr.forEach((item) => {
        let index = arr.findIndex((each) => item == each);
        arr.splice(index, 1);
      });
      this.checkboxGroup = [...arr];
    },
    downloadAttachment() {
      const params = this.getAttachmentFolderListParams();
      const idsArr = [...this.checkboxGroup];
      if (!idsArr.length) return this.$message("请至少选择一个文件!");
      downloadFile({ attachment_file_ids: idsArr.join() }).then(() => {
        this.checkboxGroup = [];
      });
    },
    deleteAttachment() {
      const params = this.getAttachmentFolderListParams();
      const idsArr = [...this.checkboxGroup];
      if (!idsArr.length) return this.$message("请至少选择一个文件!");
      MessageBox.confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteFile({ attachment_file_ids: idsArr.join() }).then(() => {
            this.getAttachmentFileListData(params);
            this.checkboxGroup = [];
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    renameFile(id, e) {
      const val = e.target.value;
      const originalVal = e.target._value;
      const params = this.getAttachmentFolderListParams();
      const values = {
        file_name: val,
        bound_folder_id: params.bound_folder_id,
        attachment_file_id: id,
      };
      MessageBox.confirm("将此文件名修改为" + val + "吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        distinguishCancelAndClose: true,
      })
        .then(() => {
          renameFile(values).then(() => {
            this.getAttachmentFileListData(params);
            this.checkboxGroup = [];
          });
        })
        .catch(() => {
          e.target.value = originalVal;
        });
    },
    initFolder() {
      const params = this.getAttachmentFolderListParams();
      this.getAttachmentFolderListData(params);
    },
    changeChecked() {
      // let date = new Date();
      // let timestamp = date.getTime();
      // console.log("单击图片选中");
      // this.clickTimeStamp.push(timestamp);
    },
    imageClick(bound_folder_id, attachment_file_id) {
      const values = this.getAttachmentFolderListParams();
      let num = this.getFileListArrayLength;
      let limit = num % 25 === 0 ? num : Math.ceil(num / 25) * 25;
      const params = {
        target_id: values.target_id,
        type: 1,
        affiliation_type: values.affiliation_type,
        folder_id: values.folder_id,
        limit,
      };
      this.resetPreviewCacheFolderId();
      this.setPreviewFileListParams(params);
      getAttachmentFolderList({
        resources_id: values.resources_id,
        target_id: values.target_id,
      }).then((res) => {
        const folderArr = [...res.data];
        let newArr = [];
        folderArr.forEach((each) => {
          if (each.imgNumber) newArr.push(each);
        });
        this.setPreviewFolderList(newArr);
        getPreviewImageList(params).then((ret) => {
          this.setPreviewCacheFolderId(values.folder_id);
          this.setPreviewImageList(ret.data.data);
          this.$refs.imagePreviewRef.show(values.folder_id, attachment_file_id);
        });
      });
    },
    handleScroll(e) {
      const target = e.target;
      const scrollHeight = target.scrollHeight;
      const scrollTop = target.scrollTop;
      const clientHeight = target.clientHeight;
      let params = this.getAttachmentFolderListParams();
      if (
        scrollHeight === scrollTop + clientHeight &&
        this.getFileListArrayLength % 25 == 0
      ) {
        params.needPush = true;
        params.start = this.getFileListArrayLength;
        this.getAttachmentFileListData(params);
      }
    },
    loadingImage({ id, start }) {
      let params = this.getPreviewFileListParams();
      const loadParams = {
        target_id: params.target_id,
        type: 1,
        affiliation_type: params.affiliation_type,
        folder_id: id,
        start: start,
      };
      const cacheFolder = this.getPreviewCacheFolderId();
      if (!cacheFolder.includes(id)) this.setPreviewCacheFolderId(id);
      getPreviewImageList(loadParams).then((ret) => {
        this.setMorePreviewImageList(ret.data.data);
        this.setLoadData(true);
      });
    },
    attachmentHandleClose() {
      this.setAttachmentIsFolderView(true);
      this.$emit("update:attchmentDialogVisible", false);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  created() {
    this.setAttachmentFolderListParams({
      resources_id: this.rowData.resources_id,
      target_id: this.rowData.target_id,
    });
    this.initFolder();
  },
};
</script>
<style lang="scss" scoped>
.attachment-content {
  /deep/ .el-main {
    height: 400px;
  }
  /deep/ .el-dialog__body {
    padding: 0px;
  }
  /deep/ .el-footer {
    display: flex;
    justify-content: flex-end;
    button {
      height: 30px;
      margin: 0 5px;
    }
  }

  .list-container {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    /deep/ .el-checkbox-button {
      border-radius: 5px;
      margin-right: 5px;
      border: 1px solid #eee;
      margin-top: 2px;
    }
    /deep/ .el-checkbox-button.is-checked {
      border: 1px solid #4277fc;
    }
    /deep/ .el-checkbox-button__inner {
      color: #000;
      background: transparent;
      border: none;
      width: 120px;
      box-shadow: none;
      padding: 7px;
    }
    .attachment-box {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      div {
        width: 100px;
        border-radius: 5px;
        // border: 1px solid #eee;
        margin: 2px 5px 10px 0;
        padding: 5px;
        position: relative;
        span {
          width: 25px;
          line-height: 25px;
          height: 25px;
          background: #3cc;
          color: #fff;
          position: absolute;
          top: -5px;
          right: 12px;
          border-radius: 50%;
          text-align: center;
        }
      }
    }
    .checkbox-group-div {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      img {
        width: 80px;
        height: 86px;
      }
    }
    h3 {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0;
      input {
        width: 90%;
        font-size: 14px;
        font-weight: normal;
        text-align: center;
        border: none;
      }
    }
  }
}
</style>