<?php
/*
 * @Author: your name
 * @Date: 2021-01-11 14:37:46
 * @LastEditTime: 2021-02-04 20:00:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_back\application\common\model\AppUsersAuthModel.php
 */

namespace app\common\model;

use app\common\service\GenearteName;
use service\rewrite\RewriteModel;
use think\Db;

/**
 * 业务处理模块
 * @package app\common\model
 */
class AppUsersAuthModel extends RewriteModel
{
    /**
     * 第三方登录处理
     */
    public function saveOauth($user, $login_type)
    {
        switch ($login_type) {
            case 1: //微信登录
                $openid = $user['openId'];
                $result = Db::name("app_user_auth")->where(array('unique_identification'=> $openid,'auth_type'=> 2))->find();
                if (empty($result)) {
                    $data        = [
                        'name'                     => $user['nickName'],
                        'avatar'                   => $user['avatarUrl'],
                        'create_time'             => date('Y-m-d H:i:s'),
                    ];
                    $userId  = Db::name("app_users")->insertGetId($data);
                    $data = Db::name("app_users")->where('id', $userId)->find();
                    $authData    = [
                        'app_user_id'             => $userId,
                        'unique_identification'  => $openid,
                        'auth_type'               => 2,
                        'create_time'             => date('Y-m-d H:i:s'),
                    ];
                    $authId = Db::name("app_user_auth")->insertGetId($authData);
                    return $userId;
                } else {
                    $data = Db::name("app_users")->where('id', $result['app_user_id'])->find();
                    return $data['id'];
                }
                break;
            case 2: //支付宝登录
                $unique_identification = $user['user_id'];
                $result = Db::name("app_user_auth")->where(array('unique_identification'=> $unique_identification,'auth_type'=> 3))->find();
                if (empty($result)) {
                    $data        = [
                        'name'                     => $user['nick_name'],
                        'avatar'                   => $user['avatar'],
                        'create_time'             => date('Y-m-d H:i:s'),
                    ];
                    $userId  = Db::name("app_users")->insertGetId($data);
                    $data = Db::name("app_users")->where('id', $userId)->find();
                    $authData    = [
                        'app_user_id'             => $userId,
                        'unique_identification'  => $unique_identification,
                        'auth_type'               => 3,
                        'create_time'             => date('Y-m-d H:i:s'),
                    ];
                    $authId = Db::name("app_user_auth")->insertGetId($authData);
                    return $userId;
                } else {
                    $data = Db::name("app_users")->where('id', $result['app_user_id'])->find();
                    return $data['id'];
                }
                break;
            case 3: //手机短信登录
                $phone = $user['phone'];
                $result = Db::name("app_users")->where(array('phone'=> $phone))->find();
                if (empty($result)) {
                    $data        = [
                        'name'                     => GenearteName::generate_name()['xm'],
                        'is_phone_auth'           => 1,
                        'phone'                    => $phone,
                        'create_time'             => date('Y-m-d H:i:s'),
                        'avatar' => 'http://120.24.26.46:8102/22222.png',
                    ];
                    $userId  = Db::name("app_users")->insertGetId($data);
                    $data = Db::name("app_users")->where('id', $userId)->find();
                    $authData    = [
                        'app_user_id'             => $userId,
                        'unique_identification'  => $phone,
                        'auth_type'               => 1,
                        'create_time'             => date('Y-m-d H:i:s'),
                    ];
                    $authId = Db::name("app_user_auth")->insertGetId($authData);
                    return $userId;
                } else {
                    $data = Db::name("app_users")->where('id', $result['id'])->find();
                    return $data['id'];
                }
                break;
            default:
                return msgReturn(43001);
        }
    }
}