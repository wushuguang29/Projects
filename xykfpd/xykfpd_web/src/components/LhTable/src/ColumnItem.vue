<template>
  <div>
    <el-table-column
      v-if="columnData.render"
      :prop="columnData.dataIndex"
      :label="columnData.text"
      :show-overflow-tooltip="columnData.showToolTip"
      :width="columnData.width ? columnData.width : ''"
      :min-width="columnData.minWidth ? columnData.minWidth : ''"
      align="center"
      :key="index"
      v-bind="columnData"
      :formatter="formatter"
      :align="columnData.align ? columnData.align : 'center'"
    >
      <template slot-scope="scope">
        <column
          :row="scope.row"
          :render-fun="columnData.render"
          :column="columnData"
          :index="index"
        ></column>
      </template>
      <template v-if="columnData.columns && columnData.columns.length">
        <template v-for="(item, index) in columnData.columns">
          <column-item
            :columnData="item"
            :key="item.dataIndex + index"
          ></column-item>
        </template>
      </template>
    </el-table-column>
    <el-table-column
      v-else
      :prop="columnData.dataIndex"
      :label="columnData.text"
      :show-overflow-tooltip="columnData.showToolTip"
      :width="columnData.width ? columnData.width : ''"
      :min-width="columnData.minWidth ? columnData.minWidth : ''"
      align="center"
      :key="index"
      v-bind="columnData"
      :formatter="formatter"
      :align="columnData.align ? columnData.align : 'center'"

    >
      <template v-if="columnData.columns && columnData.columns.length">
        <template v-for="(item, index) in columnData.columns">
          <column-item
            :columnData="item"
            :key="item.dataIndex + index"
          ></column-item>
        </template>
      </template>
    </el-table-column>
  </div>
</template>

<script>
export default {
  name: "ColumnItem",
  props: {
    columnData: Object,
    index: Number,
  },
  components: {
    Column: {
      functional: true,
      props: {
        row: Object,
        renderFun: {
          type: Function,
          default: function(h, ctx) {
            return h("span", ctx.row[ctx.column.dataIndex]);
          },
        },
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index,
        };

        if (ctx.props.column) params.column = ctx.props.column;
        return ctx.props.renderFun(h, params);
      },
    },
  },
  methods: {
    noFormatter(row, column, cellValue, index) {
      return cellValue;
    },
  },
  computed: {
    formatter() {
      return this.columnData.formatter
        ? this.columnData.formatter
        : this.noFormatter;
    },
  },
};
</script>

<style></style>
