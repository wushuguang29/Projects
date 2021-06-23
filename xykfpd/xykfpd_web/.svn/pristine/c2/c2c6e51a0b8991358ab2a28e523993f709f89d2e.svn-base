<template>
  <el-container class="main-container">
    <el-header class="search-container" height="auto">
      <lh-search-bar
        :formItemData="formItemData"
        :operationData="operationData"
        @searchChange="getGridData"
        @addHandler="addHandler"
      ></lh-search-bar>
    </el-header>
    <lh-table
      :loading="loading"
      :table="table"
      :gridData="gridData"
      @pageChange="getGridData"
      @handleDelete="handleDelete"
      @handleEdit="handleEdit"
      @handleSetConfig="handleSetConfig"
      @handleOauth="handleOauth"
      @handleResetPassword="handleResetPassword"
      @handleUnlock="handleUnlock"
      :total="total"
    ></lh-table>
    <user-window
      v-if="createDialog"
      :createDialog.sync="createDialog"
      :windowTitle="windowTitle"
      @updateList="updateList"
      :editStatus="editStatus"
      :rowData="rowData"
    ></user-window>
  </el-container>
</template>
<script>
import {
  getUserList,
  deleteUser,
  resetUser,
  getUserById,
  unlockUser,
} from "@/api/user.js";
import { summaryFunction, getBaseConfig } from "@/utils/common";
import { mapActions, mapGetters } from "vuex";
import UserWindow from "./userWindow";
export default {
  name: "user",
  components: { UserWindow },
  data() {
    return {
      // 查询表单数据
      formItemData: [
        {
          element: "input",
          defaultValue: "",
          name: "username",
          disabled: false,
          placeholder: "请输入姓名",
        },
      ],
      //搜索功能菜单
      operationData: [
        {
          text: "新建",
          type: "success",
          Fun: "addHandler",
          permission: "add",
          icon: "iconfont el-icon-plus",
        },
      ],
      //列表表头控制
      table: {
        // hasSelect: false,
        hasOperation: true,
        hasRowsNumber: true,
        columns: [
          {
            text: "姓名",
            dataIndex: "username",
          },
          {
            text: "性别",
            dataIndex: "gender",
            render: (h, params) => {
              let value = params.row["gender"],
                config = getBaseConfig("SEX");
              return h("span", config[value]);
            },
          },
          {
            text: "账号",
            dataIndex: "account",
            showToolTip: true,
          },
          {
            text: "所属角色",
            dataIndex: "role_name",
          },
        
          {
            text: "在职状态",
            dataIndex: "working_status",
            render: (h, params) => {
              let value = params.row["working_status"],
                config = getBaseConfig("WORKING_STATUS");
              return h("span", config[value]);
            },
          },
          {
            text: "账户状态",
            dataIndex: "status",
            render: (h, params) => {
              let value = params.row["status"],
                config = getBaseConfig("ACCOUNT_STATUS");
              return h("span", config[value]);
            },
          },
          {
            text: "剩余次数",
            dataIndex: "remain",
          },
        ],
        operation: {
          width: 500,
          data: [
            {
              text: "编辑",
              Fun: "handleEdit",
              permission: "edit",
              type: "success",
            },
            {
              text: "设置",
              Fun: "handleSetConfig",
              type: "primary",
              permission: "indexSet",
            },
            {
              text: "绑定第三方登录",
              Fun: "handleOauth",
              type: "primary",
              permission: "oauth",
            },
            {
              text: "重置密码",
              Fun: "handleResetPassword",
              type: "warning",
              permission: "reset",
            },
            {
              text: "解锁",
              Fun: "handleUnlock",
              type: "warning",
              permission: "unlock",
              controlBtnFun: function (row) {
                return row.status === 2&&row.remain==0 ? true : false;
              },
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
      createDialog: false,
      //标记编辑或者新增状态
      editStatus: false,
      //窗口带入回写的数据
      rowData: {},
      //当前激活的窗口
      activeName: "userWindow",
      windowTitle: "",
    };
  },
  computed: {
    ...mapGetters({
      gridData: "baseUser/list/gridData",
      total: "baseUser/list/total",
      loading: "baseUser/list/loading",
    }),
  },
  methods: {
    ...mapActions({
      getGridData: "baseUser/list/getGridData",
      deleteGrid: "baseRole/list/deleteGrid",
      createTagPanel: "createTagPanel",
    }),
    //编辑点击事件
    handleEdit: function (options) {
      const { row, index } = options;
      //通过户用id获取数据
      getUserById({ id: row.id }).then((res) => {
        this.editStatus = true;
        this.windowTitle = "编辑用户";
        Object.assign(this.rowData, res.data);
        this.createDialog = true;
      });
    },
    //打开新的路由
    handleSetConfig: function (options) {
      console.log("option",options)
      const { row} = options;
      //调用createTagPanel，创建新的路由
      this.$store.dispatch("createTagPanel", {
        name: "indexSet",
        path: "indexSet",
        title: "用户设置",
        vm: this,
        query: {
          user_id: row.id,
        },
      });
    },
    //第三方登录
    handleOauth: function (options) {
      const { row, index } = options;
      this.$message("绑定第三方登录还未开发");
    },
    //重置密码
    handleResetPassword: function (options) {
      const { row, index } = options;
      resetUser({ id: row.id }).then((res) => {
        this.$message(res.msg);
      });
    },
    //解锁账户
    handleUnlock: function (options) {
      const { row, index } = options;
      unlockUser({ id: row.id }).then((res) => {
        this.$message(res.msg);
        this.getGridData({ list: getUserList });
      });
    },
    //删除点击事件
    handleDelete(options) {
      const { row, index } = options;
      this.deleteGrid({ deleteFun: deleteUser, params: { id: row.id } }).then(
        (res) => {
          this.$message(res.msg);
          this.getGridData({ list: getUserList });
        }
      );
    },
    //初始化新增窗口
    addHandler() {
      this.createDialog = true;
      this.editStatus = false;
      this.windowTitle = "新增用户";
      this.rowData = {};
    },
    //编辑或新增成功后刷新列表
    updateList() {
      this.getGridData({ list: getUserList });
    },
  },
  created() {
    this.getGridData({ list: getUserList });
  },
};
</script>

<style lang="scss" scoped></style>
