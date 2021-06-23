import store from "../store/index.js";
/**合计表格数据
 *@params:表格数据 el-table:@summary-method:function({columns,data}){}
 *@columnIndex:Array 需要合计的列索引
 */
export function summaryFunction(params, columnIndex) {
  const { columns, data } = params;
  const sums = [];
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = "总计";
    } else if (columnIndex.includes(index)) {
      const values = data.map((item) => Number(item[column.property]));
      if (!values.every((value) => isNaN(value))) {
        sums[index] = values.reduce((prev, curr) => {
          const value = Number(curr);
          if (!isNaN(value)) {
            return prev + curr;
          } else {
            return prev;
          }
        }, 0);
      } else {
        sums[index] = "N/A";
      }
    } else {
      sums[index] = "--";
    }
  });
  return sums;
}
/***
 *构造动态路由数组
 *@data:菜单树结构数据
 *@router:路由数组
 ***/
export function generateRouter(data = [], router) {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    if (data[i].leaf) {
      router.push({
        name: data[i].front_router_name,
        path: data[i].front_router_name,
        component: (resolve) =>
          require(["@/" + data[i].identifier + ".vue"], resolve),
        meta: Object.assign(data[i].meta, {
          title: data[i].title,
          id: data[i].id,
          pid: data[i].pid,
          extra: Object.assign(data[i].extra ? data[i].extra : {}),
        }),
      });
      if (data[i].meta?.button?.length) {
        data[i].meta.button.forEach((item) => {
          if (item.open_mode == 2) {
            router.push({
              name: item.front_router_name,
              path: item.front_router_name,
              component: (resolve) =>
                require(["@/" + item.identifier + ".vue"], resolve),
              meta: Object.assign(item.meta ? item.meta : {}, {
                title: item.title,
                id: item.id,
                pid: item.pid,
                extra: Object.assign(item.extra ? item.extra : {}),
              }),
            });
          }
        });
      }
    } else {
      generateRouter(data[i].children, router);
    }
  }
  console.log(router);
  return router;
}

/****
 * 获取基础配置
 * key:配置的键
 * flag:false -> 返回config[key]的配置{1:'男',2:'女'}
 * flag:true -> 返回config[key]转换后的数组[{id:1,name:'男'},{id:2,name:'女'}]
 ******/
export function getBaseConfig(key, flag = false) {
  const config = store.getters.config;
  if (!key) return false;
  let arr = [];
  if (flag) {
    if (key) {
      if (!config[key]) return;
      for (var index in config[key]) {
        if (typeof config[key][index] === "string") {
          arr.push({
            id: Number(index),
            title: config[key][index],
            name: config[key][index],
          });
        } else {
          let obj = Object.assign(
            {
              id: Number(index),
              name: config[key][index]["title"],
            },
            config[key][index]
          );
          arr.push(obj);
        }
      }
    }
    return arr;
  }
  return config[key];
}

// export function getFilterBaseConfig(name, key) {
//   let arr = [];
//   const orginalArr = getBaseConfig(name, true);
//   orginalArr.forEach(each => {
//     if (each[key]) {
//       arr.push(each)
//     }
//   })
//   return arr
// }
export function getFilterBaseConfig(name, key, flag, checkedKey) {
  let arr = [];
  const orginalArr = getBaseConfig(name, true);
  if (key) {
    orginalArr.forEach((each) => {
      if (flag) {
        if (each[key] && each[checkedKey]) {
          arr.push(each);
        }
      } else {
        if (each[key]) {
          arr.push(each);
        }
      }
    });
  } else {
    arr = orginalArr;
  }
  return arr;
}
/* 首字母大写 */
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/* 获取常量配置 */
export function getConstantConfigValue(mainkey, subKey) {
  if (!mainkey || !subKey) return false;
  const config = store.getters.config;
  return config[mainkey][subKey];
}
