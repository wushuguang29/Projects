<template>
  <el-container class="main-container">
    <el-main class="organization-set">
      <lh-tree-select-table
        :tableData="tableData"
        @selectionChange="selectChange"
        :hasSelection="true"
        :columns="columns"
        selectTitle="组织机构"
        :checkPropagation="'down'"
        :loading="loading"
      ></lh-tree-select-table>
    </el-main>
    <el-footer height="40px">
      <p>备注：通过勾选实现绑定选择，勾选父节点可全选所属子节点</p>
      <el-button type="primary" size="small" @click="saveHandle"
        >保存</el-button
      >
    </el-footer>
  </el-container>
</template>

<script>
import { getUserOrgList, bindUserOrg } from "@/api/user.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "organizationSet",
  data() {
    return {
      hasSelect: true,
      arr: [],
      //选中id
      targetIds: "",
      columns: [
        {
          text: "状态",
          dataIndex: "organization_status",
          render: function (h, params) {
            if (params.row.checked) {
              return h("span", {
                style: { color: "#32b16c" },
                domProps: { innerHTML: "已绑定" },
              });
            } else {
              return h("span", "未绑定");
            }
          },
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      tableData: "baseUser/orgTree/gridData",
      loading: "baseUser/orgTree/loading",
    }),
  },
  methods: {
    ...mapActions({
      getGridData: "baseUser/orgTree/getGridData",
    }),
    //保存事件
    saveHandle: function () {
      const user_id = Number(this.$route.query.user_id);
      let params = {
        users_id: user_id,
        organization_id: this.targetIds,
      };
      bindUserOrg(params).then((res) => {
        this.$message(res.msg);
        this.getGridData({
          list: getUserOrgList,
          params: { users_id: user_id },
        });
      });
    },
    //保存所有选中id
    selectChange: function (selection) {
      let arr = [];
      selection.forEach((each) => {
        arr.push(each.id);
      });
      this.targetIds = arr.join(",");
    },
    setCheckedData: function (arr) {
      arr.forEach((each) => {
        if (each.checked) {
          this.arr.push(each.id);
        }
        if (each.children && each.children.length) {
          this.setCheckedData(each.children);
        }
      });
    },
  },
  created() {
    //获取列表数据
    this.getGridData({
      list: getUserOrgList,
      params: { users_id: this.$route.query.user_id },
    }).then((res) => {
      this.setCheckedData(res.data);
      this.targetIds = this.arr.join(",");
    });
  },
};
</script>

<style lang="scss" scpoed>
.main-container {
  .organization-set {
    padding: 0;
    height: 100%;
  }
  /deep/ .el-footer {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 30px;
    padding: 5px;
    p {
      margin: 0px;
      font-size: 11px;
      color: #909399;
    }
  }
}
</style>