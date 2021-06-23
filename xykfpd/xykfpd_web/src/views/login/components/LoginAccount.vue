<template>
  <el-form :rules="rules" :model="params" ref="loginForm" class="wx-container">
    <h3 type="primary">用户登录</h3>
    <el-form-item prop="username">
      <el-input size="medium" placeholder="请输入用户名" v-model="params.username" type="text" prefix-icon="el-lhsoft-yonghu">
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        size="medium"
        placeholder="请输入密码"
        v-model="params.password"
        type="password"
        show-password
        prefix-icon="el-lhsoft-mima1"
      ></el-input>
    </el-form-item>
    <el-row v-show="loginAccountPicStauts">
      <el-col :span="18">
        <el-form-item class="loginInput" prop="captcha_code" :rules="[{required:loginAccountPicStauts,message:'请输入验证码'}]">
          <el-input
            size="medium"
            v-model="params.captcha_code"
            type="text"
            placeholder="请输入验证码"
            prefix-icon="el-lhsoft-yanzhengma2"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <img :src="verifySrc" style="height:36px;" @click="verifyClick()" />
      </el-col>
    </el-row>
    <div class="login-button">
      <el-button size="medium" class="loginSubmit" @click="onLoginClick('loginForm')" type="primary">登 录</el-button>
    </div>
  </el-form>
</template>
<script>
import {verifyPic} from '@/api/user.js'
export default {
  name: "loginAccount",
  data() {
		return {
      loginAccountPicStauts:true,
			params: {
        username: '',
        login_type:1,
				password: '',
        captcha_code: '',
        captcha_key:''
			},
			rules: {
				username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{required: true, message: '密码错误',trigger: 'blur' }],
			},
			verifySrc: ''
		};
  },
  methods:{
    getVerify:function(){
      //请求验证码
      this.params.captcha_code =''
      verifyPic().then(res=>{
        this.verifySrc = res.data.captcha_image_content
        this.params.captcha_key = res.data.captcha_key
      })
    },
    //验证码点击事件
    verifyClick:function(){
      this.getVerify();
    },
    //登录点击事件
    onLoginClick(formName) {
      //表单验证
			this.$refs[formName].validate(valid => {
				if (valid) {
          //登录事件，失败进入刷新验证码的回调
          this.$emit('login',this.params,()=>{
            this.getVerify();
          })
				} else {
          console.log('error submit!!');
					return false;
				}
			});
		}
  },
  created(){
    //根据配置决定是否显示验证码图片
    if(this.$store.state.user.config && this.$store.state.user.config.ACCOUNT_CAPTCHA){
      this.loginAccountPicStauts = this.$store.state.user.config.ACCOUNT_CAPTCHA == 1?false:true;
    }
    //请求验证码
    if(this.loginAccountPicStauts)this.getVerify();
    //回车事件监听
    const _this = this;
    document.onkeydown = function(e){
      let key = window.event.keyCode;
      if(key == 13){
        _this.onLoginClick('loginForm')
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form{
  .el-form-item{
    margin-bottom:30px;
  }
  .loginSubmit{
    width:100%;
  }
}
</style>