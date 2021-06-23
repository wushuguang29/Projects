const QWebChannel = require("@/components/LhAttachmentWindowScannerLT2.3/src/qwebchannel.js");
export const card = {
  cardDiscern: function () {
    this.init();
  },
  init: function () {
    var baseUrl = (this.baseUrl = "ws://127.0.0.1:12345");
    this.imgPathArray = [];
    console.log("Connecting at " + baseUrl + ".");
    this.openSocket();
  },
  openSocket: function () {
    var _this = this;
    var socket = (_this.socket = new WebSocket(_this.baseUrl));
    socket.onclose = function () {
      console.error("web channel closed");
    };
    socket.onerror = function (error) {
      console.error("web channel error: " + error);
    };
    socket.onopen = function () {
      console.log("WebSocket start connect");
      var QWebChannelnew = QWebChannel.QWebChannel;
      new QWebChannelnew(socket, function (channel) {
        window.dialog = channel.objects.dialog;
        console.log("dialog:" + dialog);
        console.log(dialog);
        dialog.get_actionType("closeSignal");

        //单次二代证阅读
        dialog.get_actionType("singleReadIDCard");

        console.log("ready to send/receive messages!");
        //服务器返回消息
        dialog.sendPrintInfo.connect(function (message) {
          //读取二代证头像返回信息
          if (message.indexOf("IDcardInfo:") >= 0) {
            let value = message.substr(11),
              arr = value.trim().split(/\s+/);
            //console.log(value)
            console.log(arr);
            document.getElementById("userName").value = "";
            document.getElementById("sex").value = "";
            document.getElementById("nation").value = "";
            document.getElementById("birth").value = "";
            document.getElementById("card").value = "";
            document.getElementById("address").value = "";
            document.getElementById("issuing").value = "";
            document.getElementById("beginTime").value = "";
            document.getElementById("endTime").value = "";

            document.getElementById("userName").value = arr[0];
            document.getElementById("sex").value = arr[1];
            document.getElementById("nation").value = arr[2];
            document.getElementById("birth").value =
              arr[3] + "-" + arr[4] + "-" + arr[5];
            document.getElementById("card").value = arr[7];
            document.getElementById("address").value = arr[6];
            document.getElementById("issuing").value = arr[8];
            document.getElementById("beginTime").value =
              arr[9] + "-" + arr[10] + "-" + arr[11];
            document.getElementById("endTime").value =
              arr[12] + "-" + arr[13] + "-" + arr[14];
          }
        }),
          // //网页加载完成信号
          dialog.html_loaded("one");
      });
    };
  },
};
