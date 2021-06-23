<template>
  <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    ref="treeTable"
    height="100%"
    :class="{ 'lh-tree-table': !needSelectAll }"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    @cell-click="cellClick"
    :cell-class-name="getCellIndex"
    :loading="loading"
  >
    <el-table-column v-if="hasSelection" fixed="left" class="tree-header">
      <template slot="header">
        <el-checkbox
          v-model="isAllChecked"
          @change="handleSelectAll"
          :label="selectTitle"
          v-if="needSelectAll"
        >
        </el-checkbox>
        <span v-else>{{ selectTitle }}</span>
      </template>
      <template slot-scope="scope">
        <el-checkbox
          v-if="!scope.row.disabled"
          v-model="scope.row.checked"
          :key="scope.row.id"
          @change="selectChange(scope)"
        ></el-checkbox>
        <!-- <span class="el-icon-folder" v-if="scope.row.children&&scope.row.children.length" style="color:#4277fc;font-size:16px;"></span>
        <span class="el-icon-document" v-else style="color:#4277fc;font-size:16px;"></span> -->
        <span>{{ scope.row[handleTextKey] }}</span>
      </template>
    </el-table-column>
    <!-- <el-table-column
      type="selection"
      width="50"
      v-if="hasSelection"
      fixed="left"
    ></el-table-column> -->
    <template v-for="(item, index) in columns">
      <column-item
        :columnData="item"
        :key="index"
        :index="index"
        :class="className"
      ></column-item>
    </template>
  </el-table>
</template>

<script>
import ColumnItem from "../../LhTable/src/ColumnItem.vue";
export default {
  name: "LhTreeSelectTable",
  components: {
    ColumnItem,
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    hasSelection: {
      type: Boolean,
      default: true,
    },
    needSelectAll: {
      type: Boolean,
      default: false,
    },
    // hasHandleSelection: {
    //   type: Boolean,
    //   default: true,
    // },
    /* 选择列名称 */
    selectTitle: {
      type: String,
      default: "姓名",
    },
    /* 选择列对应字段 */
    handleTextKey: {
      type: String,
      default: "name",
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    dataIndex: {
      type: String,
      default: "id",
    },
    /* 选择关联关系 */
    checkPropagation: {
      type: String,
      default: "down", //'both'/'up'/'down'/'none'
    },
    /* 列class */
    className: {
      type: String,
      default: "",
    },
    loading:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      // select: false,
      isAllChecked: false,
      allData: [],
    };
  },
  // mounted() {
  //   // this.setChecked(this.tableData);
  // },
  methods: {
    /* 操作列全选 */
    handleSelectAll(value) {
      this.tableData.forEach((val) => {
        this.handleCheckAll(val, value, false);
      });
      this.$emit("selectionChange", this.getChecked([], this.tableData));
    },
    /* type="selection"全选 */
    // selectAll(selection) {
    //   if (selection.length && !this.select) {
    //     this.tableData.forEach((val) => {
    //       this.$refs.treeTable.toggleRowSelection(val, true);
    //       this.handleCheckAll(val, true, true);
    //     });
    //     this.select = true;
    //   } else {
    //     this.select = false;
    //     this.tableData.forEach((val) => {
    //       this.$refs.treeTable.toggleRowSelection(val, false);
    //       this.handleCheckAll(val, false, true);
    //     });
    //   }
    //   this.$emit("selectionChange", selection);
    // },
    // 操作列复选框select事件
    selectChange(e) {
      var checked = e.row.checked;
      this.checkedByPropagation(e.row, checked, false);
      this.isAllChecked = true;
      this.isallchecked(this.tableData);
    },
    handleCheckAll(row, checked, isSelection) {
      // 全选或全部取消选择操作  type="selection"
      row.checked = checked;
      if (row.children) {
        row.children.forEach((val, index) => {
          val.checked = checked;
          // if (isSelection) {
          //   this.$refs.treeTable.toggleRowSelection(val, checked);
          // }
          this.handleCheckAll(val, checked, isSelection);
        });
      }
    },
    // type="selection"复选框select事件
    // tableSelectChange(selection, row) {
    //   //   console.log("select");
    //   var selectArr = selection,
    //     dataIndex = this.dataIndex,
    //     checked = selectArr.some((item) => {
    //       if (item[dataIndex] == row[dataIndex]) {
    //         return true;
    //       }
    //     });
    //   row.checked = checked;
    //   this.checkedByPropagation(row, checked, true);
    //   this.$emit("selectionChange", this.getChecked([], this.tableData));
    // },
    checkedByPropagation(row, checked, isSelection) {
      if (this.checkPropagation == "both") {
        if (row.children) {
          this.handleCheckAll(row, checked, isSelection);
        }
        if (row.pid) {
          this.selectParent(row, checked);
        }
      } else if (this.checkPropagation == "up") {
        if (row.pid) {
          this.selectParent(row, checked);
        }
      } else if (this.checkPropagation == "down") {
        if (row.children) {
          this.handleCheckAll(row, checked, isSelection);
        }
      }
      let selected = this.getChecked([], this.tableData);
      // if (selected.length == this.allData.length) {
      //   this.isAllChecked = true;
      // } else {
      //   this.isAllChecked = false;
      // }
      this.$emit("selectionChange", selected);
    },
    selectParent(row, checked) {
      var row = this.findChildren(this.tableData, this.dataIndex, row.pid);
      if (row && row.children) {
        // console.log(row.children);
        var arr = row.children.filter((item) => item.checked == checked);
        // console.log(arr)
        if (arr.length == row.children.length) {
          row.checked = checked;
          this.$refs.treeTable.toggleRowSelection(row, checked);
        } else {
          row.checked = false;
          this.$refs.treeTable.toggleRowSelection(row, false);
        }
      }
      if (row && row.pid) {
        this.selectParent(row, checked);
      }
    },
    getChecked(selection, arr) {
      arr.forEach((each) => {
        if (each.checked && !each.disabled) {
          selection.push(each);
        }
        if (each.children) {
          this.getChecked(selection, each.children);
        }
      });
      return selection;
    },
    /*
     *arr数组数据
     * dataIndex:字段名 默认为id
     * parent:父节点值
     */
    findChildren(arr, dataIndex, parent) {
      // console.log(arr, dataIndex, parent);
      var returnedItem;
      var find = function(arr, dataIndex, parent) {
        arr.forEach((item) => {
          //利用foreach循环遍历
          if (item[dataIndex] == parent) {
            //判断递归结束条件
            returnedItem = item;
            return item;
          } else if (item.children) {
            //判断chlidren是否有数据
            find(item.children, dataIndex, parent); //递归调用
          }
        });
      };

      find(arr, this.dataIndex, parent);
      return returnedItem;
    },
    setChecked(arr, selected, allData) {
      var that = this;
      arr.forEach((each) => {
        if (each.checked || each.disabled) {
          selected.push(each);
        }
        allData.push(each);
        if (each.children) {
          that.setChecked(each.children, selected, allData);
        }
      });
      let data = { selected: selected, allData: allData };
      return data;
    },
    isallchecked(arr) {
      arr.forEach((v, i) => {
        if (!v.checked) {
          this.isAllChecked = false;
        }
        if (v.children) {
          this.isallchecked(v.children);
        }
      });
    },
    cellClick(row, column, cell, event) {
      let index = column.index;
      if (index == 0) {
        this.$refs.treeTable.toggleRowExpansion(row);
      }
    },
    getCellIndex({ row, column, rowIndex, columnIndex }) {
      row.index = rowIndex;
      column.index = columnIndex;
    },
  },
  watch: {
    tableData: function(value) {
      this.isAllChecked = true;
      this.isallchecked(this.tableData);
    },
  },
};
</script>

<style lang="scss" scoped>
.lh-tree-table {
  /deep/ .el-table__header {
    /deep/ thead {
      th:first-child {
        text-align: center;
      }
    }
  }
  // /deep/ .el-table__indent{
  //   // display: none;
  //   position: relative;
  //   // &:after{
  //   //   content:'';
  //   //   display: block;
  //   //   width:1px;
  //   //   height: 24px;

  //   //   border-left:1px dashed $--color-primary;
  //   //   position: absolute;
  //   //   right:0;

  //   // }
  // }
}
</style>
