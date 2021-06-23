<?php

namespace app\api\controller;

use think\Controller;
use think\Db;
use think\facade\Cache;
use app\common\model\AppUsersModel;
use think\Request;
use app\common\model\FileModel;
use app\common\model\QuestionsModel;

/**
 * 用户管理
 * @package app\api\controller
 */
class AppUsers extends Controller
{
    protected $fileId      = [];//文件id
    protected $visit_path = [];//访问路径
    protected $errorMsg    = [];//错误信息
    /**
     * 用户信息
     */
    public function getUserInfo()
    {
        $data = (new AppUsersModel())->getUserInfo();
        return msgReturn(0, $data);
    }

    /**
     * 修改用户名
     */
    public function changeName()
    {
        $data = input();
        Db::table('app_users')->where('id', APP_USER_ID)->update(['name'=> $data['name']]);
        return msgReturn(45003);
    }

    /**
     * 修改手机号
     */
    public function changePhone()
    {
        $data = input();
        //判断手机验证码是否过期
        $cache_phone = Cache::get($data['phone_key']);
        if (!$cache_phone) {
            return msgReturn(43006);
        }

        //判断登录手机号与接受短信手机号是否一致
        if ($cache_phone['phone'] !== $data['phone']) {
            return msgReturn(43017);
        }

        //判断验证码是否正确
        if ($cache_phone['code'] !== $data['phone_code']) {
            return msgReturn(43006);
        }

        //判断手机号是否已绑定
        $isBind = Db::name("app_users")->where(array('phone'=> $data['phone']))->find();
        if (!empty($isBind)) {
            return msgReturn(50001, [], '该手机号已绑定');
        }
        Db::table('app_users')->where('id', APP_USER_ID)->update(['phone'=> $data['phone']]);
        return msgReturn(45003);
    }

    /*
     * 上传头像
     */
    public function upload(Request $request,FileModel $fileModel,QuestionsModel $model)
    {
        $file       = $request->file('file');
        $target_id  = 0;
        $validate = $fileModel->validate($file);
        $info = $file->getInfo();
        if ($validate["status"] == false) {
            array_push($this->errorMsg,$info["name"].$validate["msg"]);
        }else {
            $result = $model->upload($file, $info, APP_USER_ID, $target_id);
            if($result["status"] == false){
                array_push($this->errorMsg,$result["data"]["error_msg"]);
            }else{
                if(!empty($result["data"]["error_msg"])){
                    array_push($this->errorMsg,$result["data"]["error_msg"]);
                }
                array_push($this->fileId,(int)$result["data"]["file_id"]);
                array_push($this->visit_path,$result["data"]["visit_path"]);
            }
        }
        #上传成功
        if(empty($this->errorMsg)){
            return msgReturn(0,array( "file_id"=>array_unique($this->fileId), 'path'=>array_unique($this->visit_path)));
        }else{
            return msgReturn(0,array(
                "file_id"=>array_unique($this->fileId), 'path'=>array_unique($this->visit_path)
            ),$this->errorMsg);
        }
    }
}