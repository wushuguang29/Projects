<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------
// 应用公共文件

/**
 * [msgReturn 返回提示]
 * @Email    461770336@qq.com
 * @DateTime 2020-03-24T14:07:48+0800
 * @param integer $code [状态码]
 * @param array $data [数据]
 * @param mixed $msg [提示信息]
 * @param boolean $status [状态]
 * @param array $var [替换的变量]
 * @return array [type]                           [description]
 */
function msgReturn($code = 0, $data = [], $msg = null, $status = true, $var = [])
{
    $subCode = mb_substr($code, 0, 2);
    
    if ($subCode == '45') {
        $msg = empty($msg) ? Config::get('code.' . $code) : $msg;
        $code = 0;
    }

    if (count($var) > 0 && is_array($var)) {

        $search = [];

        foreach ($var AS $key => $value) {
            $search[] = '{var' . ++$key . '}';
        }

        $msg = str_replace($search, $var, Config::get('code.' . $code));

    } else {
        $msg = $msg ?? Config::get('code.' . $code);
    }

    return [
        'status' => $status,
        'code'=> $code,
        'msg' => $msg,
        'data' => $data
    ];
}

/**
 * 创建一个 cURL 会话
 * @param  string  $url       [description]
 * @param  integer &$httpCode [description]
 * @return json            [description]
 */
function curl_get($url,&$httpCode = 0)
{
    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL,$url);
    curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

    curl_setopt($ch,CURLOPT_SSL_VERIFYPEER,false);
    curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,10);
    $file_contents = curl_exec($ch);
    $httpCode = curl_getinfo($ch,CURLINFO_HTTP_CODE);
    curl_close($ch);
    return $file_contents;
}

/**
 * [str_random 生成随机数]
 * @Author   ShiHUN
 * @Email    461770336@qq.com
 * @DateTime 2020-03-25T21:49:57+0800
 * @param    integer                  $length [description]
 * @return   [type]                           [description]
 */
function str_random($length = 16)
{
    $string = '';

    while (($len = strlen($string)) < $length) {
        $size = $length - $len;

        $bytes = random_bytes($size);

        $string .= substr(str_replace(['/', '+', '='], '', base64_encode($bytes)), 0, $size);
    }

    return $string;
}

/**
 * 把返回的数据集转换成Tree
 * @param $data
 * @param string $pkName
 * @param string $pIdName
 * @param string $childName
 * @param int $rootId
 * @param bool $type
 * @param int $level
 * @return array
 */
function list_to_tree($data, $pkName='id', $pIdName='pid', $childName='children', $rootId = 0, $type = true, $level = 0)
{
    $new_data = [];
    foreach($data as $key => $sorData){

        if($sorData[$pIdName] === $rootId){

            $res = list_to_tree($data, $pkName, $pIdName, $childName, $sorData[$pkName], $type, $level + 1);

            if(is_array($res) && count($res) > 0){

                if(array_key_exists($childName, $sorData)) {

                    if(array_key_exists($childName, $sorData)){
                        $sorData[$childName][] = $res[0];
                    }else{
                        $sorData[$childName][] = $res;

                    }
                }else{
                    $sorData[$childName] = $res;

                }
                $sorData['leaf'] = false;

            } else {
                if($type == true){
                    $sorData[$childName] = [];
                } else {
                    $sorData['leaf'] = true;
                }
            }

            $new_data[] = $sorData;
        }

    }

    return $new_data;
}

/***
 * @param $arr
 * @return array|mixed
 * 获取笛卡尔积
 */
function dikaer($arr){
    $arr1 = array();
    $result = array_shift($arr); //删除第一个
    while($arr2 = array_shift($arr)){
        $arr1 = $result;
        $result = array();
        foreach($arr1 as $v){
            foreach($arr2 as $v2){
                if(!is_array($v))$v = array($v);
                if(!is_array($v2))$v2 = array($v2);
                $result[] = array_merge_recursive($v,$v2);
            }
        }
    }
    return $result;
}


/**
 * @param array $param
 * @param int $id
 * @param string $pk
 * @param string $pid
 * @return array
 * 获取所有下级
 */
function get_lower_level($param=array(),$id=0,$pk="id",$pid="pid"){
    $subs=array();
    foreach($param as $item){
        if($item[$pid]==$id ){  //pid=2
            $subs[]=$item;
            $subs=array_merge($subs,get_lower_level($param,$item[$pk]));
        }
    }
    return $subs;
}

/**
 * 返回当前系统的时间戳
 * @param bool $type 不传值时返回的格式 Y-m-d H:i:s 传值时返回当前的 Unix 时间戳
 * @return false|int|string
 */
function nowDate($type = true)
{
    if ($type === true) {
        return date('Y-m-d H:i:s');
    } else {
        return time();
    }
}

/**
 * @param string $string
 * @return array
 * json,逗号拼接转一维数组
 */
function to_array($string=""){
    $array=[];
    if(!empty($string)){
        if (is_numeric($string)) {
            $array[] =$string;
        } else {
            if (is_null(json_decode($string))) {
                $array = explode(",", $string);
            } else {
                $array = json_decode($string, true);
            }
        }
    }
    return $array;
}




/**
 * 数字转中文大写
 * @param int $num 数字金额
 * @return false|string
 */
function num_to_cny($num=0){
    $c1 = "零壹贰叁肆伍陆柒捌玖";
    $c2 = "分角元拾佰仟万拾佰仟亿";
    //精确到分后面就不要了，所以只留两个小数位
    $num = round($num, 2);
    //将数字转化为整数
    $num = $num * 100;
    if (strlen($num) > 10) {
        return "金额太大，请检查";
    }
    $i = 0;
    $c = "";
    while (1) {
        if ($i == 0) {
            //获取最后一位数字
            $n = substr($num, strlen($num)-1, 1);
        } else {
            $n = $num % 10;
        }
        //每次将最后一位数字转化为中文
        $p1 = substr($c1, 3 * $n, 3);
        $p2 = substr($c2, 3 * $i, 3);
        if ($n != '0' || ($n == '0' && ($p2 == '亿' || $p2 == '万' || $p2 == '元'))) {
            $c = $p1 . $p2 . $c;
        } else {
            $c = $p1 . $c;
        }
        $i = $i + 1;
        //去掉数字最后一位了
        $num = $num / 10;
        $num = (int)$num;
        //结束循环
        if ($num == 0) {
            break;
        }
    }
    $j = 0;
    $slen = strlen($c);
    while ($j < $slen) {
        //utf8一个汉字相当3个字符
        $m = substr($c, $j, 6);
        //处理数字中很多0的情况,每次循环去掉一个汉字“零”
        if ($m == '零元' || $m == '零万' || $m == '零亿' || $m == '零零') {
            $left = substr($c, 0, $j);
            $right = substr($c, $j + 3);
            $c = $left . $right;
            $j = $j-3;
            $slen = $slen-3;
        }
        $j = $j + 3;
    }
    //这个是为了去掉类似23.0中最后一个“零”字
    if (substr($c, strlen($c)-3, 3) == '零') {
        $c = substr($c, 0, strlen($c)-3);
    }
    //将处理的汉字加上“整”
    if (empty($c)) {
        return "零元整";
    } else if(substr($c, strlen($c)-3, 3) == '元'){
        return $c . "整";
    } else {
        return $c;
    }
}

/**
 * 递归获取数据表层级结构的数据
 * @param int $id 查询表达式参数
 * @param string $field 查询字段
 * @param int $pid 父级字段
 * @param string $table 数据表名称
 * @param array $data 引用的变量
 * @return bool
 * @throws \think\db\exception\DataNotFoundException
 * @throws \think\db\exception\ModelNotFoundException
 * @throws \think\exception\DbException
 */
function recursiveData($id, $field, $pid, $table, &$data)
{
    $result = think\Db::table($table)->where($field, 'IN', $id)->select();

    $data = array_merge($data, $result);

    if (!empty($result)) {
        $idArr = array_column($result, $pid);
        recursiveData((int)$idArr, $field, $pid, $table, $data);
    }

    return true;
}

/**
 * 验证身份证号
 * @param $vStr
 * @return bool
 * @author Zhang zw
 * @date 2020/11/16 18:10
 */
function isIdCard($vStr)
{
    $vCity = array(
        '11','12','13','14','15','21','22',
        '23','31','32','33','34','35','36',
        '37','41','42','43','44','45','46',
        '50','51','52','53','54','61','62',
        '63','64','65','71','81','82','91'
    );
    if (!preg_match('/^([\d]{17}[xX\d]|[\d]{15})$/', $vStr)) return false;
    if (!in_array(substr($vStr, 0, 2), $vCity)) return false;
    $vStr = preg_replace('/[xX]$/i', 'a', $vStr);
    $vLength = strlen($vStr);
    if ($vLength == 18) {
        $vBirthday = substr($vStr, 6, 4) . '-' . substr($vStr, 10, 2) . '-' . substr($vStr, 12, 2);
    } else {
        $vBirthday = '19' . substr($vStr, 6, 2) . '-' . substr($vStr, 8, 2) . '-' . substr($vStr, 10, 2);
    }
    if (date('Y-m-d', strtotime($vBirthday)) != $vBirthday) return false;
    if ($vLength == 18) {
        $vSum = 0;
        for ($i = 17 ; $i >= 0 ; $i--) {
            $vSubStr = substr($vStr, 17 - $i, 1);
            $vSum += (pow(2, $i) % 11) * (($vSubStr == 'a') ? 10 : intval($vSubStr , 11));
        }
        if($vSum % 11 != 1) return false;
    }
    return true;
}

/**
 * 计算两个时间戳相减的天数
 * @param $a
 * @param $b
 * @return float|int
 */
function count_days($a,$b){

    $a_dt = getdate($a);

    $b_dt = getdate($b);

    $a_new = mktime(12, 0, 0, $a_dt['mon'], $a_dt['mday'], $a_dt['year']);

    $b_new = mktime(12, 0, 0, $b_dt['mon'], $b_dt['mday'], $b_dt['year']);

    $negativeNumber = false;

    // 是否为负数
    if ($a_new-$b_new < 0) {
        $negativeNumber = true;
    }

    $days = round(abs($a_new-$b_new)/86400);

    return $negativeNumber ? -1 * $days : $days;

}