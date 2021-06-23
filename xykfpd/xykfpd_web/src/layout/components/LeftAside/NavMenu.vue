<template>
  <div>
    <template v-if="navItem.leaf">
      <!-- <router-link tag="li" > -->
      <el-menu-item :index="navItem.front_router_name">{{
        navItem.title
      }}</el-menu-item>
      <!-- </router-link> -->
    </template>
    <el-submenu v-if="!navItem.leaf">
      <template slot="title">
        {{ navItem.title }}
      </template>
      <NavMenu
        v-for="(item, index) in navItem.children"
        :navItem="item"
        :itemIndex="item.front_router_name"
        :key="index"
        >{{ item }}</NavMenu
      >
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: {
    navItem: {
      type: Object,
    },
    itemIndex: String,
  },
  computed: {
    navItemView: function () {},
  },
  data() {
    return {};
  },
};
</script>

<style></style>
