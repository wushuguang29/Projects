<template>
  <el-container class="main-container">
    <el-tabs v-model="activeTabName" class="set-tabs">
      <el-tab-pane label="基础数据权限" name="baseData">
        <base-data></base-data>
      </el-tab-pane>
      <el-tab-pane label="数据权限共享" name="dataShare">
        <data-share></data-share>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
// import BaseData from './BaseData'
// import DataShare from './DataShare'
export default {
  name: "permission",
  components:{
    BaseData:()=>import('./BaseData.vue'),
    DataShare:()=>import('./DataShare')
  },
  data() {
    return {
      activeTabName: "baseData",
      activeName: "baseData",
    };
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  .set-tabs {
    // margin: 0 10px;
    height: 100%;
    .el-tabs__nav-wrap::after {
      background-color: #fff !important;
    }
    /deep/ .el-tabs__content {
      height: 100%;
      .organizationList {
        height: 100%;
      }
      .el-tab-pane{
        height: 100%;
      }
    }
  }
}
</style>