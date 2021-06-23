<template>
  <el-container class="main-container">
    <el-main class="access-data">
      <lh-tree-select-table
        :tableData="tableData"
        @selectionChange="selectChange"
        :hasSelection="true"
        :columns="columns"
        :checkPropagation="'down'"
        selectTitle="菜单/按钮"
        handleTextKey="title"
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
import { getUserAceessList, bindUserAceess } from "@/api/user.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "accessSet",
  data() {
    return {
      hasSelect: true,
      arr: [],
      targetIds: "",
      columns: [
        /* {
          text: "状态",
          dataIndex: "allow_status",
          render:function(h,params){
            if(params.row.allow_status){
              return h('span',{
                style:{color:'#32b16c'},
                domProps:{innerHTML:'允许'}
              })
            }else{
              return h("span", '禁止');
            }
          }
        } */
      ],
    };
  },
  computed: {
    ...mapGetters({
      tableData: "baseUser/accessTree/gridData",
      loading: "baseUser/accessTree/loading",
    }),
  },
  methods: {
    ...mapActions({
      getGridData: "baseUser/accessTree/getGridData",
    }),
    saveHandle: function () {
      const user_id = Number(this.$route.query.user_id);
      let params = {
        target_id: user_id,
        resource_id: this.targetIds,
      };
      bindUserAceess(params).then((res) => {
        this.$message(res.msg);
        this.getGridData({
          list: getUserAceessList,
          params: { users_id: user_id },
        });
      });
    },
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
      list: getUserAceessList,
      params: { users_id: this.$route.query.user_id },
    }).then((res) => {
      this.setCheckedData(res.data);
      this.targetIds = this.arr.join(",");
    });
  },
};
</script>
<style lang="scss" scoped>
.main-container {
  .access-data {
    padding: 0;
    height: 100%;
  }
  /deep/ .el-footer {
    display: flex;
    justify-content: space-between;
    height: 30px;
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