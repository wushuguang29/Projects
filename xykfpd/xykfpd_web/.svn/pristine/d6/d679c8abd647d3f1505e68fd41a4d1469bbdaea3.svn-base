<template>
  <div class="lh-table-container">
    <el-table
      style="width: 100%"
      :show-summary="table.hasShowSummary"
      :summary-method="table.getSummaries"
      ref="LhTable"
      :data="gridData"
      @selection-change="handleSelection"
      height="calc(100%-50px)"
      max-height="calc(100%-50px)"
      @cell-click="cellClick"
      @cell-dbclick="cellDblclick"
      @row-click="rowClick"
      :span-method="objectSpanMethod"
      :row-key="table.rowKey ? table.rowKey : 'id'"
      highlight-current-row
      default-expand-all
      align="center"
      :cell-class-name="getCellIndex"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border
      v-loading="loading"
    >
      <el-table-column
        v-if="table.hasSelect"
        type="selection"
        width="55"
        key="select"
      ></el-table-column>
      <el-table-column
        label="序号"
        width="50"
        align="center"
        fixed="left"
        v-if="table.hasRowsNumber"
        key="rowNumber"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + (currentPage - 1) * pageSize + 1 }}</span>
        </template>
      </el-table-column>
      <template v-for="(item, index) in table.columns">
        <column-item
          :columnData="item"
          :key="index"
          :index="index"
        ></column-item>
      </template>
      <template v-if="hasOperation">
        <!-- 固定显示右边 -->
        <el-table-column
          column-key="operation"
          :label="table.operation.text ? table.operation.text : '操作'"
          :width="operationWidth ? operationWidth : ''"
          :min-width="table.operation.minWidth ? table.operation.minWidth : ''"
          :class-name="table.operation.className"
          align="center"
          :fixed="operationFixed"
          key="operation"
        >
          <template slot="header" slot-scope="scope">
            <span>操作</span>
            <i
              :class="isBtnOpen ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
              @click.stop="openFun()"
              :title="isBtnOpen ? '收起' : '展开'"
              style="cursor: pointer"
            ></i>
          </template>
          <template slot-scope="scope">
            <template v-if="!isBtnOpen">
              <el-dropdown @command="handleCommand">
                <el-button type="primary">
                  {{
                    table.operation.moreTitle
                      ? table.operation.moreTitle
                      : "更多"
                  }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in table.operation.data"
                    :class="item.classname ? item.classname : ''"
                    :key="index"
                    @click.stop="
                      handleOperation(scope.$index, scope.row, item.Fun)
                    "
                    :command="{
                      index: scope.$index,
                      row: scope.row,
                      fun: item.Fun,
                    }"
                    v-if="controlBtn(scope.row, item.controlBtnFun)"
                    v-allow="item.permission"
                    type="text"
                  >
                    {{ item.text }}
                  </el-dropdown-item>
                  <template v-if="hasAttachmentConfig">
                    <el-dropdown-item
                      :command="{
                        index: 'isAttachmentWindowIndex',
                        row: scope.row,
                      }"
                    >
                      附件
                    </el-dropdown-item>
                  </template>
                  <template
                    v-if="
                      hasReviewConfig &&
                      reviewSubmitButton &&
                      (scope.row.review_status == REVIEW_STATUS_SUBMIT ||
                        scope.row.review_status == REVIEW_STATUS_REJECT)
                    "
                  >
                    <el-dropdown-item
                      :command="{
                        index: 'isReviewSubmitWindowIndex',
                        row: scope.row,
                      }"
                    >
                      提交审核
                    </el-dropdown-item>
                  </template>
                  <template
                    v-if="
                      hasReviewConfig &&
                      reviewButton &&
                      scope.row.review_status == REVIEW_STATUS_PENDING
                    "
                  >
                    <el-dropdown-item
                      :command="{
                        index: 'isReviewWindowIndex',
                        row: scope.row,
                      }"
                    >
                      审核
                    </el-dropdown-item>
                  </template>
                  <template
                    v-if="
                      hasReviewConfig &&
                      scope.row.review_status > REVIEW_STATUS_SUBMIT
                    "
                  >
                    <el-dropdown-item
                      :command="{
                        index: 'isReviewRecordWindowIndex',
                        row: scope.row,
                      }"
                    >
                      审核记录
                    </el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <template v-else>
              <template v-for="(item, index) in table.operation.data">
                <el-button
                  :class="item.classname ? item.classname : ''"
                  :size="item.size ? item.size : 'mini'"
                  :type="item.type"
                  @click.stop="
                    handleOperation(scope.$index, scope.row, item.Fun)
                  "
                  :fun-name="item.Fun"
                  :key="index"
                  v-if="controlBtn(scope.row, item.controlBtnFun)"
                  v-allow="item.permission"
                  >{{ item.text }}</el-button
                >
              </template>
              <template v-if="hasAttachmentConfig">
                <el-button type="warning" @click="attachmentClick(scope.row)"
                  >附件</el-button
                >
              </template>
              <template
                v-if="
                  hasReviewConfig &&
                  reviewSubmitButton &&
                  (scope.row.review_status == REVIEW_STATUS_SUBMIT ||
                    scope.row.review_status == REVIEW_STATUS_REJECT)
                "
              >
                <el-button type="warning" @click="reviewSubmitClick(scope.row)"
                  >提交审核</el-button
                >
              </template>
              <template
                v-if="
                  hasReviewConfig &&
                  reviewButton &&
                  scope.row.review_status == REVIEW_STATUS_PENDING
                "
              >
                <el-button type="warning" @click="reviewClick(scope.row)"
                  >审核</el-button
                >
              </template>
              <template
                v-if="
                  hasReviewConfig &&
                  scope.row.review_status > REVIEW_STATUS_SUBMIT
                "
              >
                <el-button type="info" @click="reviewRecordClick(scope.row)"
                  >审核记录</el-button
                >
              </template>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      v-if="needPaging"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[25, 50, 100, 200, 500]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      ref="needPagingRef"
    ></el-pagination>
    <!-- 附件 -->
    <lh-attachment-window
      :rowData="attachmentRowData"
      v-if="attchmentDialogVisible"
      :attchmentDialogVisible.sync="attchmentDialogVisible"
    />
    <!-- 提交审核 -->
    <lh-review-submit-window
      :rowData="reviewSubmitRowData"
      v-if="reviewSubmitDialogVisible"
      :reviewSubmitDialogVisible.sync="reviewSubmitDialogVisible"
      @updateList="updateList"
    />
    <!-- 审核 -->
    <lh-review-window
      :rowData="reviewRowData"
      v-if="reviewDialogVisible"
      :reviewDialogVisible.sync="reviewDialogVisible"
      @updateList="updateList"
    />
    <!-- 审核记录 -->
    <lh-review-record-window
      :rowData="reviewRecordRowData"
      v-if="reviewRecordDialogVisible"
      :reviewRecordDialogVisible.sync="reviewRecordDialogVisible"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ColumnItem from "./ColumnItem.vue";
import { submitAudit } from "@/api/audit.js";
import { getConstantConfigValue } from "@/utils/common";
import { Form } from "element-ui";
export default {
  name: "LhTable",
  components: {
    ColumnItem,
  },
  props: {
    gridData: {
      type: Array,
      default() {
        return [];
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    // 表格数据
    table: {
      type: Object,
      default() {
        return {
          sortable: false, //表格排序
          tableHeight: "100%", //表格高度 String||Number
          hasMergeRowOrColumn: false, // 是否合并单元格
          // loading: false, // 加载中动画
          hasShowSummary: true, // 是否显示表位合计行
          border: false, // 是否带有纵向边框，默认为false
          hasSelect: false, // 有无选中功能
          hasOperation: false, // 有无操作功能
          hasExpand: false, // 有无展开行功能
          columns: [],
          data: [],
          operation: {
            width: 100,
            moreTitle: "更多", //收起时的按钮文本
            minWidth: 100,
            isBtnOpen: false, //操作栏默认展开还是收起
            className: "handler-column",
            data: [],
          },
        };
      },
    },
    //分页数据
    needPaging: {
      type: Boolean,
      default: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    reviewButton: {
      type: Boolean,
      default: false,
    },
    reviewSubmitButton: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      operationWidth: "100",
      isBtnOpen: false,
      currentPage: 1,
      pageSize: 25,
      searchParam: {},
      timer: null,
      //窗口带入回写的数据
      rowData: {},
      attachmentRowData: {},
      attchmentDialogVisible: false,
      reviewSubmitRowData: {},
      reviewSubmitDialogVisible: false,
      reviewRowData: {},
      reviewDialogVisible: false,
      reviewRecordRowData: {},
      reviewRecordDialogVisible: false,
      REVIEW_STATUS_SUBMIT: getConstantConfigValue(
        "FLOW",
        "AUDIT_RESULT_UN_REVIEW"
      ),
      REVIEW_STATUS_PENDING: getConstantConfigValue(
        "FLOW",
        "AUDIT_RESULT_IN_REVIEW"
      ),
      REVIEW_STATUS_REJECT: getConstantConfigValue(
        "FLOW",
        "AUDIT_RESULT_ALREADY_REJECT"
      ),
    };
  },
  created() {
    // search参数改变给searchParam赋值
    this.bus.$on("searchChange", (res) => {
      this.searchParam = res;
    });
  },
  computed: {
    ...mapGetters(["userInfo"]),
    operationFixed: function () {
      return this.table.operation.operationFixed ? false : "right";
    },
    hasOperation() {
      //return this.table.hasOperation ? this.table.hasOperation : true;
      return this.table.hasOperation;
    },
    hasAttachmentConfig: function () {
      return this.$route?.meta?.extra?.annex &&
        this.$route.meta.extra.annex === 1
        ? true
        : false;
    },
    hasReviewConfig: function () {
      return this.$route?.meta?.extra?.review &&
        this.$route.meta.extra.review === 1
        ? true
        : false;
    },
  },
  mounted() {
    var table = this.$refs.LhTable;
    this.timer = setInterval(() => {
      // table错位问题，暂时未找到其他更优化解决方式
      table.doLayout();
    }, 1000);
    /* 挂载时，隐藏 按钮组 */
    this.openFun(true);
    // console.log('common-table-mounted:',this.gridData)
  },

  methods: {
    handleCommand({ index, row, fun }) {
      if (index == "isReviewSubmitWindowIndex") {
        this.reviewSubmitClick(row);
        return;
      }
      if (index == "isReviewWindowIndex") {
        this.reviewClick(row);
        return;
      }
      if (index == "isReviewRecordWindowIndex") {
        this.reviewRecordClick(row);
        return;
      }
      if (index == "isAttachmentWindowIndex") {
        this.attachmentClick(row);
        return;
      }
      this.$emit(fun, {
        index,
        row,
      });
    },
    attachmentClick(row) {
      this.attachmentRowData = {
        resources_id: this.$route.meta.id,
        target_id: row.target_id,
      };
      this.attchmentDialogVisible = true;
    },
    reviewSubmitClick(row) {
      this.reviewSubmitRowData = {
        target_id: row.target_id,
        target_data: row.research_name,
      };
      this.reviewSubmitDialogVisible = true;
    },
    reviewClick(row) {
      this.reviewRowData = row;
      this.reviewDialogVisible = true;
    },
    reviewRecordClick(row) {
      this.reviewRecordRowData = {
        target_id: row.target_id,
      };
      this.reviewRecordDialogVisible = true;
    },
    openFun(initStatus) {
      /* 获取业务table的配置，没有默认false */
      const defaultIsBtnOpen = this.table.operation.isBtnOpen
        ? this.table.operation.isBtnOpen
        : false;
      this.isBtnOpen = initStatus ? defaultIsBtnOpen : this.isBtnOpen;
      const orginalWidth = this.operationWidth;
      const templateBtnsWidth = this.table.operation.width
        ? this.table.operation.width
        : 100;
      const attachmentWidth = this.hasAttachmentConfig ? 100 : 0;
      const reviewWidth = this.hasReviewConfig && this.reviewButton ? 100 : 0;
      const reviewSubmitWidth =
        this.hasReviewConfig && this.reviewSubmitButton ? 100 : 0;
      const reviewRecordWidth = this.hasReviewConfig ? 100 : 0;
      if (!initStatus) this.isBtnOpen = !this.isBtnOpen;
      /* 计算按钮组宽度 */
      if (this.isBtnOpen) {
        this.operationWidth =
          templateBtnsWidth +
          attachmentWidth +
          reviewWidth +
          reviewSubmitWidth +
          reviewRecordWidth;
      } else {
        this.operationWidth = 100;
      }
    },
    handleOperation(index, row, fun) {
      // 操作按钮点击事件
      // console.log(index, row, fun);
      this.$emit(fun, {
        index,
        row,
      });
    },
    handleSelection(selection) {
      console.log("选中", selection);
      // 复选框change事件 selection：选中项数组
      this.$emit("onSelect", selection);
    },
    cellClick(row, column) {
      // 单元格点击事件
      // console.log(row, column, cell);
      let index = column.index;
      if (index == 0) {
        this.$refs.LhTable.toggleRowExpansion(row);
      }
      this.$emit("onCellClick", {
        row,
        column,
      });
    },
    cellDblclick(row, column) {
      // 单元格双击事件
      // console.log(row, column, cell);
      this.$emit("onCellDblclick", {
        row,
        column,
      });
    },
    // 点击某一行时触发的函数

    rowClick(row, event, column) {
      if (
        !column ||
        column.type === "selection" ||
        column.columnKey === "operation" ||
        column.type === "expand"
      ) {
        return;
      }
      const data = {
        row: row,
        event: event,
        column: column,
      };
      this.$emit("onRowClick", data);
    },
    objectSpanMethod(row, column, rowIndex, columnIndex) {
      // 合并行或列
      if (!this.hasMergeRowOrColumn) {
        return;
      } else {
        this.$emit("onMergeRowOrColumn", {
          row,
          column,
          rowIndex,
          columnIndex,
        });
      }
    },
    handleSizeChange(val) {
      // 分页条数change
      this.pageSize = val;
      console.log("val", val);
      // searchBar传值 兄弟组件
      this.bus.$emit("pageChange", {
        page: this.currentPage,
        limit: this.pageSize,
        start: this.pageSize * this.currentPage - this.pageSize,
      });
      // 父组件传值
      this.$emit(
        "pageChange",
        Object.assign(this.searchParam, {
          page: this.currentPage,
          limit: this.pageSize,
          start: this.pageSize * this.currentPage - this.pageSize,
        })
      );
    },
    handleCurrentChange(val) {
      // 页数change
      this.currentPage = val;
      // searchBar传值 兄弟组件
      this.bus.$emit("pageChange", {
        page: this.currentPage,
        limit: this.pageSize,
        start: this.pageSize * this.currentPage - this.pageSize,
      });
      // searchBar传值 兄弟组件
      this.$emit(
        "pageChange",
        Object.assign(this.searchParam, {
          page: this.currentPage,
          limit: this.pageSize,
          start: this.pageSize * this.currentPage - this.pageSize,
        })
      );
    },
    controlBtn(row, fun) {
      if (fun instanceof Function) {
        return fun(row);
      } else {
        return true;
      }
    },

    getCellIndex({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex;
      column.index = columnIndex;
    },
    updateList() {
      this.$emit("updateList");
    },
  },
  beforeDestory() {
    clearInterval(this.timer);
  },
  watch: {
    gridData(value) {
      // console.log(value)
    },
  },
  beforeDestory() {
    this.bus.$off("searchChange");
  },
};
</script>

<style lang="scss">
.lh-table-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  /deep/ .el-table__header {
    /deep/ thead {
      th:first-child {
        text-align: center;
      }
    }
  }

  .el-pagination {
    height: 20px;
    border: 1px solid #ebeef5;
    background: #eee;
    padding: 10px 5px;
  }

  .operation-left {
    text-align: left !important;
  }
}
</style>