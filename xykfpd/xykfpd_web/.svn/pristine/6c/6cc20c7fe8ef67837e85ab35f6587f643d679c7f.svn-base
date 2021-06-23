import LhSearchBar from "./LhSearchBar/index";
import LhTable from "./LhTable/index";
import LhTreeSelectTable from "./LhTreeSelectTable/index";
import LhDialog from "./LhDialog/index";
import LhWindow from "./LhWindow/index";
import LhImagePreview from "./LhImagePreview/index";
import LhSelectTree from "./LhSelectTree/index";
import LhAttachmentWindow from "./LhAttachmentWindow/index";
import LhReviewSubmitWindow from "./LhReviewSubmitWindow/index";
import LhReviewWindow from "./LhReviewWindow/index";
import LhReviewRecordWindow from "./LhReviewRecordWindow/index";

//方便以后发布npm包
// 把所有的组件存储起来
const components = [
  LhTable,
  LhSearchBar,
  LhTreeSelectTable,
  LhDialog,
  LhWindow,
  LhSelectTree,
  LhImagePreview,
  LhAttachmentWindow,
  LhReviewSubmitWindow,
  LhReviewWindow,
  LhReviewRecordWindow,
];
const install = (Vue) => {
  // 判断组件是否安装，如果已经安装则不安装，按需引用
  if (install.installed) return;
  install.installed = true;
  // 遍历所有组件
  components.map((component) => Vue.use(component));
};
// 检测到vue才去执行
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  // 所有组件必须有一个install的方法，才能去使用Vue.use();
  install,
  ...components,
};
