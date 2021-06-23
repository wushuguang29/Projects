<template>
  <el-dialog
    :visible="createDialog"
    :title="windowTitle"
    :before-close="handleClose"
    class="role-person"
    width="80%"
    :close-on-click-modal="false"
  >
    <el-row class="role-container" :gutter="20">
      <el-col :span="12">
        <h3 class="role-title">组员</h3>
        <el-input v-model="group" placeholder="请输入姓名搜索"></el-input>
        <el-table
          :data="groupGridData"
          border
          @selection-change="groupChange"
          height="320"
        >
          <el-table-column type="selection" width="45"></el-table-column>
          <el-table-column
            label="姓名"
            with="80"
            prop="username"
            align="center"
          ></el-table-column>
          <el-table-column
            label="性别"
            with="80"
            prop="gender"
            :formatter="formatterSex"
            align="center"
          ></el-table-column>
          <el-table-column
            label="绑定时间"
            with="200"
            prop="create_time"
            align="center"
          ></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="2" class="control-icon-container">
        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          @click="handleAddPerson"
        ></el-button>
        <el-button
          type="primary"
          icon="el-icon-arrow-right"
          class="second-button"
          @click="handleDeletePerson"
        ></el-button>
      </el-col>
      <el-col :span="10">
        <h3 class="role-title">非组员</h3>
        <el-input v-model="ungroup" placeholder="请输入姓名搜索"></el-input>
        <el-table
          :data="ungroupGridData"
          border
          @selection-change="ungroupChange"
          height="320"
        >
          <el-table-column type="selection" width="45"></el-table-column>
          <el-table-column
            label="姓名"
            align="center"
            prop="username"
          ></el-table-column>
          <el-table-column
            label="性别"
            align="center"
            prop="gender"
            :formatter="formatterSex"
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getRoleGroupList, addRoleStaff, deleteRoleStaff } from "@/api/role.js";
import {
  getOrganizationGroupList,
  addOrganizationStaff,
  deleteOrganizationStaff,
} from "@/api/organization.js";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { getBaseConfig } from "@/utils/common";
export default {
  name: "rolePersonWindow",
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
  data() {
    return {
      group: "",
      groupChoose: null,
      unGroupChoose: null,
      ungroup: "",
    };
  },
  computed: {
    ...mapGetters({
      roleGroupTotalGridData: "baseRole/group/gridData",
      roleUngroupTotalGridData: "baseRole/ungroup/gridData",
    }),
    groupGridData: function () {
      return this.roleGroupTotalGridData.filter((item) => {
        if (item.username.includes(this.group)) {
          return item;
        }
      });
    },
    ungroupGridData: function () {
      return this.roleUngroupTotalGridData.filter((item) => {
        if (item.username.includes(this.ungroup)) {
          return item;
        }
      });
    },
  },
  methods: {
    ...mapActions({
      getRoleGroupGridData: "baseRole/group/getGridData",
      getRoleUngroupGridData: "baseRole/ungroup/getGridData",
    }),
    handleAddPerson: function () {
      if (!this.unGroupChoose) {
        return this.$message("请至少选择一个非组员!");
      }
      let params = {
        id: this.rowData.id,
        users_id: this.unGroupChoose,
      };
      addRoleStaff(params).then((res) => {
        this.$message(res.msg);
        this.refresh();
        this.$emit("updateList");
      });
    },
    handleDeletePerson: function () {
      if (!this.groupChoose) {
        return this.$message("请至少选择一个组员!");
      }
      let params = {
        id: this.rowData.id,
        users_id: this.groupChoose,
      };
      deleteRoleStaff(params).then((res) => {
        this.$message(res.msg);
        this.refresh();
        this.$emit("updateList");
      });
    },
    refresh: function () {
      this.getRoleGroupGridData({
        list: getRoleGroupList,
        params: {
          type: 1,
          id: this.rowData.id,
        },
      });
      this.getRoleUngroupGridData({
        list: getRoleGroupList,
        params: {
          type: 2,
          id: this.rowData.id,
        },
      });
    },
    ungroupChange: function (value) {
      let targets = [];
      value.forEach((item) => {
        targets.push(item.user_id);
      });
      this.unGroupChoose = targets.join(",");
    },
    groupChange: function (value) {
      let targets = [];
      value.forEach((item) => {
        targets.push(item.user_id);
      });
      this.groupChoose = targets.join(",");
    },
    formatterSex: function (row, column, cellValue) {
      return getBaseConfig("SEX")[cellValue];
    },
    handleClose() {
      this.$emit("update:createDialog", false);
    },
  },
  created() {
    this.refresh();
  },
};
</script>

<style lang="scss">
.el-dialog {
  /deep/ .el-dialog__body {
    max-height: 400px;
  }
}
.role-person {
  .role-container {
    width: 100%;

    .role-title {
      text-align: left;
      border-left: 5px solid #4277fc;
      padding-left: 10px;
    }

    .el-input {
      margin: 10px 0;
    }

    .control-icon-container {
      margin-top: 8em;

      .second-button {
        margin: 20px 0 0 0;
      }
    }
  }
}
</style>
