<?php

namespace app\index\controller;

use think\Controller;
use think\Db;
use app\common\model\EvaluatingModel;
use app\common\service\Sms;

/**
 * 评测管理
 * @package app\api\controller
 */
class Evaluating extends Controller
{
    /**
     * 信息推送列表
     */
    public function getList()
    {
        $domain     = input('domain');
        $search     = input('search');
        $push_status = input('push_status');
        $start      = input('start') ? input('start') : 0;
        $limit      = input('limit') ? input('limit') : 25;
        $where      = [];
        if (!empty($domain)) {
            $where[] = array('e.domain', 'eq', $domain);
        }
        if (!empty($search)) {
            $where[] = array('e.side', 'like', '%' . $search . '%');
        }
        if (!empty($push_status)) {
            $where[] = array('e.push_status', 'eq', $push_status);
        }
        $where[] = array('e.evaluating_status', 'eq', 1);// 已评测
        $db = Db::table('evaluating')->alias('e')
            ->join('app_user_member aum', 'aum.id = e.app_user_member_id', 'left')
            ->join('app_users au', 'au.id = aum.app_user_id', 'left')
            ->field([
                'e.id',
                'au.name AS user_name',
                'au.phone',
                'aum.name AS member_name',
                'e.domain',
                'e.side',
                'e.evaluating_result',
                'e.push_status',
                'e.push_message',
            ])
            ->where($where);
        $data  = $db->order('e.id DESC')->limit($start, $limit)->select();
        $total = $db->count();
        return msgReturn(0, [
            'total' => $total,
            'data' => $data
        ]);
    }

    /**
     * 查看
     */
    public function browse()
    {
        $param['id'] = input('id');
        $data = (new EvaluatingModel())->browse($param);
        return msgReturn(0, $data);
    }

    /**
     * 信息推送
     */
    public function send()
    {
        $param = input();
        if (empty($param['id']) || empty($param['data'])) {
            return msgReturn(42011);
        }
        $ids      = explode(',', $param['id']);
        $config   = config('easysms.template'); //取配置
        $template = $config[$param['data']]['index'];
        $msg      = $config[$param['data']]['msg'];
        foreach ($ids as $ko => $vo) {
            $info = Db::table('evaluating')->alias('e')
                ->join('app_user_member aum', 'aum.id = e.app_user_member_id', 'left')
                ->join('app_users au', 'au.id = aum.app_user_id', 'left')
                ->field('au.phone,aum.name,e.evaluating_result')
                ->where('e.id', $vo)
                ->find();
            $data = [
                'name'     => $info['name'],
                'project'  => $info['evaluating_result']
            ];
            $result = (new Sms())->send($info['phone'],$template,$data);
            if(!$result['status']){
                return $result;
            }
            $push_message = str_replace('${project}', $data['project'],str_replace('${name}', $data['name'], $msg));
            Db::table('evaluating')->where('id', $vo)->update(['push_status'=> 2,'push_uid'=> USER_ID,'push_message'=> $push_message]);
        }
        return ['status'=>true,'msg'=>'发送成功'];
    }
}