<!--
 * @Author: your name
 * @Date: 2020-12-23 16:34:50
 * @LastEditTime: 2021-01-27 16:34:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_web\src\views\system\chat\ChatWindow.vue
-->
<template>
  <el-button type="primary" @click="send">确 定</el-button>
</template>
<script>
import { boundClient ,sendMessage ,getUserMessage,markRead} from "@/api/chat.js";
let ws,uid,userInfo;
export default {
  name: "chat",
  created() {
    // userInfo = JSON.parse(window.sessionStorage.getItem("VuexPersisted")).user.userInfo;
    userInfo = {
      'user_id':3,
      'user_name':'弑魂'
    };
    try {
      ws = new WebSocket("ws://127.0.0.1:8282");
    //   ws.onopen = this.handleSend;
      //接收消息时
      ws.onmessage = this.handleMessage;
      console.log("11111",ws.onmessage);
      //进入聊天窗口，标记所有消息已读
      var readParam = {
        'app_user_id':userInfo.user_id,
        'type':1
      };
      markRead(readParam).then((res) => {
        console.log(userInfo.user_name+'的消息都已读');
      });
      console.log(ws);
    } catch (error) {
      console.log("异常");
      console.log(error);
    }
  },
  methods: {
    send: function () {
        this.handleSend();
    },
    handleMessage: function (msg) {
        console.log(msg);
        let data, type, client_id, params;
        data = eval("(" + msg.data + ")");
        type = data.type || "";
        client_id = data.client_id;
        //当前用户ID　现在默认随机
        uid = userInfo.user_id;
        console.log("当前登录人ID" + userInfo.user_id);
        console.log("当前登陆人名称" + userInfo.user_name);
        params = {
          unique_uid: uid,
          client_id: client_id,
        };
        switch (type) {
          case "init":
            boundClient(params).then((res) => {
                console.log('用户客户端绑定成功');
            });
            break;
          case "message":
            收到消息

          default:
            console.log(data);
            console.log('接收消息时打印');
            this.setMessage(userInfo.user_id)
            break;
        }
    },
    //发送消息
    handleSend: function (res) {
        let params = {
            'sender':userInfo.user_id,
            'sender_name':userInfo.user_name,
            'receiver':999999,
            'receiver_name':'湘雅康复评定中心',
            'message':userInfo.user_name+'发送消息aaa'
        }

        sendMessage(params).then((res)=>{
          //发送消息时 ， 从后台把数据拿出来放入上面展示
          console.log(uid+'发送消息给管理员');
          this.setMessage(userInfo.user_id);
            
        })

    },
    //设置消息框
    setMessage: function(app_user_id) {
      let setMessageParams = {
        'app_user_id': app_user_id
      };
      getUserMessage(setMessageParams).then((res) => {
        //将消息放入上面区域展示
        console.log('发送消息时打印');
        console.log(res);
      });
    },
  },
};
</script>