<?php

namespace app\index\controller;

use app\common\model\EvaluatingScoreRangesModel;
use think\Controller;
use think\Db;

/**
 * 题库结果管理
 * @package app\index\controller
 */
class EvaluatingScoreRanges extends Controller
{
    /**
     * 题库结果管理列表
     */
    public function getList()
    {
        $domain     = input('domain');
        $search     = input('search');
        $start      = input('start') ? input('start') : 0;
        $limit      = input('limit') ? input('limit') : 25;
        $where      = [];
        if (!empty($domain)) {
            $where[] = array('domain', 'eq', $domain);
        }
        if (!empty($search)) {
            $where[] = array('side', 'like', '%' . $search . '%');
        }
        $db = Db::table('evaluating_score_ranges')->field([
            'id',
            'domain',
            'side',
            'score_range',
        ])
            ->where($where);
        $data  = $db->order('domain,side ASC')->limit($start, $limit)->select();
        foreach ($data as $ko => $vo) {
            $data[$ko]['score_range'] = (new EvaluatingScoreRangesModel())->dealScoreRangeList($vo['score_range']);
        }
        $total = $db->count();
        return msgReturn(0, [
            'total' => $total,
            'data' => $data
        ]);
    }

    /**
     * 题库结果编辑
     */
    public function edit()
    {
        $param = input();
        return EvaluatingScoreRangesModel::edit($param);
    }

    /**
     * 题库结果查看/编辑回显
     */
    public function browse()
    {
        $param['id'] = input('id');
        return EvaluatingScoreRangesModel::browse($param);
    }
}