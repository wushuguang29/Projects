<?php

namespace app\common\model;

use service\rewrite\RewriteModel;
use think\Db;
use app\common\model\QuestionsModel;

/**
 * 成员管理
 * @package app\common\model
 */
class AppUserMemberModel extends RewriteModel
{
    /**
     * 成员信息【订阅人】
     */
    public function getMemberInfo()
    {
        $userInfo = Db::table('app_user_member')->where('app_user_id', APP_USER_ID)->select();
        return $userInfo;
    }

    /**
     * 添加成员
     */
    public function add($param)
    {
        $date = date('Y-m-d H:i:s');
        Db::startTrans();
        try {
            $data = QuestionsModel::delRedundantFields('app_user_member', $param);//除去多余字段
            $data['create_time']    = $date;
            $data['app_user_id']    = APP_USER_ID;
            $memeber_id = Db::table('app_user_member')->insertGetId($data);//添加到成员表
            if ($memeber_id) {
                Db::commit();
                return msgReturn(45003, ['id'=> $memeber_id]);
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
     * 编辑成员
     */
    public function edit($param)
    {
        $date = date('Y-m-d H:i:s');
        Db::startTrans();
        try {
            $data = QuestionsModel::delRedundantFields('app_user_member', $param);//除去多余字段
            $data['update_time']    = $date;
            unset($data['id']);
            $res = Db::table('app_user_member')->where('id', $param['id'])->update($data);//更新到成员表
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
     * 预览成员
     */
    public function browse($param)
    {
        $res = Db::table('app_user_member')->where('id', $param['id'])->find();
        return msgReturn(0, $res);
    }

    /**
     * 获取领域下方面列表
     */
    public function getSideList($param)
    {
        $data = Db::table('questions')->field('domain')->where('domain', $param['domain'])->group('domain')->select();
        foreach ($data as $ko => $vo) {
            $data[$ko]['index']  = $vo['domain'];
            $data[$ko]['domain'] = config('config.DOMAIN')[$vo['domain']];
            $data[$ko]['side'] = Db::table('questions')->field('side')->where('domain', $vo['domain'])->group('side')->select();
            foreach ($data[$ko]['side'] as $k => $v) {
                $data[$ko]['side'][$k]['value'] = $k;
            }
        }
        return $data;
    }

    /**
     * 订阅
     */
    public function subscribe($param)
    {
        $date = date('Y-m-d H:i:s');
        Db::startTrans();
        try {
            if (empty($param['app_user_member_id']) || !is_numeric($param['app_user_member_id'])) {
                return msgReturn(50001, [], '订阅人不能为空');
            }
            $side = json_decode($param['side'], true);
            if (empty($side) || count($side) == 0) {
                return msgReturn(50001, [], '方面不能为空');
            }
            $subscribe_data   = [];
            //处理添加订阅
            foreach ($side as $ko => $vo) {
                //去除表中已存在值，重新插入
                Db::table('app_user_member_subscription')->where(array('domain'=> $param['domain'],'side'=> $vo['side'], 'app_user_member_id'=> $param['app_user_member_id']))->delete();
                $data['side'] = trim($vo['side']);
                $data['domain'] = $param['domain'];
                $data['app_user_member_id'] = $param['app_user_member_id'];
                $data['create_time'] = $date;
                array_push($subscribe_data, $data);
            }
            $result = Db::table('app_user_member_subscription')->insertAll($subscribe_data);//添加到订阅表
            if ($result) {
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
}