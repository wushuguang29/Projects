<template>
  <el-container class="login-container">
    <el-container class="login-content">
      <el-aside width="450px" class="login-left">
        <div class="login-system-title"></div>
        <div class="login-left-img"></div>
      </el-aside>
      <el-main class="login-form-container">
        <el-row :gutter="20" class="form-type" v-show="loginShow">
          <el-col
            :span="loginlength"
            v-for="(item, index) in loginType"
            :key="index"
          >
            <div
              :class="[
                'bgimg-' + item.name,
                { active: item.name === activeName ? true : false },
              ]"
              @click="changeLoginType(item.name)"
            >
              <i></i><span>{{ item.title }}</span>
            </div>
          </el-col>
        </el-row>
        <component :is="activeName" @login="login" />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import loginAccount from "./components/LoginAccount";
import loginMobile from "./components/LoginMobile";
import loginWeChat from "./components/LoginWeChat";
import loginFingerprint from "./components/LoginFingerprint";
import { mapActions } from "vuex";

export default {
  name: "login",
  components: {
    loginAccount,
    loginMobile,
    loginWeChat,
    loginFingerprint,
  },
  data() {
    return {
      loginType: null, //登录类型的数组
      activeName: "loginAccount", //当前类型组件的名称
      loginShow: false, //当类型数组有值时才显示类型的切换
    };
  },
  computed: {
    //控制类型数组占位格数
    loginlength: function () {
      return this.loginType && this.loginType.length
        ? 24 / this.loginType.length
        : 0;
    },
  },
  methods: {
    ...mapActions(["getMenu"]),
    //点击切换类型组件
    changeLoginType: function (name) {
      this.activeName = name;
    },
    //获取基础配置数据，写入user的store
    baseConfig: function () {
      //异步调用user里的baseConfig的方法
      this.$store.dispatch("getBaseConfig").then((res) => {
        this.loginType = res.LOGIN_TYPE;
        this.loginShow = this.loginlength > 1 ? true : false;
      });
    },
    //登录点击事件
    login: function (params, callback) {
      //异步调用user里的login，写入token/userInfo/
      this.$store
        .dispatch("login", params)
        .then((res) => {
          //push根路由
          this.getMenu()
            .then((res) => {
              this.$router.push({
                path: "/desktop",
              });
            })
            .catch((err) => {
              this.$alert("该账号没有设置权限，请切换账号重新登录！", "提示", {
                confirmButtonText: "确定",
                callback: (action) => {
                  location.reload();
                },
              });
            });
        })
        .catch(() => {
          //用于验证码图片刷新的回调
          callback();
        });
    },
  },
  created() {
    //获取基本配置，控制登录类型及样式
    this.baseConfig();
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/element-variables.scss";

.login-container {
  overflow: hidden;
  background: url("~@/assets/img/new_login_bg.jpg") no-repeat;
  background-size: 100% 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  .login-content {
    width: 1000px;
    height: 560px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .login-left {
      background: url("~@/assets/img/login_left_bg.png") no-repeat;
      background-size: 100% 100%;

      .login-system-title {
        background: url("~@/assets/img/login_left_title.png") center no-repeat;
        padding: 100px 0px;
      }

      .login-left-img {
        height: 300px;
        background: url("~@/assets/img/login_left_img.png") center no-repeat;
        padding: 20px 0px;
      }
    }

    .login-form-container {
      background: rgba(255, 255, 255, 1);

      a:visited,
      a:hover {
        text-decoration: none;
        color: inherit;
      }

      .form-type i {
        display: inline-block;
        height: 30px;
        width: 30px;
        vertical-align: bottom;
      }

      span {
        display: inline-block;
        height: 30px;
      }

      .active {
        color: $--color-primary;
        border-bottom: 2px solid $--color-primary;
      }

      .bgimg-loginAccount i {
        background: url("~@/assets/img/login_type.png") 0 0px no-repeat;
      }

      .bgimg-loginAccount.active i {
        background: url("~@/assets/img/login_type_active.png") 0px 0px no-repeat;
      }

      .bgimg-loginMobile i {
        background: url("~@/assets/img/login_type.png") -126px 0px no-repeat;
      }

      .bgimg-loginMobile.active i {
        background: url("~@/assets/img/login_type_active.png") -126px 0px no-repeat;
      }

      .bgimg-loginWeChat i {
        background: url("~@/assets/img/login_type.png") -260px 0px no-repeat;
      }

      .bgimg-loginWeChat.active i {
        background: url("~@/assets/img/login_type_active.png") -260px 0px no-repeat;
      }

      .bgimg-loginFingerprint i {
        background: url("~@/assets/img/login_type.png") -387px 0px no-repeat;
      }

      .bgimg-loginFingerprint.active i {
        background: url("~@/assets/img/login_type_active.png") -387px 0px no-repeat;
      }

      .login-button {
        width: 100%;
        margin-top: 30px;

        .el-button {
          width: 100%;
          padding: 13px 15px;
          font-size: 14px;
        }
      }

      .el-row {
        border-bottom: 1px solid #eee;

        .el-col > div {
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }
}
</style>