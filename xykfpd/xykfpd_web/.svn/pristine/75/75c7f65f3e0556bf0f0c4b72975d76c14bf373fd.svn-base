<template>
  <el-dialog
    title="审核"
    :visible.sync="reviewDialogVisible"
    width="30%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :append-to-body="true"
  >
    <el-form ref="reviewFormRef" :rules="rules" v-model="reviewForm">
      <el-form-item label="审核状态" prop="status">
        <el-radio-group v-model="reviewForm.status">
          <el-radio :label="2">通过</el-radio>
          <el-radio :label="3">驳回</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" label-width="50px">
        <el-input type="textarea" v-model="reviewForm.remark"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="reviewConfirm('reviewFormRef')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { auditData } from "@/api/audit.js";
export default {
  name: "LhReviewWindow",
  props: {
    reviewDialogVisible: {
      type: Boolean,
      default: false,
    },
    rowData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rules: {
        status: [{ required: true, trigger: "blur" }],
      },
      reviewForm: {
        status: 2,
        remark: "",
      },
    };
  },
  methods: {
    handleClose() {
      this.$emit("update:reviewDialogVisible", false);
    },
    reviewConfirm() {
      console.log(this.rowData);
      let params = {
        flow_example_process_id: this.rowData.flow_example_process_id,
        flow_node_id: this.rowData.flow_node_id,
        resources_id: this.rowData.resources_id,
        target_id: this.rowData.id,
        remark: this.reviewForm.remark,
        status: this.reviewForm.status,
      };
      auditData(params).then((res) => {
        this.$message(res.msg);
        this.$emit("update:reviewDialogVisible", false);
        this.$emit("updateList");
      });
    },
  },
};
</script>

<style>
</style>