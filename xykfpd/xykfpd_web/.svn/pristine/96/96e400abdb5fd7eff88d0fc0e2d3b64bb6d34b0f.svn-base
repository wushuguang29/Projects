<template>
  <el-container class="main-container role-person" :windowType="windowType">
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
  </el-container>
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
  name: "personWindow",
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    windowType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      group: "",
      groupChoose: null,
      unGroupChoose: null,
      ungroup: "",
      types: {
        Role: {
          groupListUrl: getRoleGroupList,
          addUrl: addRoleStaff,
          deleteUrl: deleteRoleStaff,
        },
        Organization: {
          groupListUrl: getOrganizationGroupList,
          addUrl: addOrganizationStaff,
          deleteUrl: deleteOrganizationStaff,
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      roleGroupTotalGridData: "baseRole/group/gridData",
      roleUngroupTotalGridData: "baseRole/ungroup/gridData",
      organizationGroupTotalGridData: "baseOrganization/group/gridData",
      organizationUngroupTotalGridData: "baseOrganization/ungroup/gridData",
    }),
    groupGridData: function() {
      return this[this.windowType.toLowerCase() + "GroupTotalGridData"].filter(
        (item) => {
          if (item.username.includes(this.group)) {
            return item;
          }
        }
      );
    },
    ungroupGridData: function() {
      return this[
        this.windowType.toLowerCase() + "UngroupTotalGridData"
      ].filter((item) => {
        if (item.username.includes(this.ungroup)) {
          return item;
        }
      });
    },
  },
  methods: {
    ...mapActions({
      getRoleGroupGridData: "baseRole/group/getGridData",
      getOrganizationGroupGridData: "baseOrganization/group/getGridData",
      getRoleUngroupGridData: "baseRole/ungroup/getGridData",
      getOrganizationUngroupGridData: "baseOrganization/ungroup/getGridData",
    }),
    handleAddPerson: function() {
      if (!this.unGroupChoose) {
        return this.$message("请至少选择一个非组员!");
      }
      let params = {
        id: this.rowData.id,
        users_id: this.unGroupChoose,
      };
      let funName = this.types[this.windowType]["addUrl"];
      funName(params).then((res) => {
        this.$message(res.msg);
        this.refresh();
        this.$emit("updateList");
      });
    },
    handleDeletePerson: function() {
      if (!this.groupChoose) {
        return this.$message("请至少选择一个组员!");
      }
      let params = {
        id: this.rowData.id,
        users_id: this.groupChoose,
      };
      let funName = this.types[this.windowType]["deleteUrl"];
      funName(params).then((res) => {
        this.$message(res.msg);
        this.refresh();
        this.$emit("updateList");
      });
    },
    refresh: function() {
      this["get" + this.windowType + "GroupGridData"]({
        list: this.types[this.windowType]["groupListUrl"],
        params: {
          type: 1,
          id: this.rowData.id,
        },
      });
      this["get" + this.windowType + "UngroupGridData"]({
        list: this.types[this.windowType]["groupListUrl"],
        params: {
          type: 2,
          id: this.rowData.id,
        },
      });
    },
    ungroupChange: function(value) {
      let targets = [];
      value.forEach((item) => {
        targets.push(item.user_id);
      });
      this.unGroupChoose = targets.join(",");
    },
    groupChange: function(value) {
      let targets = [];
      value.forEach((item) => {
        targets.push(item.user_id);
      });
      this.groupChoose = targets.join(",");
    },
    formatterSex: function(row, column, cellValue) {
      return getBaseConfig("SEX")[cellValue];
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
