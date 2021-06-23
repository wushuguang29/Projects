<template>
  <el-dialog
    title="提交审核"
    :visible.sync="reviewSubmitDialogVisible"
    width="30%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :append-to-body="true"
  >
    <span>确认提交审核吗？</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="reviewConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { submitAudit } from "@/api/audit.js";
import { mapGetters } from "vuex";
export default {
  name: "LhReviewSubmitWindow",
  props: {
    reviewSubmitDialogVisible: {
      type: Boolean,
      default: false,
    },
    rowData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapGetters(["userInfo"]),
    handleClose() {
      this.$emit("update:reviewSubmitDialogVisible", false);
    },
    reviewConfirm() {
      const userInfo = this.userInfo();
      let params = {
        resources_id: this.$route.meta.id, //审核模块id
        user_id: userInfo.user_id, //当前登录用户id
        initiator_name: userInfo.user_name, //发起人
        target_id: this.rowData.target_id, //当前数据id
      };
      submitAudit(params).then((res) => {
        this.$message(res.msg);
        this.$emit("update:reviewSubmitDialogVisible", false);
        this.$emit("updateList");
      });
    },
  },
};
</script>

<style>
</style>