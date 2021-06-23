<?php

namespace app\api\controller;

use think\Controller;
use think\Db;
use app\common\model\EvaluatingModel;

/**
 * 评测管理
 * @package app\api\controller
 */
class Evaluating extends Controller
{
    /**
     * 获取订阅人订阅的领域方面
     */
    public function getMemberSideList()
    {
        $param['app_user_member_id'] = input('app_user_member_id');
        $data = (new EvaluatingModel())->getMemberSideList($param);
        return msgReturn(0, $data);
    }

    /**
     * 获取题库
     */
    public function getQuestionsList()
    {
        $param = input();
        return (new EvaluatingModel())->getQuestionsList($param);
    }

    /**
     * 评测
     */
    public function evaluate()
    {
        $param = input();
        return (new EvaluatingModel())->evaluate($param);
    }

    /**
     * 评测人员
     */
    public function getAssessorList()
    {
        $data = (new EvaluatingModel())->getAssessorList();
        return msgReturn(0, $data);
    }

    /**
     * 评测记录
     */
    public function getEvaluateRecord()
    {
        $param['app_user_member_id'] = input('app_user_member_id');
        $data = (new EvaluatingModel())->getEvaluateRecord($param);
        return msgReturn(0, $data);
    }
}