<template>
  <el-dialog
    :visible="createDialog"
    :title="windowTitle"
    :before-close="handleClose"
    class="role-authority"
    :close-on-click-modal="false"
  >
    <el-tree
      :data="treeData"
      show-checkbox
      @check-change="handleCheckChange"
      node-key="id"
      :default-checked-keys="defaultKeys"
      ref="organizationTree"
      default-expand-all
      v-loading="loading"
      style="width: 100%"
    ></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  getOrganizationList,
  editOrganizationAccess,
  getOrganizationTree,
} from "@/api/organization.js";
import { getRoleList, editRoleAccess, getRoleTreeById } from "@/api/role.js";
import { mapActions } from "vuex";
export default {
  name: "roleAuthorityWindow",
  data() {
    return {
      treeData: null,
      arr: [],
      checkedIds: "",
      loading: true,
    };
  },
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    createDialog: {
      type: Boolean,
      default: false,
    },
    windowTitle: {
      type: String,
    },
  },
  computed: {
    defaultKeys: function () {
      return this.rowData.access_permission
        ? this.rowData.access_permission.split(",")
        : [];
    },
  },
  methods: {
    ...mapActions({
      getRoleGridData: "baseRole/list/getGridData",
      getOrganizationGridData: "baseOrganization/list/getGridData",
    }),
    handleCheckChange: function (data, checked, indeterminate) {
      let nodes = this.$refs.organizationTree.getCheckedNodes();
      this.arr = [];
      if (nodes.length) {
        nodes.forEach((each) => {
          this.arr.push(each.id);
        });
      }
      this.checkedIds = this.arr.join(",");
    },
    handleConfirm: function () {
      const params = {
        resource_id: this.checkedIds,
        target_id: this.rowData.id,
      };
      editRoleAccess(params).then((res) => {
        this.getRoleGridData({
          list: getRoleList,
        });
        this.handleClose();
        this.$message(res.msg);
      });
    },
    setCheckedData: function (arr) {
      arr.forEach((each) => {
        if (each.checked) {
          this.arr.push(each.id);
        }
        if (each.children?.length) {
          this.setCheckedData(each.children);
        }
      });
    },
    handleClose() {
      this.$emit("update:createDialog", false);
    },
  },
  created() {
    //拿tree结构的数据
    const id = this.rowData.id;
    getRoleTreeById({ id: id }).then((res) => {
      this.treeData = res.data;
      this.arr = [];
      this.setCheckedData(res.data);
      this.checkedIds = this.arr.join(",");
      this.$refs.organizationTree.setCheckedKeys(this.arr);
      this.loading = false;
    });
  },
};
</script>

<style lang="scss" scoped>
.role-authority {
  /deep/ .el-tree {
    overflow: scroll;
    max-height: 414px;
  }
}
</style>