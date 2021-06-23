<template>
  <el-container class="main-container">
    <el-header class="search-container" height="auto">
      <lh-search-bar
        :formItemData="formItemData"
        :operationData="operationData"
        @addHandler="addHandler"
        @resetHandler="resetHandler"
        @searchChange="getGridData"
      ></lh-search-bar>
    </el-header>
    <lh-table
      :table="table"
      :gridData="gridData"
      @pageChange="getGridData"
      @handleDelete="handleDelete"
      @handleEdit="handleEdit"
      @handleAuthoritySet="handleAuthoritySet"
      @handlePerson="handlePerson"
      :total="total"
      :loading="loading"
    ></lh-table>
    <component
      v-if="createDialog"
      :createDialog.sync="createDialog"
      :is="activeName"
      :editStatus="editStatus"
      :rowData="rowData"
      :windowTitle="windowTitle"
      @updateList="updateList"
    />
  </el-container>
</template>
<script>
import { getRoleList, deleteRole, getRoleById } from "@/api/role.js";
import { mapActions, mapGetters } from "vuex";
import Role from "./roleWindow";
import Authority from "./authorityWindow";
import Person from "./personWindow";
function getInitData() {
  return {
    Person: {
      activeName: "Person",
      dialogVisible: true,
      editStatus: false,
      windowTitle: "人员管理",
      windowWidth: "80%",
      hasButton: false,
      rowData: {},
    },
  };
}
export default {
  name: "role",
  components: {
    Role,
    Authority,
    Person,
  },
  data() {
    return {
      activeName: "Role",
      createDialog: false,
      formItemData: [
        {
          element: "input",
          defaultValue: "",
          name: "name",
          disabled: false,
          placeholder: "请输入姓名角色名称",
        },
      ],
      operationData: [
        {
          text: "新建",
          type: "success",
          Fun: "addHandler",
          permission: "add",
          icon: "iconfont el-icon-plus",
        },
      ],
      table: {
        // hasSelect: false,
        hasRowsNumber: true,
        hasOperation: true,
        columns: [
          {
            text: "角色名称",
            dataIndex: "name",
          },
          {
            text: "角色人员",
            dataIndex: "usernames",
            showToolTip: true,
          },
          {
            text: "备注",
            dataIndex: "remark",
            showToolTip: true,
          },
          {
            text: "创建时间",
            dataIndex: "create_time",
            width: 140,
          },
          {
            text: "创建人",
            dataIndex: "handler_name",
            width: 100,
          },
        ],
        operation: {
          width: 340,
          data: [
            {
              text: "编辑",
              Fun: "handleEdit",
              type: "success",
              permission: "edit",
            },
            {
              text: "权限设置",
              Fun: "handleAuthoritySet",
              type: "primary",
              permission: "authory",
            },
            {
              text: "人员管理",
              Fun: "handlePerson",
              type: "primary",
              permission: "person",
            },
            {
              text: "删除",
              Fun: "handleDelete",
              type: "danger",
              permission: "delete",
            },
          ],
        },
      },
      dialogVisible: false,
      windowTitle: "新增角色",
      editStatus: false,
      rowData: {},
      windowWidth: "40%",
    };
  },

  computed: {
    ...mapGetters({
      gridData: "baseRole/list/gridData",
      total: "baseRole/list/total",
      loading: "baseRole/list/loading",
    }),
    dialogStyle: function () {
      if (this.activeName === "Authority") {
        return "dialog-common";
      }
      return "";
    },
  },
  methods: {
    ...mapActions({
      getGridData: "baseRole/list/getGridData",
      deleteGrid: "baseRole/list/deleteGrid",
      createTagPanel: "createTagPanel",
    }),
    addHandler: function () {
      this.createDialog = true;
      this.editStatus = false;
      this.windowTitle = "新增角色";
      this.rowData = {};
      this.activeName = "Role";
    },
    handleEdit: function (options) {
      const { row, index } = options;
      getRoleById({ id: row.id }).then((res) => {
        this.createDialog = true;
        this.editStatus = true;
        this.windowTitle = "编辑角色";
        this.rowData = res.data;
        this.activeName = "Role";
      });
    },
    handleAuthoritySet: function (options) {
      const { row, index } = options;
      this.createDialog = true;
      this.editStatus = true;
      this.windowTitle = "权限设置";
      this.rowData = row;
      this.activeName = "Authority";
    },
    handlePerson: function (options) {
      const { row, index } = options;
      this.createDialog = true;
      this.editStatus = true;
      this.windowTitle = "人员管理";
      this.rowData = row;
      this.activeName = "Person";
      let data = getInitData().Person;
    },
    handleDelete: function (options) {
      const { row, index } = options;
      this.deleteGrid({
        deleteFun: deleteRole,
        params: {
          id: row.id,
        },
      }).then((res) => {
        this.$message(res.msg);
        this.getGridData({
          list: getRoleList,
        });
      });
    },
    resetHandler: function () {},
    updateList: function () {
      this.getGridData({
        list: getRoleList,
      });
    },
  },
  created() {
    this.getGridData({
      list: getRoleList,
    });
  },
};
</script>

<style>
</style>
