<template>
  <el-container class="main-container user-data">
    <el-aside>
      <p
        v-for="item in userList"
        @click="getDataList(item)"
        :key="item.id"
        :class="listId == item.resources_id ? 'activeP' : ''"
      >
        {{ item.title }}
      </p>
    </el-aside>
    <el-main>
      <el-table :data="tableData" style="width: 100%" :loading="loading">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column
          label="数据源"
          prop="name"
          text-align="center"
        ></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { getUserDataList, getUserDataAccess } from "@/api/user.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "dataSet",
  data() {
    return {
      userList: [{ title: "请先绑定权限" }],
      listId: 0,
    };
  },
  computed: {
    ...mapGetters({
      tableData: "baseUser/dataList/gridData",
      loading: "baseUser/dataList/loading",
    }),
  },
  methods: {
    ...mapActions({
      getGridData: "baseUser/dataList/getGridData",
    }),
    getDataList(values) {
      const user_id = Number(this.$route.query.user_id);
      this.listId = values.resources_id;
      this.getGridData({
        list: getUserDataAccess,
        params: {
          users_id: user_id,
          resource_id: values.resources_id,
        },
      });
    },
  },
  created() {
    //获取列表数据
    getUserDataList({ users_id: this.$route.query.user_id }).then((res) => {
      if (res.code == 0 && res.data.length) {
        this.userList = res.data;
        this.listId = res.data[0].resources_id;
        console.log(this.listId);
        //默认写入列表第一个数据
        this.getDataList(res.data[0]);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.user-data {
  margin-bottom: 10px !important;
  /deep/ .el-aside {
    width: 260px;
    margin-right: 10px;
    background: #fff;
    p {
      margin: 0px;
      font-size: 12px;
      padding: 10px;
      display: block;
    }
    p.activeP {
      color: #4277fc;
    }
  }
  /deep/ .el-main {
    padding: 0;
    overflow: hidden;
  }
  /deep/ .el-table .cell {
    text-align: center;
  }
}
</style>
