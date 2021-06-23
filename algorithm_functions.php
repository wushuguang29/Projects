<?php

namespace suanfa;

class functions
{
    // 冒泡排序
    public function maopao($arr)
    {
        $len = count($arr);
        $n   = $len - 1;
        for ($i=0; $i<$len; $i++) {
            for ($j=0; $j<$n - $i; $j++) {
                if ($arr[$j] > $arr[$j+1]) {
                    $temp = $arr[$j+1];
                    $arr[$j+1] = $arr[$j];
                    $arr[$j] = $temp;
                }
            }
        }
        return $arr;
    }

    // 快速排序
    public function quick_sort($arr)
    {
        if (count($arr) <= 1) {
            return $arr;
        }
        $left_arr  = [];
        $right_arr = [];
        for ($i=1; $i<count($arr); $i++) {
            if ($arr[$i] < $arr[0]) {
                $left_arr[]  = $arr[$i];
            } else {
                $right_arr[] = $arr[$i];
            }
        }
        $left_arr  = self::quick_sort($left_arr);
        $right_arr = self::quick_sort($right_arr);
        return array_merge($left_arr, array($arr[0]), $right_arr);
    }

    // 写一个函数，能够遍历文件夹下所有文件和子文件夹
    public function scandir($dir)
    {
        $files = [];
        if ($handler = opendir($dir)) {
            while (($file = readdir($handler)) !== false) {
                if ($file != '.' && $file != '..') {
                    $new_dir = $dir .'/'. $file;
                    if (is_dir($new_dir)) {
                        $files[$file] = $this->scandir($new_dir);
                    } else {
                        $files[] = $file;
                    }
                }
            }
            closedir($handler);
            return $files;
        }
    }
}