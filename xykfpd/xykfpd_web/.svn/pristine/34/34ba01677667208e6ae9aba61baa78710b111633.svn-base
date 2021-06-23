<template>
  <div style="position: relative">
    <el-tabs
      v-model="active"
      type="card"
      @tab-remove="removeTab"
      class="tap-panel"
      @tab-click="tabClick"
      @contextmenu.prevent.native="openMenu($event)"
      closable
    >
      <el-tab-pane
        v-for="(item, index) in tagArr"
        :key="item.name + index"
        :label="item.title"
        :name="item.name"
      ></el-tab-pane>
    </el-tabs>
    <ul
      class="contextMenu"
      v-show="menuIsShow"
      :style="{ top: menuTop + 'px', left: menuLeft + 'px' }"
    >
      <li class="dividing" @click="onCloseNowClick">关闭当前</li>
      <li @click="onCloseOtherClick">关闭其他</li>
      <li @click="onCloseAllClick">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "TagView",
  data() {
    return {
      menuIsShow: false,
      menuTop: 0,
      menuLeft: 0,
      nextTab: null,
    };
  },
  computed: {
    ...mapGetters(["tagArr", "activeName"]),
    active: {
      get: function () {
        return this.activeName;
      },
      set: function (value) {
        return value;
      },
    },
  },
  mounted() {
    this.addTag();
    console.log(this.tagArr);
  },
  methods: {
    ...mapActions(["createTagPanel", "delOtherTagPanel", "delAllTabPanel"]),
    ...mapMutations(["setActiveName", "setTagArr", "setCurrentMenuFromTag"]),
    addTag() {
      let currentRoute = this.$route;
      // console.log(currentRoute)
      if (currentRoute.name == "main") {
        return;
      }
      let title = "";
      this.createTagPanel({
        name: currentRoute.name,
        path: currentRoute.path,
        title: currentRoute.meta.title,
        type: title,
        query: currentRoute.query,
      });
    },
    openMenu(event) {
      var routeName = event.toElement.id.replace("tab-", "");
      // if (routeName === "Home") {
      //   // 工作桌面默认
      //   return;
      // }
      this.menuIsShow ? null : (this.menuIsShow = true);
      const clientX = event.clientX;
      const clientY = event.clientY;
      const scrollBox = this.$el.getBoundingClientRect();
      const menuLeft = clientX - scrollBox.left;
      this.$data.menuTop = clientY - scrollBox.top;
      this.$data.menuLeft =
        scrollBox.width - menuLeft < 120 ? 120 : menuLeft + 5;
      this.$data.selectOfRightClick = routeName;
    },
    tabClick(e) {
      // tab点击切换对应路由
      var name = e.name;
      let index = this.tagArr
        ? this.tagArr.findIndex((item) => item.name == name)
        : -1;
      let query = this.tagArr[index] ? this.tagArr[index].query : null;
      this.$router.push({ name: name, query: query });
      console.log(this.$route);
      this.setCurrentMenuFromTag(this.$route); //
    },
    removeTab(targetName) {
      // 关闭tab
      let tabs = this.tagArr;
      let activeName = this.activeName;
      if (tabs && tabs.length == 1) {
        this.$router.push({
          path: "/desktop",
        });
      }
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            this.nextTab = tabs[index + 1] || tabs[index - 1];
            if (this.nextTab) {
              activeName = this.nextTab.name;
            }
          }
        });
      }
      console.log("tabs", tabs);
      this.setActiveName(activeName);
      this.setTagArr(tabs.filter((tab) => tab.name !== targetName));
      // console.log(this.nextTab)
      if (this.nextTab) {
        this.createTagPanel(this.nextTab);
        this.tabClick(this.nextTab);
      }
    },
    closeMenu() {
      this.menuIsShow = false;
    },
    onCloseNowClick() {
      // 关闭当前
      this.removeTab(this.activeName);
    },
    // 关闭其他
    onCloseOtherClick() {
      this.delOtherTagPanel({ vm: this, routeName: this.activeName });
    },
    //关闭所有
    onCloseAllClick() {
      this.delAllTabPanel(this);
    },
  },
  watch: {
    $route() {
      this.addTag();
    },
    menuIsShow(value) {
      if (value) {
        document.body.addEventListener("click", this.closeMenu);
      } else {
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  mounted() {
    this.bus.$on("closePath", (res) => {
      this.removeTab(res);
    });
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-tabs__header {
  margin: 0;
}
.contextMenu {
  width: 100px;
  border: 1px solid #aaa;
  border-radius: 4px;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  background: #ffffff;
  position: absolute;
  padding: 0;
  z-index: 100;
  // padding: 5px 0px;
  li {
    cursor: pointer;
    width: 100%;
    line-height: 35px;
    text-align: center;
    border-width: 0px;
    border-radius: 2px;
    color: #aaa;
    list-style: none;
  }
  li:hover {
    color: #ffffff;
    background-color: $--color-primary;
  }
  .dividing::after {
    content: "";
    display: block;
    width: 100%;
    background: #ddd;
    height: 2px;
    margin-bottom: 2px;
  }
}
</style>
