<template>
  <el-aside :width="asideWidth">
    <el-menu
      class="el-menu-vertical-demo"
      router
      :default-active="defaultActiveMenu"
      :collapse="isCollapse"
    >
      <template v-for="(item, index) in menuArr">
        <el-submenu
          :index="item.front_router_name"
          v-if="!item.leaf"
          :key="index"
        >
          <template slot="title">
            <i class="el-icon-folder"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <NavMenu
            v-for="(item, index) in item.children"
            :itemIndex="item.front_router_name"
            :navItem="item"
            :key="index"
          />
        </el-submenu>
        <el-menu-item :index="item.front_router_name" v-else :key="index">
          <i :class="'iconfont' + ' ' + item.icon + ' icon-style'"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapGetters } from "vuex";
import NavMenu from "./NavMenu";
export default {
  name: "LeftAside",
  data(){
    return{
      asideWidth:''
    }
  },
  props:{
    isCollapse:false,
  },
  components: {
    NavMenu,
  },
  computed: {
    ...mapGetters(["currentMenu", "defaultActiveMenu"]),
    menuArr: {
      get: function () {
        return this.currentMenu;
      },
      set: function (value) {
        return value;
      },
    },
  },
  created() {
    console.log(this.menuArr);
  },
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  border-right:none !important;
  /deep/ &:not(.el-menu--collapse) {
    width: 100%;
    min-height: 400px;
  }
  /deep/ .el-submenu__title {
    text-align: left;
  }
  /deep/ .el-menu-item {
    text-align: left;
    .icon-style {
      margin-right: 5px;
      font-size: 15px;
      color: #0087fe;
    }
  }
}
</style>
