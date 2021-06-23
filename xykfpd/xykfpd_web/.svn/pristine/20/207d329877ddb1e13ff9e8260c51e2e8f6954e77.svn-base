<template>
  <el-container class="main-container">
    <el-table :data="tableData" border :loading="loading">
      <el-table-column
        label="序号"
        type="index"
        width="45"
        align="center"
      ></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column
        label="分组"
        prop="group"
        :formatter="formattGroup"
      ></el-table-column>
      <el-table-column
        label="类型"
        prop="type"
        :formatter="formattType"
      ></el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <system-config-window
      v-if="createDialog"
      :createDialog.sync="createDialog"
      windowTitle="编辑系统配置"
      @updateList="updateList"
      :rowData="rowData"
    ></system-config-window>
  </el-container>
</template>

<script>
import { getSystemConfig } from "@/api/systemConfig.js";
import { mapGetters, mapActions } from "vuex";
import SystemConfigWindow from "./systemConfigWindow";
import { getBaseConfig } from "../../../utils/common";
export default {
  name: "systemConfig",
  components: { SystemConfigWindow },
  data() {
    return {
      createDialog: false,
      rowData: {},
    };
  },
  computed: {
    ...mapGetters({
      tableData: "baseSystemConfig/list/gridData",
      loading: "baseSystemConfig/list/loading",
    }),
  },
  methods: {
    ...mapActions({
      getGridData: "baseSystemConfig/list/getGridData",
    }),
    handleEdit(index, row) {
      this.createDialog = true;
      this.rowData = row;
    },
    updateList() {
      this.getGridData({ list: getSystemConfig });
    },
    formattGroup(row, column, cellValue) {
      return getBaseConfig("CONFIG_GROUP")[cellValue];
    },
    formattType(row, column, cellValue) {
      return getBaseConfig("CONFIG_TYPE")[cellValue];
    },
  },
  created() {
    this.getGridData({ list: getSystemConfig });
  },
};
</script>

<style>
</style>