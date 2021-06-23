<template>
  <div class="attachment-container">
    <el-button type="info" @click.stop="onAttachmentClick" :size="size"
      >上传附件</el-button
    >
    <el-dialog
      title="附件"
      :visible.sync="dialogVisible"
      width="80%"
      class="attachment-content"
      :modal-append-to-body="false"
      :before-close="attachmentHandleClose"
    >
      <lh-attachment-window></lh-attachment-window>
    </el-dialog>
  </div>
</template>

<script>
import LhAttachmentWindow from "../LhAttachmentWindow/index";
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "LhAttachmentButton",
  components: {
    LhAttachmentWindow,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  props: {
    size: {
      type: String,
      default: "mini",
    },
    resources_id: {
      type: Number,
      required: true,
    },
    target_id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapMutations([
      "setAttachmentIsFolderView",
      "setAttachmentFolderListParams",
    ]),
    onAttachmentClick() {
      this.dialogVisible = true;
      this.setAttachmentFolderListParams({
        resources_id: this.resources_id,
        target_id: this.target_id,
      });
    },
    attachmentHandleClose() {
      this.setAttachmentIsFolderView(true);
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.attachment-container {
  display: inline-block;
  margin: 0 10px;
  /deep/ .el-dialog {
    height: 500px;
    /deep/ .el-dialog__body {
      padding: 0px;
    }
  }
}
</style>