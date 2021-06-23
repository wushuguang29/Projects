<template>
  <div class="wx-container">
    <h3 type="primary">微信登录</h3>
    <p class="scan">扫一扫</p>
    <div>
      <wxlogin :appid="appid" :scope="scope" :redirect_uri="redirect_uri"></wxlogin>
    </div>
  </div>
</template>
<script>
import wxlogin from 'vue-wxlogin'
export default {
  name: "loginWeChat",
  components:{wxlogin},
  data(){
    return {
      appid:null,
      scope:null,
      redirect_uri:null,
    }
  },
  methods:{
    getWechatInfo:function(){},
    weChatLogin:function(){},
  }
};
</script>

<style lang="scss" scoped>
</style>