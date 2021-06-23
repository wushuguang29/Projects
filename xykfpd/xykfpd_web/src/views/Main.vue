<template>
  <el-container class="main-container">
    <!-- 顶部 -->
    <TopBarMenu></TopBarMenu>
    <el-container class="main-content">
      <!-- 菜单 -->
      <left-aside :isCollapse="isCollapse"></left-aside>
      <!-- 中间tab页面 -->
      <el-main class="main-center-container">
          <div class="shrink"  @click="isCollapse=!isCollapse">
              <i class="el-icon-s-fold"></i>
            </div>
        <tag-view></tag-view>
        <app-main></app-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LeftAside from "@/layout/components/LeftAside";
import TagView from "@/layout/components/TagView";
import AppMain from "@/layout/components/AppMain";
import TopBarMenu from "@/layout/components/TopBar";
export default {
  name: "Main",
  components: {
    LeftAside,
    TagView,
    AppMain,
    TopBarMenu,
  },
  data(){
    return{
      isCollapse:false,
    }
  },
};
</script>

<style lang="scss" scoped>
.main-container {
  flex-direction: column;
  height: 100%;
  .shrink{
    float: left;
    margin-top:8px;
    width: 30px;
    z-index: 99;
    position: relative;
    .el-icon-s-fold{
      font-size:18px;
      margin-top: 3px;
    }
  }
  .main-content {
    flex: 1;
    overflow: hidden;
    .main-center-container {
      background: #f0f0f0;
      padding: 0;
      overflow: hidden;
      /deep/ .main-container {
        padding: 10px 10px 0;
        height: calc(100% - 50px);
        /deep/.search-container {
          padding: 0;
          margin-top: -10px;
        }
      }
    }
  }
}
</style>
