<!--
 * @Author: your name
 * @Date: 2020-12-22 13:42:20
 * @LastEditTime: 2021-01-21 10:48:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_web\src\views\system\user\indexSet.vue
-->
<template>
  <el-container class="main-container user-tabs">
    <el-button
      type="primary"
      icon="el-icon-arrow-left"
      @click="closeTab"
      class="back-button"
      >返回</el-button
    >
    <el-tabs v-model="activeName">
      <el-tab-pane
        v-for="item in list"
        :label="item.title"
        :name="item.name"
        :key="item.name"
      >
      </el-tab-pane>
    </el-tabs>
    <component :is="activeName" class="component-bottom" />
  </el-container>
</template>

<script>
import RoleSet from "./roleSet";
// import OrganizationSet from "./organizationSet";
import AccessSet from "./accessSet";
// import DataSet from "./dataSet";
import { mapMutations } from "vuex";
export default {
  name: "indexSet",
  components: { RoleSet, AccessSet },
  data() {
    return {
      //当前tab
      activeName: "RoleSet",
      //tab头的list
      list: [
        // {
        //   name: "OrganizationSet",
        //   title: "组织机构绑定设置",
        // },
        {
          name: "RoleSet",
          title: "角色绑定设置", 
        },
        {
          name: "AccessSet",
          title: "访问权限设置",
        },
        // {
        //   name: "DataSet",
        //   title: "数据权限",
        // },
      ],
    };
  },
  methods: {
    ...mapMutations["delTag"],
    //返回事件
    closeTab: function () {
      //删除tag
      this.$store.commit("delTag", "setIndex");
      //重置路由
      this.$router.replace({
        name: "user",
        path: "/user",
        title: "用户管理",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-tabs {
  margin: 0 10px;
  position: relative;
  /deep/ section.main-container {
    padding: 0;
  }
}
.main-container {
  .back-button {
    width: 80px;
    position: absolute;
    right: 0px;
    z-index: 3;
    top: 4px;
  }
}
</style>