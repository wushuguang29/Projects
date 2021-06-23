const QWebChannel = require('./qwebchannel.js');
export const attachment = {
    baseUrl: '',
    idx: 1,
    //储存图片路径的变量和数组
    imgPath: '',
    imgPathArray: [],
    socket: '',
    //全局当前路径
    now: null,
    path: null,
    onCameraButtonClick: function () {
        var bigBox = document.getElementById('bigBox');
        bigBox.style.height = "400px";
        bigBox.innerHTML = `<style>
                    .button-box{margin-top: -10px;}                      
                    .big-img{position: relative}
                    /*.big-img img{height: 100%}*/
                    .big-img .x-fa{font-size: 30px;cursor: pointer;color: #269ec1}
                    .rotate-box{position:absolute;bottom:10px;z-index: 1000;width:200px;left:180px;background: rgba(255,255,255,.4);height:40px;line-height:40px;border-radius: 20px;text-align: center;}
                #rotateLeft{margin-right: 20px;}
                #clear{background:#ea491f}
                .close-btn{    width: 20px;height: 20px;border-radius: 50%;display: inline-block;background: #666; text-align: center;color: #fff;line-height: 19px;position: absolute;top: -10px;right:10px;}
                    label input{display:none;}
                    label span{display:inline-block;width:16px;height:16px;border-radius:2px;background-color:silver;text-indent:.15em;line-height:.65; }
                    label .checked{background-color: #7ed0a2;}
                    label img{margin-left:6px;}
                </style>
                <div class="container-box" style="display:flex;border: 1px solid #eee;height:365px">
                    <div class="big-img">
                        <img id="bigPriDev" width="480" height="360"  /></img>
                        <div class="rotate-box">
                            <span class="x-fa fa-rotate-left" id="rotateLeft" data-qtip="左转"></span>
                            <span class="x-fa fa-rotate-right" id="rotateRight" data-qtip="右转"></span>
                        </div>
                    </div> 
                    <div id="container" style="margin-left:10px;height:350px;overflow: auto"> 
                
                    </div>  
                </div>
                
                <img id="devPhoto" width="360" height="0"  /></img>
                <div class="button-box">
                <div>
                设备列表：
                    <select id="devList" style="width: 110px;height:28px" ></select> 
                    <select id="modelList" style="width: 110px;height:28px" ></select>
                    <select id="resolutionList" style="width: 110px;height:28px" ></select> 
                设置尺寸：<select id="setScanSize" style="width:88px;height:28px" ></select> 
                
                </div>        
                </div>`;

        /**
         * 初始化
         */
        this.init();

    },

    /**
     * 加载完HTML后初始化服务器
     */
    init: function () {
        var baseUrl = this.baseUrl = "ws://127.0.0.1:12345";
        this.imgPathArray = [];
        console.log("Connecting at " + baseUrl + ".");
        this.openSocket();
        var scanSize = document.getElementById('setScanSize');
        scanSize.add(new Option("原始尺寸"));
        scanSize.add(new Option("A5"));
        scanSize.add(new Option("卡片"));
        scanSize.selectIndex = 0;
    },
    openSocket: function () {
        var _this = this;
        var socket = _this.socket = new WebSocket(_this.baseUrl);
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
                //设备列表点击
                document.getElementById("devList").onchange = function () {
                    //清除展示信息
                    var resolutionList = document.getElementById("resolutionList");
                    resolutionList.options.length = 0;
                    var modelList = document.getElementById("modelList");
                    modelList.options.length = 0;
                    var select = document.getElementById("devList");
                    dialog.devChanged("primaryDev_:" + select.value);
                };
                //模式列表点击
                document.getElementById("modelList").onchange = function () {
                    //清除展示信息
                    var resolutionList = document.getElementById("resolutionList");
                    resolutionList.options.length = 0;
                    var select = document.getElementById("modelList");
                    dialog.devChanged("primaryDev_:" + select.value);
                };

                //分辨率列表点击
                document.getElementById("resolutionList").onchange = function () {
                    //清除展示信息
                    var select = document.getElementById("resolutionList");
                    dialog.devChanged("primaryDev_:" + select.value);
                };
                //设置尺寸列表点击，只有主头有设置尺寸
                document.getElementById("setScanSize").onchange = function () {
                    var select = document.getElementById("setScanSize");
                    if (select.value == "原始尺寸") {
                        dialog.get_actionType("setScanSize_ori");
                    }
                    if (select.value == "A5") {
                        dialog.get_actionType("setScanSize_A5");
                    }
                    if (select.value == "卡片") {
                        dialog.get_actionType("setScanSize_card");
                        console.log(dialog.get_actionType("setScanSize_card"));
                    }
                };

                // 左转
                document.getElementById("rotateLeft").onclick = function () {
                    dialog.get_actionType("rotateLeft");
                };
                //右转
                document.getElementById("rotateRight").onclick = function () {
                    dialog.get_actionType("rotateRight");
                };
                //服务器返回消息
                dialog.sendPrintInfo.connect(function (message) {
                    console.log(message);

                    //设备信息 priModel
                    if (message.indexOf("priDevName:") >= 0) {
                        message = message.substr(11);
                        var select = document.getElementById("devList");
                        if (message.indexOf("USB") >= 0) {
                            select.add(new Option(message));
                        } else {
                            select.add(new Option(message), 0);
                        }
                        select.selectedIndex = 0;
                    }
                    //设备出图格式
                    if (message.indexOf("priModel:") >= 0) {
                        message = message.substr(9);
                        var select = document.getElementById("modelList");
                        if (message.indexOf("MJPG") >= 0) {
                            select.add(new Option(message), 0);
                        } else {
                            select.add(new Option(message));
                        }
                        select.selectedIndex = 0;
                    }
                    //设备分辨率
                    if (message.indexOf("priResolution:") >= 0) {
                        message = message.substr(14);
                        var select = document.getElementById("resolutionList");
                        select.add(new Option(message));
                        if (select.options.length > 2) {
                            select.selectedIndex = 2;
                        }
                    } else if (message.indexOf("savePhoto_success:") >= 0) {
                        //图片保存后返回路径关键字savePhoto_success:
                        // me.imgPath = message.substr(18);
                        //  addImgDiv();
                    }
                    if (message.indexOf("idFaceInfo:") >= 0) {
                        var value = message.substr(11);
                        console.log(value)
                    }
                });
                //接收图片流用来展示，多个，较小的base64数据
                dialog.send_priImgData.connect(function (message) {
                    var element = document.getElementById("bigPriDev");
                    if (!element) {
                        return false;
                    }
                    element.src = "data:image/jpg;base64," + message;
                });
                //接收拍照base64
                dialog.send_priPhotoData.connect(function (message) {
                    var element = document.getElementById("devPhoto");
                    element.src = "data:image/jpg;base64," + message;
                    _this.imgPath = element.src,
                        element['data-id'] = _this.idx++;
                    _this.addImgDiv();
                });
                console.log("ready to send/receive messages!");
                // //网页加载完成信号
                dialog.html_loaded("one");
                //图片保存路劲
                var date = new Date();
                _this.now = date.getFullYear() + '-' + Number((date.getMonth() + 1)) + '-' + date.getDate();
                _this.path = localStorage.getItem("savePath") ? localStorage.getItem("savePath") : 'D:/';
                console.log(localStorage)
                dialog.set_configValue("set_savePath:" + _this.path + "\\" + _this.now);
            });
        }
    },
    addImgDiv: function () {
        var container = document.getElementById('container');
        var newchild = document.createElement("div");
        newchild.setAttribute("style", "width:158px;margin-top:20px;position:relative;");
        newchild.setAttribute("data-id", this.idx);
        // var imgPath = "file:///" + me.imgPath ;
        var imgPath = this.imgPath;
        // newchild.setAttribute("id", imgPath);
        newchild.innerHTML = '<label>' +
            '<span></span>' +
            '<input type="checkbox" value="' + imgPath + '" onchange="checkboxClicked(this)" data-id="' + this.idx + '"/>' +
            '<img width="120" height="85" src="' + imgPath + '" /></img>' +
            '</label>' +
            '<span class="x-fa fa-close close-btn" data-path="' + imgPath + '" onclick="removeImg(this)" data-id="' + this.idx + '"></span>';
        container.appendChild(newchild);

        //处理缩略图CheckBox点击事件
        window.checkboxClicked = function (obj, flag1, flag2) {
            /*对象，点击事件源，全选还是取消全选*/
            var time = +new Date(),
                // date = Ext.Date.format(new Date(), 'Y-m-d'),
                date = parseInt(Math.random() * 100),
                name = date + ' ' + time + '.jpg',
                result = -1,
                objId = obj.getAttribute("data-id");
            if (flag1) {
                /*全选点击事件*/
                if (flag2) {
                    /*全选*/
                    if (!obj.getAttribute('checked')) {
                        obj.setAttribute('checked', true);
                        obj.previousSibling.className = 'checked';
                    }
                } else {
                    /*取消全选*/
                    obj.removeAttribute('checked');
                    obj.previousSibling.className = '';
                }
            } else {
                /*单个点击事件*/
                if (obj.getAttribute('checked')) {
                    obj.removeAttribute('checked');
                    obj.previousSibling.className = '';
                } else {
                    obj.setAttribute('checked', true);
                    obj.previousSibling.className = 'checked';
                }
            }
            (attachment.imgPathArray).some((item, index) => {
                if (item.id == objId && !obj.getAttribute('checked')) {
                    /*已选中数据，取消选中*/
                    result = index;
                }
                if (item.id == objId && obj.getAttribute('checked') && flag2) {
                    /*全选时，已经选择的，不做处理*/
                    result = -2;
                }

            });
            if (result === -1) {
                (attachment.imgPathArray).push({
                    path: obj.value,
                    name: name,
                    id: objId,
                    obj: obj.parentNode.nextSibling
                });
            } else if (result >= 0) {
                (attachment.imgPathArray).splice(result, 1);
            }
            console.log(attachment.imgPathArray);
            // console.log(me.lookupReference('gaopaiUpload'));
            //attachment.setUploadBtnDsiable();
        }
        //删除图片
        window.removeImg = function (obj) {
            var parent = document.getElementById('container'),
                child = obj.parentNode,
                result = -1;
            parent.removeChild(child);
            (attachment.imgPathArray).some((item, index) => {
                if (item.id == obj.getAttribute('data-id')) {
                    result = index;
                }
            });
            if (result >= 0) {
                (attachment.imgPathArray).splice(result, 1);
            }
            console.log(attachment.imgPathArray);
            //attachment.setUploadBtnDsiable();
        }

    },
    onCameraBtnHandler: function () {
        /*拍照*/
        dialog.photoBtnClicked("primaryDev_");
        dialog.get_actionType("savePhotoPriDev");
    },
    // setUploadBtnDsiable:function(){
    //     if (this.imgPathArray.length==0) {
    //         return '您还没有拍摄或选择照片'
    //     } 
    // }
    /*打开主视频,清除展示信息*/
    onOpenVideoHandler: function () {
        var resolutionList = document.getElementById("resolutionList");
        resolutionList.options.length = 0;
        var modelList = document.getElementById("modelList");
        modelList.options.length = 0;
        var select = document.getElementById("devList");
        dialog.devChanged("primaryDev_:" + select.value);
        // this.lookupReference('gaopaiyiSyntheticButton').setDisabled(false); //合成图像
        // this.lookupReference('gaopaiyiCameraButton').setDisabled(false);//拍照
    },
     /*关闭主视频*/
    onCloseVideoHandler: function () {
        var element = document.getElementById("bigPriDev");
        dialog.get_actionType("closePriVideo");
        element.setAttribute('src', '');
        // this.lookupReference('gaopaiyiSyntheticButton').setDisabled(true);
        // this.lookupReference('gaopaiyiCameraButton').setDisabled(true);
    },
    /*合成图像*/
    onSyntheticBtnHandler: function () {
        dialog.get_actionType("imageBlend");
    },
    /*全选反选*/
    onCameraCheckButtonHandler:function(){
           // fileForm = me.lookupReference('fileForm').getForm(),
           // imgPathArray = me.imgPathArray,
           var container = document.getElementById('container'),
            input = container.getElementsByTagName('input'),
            allChoose = document.getElementById('allChecked'),
            allChecked = allChoose.getAttribute('data-allChecked');   
            console.log(allChecked) 
        if(allChecked=="true"){ //通过setAttribute设置为字符串，不是boolen值
            allChoose.getElementsByTagName('span')[0].innerText = '反选';
            allChoose.setAttribute('data-allChecked',false);  
            input.forEach(function (each) {
                window.checkboxClicked(each, true, true)
            });             
        }else{
            allChoose.getElementsByTagName('span')[0].innerText = '全选';
            allChoose.setAttribute('data-allChecked',true);  
            input.forEach(function (each) {
                window.checkboxClicked(each, true, false)
            });                 
        }
    },
    /* 图片上传*/
    onCameraUploadButtonHandler: function (button, eOpts) {
        var me = this,
            image = [],
            fileForm = me.lookupReference('fileForm').getForm(),
            length = me.imgPathArray.length,
            progressBar = document.getElementById('progressBar'),
            num = x = 0;
        me.breakStatus = false;    
        loopArr();
        function loopArr(){            
            image.push({
                name:me.imgPathArray[x].name,
                base64: me.imgPathArray[x].path.split('data:image/jpg;base64,')[1]
            })
            upLoader(image,fileForm);
        }             
        
        function render(num, length) {
            var width;
            if(num < length){
                width = ((num/length)*100).toFixed(2);
            }else{
                width = 100;
            }
            progressBar.style.width = width + '%';
        }

        function upLoader(images,fileForm){     
            util.ajax({
                method: 'post',
                url: './index/UploadFile/uploadBase64',
                params: {
                    modelId: fileForm.findField('model_id').getValue(),
                    targetId: fileForm.findField('target_id').getValue(),
                    typeId: fileForm.findField('type_id').getValue(),
                    folderId: fileForm.findField('folder_id').getValue(),
                    images: Ext.encode(images)
                },
                callback: function (response) {
                    if(!me.breakStatus){                        
                        if (response.status) {
                            num++;
                            render(num,length);
                            window.removeImg(me.imgPathArray[x].obj);
                            image = [];
                            if(num === length){
                                me.lookupReference('fileItem').getStore().reload();
                                util.toast('图片上传完成！')
                                progressBar.style.width = '0%';
                            }else{
                                loopArr();
                            }
                        }else{
                            x++;
                            util.toast(response.msg);
                        }
                    }else{
                        me.idx = 1;
                        me.imgPathArray = [];
                        button.previousSibling().allChecked = true;
                        button.previousSibling().setText('全选');
                        button.previousSibling().setTooltip('全选'); 
                    }
                }
            });
        }
    },
    // 关闭服务
    onAttachmentWindowBeforeclose: function (component, eOpts) {
       if(this.socket.readyState==1 || this.socket.readyState==2){
            dialog.get_actionType('closeSignal');
            this.socket.close();
        }
    },
}