/* 正则库
 */
const pattern = {
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/, // 密码校验示例
  passwordText: '密码长度 6 -18 位,必须包含字母、数字',
  name: /^[\u4E00-\u9FA5]{2,5}$/, //姓名
  nameText: '请输入有效姓名',
  idcard: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/,
  idcardText: '请输入有效身份证',
  phone: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
  phoneText: '请输入正确的手机号码',
  concat: /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/,
  concatText: '请输入有效的联系方式',
  special: /([￥@#\$%\^&\*]+)|(^\s+$)/g,
  specialText: '输入内容不能为特殊字符'
  //  passWord: /^w+$/ // 密码校验
}


function checkIdcard(value) {
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  var card = value;
  var pass = true;
  if (card.length == 15) {
    //15位转18位身份证号  
    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
    var cardTemp = 0,
      i;
    card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
    for (i = 0; i < 17; i++) {
      cardTemp += card.substr(i, 1) * arrInt[i];
    }
    card += arrCh[cardTemp % 11];
  }
  if (!card || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(card)) {
    pass = false;
  } else if (!city[card.substr(0, 2)]) {
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (card.length == 18) {
      card = card.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = card[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != card[17]) {
        pass = false;
      }
    }
  }
  return pass;
}

/* 内置规则
 * config=>{reg:'name',errorMsg:'errorMsg||nameText',blankMsg:'blankMsg',required:true||false}
 * @param {String} reg - {pattern}中预定义正则名称 or 自定义正则
 * @param {String} errorMsg - 正则校验不通过提示 当reg为正则名称时可不传，默认为pattern中对应的Text
 * @param {String} blankMsg - 值为空时提示（可不填）,必填时为：该选项为必填项
 */
const validate = (config => {
  let {
    reg,
    errorMsg,
    blankMsg,
    required
  } = config;
  return (rule, value, callback) => {
    if (!value) {
      if (required) {
        callback(new Error(blankMsg ? blankMsg : '该选项为必填项'))
      } else {
        callback();
      }
    } else {
      errorMsg = errorMsg ? errorMsg : (typeof reg == 'string' ? pattern[reg + 'Text'] : '');
      if (reg == 'idcard') {
        if (checkIdcard(value)) {
          callback()
        } else {
          callback(new Error(errorMsg))
        }
      } else {
        reg = pattern[reg] ? pattern[reg] : reg;
        if (!reg.test(value)) {
          callback(new Error(errorMsg))
        } else {
          callback()
        }
      }

    }


  }

})

export default validate