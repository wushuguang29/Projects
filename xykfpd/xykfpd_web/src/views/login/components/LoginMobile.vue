<template>
  <el-form :rules="rules" :model="params" ref="loginForm" class="wx-container">
    <h3 type="primary">手机登录</h3>
    <el-form-item prop="mobile">
      <el-input
        placeholder="请输入手机号码"
        size="medium"
        v-model="params.mobile"
        type="text"
        prefix-icon="el-lhsoft-shouji"
      ></el-input>
    </el-form-item>
    <el-row v-show="loginPhonePicStates">
      <el-col :span="17">
        <el-form-item class="loginInput" prop="captcha_code" :required="loginPhonePicStates">
          <el-input
            v-model="params.captcha_code"
            size="medium"
            type="text"
            placeholder="请输入图片验证码"
            prefix-icon="el-lhsoft-yanzhengma2"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <img :src="verifySrc" style="height:36px;" @click="verifyClick()" />
      </el-col>
    </el-row>
    <el-form-item prop="phoneCode">
      <el-col :span="17">
        <el-input
          size="medium"
          placeholder="请输入短信验证码"
          v-model="params.phoneCode"
          type="password"
          show-password
          prefix-icon="el-lhsoft-mima1"
        ></el-input>
      </el-col>
      <el-col :span="6">
        <el-button size="medium" type="primary" @click="sendMobileVerify('loginForm')">发送验证码</el-button>
      </el-col>
    </el-form-item>

    <div class="login-button">
      <el-button
        class="loginSubmit"
        size="medium"
        @click="onLoginClick('loginForm')"
        type="primary"
      >登 录</el-button>
    </div>
  </el-form>
</template>

<script>
import { loginPhonePic, verifyPic, getMessageCode } from "@/api/user.js";
export default {
  name: "loginMobile",
  data() {
    return {
      loginPhonePicStates: false,
      params: {
        phone: "",
        phoneCode: "",
        captcha_code: "",
        captcha_key: ""
      },
      rules: {
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        phoneCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" }
        ],
        captcha_code: [{ message: "请输入图片验证码", trigger: "blur" }]
      },
      verifySrc: ""
    };
  },
  methods: {
    getVerify: function() {
      //请求验证码
      this.params.captcha_code ='';
      verifyPic().then(res => {
        this.verifySrc = res.data.captcha_image_content;
        this.params.captcha_key = res.data.captcha_key;
      });
    },
    //验证码点击事件
    verifyClick: function() {
      this.getVerify();
    },
    //短信发送事件
    sendMobileVerify: function(formName) {
      if (this.params && this.params.phone && this.params.captcha_code) {
        getMessageCode(this.params).then(res => {
          console.log("短信登录res：", res);
        });
      }
    },
    //登录点击事件
    onLoginClick(formName) {
      //验证表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          //登录事件，失败进入刷新验证码的回调
          this.$emit("login", this.params,()=>{
            this.getVerify();
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
     //根据配置决定是否显示验证码图片
    if (
      this.$store.state.user.config &&
      this.$store.state.user.config.PHONE_CAPTCHA
    ) {
      this.loginPhonePicStates =
        this.$store.state.user.config.PHONE_CAPTCHA == 1 ? false : true;
    }
    //请求验证码
    if(this.loginPhonePicStates) this.getVerify();
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  .el-form-item {
    margin-bottom: 30px;
  }
  .loginSubmit {
    width: 100%;
  }
}
</style>