<template>
  <el-dialog
    class="attachmentDialog"
    :title="windowTitle"
    :before-close="handleClose"
    :width="windowWidth"
    :visible.sync="dialogVisible"
    @handleClose="handleClose"
    close-on-press-escape
    @updateList="updateList"
  >
    <div class="folderBox" v-if="isShow">
      <div
        class="folderItem"
        v-for="item in folderData"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        @dblclick="folderClick(item.id)"
      >
        <el-tooltip content="双击查看文件列表">
          <el-image class="folderImg" :src="src"></el-image>
        </el-tooltip>
        <el-tooltip :content="item.name">
          <h3 class="folderName">{{ item.name }}</h3>
        </el-tooltip>
        <p class="folderNumber">{{ item.number }}</p>
      </div>

      <div style="clear: both; width: 100%"></div>
      <el-button
        icon="el-icon-camera-solid"
        type="success"
        @click="CameraBtnClick"
        v-show="isCapter"
        >高拍仪
      </el-button>
    </div>
    <div id="CameraBox">
      <div id="bigBox"></div>
      <div>
        <p id="footerBtns" v-if="isBtnShow">
          <!-- <el-button type="success">路径配置</el-button> -->
          <el-button icon="el-icon-camera-solid" type="success" @click="Capture"
            >拍照</el-button
          >
          <el-dropdown class="openCloss" @command="operatorHandler">
            <el-button type="success">
              主视频<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="onOpenVideo">打开</el-dropdown-item>
              <el-dropdown-item command="onCloseVideo">关闭</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-tooltip
            content="点击按钮之后移动扫描区域的文件再次点击按钮完成合成(合成图像需要点击两次)"
          >
            <el-button
              icon="el-icon-pie-chart"
              type="success"
              @click="onSyntheticBtnHandler"
              >合成图形</el-button
            >
          </el-tooltip>
          <el-button
            icon="el-icon-success"
            type="success"
            @click="onCameraCheck"
            id="allChecked"
            data-allChecked="true"
            >全选
          </el-button>
          <el-button
            icon="el-icon-upload2"
            id="upLoad"
            type="success"
            @click="onCameraUpload"
            >上传</el-button
          >
          <el-button
            icon="el-icon-arrow-left"
            type="success"
            @click="handleClose"
            >返回</el-button
          >
        </p>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { attachment } from "./Attachment.js";
export default {
  name: "LhAttachmentWindowScannerLT2_3",
  props: {
    attachmentId: {
      type: Number,
      default: "",
    },
    dialogVisible: {
      type: Boolean,
      default: true,
    },
    windowWidth: {
      type: String,
      default: "700px",
    },
    windowTitle: {
      type: String,
      default: "附件",
    },
  },
  data() {
    return {
      isShow: true,
      isCapter: true,
      allChecked: true, //小图全选
      isBtnShow: false,
      src: require("@/assets/img/file.png"),
      imgItem: [{}],
      folderData: [
        {
          id: 1,
          name: "身份文件",
          number: 1,
        },
        {
          id: 2,
          name: "房屋文件身份文件",
          number: 2,
        },
        {
          id: 3,
          name: "调查文件",
          number: 3,
        },
        {
          id: 4,
          name: "身份文件",
          number: 8,
        },
        {
          id: 5,
          name: "房屋文件身份文件",
          number: 2,
        },
        {
          id: 6,
          name: "调查文件",
          number: 5,
        },
        {
          id: 7,
          name: "调查文件",
          number: 5,
        },
        {
          id: 8,
          name: "调查文件",
          number: 5,
        },
        {
          id: 9,
          name: "调查文件",
          number: 5,
        },
        {
          id: 10,
          name: "调查文件",
          number: 5,
        },
        {
          id: 11,
          name: "调查文件",
          number: 5,
        },
        {
          id: 12,
          name: "调查文件",
          number: 5,
        },
        {
          id: 13,
          name: "调查文件",
          number: 5,
        },
        {
          id: 14,
          name: "调查文件",
          number: 5,
        },
        {
          id: 15,
          name: "调查文件",
          number: 5,
        },
      ],
    };
  },
  mounted() {
    console.log(this.attachmentId);
  },
  created() {},
  methods: {
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
      attachment.onAttachmentWindowBeforeclose();
    },
    updateList() {
      this.$emit("updateList");
    },
    //文件夹双击事件
    folderClick(id) {
      console.log(id);
    },
    //点击高拍仪
    CameraBtnClick() {
      this.isShow = false; //隐藏附件文件夹
      this.isCapter = false; //隐藏高拍仪按钮
      this.isBtnShow = true;
      attachment.onCameraButtonClick();
    },
    //拍照
    Capture() {
      attachment.onCameraBtnHandler();
    },
    //打开、关闭主摄像头
    operatorHandler(command) {
      if (command == "onOpenVideo") {
        this.onOpenVideoHandler();
      } else if (command == "onCloseVideo") {
        this.onCloseVideoHandler();
      }
    },
    onOpenVideoHandler() {
      attachment.onOpenVideoHandler();
    },

    onCloseVideoHandler() {
      attachment.onCloseVideoHandler();
    },
    //合成图片
    onSyntheticBtnHandler() {
      attachment.onSyntheticBtnHandler();
    },
    //全选
    onCameraCheck() {
      attachment.onCameraCheckButtonHandler();
    },
    //上传
    onCameraUpload() {
      // attachment.onCameraUploadButtonHandler()
    },
  },
};
</script>

<style scoped lang='scss'>
.folderBox {
  display: flex;
  flex-wrap: wrap;
  height: 500px;
  max-height: 500px;
  overflow: hidden;
  overflow-y: auto;

  .folderItem {
    max-height: 130px;
    margin: 10px 12px;
    position: relative;
    max-width: 100px;

    .folderImg {
      max-width: 80px;
    }

    .folderName {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
      white-space: nowrap;
      max-width: 85px;
      text-align: center;
    }

    .folderNumber {
      min-width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #3cc;
      color: #fff;
      line-height: 20px;
      position: absolute;
      right: 0;
      top: -10px;
    }

    .el-dialog__body {
      overflow: hidden;
    }
  }
}

#devicList {
  width: 150px;
  height: 30px;
  border-radius: 10px;
  outline: none;
}

#saveText {
  width: 150px;
  height: 28px;
  border: none;
  border: 1px solid rgb(169, 169, 169);
  border-radius: 10px;
  outline: none;
}

#CameraBox {
  #video1 {
    width: 100%;
    margin-bottom: 20px;
  }

  #parentUl {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
  }
}

#footerBtns {
  width: 100%;

  .openCloss {
    margin: 0 10px 0 10px;
  }
}
</style>