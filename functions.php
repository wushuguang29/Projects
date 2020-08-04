<?php

class functions
{
    /*
    作用：根据二维数组中的部分键值判断二维数组中是否有重复值
    参数：
        $arr  —— 目标数组
        $keys —— 要进行判断的键值组合的数组
    返回：重复的值
    扩展：判断的键值
    */
    static function getRepeat($arr, $keys)
    {
        $unique_arr = array();
        $repeat_arr = array();
        foreach ($arr as $k => $v) {
            $str = "";
            $str .= "{$v[$keys]},";
            if (!in_array($str, $unique_arr)) {
                $unique_arr[] = $str;
            } else {
                $repeat_arr[] = $v;
            }
        }
        return $repeat_arr;
    }

    /**
     * Notes:去掉参数中多余的字段
     * User: Yqx
     * @param $table
     * @param $data
     * @return array
     */
    static function delRedundantFields($table, $data)
    {
        $allFields = db($table)->getTableFields();
        foreach ($data as $key => $value) {
            if (!in_array($key, $allFields)) {
                unset($data[ $key ]);
            }
        }
        return $data;
    }
}