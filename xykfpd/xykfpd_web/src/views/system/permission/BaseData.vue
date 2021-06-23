<template>
  <div class="main-container">
    <p class="tips">
      全局设置说明：</br>
      <template v-for="item in radioScope">
        <span>{{item.title}}：{{item.descriptor}}</span></br>
      </template>
    </p>
    <el-table :data="tableData" border :loading="loading">
      <el-table-column prop="title" label="数据类型" text-align="center"></el-table-column>
      <el-table-column prop="role" label="类型" text-align="center">
        <template slot-scope="scope">
          <el-radio-group v-model="scope.row.role" @change="radioClick(scope.row)">
            <template v-for="item in radioScope">
              <el-radio :label="item.id" :key="item.id">
                {{
                item.title
                }}
              </el-radio>
            </template>
          </el-radio-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getBaseDataList, saveCommonPermission } from "@/api/permission.js";
import { getBaseConfig } from "@/utils/common.js";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "baseData",
  data() {
    return {
      radioScope: getBaseConfig("SCOPE", true),
    };
  },
  computed: {
    ...mapGetters({
      tableData: "basePermission/list/gridData",
      loading: "basePermission/list/loading",
    }),
  },
  methods: {
    ...mapActions({
      getGridData: "basePermission/list/getGridData",
    }),
    radioClick(row) {
      const { id, role } = row;
      saveCommonPermission({ id: id, role: role }).then((res) => {
        this.$message(res.msg);
      });
    },
  },
  created() {
    //获取列表数据
    this.getGridData({ list: getBaseDataList });
  },
};
</script>

<style lang="scss" scoped>
.tips {
  text-align: left;
  line-height: 20px;
  font-size: 12px;
}
</style>
