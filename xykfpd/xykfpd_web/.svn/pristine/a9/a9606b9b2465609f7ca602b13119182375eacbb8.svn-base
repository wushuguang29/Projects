<template>
  <el-dialog
    title="审核记录"
    :visible.sync="reviewRecordDialogVisible"
    width="60%"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :append-to-body="true"
  >
    <table class="review-record-table">
      <template v-for="(item, index) in list">
        <tr>
          <th>序号</th>
          <th>处理人</th>
          <th>处理时间</th>
          <th>处理结果</th>
        </tr>
        <tr>
          <td>{{ index + 1 }}</td>
          <td>{{ item.handler }}</td>
          <td>
            {{
              item.handle_time && item.handle_time != "0000-00-00 00:00:00"
                ? item.handle_time
                : "/"
            }}
          </td>
          <td>{{ item.result }}</td>
        </tr>
        <tr>
          <th>备注</th>
          <td colspan="3">{{ item.remark }}</td>
        </tr>
      </template>
    </table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { auditRecord } from "@/api/audit.js";
export default {
  name: "LhReviewRecordWindow",
  props: {
    reviewRecordDialogVisible: {
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
      list: [],
    };
  },
  methods: {
    handleClose() {
      this.$emit("update:reviewRecordDialogVisible", false);
    },
  },
  created() {
    auditRecord({ target_id: this.rowData.target_id }).then((res) => {
      this.list = [...res.data];
    });
  },
};
</script>

<style lang="scss" scoped>
.review-record-table {
  border-collapse: collapse;
  width: 100%;
  border-radius: 4px;
  text-align: center;
  th {
    border: 1px solid #d0d0d0;
    padding: 6px 10px;
    background-color: #eee;
    font-weight: 500;
  }
  td {
    min-width: 50px;
    border: 1px solid #d0d0d0;
    padding: 6px 10px;
  }
}
</style>