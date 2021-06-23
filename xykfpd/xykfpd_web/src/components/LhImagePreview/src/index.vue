<template>
  <viewer
    :images="images"
    :options="options"
    class="viewer"
    ref="imagePreviewRef"
    @inited="inited"
    rebuild
    v-if="images && images.length"
    @loading-image="loadingImage"
    :use-bus-event="useBusEvent"
  >
    <img
      v-for="{ path, attachment_file_id } in images"
      :src="path"
      :data-source="path"
      :key="attachment_file_id"
      class="image"
    />
  </viewer>
</template>

<script>
import { getPreviewImageList } from "@/api/attachment.js";
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
Vue.use(Viewer, {
  defaultOptions: {
    fullscreen: true,
    loop: false,
    toolbar: {
      play: 0,
      reset: 0,
      zoomIn: 1,
      zoomOut: 1,
      oneToOne: 1,
      prev: 1,
      next: 1,
      rotateLeft: 1,
      rotateRight: 1,
      flipHorizontal: 1,
      flipVertical: 1,
    },
  },
});
export default {
  name: "LhImagePreview",
  data() {
    return {
      options: {
        url: "data-source",
      },
      index: 0,
      currentFolderId: 0,
      folder: [],
      value: 0,
      images: [],
      prev: false,
    };
  },
  props: {
    boundFolderName: {
      type: String,
      default: "folder_id",
    },
    useBusEvent: {
      type: Boolean,
    },
  },
  watch: {
    "$store.state.previewImage.loadData"(newValue, oldValue) {
      if (!newValue) return;
      let currentImages = this.filterCurrrentImage();
      this.images = currentImages;
      const start = this.$store.state.previewImage.previewFileListParams.start;
      if (this.prev) {
        this.index = currentImages.length - 1;
      } else {
        this.index = start ? start : 0;
      }
    },
  },
  methods: {
    ...mapGetters([
      "getPreviewImageList",
      "getPreviewFolderList",
      "getPreviewFileListParams",
      "getPreviewCacheFolderId",
    ]),
    ...mapMutations(["setLoadData"]),
    inited(viewer) {
      const _this = this;
      viewer.__proto__.next = function next() {
        var loop =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : false;
        var maxIndex = this.length - 1;
        var index = this.index + 1;
        if (index == this.length) {
          _this.prev = false;
          if (this.length % 25 == 0) {
            _this.gotoNextFolder(this.length);
          } else {
            _this.gotoNextFolder();
          }
        } else {
          if (index > maxIndex) {
            index = loop ? 0 : maxIndex;
          }
          this.view(index);
          return this;
        }
      };
      viewer.__proto__.prev = function prev() {
        var loop =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : false;
        var index = this.index - 1;

        if (index < 0) {
          index = loop ? this.length - 1 : 0;
          if (index === 0) {
            _this.prev = true;
            _this.gotoPrevFolder();
          }
        }

        this.view(index);
        return this;
      };
      this.$viewer = viewer;
      this.$viewer.view(this.index);
      const id = this.$viewer.id;
      const obj = document.getElementById("viewer" + id);
      if (!obj.getElementsByTagName("select").length) {
        this.createSelectElement(obj);
      }
    },
    createSelectElement(obj) {
      const _this = this;
      var values = [...this.folder];
      var div = document.createElement("div");
      div.style.textAlign = "center";
      div.style.position = "relative";
      div.style.width = "50%";
      div.style.marginTop = 10 + "px";
      div.style.marginLeft = "auto";
      div.style.marginRight = "auto";
      var select = document.createElement("select");
      select.style.width = 200 + "px";
      select.name = "folder";
      select.id = "select-folder";
      div.appendChild(select);
      values.forEach((each) => {
        var option = document.createElement("option");
        option.selected =
          this.currentFolderId == each.folder_id ? "selected" : false;
        option.value = each.folder_id;
        option.text = each.folder_name;
        option.id = "option" + each.folder_id;
        select.appendChild(option);
      });
      obj.appendChild(div);
      select.addEventListener("change", function (e) {
        const target = e.target;
        const value = Number(target.value);
        _this.currentFolderId = value;
        _this.prev = false;
        _this.refreshViewData(value, 0);
      });
    },
    getFolderId(flag) {
      let index = this.folder.findIndex(
        (each) => each.folder_id == this.currentFolderId
      );
      const folderLength = this.folder.length;
      if (flag == "next") {
        // console.log("nextIndex", nextIndex);
        let nextIndex = index + 1 === folderLength ? 0 : index + 1;
        return {
          nextIndex: nextIndex,
          nextFolderId: this.folder[nextIndex]["folder_id"],
        };
      } else if (flag == "prev") {
        let prevIndex = index - 1 < 0 ? this.folder.length - 1 : index - 1;
        // console.log("prevIndex", prevIndex);
        return {
          prevIndex: prevIndex,
          prevFolderId: this.folder[prevIndex]["folder_id"],
        };
      }
    },
    gotoPrevFolder() {
      let { prevIndex, prevFolderId } = this.getFolderId("prev");
      this.currentFolderId = prevFolderId;
      this.refreshViewData(prevFolderId, 0);
    },
    gotoNextFolder(val) {
      /* 
      1.切换文件夹id；
      2.请求push数据； 
      */
      if (val) {
        this.refreshViewData(this.currentFolderId, val);
      } else {
        let { nextIndex, nextFolderId } = this.getFolderId("next");
        this.currentFolderId = nextFolderId;
        this.refreshViewData(nextFolderId, 0);
      }
    },
    refreshViewData(id, start) {
      const arr = [...this.getPreviewCacheFolderId()];
      if (!arr.includes(id) || start) {
        this.setLoadData(false);
        this.loadingImage({ id: id, start: start });
      } else {
        let currentImages = this.filterCurrrentImage();
        this.images = currentImages;
        if (this.prev) {
          this.index = currentImages.length - 1;
        } else {
          this.index = 0;
        }
      }
    },
    loadingImage(val) {
      this.$emit("loading-image", val);
    },
    view(index) {
      this.index = index;
      this.$viewer.view(this.index);
    },
    filterCurrrentImage() {
      let currentImages = [];
      const arr = [...this.getPreviewImageList()];
      arr.forEach((each) => {
        if (each[this.boundFolderName] == this.currentFolderId)
          currentImages.push(each);
      });
      return currentImages;
    },
    show(folder_id, file_id) {
      this.currentFolderId = folder_id;
      this.folder = [...this.getPreviewFolderList()];
      let currentImages = this.filterCurrrentImage();
      const index = currentImages.findIndex(
        (each) => each.attachment_file_id == file_id
      );
      if (this.images === currentImages) {
        this.view(index);
        return;
      }
      this.images = currentImages;
      this.index = index;
    },
  },
};
</script>
<style lang="scss" scoped>
.image {
  display: none;
}
</style>
<style>
.viewer-loading > img {
  display: none; /* hide big images when it is loading */
}
</style>