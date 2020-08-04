<?php

class deal
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
     * 处理安置方式
     */
    static function dealPlacementType()
    {
        $config = config('config.PLACEMENT_METHOD'); //取配置
        $res = [];
        $array = [];
        foreach ($config as $k => $v) {
            if (!empty($v['children'])) {
                foreach ($v['children'] as $key => $value) {
                    $res[$k.'-'.$key] = $value; //放到同级
                }
            }
            unset($config[$k]['children']);
        }
        $config_key = array_keys($config);
        $config_val = array_values($config);
        $res_key = array_keys($res);
        $res_val = array_values($res);
        $val = array_merge($config_val, $res_val);
        foreach ($val as $ko => $vo) {
            $array[] = $vo['title'];
        }
        $arr = array_combine(array_merge($config_key, $res_key), $array); //合并
        return $arr;
    }

    static function deal()
    {
        //警告信息
        $pupos = db('population')->alias('pp')
            ->join('households h', 'h.id=pp.households_id')
            ->join('projects p', 'p.id=pp.project_id')
            ->field('pp.id,p.project_name,pp.population_nature,pp.is_system,pp.is_organization,pp.is_social_security,h.placement_type')
            ->where('pp.target_idcard', $idcard)
            ->select();
        if (!empty($pupos)) {
            foreach ($pupos as $k => $v) {
                array_push($a, $_row.'.该身份证已存在，已经在'.$v['project_name'].'项目中进行'.self::dealTypeValue($v['placement_type']).'安置方式！<br>');
                $_row++;

                if ($v['population_nature'] == 1) {
                    array_push($a, $_row.'.'.$v['project_name'].'项目是农业户口！<br>');
                    $_row ++;
                }

                if ($v['is_system'] == 1) {
                    array_push($a, $_row.'.'.$v['project_name'].'项目是国家正式工作人员！<br>');
                    $_row ++;
                }

                if ($v['is_organization'] == 1) {
                    array_push($a, $_row.'.'.$v['project_name'].'项目是集体经济组织人员！<br>');
                    $_row ++;
                }

                if ($v['is_social_security'] == 1) {
                    array_push($a, $_row.'.'.$v['project_name'].'项目已是纳入社保人员！<br>');
                    $_row ++;
                }
                $res = db('population')->alias('pp')
                    ->join('households h', 'h.id=pp.households_id', 'left')
                    ->join('area a1', 'a1.id=h.level1', 'left')
                    ->join('area a2', 'a2.id=h.level2', 'left')
                    ->join('area a3', 'a3.id=h.level3', 'left')
                    ->join('projects p', 'p.id=pp.project_id', 'left')
                    ->field('p.project_name,pp.target_name,pp.target_idcard,pp.relationship,pp.age,pp.sex,pp.population_nature,pp.is_system,pp.is_organization,pp.is_social_security,pp.remark,h.placement_type,h.compensation_area,h.protocol_date,a1.name as level1,a2.name as level2,a3.name as level3')
                    ->where('pp.id', $v['id'])
                    ->find();
                $res['placement_type'] = self::dealTypeValue($res['placement_type']);
                array_push($a, $res);
            }
        }
    }
}