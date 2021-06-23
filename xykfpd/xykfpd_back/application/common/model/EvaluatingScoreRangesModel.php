<?php

namespace app\common\model;

use service\rewrite\RewriteModel;
use think\Db;
use app\common\model\QuestionsModel;

/**
 * 题库结果管理
 * @package app\common\model
 */
class EvaluatingScoreRangesModel extends RewriteModel
{
    /**
     * 题库结果编辑
     */
    static function edit($param)
    {
        $date = date('Y-m-d H:i:s');
        Db::startTrans();
        try {
            /*
             * 判断得分范围是否交错，是否闭区间
             * 例如 [1-4] [5-25] 正确 [1-4] [4-20] 错误
             */
            $range = json_decode($param['score_range'], true);
            foreach ($range as $ko => $vo) {
                if (isset($range[$ko-1])) {
                    if ($range[$ko-1]['end'] >= $range[$ko]['begin']) {
                        return msgReturn(50001, [], '得分范围不能交错');
                    }
                }
            }
            $data = QuestionsModel::delRedundantFields('evaluating_score_ranges',$param);
            unset($data['id']);
            //是否存在得分范围表
            $is_no = Db::table('evaluating_score_ranges')->where(array('domain'=> $param['domain'], 'side'=> $param['side']))->find();
            if (!empty($is_no)) {
                $data['update_time']  = $date;
                $res = Db::table('evaluating_score_ranges')->where('id', $param['id'])->update($data);//更新到得分范围表
            } else {
                $data['create_uid']   = USER_ID;
                $data['create_time']  = $date;
                $res = Db::table('evaluating_score_ranges')->insertGetId($data);//添加到得分范围表
            }
            if ($res) {
                Db::commit();
                return msgReturn(45003);
            } else {
                Db::rollback();
                return msgReturn(46002);
            }
        } catch (\Exception $e) {
            Db::rollback();
            return msgReturn(46002, $e->getMessage());
        }
    }

    /**
     * 题库结果查看/编辑回显
     */
    static function browse($param)
    {
        $res = Db::table('evaluating_score_ranges')->field([
            'id',
            'domain',
            'side',
            'score_range',
        ])
        ->where('id', $param['id'])
        ->find();
        return msgReturn(0, $res);
    }

    /**
     * 处理得分范围
     */
    public function dealScoreRangeList($range)
    {
        $rangeList = [];
        if (!empty($range)) {
            $rangeArr = json_decode($range, true);
            if (is_array($rangeArr)) {
                for ($i = 0; $i < count($rangeArr); $i++) {
                    $rangeList[] = '范围值:'.$rangeArr[ $i ][ "begin" ] .'-'. $rangeArr[ $i ][ "end" ] . '，提示:' . $rangeArr[ $i ][ "result" ];
                }
            }
        }
        return implode('<br />', $rangeList);
    }
}