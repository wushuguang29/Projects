<!--
 * @Author: your name
 * @Date: 2021-01-11 14:35:20
 * @LastEditTime: 2021-02-20 11:55:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_web\src\views\system\chat\table.vue
-->
<template>
  <div id="table" style="overflow: scroll; height: 100%">
    <div style="display: flex; justify-content: space-around">
      <el-form ref="form" :model="form" label-width="70px" inline>
        <el-form-item label="关键字" label-width="54px">
          <el-input
            v-model="form.search"
            placeholder="请输入评测人"
            width="80px"
          ></el-input>
        </el-form-item>
        <el-form-item label="方面" label-width="40px">
          <el-select
            v-model="side"
            multiple
            @change="Dchange"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in domain"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属疾病">
          <el-select
            v-model="form.affiliated_disease"
            @change="Achange"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in disease"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="评测日期">
          <el-date-picker
            @change="Timechange"
            v-model="form.value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd "
            format="yyyy-MM-dd "
          >
          </el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="search">搜索</el-button>
        <el-button type="primary" @click="Reset">重置</el-button>
      </el-form>
      <el-button type="primary" @click="exportExcel" style="height: 28px"
        >导出</el-button
      >
    </div>

    <el-table :data="tableData"  :height="computeHeight" class="detail-table">
      <el-table-column
        v-for="item in header"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :key="item.id"
      
      >
        <el-table-column
          v-if="item.children || item.children.length > 0"
          v-for="item1 in item.children"
          :label="item1.label"
          :prop="item1.prop"
          :width="item1.width"
          :key="item1.id"
        >
          <el-table-column
            v-if="item1.children || item1.children.length > 0"
            v-for="item2 in item1.children"
            :label="item2.label"
            :prop="item2.prop"
            :width="item2.width"
            :key="item2.id"
          >
            <el-table-column
              v-if="item2.children || item2.children.length > 0"
              v-for="item3 in item2.children"
              :label="item3.label"
              :prop="item3.prop"
              :width="item3.width"
              :key="item3.id"
            >
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-pagination
      height="36px"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.page"
      :page-sizes="[25, 50, 100, 200, 500]"
      :page-size="form.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getList, getSideList } from "@/api/analysis.js";
import { getBaseConfig } from "@/utils/common";
export default {
  name: "uaerAnalysis",
  data() {
    return {
      pageSize: 25,
      total: 0,
      page: 1,
      computeHeight: 500,
      currentPage4: 4, //当前页数
      value: true,
      side: [],
      // tableHeight:
      //   window.innerHeight - 200 ||
      //   document.documentElement.clientHeight - 200 ||
      //   document.body.clientHeight - 200,
      value1: [],
      value2: [],

      form: {
        affiliated_disease: "",
        start: 0,
        page: 1,
        limit: 25,
      },
      disease: [],
      domain: [],
      tableData: [],
      header: [],
    };
  },
  // mounted() {
  // const that = this;
  // window.onresize = () => {
  //   return (() => {
  //     console.log(
  //       "111",
  //       window.innerHeight,
  //       document.documentElement.clientHeight,
  //       document.body.clientHeight
  //     );
  //     window.tableHeight =
  //       window.innerHeight ||
  //       document.documentElement.clientHeight ||
  //       document.body.clientHeight;
  //     that.tableHeight =
  //       window.tableHeight - that.$refs.queryHeight.offsetHeight - 200;
  //   })();
  // };
  // },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      console.log("25", val);
      this.form.limit = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.form.limit;
      this.form.page = val;
      if (val != 1) {
        this.form.start = this.form.page * this.form.limit - this.form.limit;
      } else {
        this.form.start = 0;
      }
      this.getlist(this.form);
    },
    Reset() {
      console.log(this.form);
      this.side = "";
      this.form = {
        start: 0,
        page: 1,
        limit: 25,
      };
      this.getlist(this.form);
    },
    exportExcel() {
      // const gutter = document.querySelectorAll("gutter");
  //  let gutters=document.querySelectorAll("gutter");
   
      const tableDom = document.getElementsByClassName("el-table")[0];
      
    
      let tableHtml = tableDom.innerHTML;
      console.log('tableHtml',tableHtml)
      exportHtml(tableHtml, "用户统计分析");
      function exportHtml(html, title) {
        let path = URL.createObjectURL(
          new Blob(
            [
              `<html>
                <head>
                  <meta charset='utf-8' />
                    <style>
                      .detail-table{border-collapse:collapse;width:100%;}
                      .detail-table td{border:1px solid #000;text-align:center;}
                      .detail-table td.no-border{border: none;text-align:left;}
                      th{border: 1px solid;display: table-cell;}
                      td{border: 1px solid;display: table-cell;}
                       tr .gutter{border: 0px solid;}
                       .cell{
                         mso-number-format:'\@'
                       }
                    </style>
                </head>
                <body>
                  ${html}
                </body>
              </html>`,
            ],
            {
              type: "application/vnd.ms-excel",
            }
          )
        );
        let aTag = document.createElement("a");
        aTag.style.display = "none";
        aTag.setAttribute("href", path);
        aTag.download = title + ".xls";
        aTag.click();
      }
    },
    // exportToExcel() {
    //     //excel数据导出
    //     require.ensure([], () => {
    //         const {
    //             export_json_to_excel
    //         } = require('../../vendor/Export2Excel');
    //         const tHeader = ['序号','省份', '投资总额', '收益总额', '主要投资项目','投资周期', '投资人数', '投资年变化率','备注'];
    //         const filterVal = ['index','provinces', 'orderMoney', 'incomeMoney', 'payType','orderPeriod', 'orderPersonConunt', 'orderYearRate', 'remarks'];
    //         const list = this.tableData;
    //         const data = this.formatJson(filterVal, list);
    //         export_json_to_excel(tHeader, data, '列表excel');
    //     })
    // },
    // formatJson(filterVal, jsonData) {
    //     return jsonData.map(v => filterVal.map(j => v[j]))
    // },
    search() {
      console.log("e", this.form);
      this.getlist(this.form);
    },
    getlist(e) {
      getList(e).then((res) => {
        console.log(res.data);
        this.tableData = res.data.body;
        this.header = res.data.head;
        this.total = res.data.total;
      });
    },
    Timechange(e) {
      console.log(e);
      this.form.begin = e[0];
      this.form.end = e[1];
      console.log(this.form);
      this.getlist(this.form);
    },
    Achange(e) {
      this.getlist(this.form);
    },
    Dchange(e) {
      // this.form.side=e.toString()
      // console.log(this.form.side)
      this.form.side = this.side.toString();
      this.getlist(this.form);
    },
  },
  created() {
    getSideList().then((res) => {
      console.log("res", res);
      let a = {};
      res.data.forEach((element, index) => {
        a.id = index;
        a.name = element.side;
        this.domain.push(a);
        a = {};
      });
    });
    //
    this.disease = getBaseConfig("AFFILIATED_DISEASE", true);
    console.log(" this.disease", this.domain, this.disease);
    console.log("domain", this.domain);
    this.getlist(this.form);
    //搜索栏参数
    //side 方面多选  逗号拼接
    //affiliated_disease //所属疾病
    //begin //评测开始时间
    //end //评测结束时间
  },
  watch: {
    tableData() {
      const clientHeight = document.body.clientHeight - 60;
      // const clientWidth = document.body.clientWidth;
      const tbar = document.getElementsByClassName("el-form");
      let comheight = 500;
      let tbarHeight;
      // let tbarWidth = clientWidth > 1390 ? 41 : 93;
      if (tbar && tbar[0]) {
        tbarHeight = tbar[0].offsetHeight;
      }
      if (clientHeight && clientHeight > comheight) {
        comheight = clientHeight - 42 - tbarHeight - 36;
      }
      this.computeHeight = comheight;
    },
    // 这里的定时器是为了优化，如果频繁调用window.onresize方法会造成页面卡顿，增加定时器会避免频繁调用window.onresize方法
    // timer默认值设置为false，这里相当于一个按钮，防止频繁改变时引起卡顿
    // tableHeight(val) {
    //   if (!this.timer) {
    //     this.tableHeight = val;
    //     this.timer = true;
    //     const that = this;
    //     setTimeout(function () {
    //       that.timer = false;
    //     }, 400);
    //   }
    // },
  },
};
</script>
