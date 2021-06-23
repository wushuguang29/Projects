<template>
  <div>
    <el-header height="60px" class="top-menu-container">
      <el-row justify="start">
        <el-col :span="16">
          <div v-if="isDesktop" style="text-align: left">
            <img src="@/assets/img/logo.png" alt />
          </div>
          <template v-if="!isDesktop">
            <el-row type="flex">
              <el-col :span="6">
                <img src="@/assets/img/logo_lhsoft.png" alt />
              </el-col>
              <el-col :span="12" tag="div" class="top-menu-content">
                <i class="home-img"></i>
                <div class="to-first" @click="gotoDesktop">返回首页</div>
                <el-dropdown
                  class="to-first"
                  :size="'medium'"
                  :placement="'bottom'"
                  @command="goTo"
                >
                  <span class="el-dropdown-link">
                    {{ currentTitle }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu
                    slot="dropdown"
                    style="width: 120px; text-align: center"
                  >
                    <el-dropdown-item
                      :command="{ row: item, index }"
                      :style="
                        currentTitle == item.title
                          ? { color: '#0087FEFF' }
                          : { color: '#999' }
                      "
                      v-for="(item, index) in topMenu"
                      :key="index"
                      >{{ item.title }}</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
                <div class="to-first">
                  {{ activeTopMenuName }}
                </div>
              </el-col>
            </el-row>
          </template>
        </el-col>
        <el-col :span="8">
          <el-row>
            <!-- <el-col :span="8">
              <el-select
                v-model="region"
                class="select-box"
                @change="regionChange"
              >
                <el-option
                  v-for="item in regionData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.region_id"
                  >{{ item.name }}
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <el-select
                v-model="project"
                class="select-box"
                @change="projectChange"
              >
                <el-option
                  v-for="item in projectData"
                  :key="item.id"
                  :label="item.project_name"
                  :value="item.id"
                  >{{ item.project_name }}
                </el-option>
              </el-select>
            </el-col> -->
            <el-col :span="8">
              <el-dropdown
                class="handle-btn user-container"
                @command="userHandler"
              >
                <span class="el-dropdown-link">
                  {{ userName }}，您好
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="changePassword">
                    <span class="el-lhsoft-mima"></span>
                    修改密码
                  </el-dropdown-item>
                  <el-dropdown-item command="clearStorage">
                    <span class="el-icon-refresh-right"></span>
                    清除缓存
                  </el-dropdown-item>
                  <el-dropdown-item command="exit">
                    <span class="el-lhsoft-qiehuanzuhu"></span>
                    退出
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <reset-password-window
      :createDialog.sync="createDialog"
      v-if="createDialog"
    />
  </div>
</template>

<script>
import { getRegion, getRegionProject, setRegionProject } from "@/api/user.js";
import { mapActions, mapGetters, mapMutations } from "vuex";
import ResetPasswordWindow from "./resetPasswordWindow";
export default {
  components: { ResetPasswordWindow },
  data() {
    return {
      createDialog: false,
      regionData: [],
      projectData: [],
      region: "",
      project: "",
      firstRender: false,
    };
  },
  props: {
    changeProject: {
      // 是否显示切换项目控件
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["topMenu", "currentIndex", "userInfo", "currentMenu"]),
    currentMenuIndex: {
      get: function () {
        return this.currentIndex;
      },
      set: function (value) {
        return value;
      },
    },
    isDesktop: function () {
      return this.$route.path == "/Desktop" || this.$route.path == "/desktop";
    },
    currentTitle() {
      return this.topMenu[this.currentMenuIndex].title;
    },
    activeTopMenuName() {
      const activePath = this.$route.path;
      const currentMenu = [...this.currentMenu];
      let title = "";
      currentMenu.forEach((each) => {
        if ("/" + each.front_router_name == activePath) {
          title = each.title;
        } else {
          each.meta.button.forEach((rec) => {
            if ("/" + rec.front_router_name == activePath) {
              title = each.title + " - " + rec.title;
            }
          });
        }
      });
      return title;
    },
    userName: function () {
      return this.$store.state.user.userInfo.user_name;
    },
  },
  created() {
    console.log(this.topMenu);
  },
  methods: {
    ...mapGetters(["menu"]),
    ...mapActions(["logOut", "refreshBaseConfig"]),
    ...mapMutations(["setCurrentMenu", "setMenu", "setUserInfo"]),
    changeCurrentIndex(e) {
      this.setCurrentMenu(e.index);
    },
    logOut: function () {
      this.$store.dispatch("logOut").then(() => {
        this.setMenu([]);
        this.$router.push({
          path: "/login",
        });
      });
    },
    changProject: function () {
      this.$message("切换项目");
    },
    userHandler(command) {
      if (command == "changePassword") {
        this.createDialog = true;
      } else if (command == "exit") {
        this.logOut();
      } else if (command == "clearStorage") {
        /* 清除缓存 */
        this.refreshBaseConfig();
      }
    },
    gotoDesktop() {
      this.$router.push({
        path: "/Desktop",
      });
    },
    goTo(e) {
      const routeName = e.row.name;
      const meunArr = this.menu();
      let menuIndex = 0;
      meunArr.forEach((each, index) => {
        if (each.front_router_name === routeName) {
          menuIndex = index;
          this.$router.push({
            path: each.children[0].front_router_name,
          });
        }
      });
      this.setCurrentMenu(menuIndex);
    },
    regionChange(val) {
      this.project = "";
      this.firstRender = false;
      this.getProjectData();
    },
    projectChange() {
      let userInfo = this.$store.state.user.userInfo;
      const index = this.projectData.findIndex(
        (each) => each.id == this.project
      );
      const params = {
        region_id: this.region,
        project_id: this.project,
        project_name: this.projectData[index]["project_name"],
      };
      Object.assign(userInfo, params);
      setRegionProject(params).then((res) => {
        this.setUserInfo(userInfo);
        this.refreshBaseConfig();
      });
    },
    getRegionData() {
      const defaultRegionId = this.$store.state.user.userInfo.region_id;
      getRegion().then((res) => {
        this.regionData = res.data;
        if (this.firstRender) {
          this.region = defaultRegionId;
        }
        this.getProjectData();
      });
    },
    getProjectData() {
      const defaultProjectId = this.$store.state.user.userInfo.project_id;
      getRegionProject({
        region_id: this.region,
      }).then((res) => {
        this.projectData = res.data;
        if (this.firstRender) {
          this.project = defaultProjectId;
        }
      });
    },
  },
  created() {
    this.firstRender = true;
    // this.getRegionData();
  },
};
</script>

<style lang="scss" scoped>
.top-menu-container {
  width: 100%;
  padding-left: 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#0087fe),
    to(#005de4)
  );
  background: linear-gradient(90deg, #0087fe, #005de4);
  img {
    margin-top: 15px;
  }
  .text-left {
    text-align: left;
  }
  .top-menu-content {
    display: flex;
    .home-img {
      display: block;
      margin-top: 20px;
      margin-right: 10px;
      width: 20px;
      height: 20px;
      background: url("~@/assets/img/desktop_home.png") no-repeat;
    }
    .to-first {
      position: relative;
      cursor: pointer;
      font-size: 14px;
      float: left;
      margin: 25px 10px 0 0;
      height: 14px;
      line-height: 14px;
      padding-right: 10px;
      border-right: 1px solid #fff;
      color: #fff;
    }
  }
  .handle-btn {
    color: #fff;
    background: #4150cb !important;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
    margin-right: 20px;
    border-radius: 15px;
    text-align: left;
    padding-left: 10px;
    margin-left: 10px;
    width: 148px;
  }
  /deep/ .select-box {
    input {
      color: #fff;
      background: #4150cb !important;
      height: 30px;
      line-height: 30px;
      margin-top: 15px;
      margin-right: 20px;
      border-radius: 15px;
      text-align: left;
      padding-left: 10px;
      margin-left: 10px;
      width: 148px;
      border-color: transparent;
    }
    span.el-input__suffix {
      right: 26px;
      top: 6px;
    }
  }
}
</style>
