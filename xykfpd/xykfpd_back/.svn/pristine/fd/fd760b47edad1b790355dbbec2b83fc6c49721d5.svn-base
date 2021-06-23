<?php
namespace app\index\controller;


use app\common\model\ConfigurationModel;
use app\common\model\UsersModel;
use app\common\model\UsersTokenModel;
use service\jwt\facade\Jwt;
use think\Controller;
use think\Exception;
use think\Exception\DbException;
use think\facade\Response;
use think\Request;

/**
 * 配置管理控制器
 */
class Configuration extends Controller
{

    /**
     * [getList 获取配置列表]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-17T11:02:10+0800
     * @param Request $request
     * @param ConfigurationModel $model
     * @return array [type]                   [description]
     */
    public function getList(Request $request,ConfigurationModel $model){
        $data = $model->select();
        return msgReturn(0,$data);
    }
    /**
     * [getLoginType 获取登录配置项]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-26T16:16:47+0800
     * @return array [type]                   [description]
     * @throws \Exception
     */
    public function getLoginType()
    {
        $config = ConfigurationModel::getConfigInfo('LOGIN_TYPE');

        //没有配置项 默认给账号密码登录
        if (empty($config)) {
            return msgReturn(45003, [
                'title' => '账号登录',
                'name' => 'loginAccount',
            ]);
        }
        $config_value = explode(',', $config['value']);

        //构建前端需要数据
        $dataArray = [];
        foreach ($config_value as $key => $value) {
            switch (intval($value)) {
                case 1:
                    $data = [
                        'title' => '账号登录',
                        'name'  => 'loginAccount',
                    ];
                    array_push($dataArray,$data);
                    break;
                case 2:
                    $data = [
                        'title' => '手机登录',
                        'name'  => 'loginMobile',
                    ];
                    array_push($dataArray,$data);
                    break;
                case 3:
                    $data = [
                        'title' => '微信登录',
                        'name'  => 'loginWeChat',
                    ];
                    array_push($dataArray,$data);
                    break;
                case 4:
                    $data = [
                        'title' => '指纹登录',
                        'name'  => 'loginFingerprint',
                    ];
                    array_push($dataArray,$data);
                    break;
            }
        }
      	return msgReturn(45003, $dataArray);
    }

    /**
     * [getAccountCaptchaConfig 账户登录验证码配置]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-26T17:47:03+0800
     * @return array [type]                   [description]
     * @throws \Exception
     */
    public function getAccountCaptchaConfig(){
    	$config = ConfigurationModel::getConfigInfo('ACCOUNT_CAPTCHA');
    	if(empty($config)){
    		return msgReturn(45003, ['status' => 1, 'msg' => '0:开启，1:关闭']);
    	}
    	return msgReturn(45003, ['status' => $config['value'], 'msg' => '0:开启，1:关闭']);

    }

    /**
     * [getPhoneCaptchaConfig 手机登录验证码配置]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-26T17:53:58+0800
     * @return array [type]                   [description]
     * @throws \Exception
     */
    public function getPhoneCaptchaConfig(){
    	$config = ConfigurationModel::getConfigInfo('PHONE_CAPTCHA');
    	if(empty($config)){
    		return msgReturn(45003, ['status' => 1, 'msg' => '0:开启，1:关闭']);
    	}
    	return msgReturn(45003, ['status' => $config['value'], 'msg' => '0:开启，1:关闭']);

    }

    /**
     * [editConfig 编辑配置信息]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-26T18:01:53+0800
     * @param Request $request
     * @param ConfigurationModel $ConfigurationModel
     * @return array [type]                   [description]
     */
    public function editConfig(Request $request,ConfigurationModel $ConfigurationModel){
    	$parmas = $request->param();
        $params['update_time'] = date('Y-m-d H:i:s');
    	return $ConfigurationModel->updateConfig($parmas);
    }

    /**
     * [getBaseConfig 获取基础配置项]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-31T13:49:08+0800
     * @return   [type]                   [description]
     */
    public function getBaseConfig(){
        $config = config('config.');
        return msgReturn(45003, $config);
    }

    public function getConfig(ConfigurationModel $configurationModel)
    {

        $config = $this->buildConfig($configurationModel);


        return msgReturn(45003, $config);
    }

    /**
     * 拼接配置参数
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-04-03T15:14:35+0800
     * @param ConfigurationModel $configurationModel
     * @return array [type]                   [description]
     * @throws DbException
     */
    public function buildConfig(ConfigurationModel $configurationModel): array
    {
        // 生成配置缓存并获取配置
        $config = $configurationModel->getConfiguration();

        $baseConfig = $config['base_config'];

        foreach ($config['config'] as $key => $value) {
            if($value['name'] === 'LOGIN_TYPE'){
                $dataArray = [];
                foreach (explode(',',$value['value']) as $k => $v) {
                    switch ((int)$v) {
                        case 1:
                            $data = [
                                'title' => '账号登录',
                                'name'  => 'loginAccount',
                            ];
                            $dataArray[] = $data;
                            break;
                        case 2:
                            $data = [
                                'title' => '手机登录',
                                'name'  => 'loginMobile',
                            ];
                            $dataArray[] = $data;
                            break;
                        case 3:
                            $data = [
                                'title' => '微信登录',
                                'name'  => 'loginWeChat',
                            ];
                            $dataArray[] = $data;
                            break;
                        case 4:
                            $data = [
                                'title' => '指纹登录',
                                'name'  => 'loginFingerprint',
                            ];
                            $dataArray[] = $data;
                            break;
                    }
                }
                if(!empty($dataArray)){
                    $baseConfig['LOGIN_TYPE'] = $dataArray;
                }else{
                    $baseConfig['LOGIN_TYPE'] = [
                        'title' => '账号登录',
                        'name'  => 'loginAccount',
                    ];
                }
            }
            //账号登录验证码配置
            if($value['name'] === 'ACCOUNT_CAPTCHA'){
                $baseConfig['ACCOUNT_CAPTCHA'] = $value['value'];
            }

            //发送短信图形验证码配置
            if($value['name'] === 'PHONE_CAPTCHA'){
                $baseConfig['PHONE_CAPTCHA'] = $value['value'];
            }

            //保留小数位
            if($value['name'] === 'MONEY_DECIMAL_DIGIT'){
                $baseConfig['MONEY_DECIMAL_DIGIT'] = $value['value'];
            }
        }

        return array_merge($baseConfig,$config['archives_config']);
    }

    /**
     * 重新拉取缓存同时更新token
     * @param ConfigurationModel $configurationModel
     * @param Login $login
     * @return void
     * @throws DbException|Exception
     */
    public function configRefresh(ConfigurationModel $configurationModel, Login $login)
    {
        // 获取配置
        $config = $this->buildConfig($configurationModel);

        // 销毁旧token
        Jwt::destroy(Jwt::getToken());

        // 生成新的token
        $token = $login->buildToken(Jwt::getClaims());

        // 更新user_token关联表
        UsersTokenModel::where('users_id', '=', Jwt::getClaim('user_id'))->update(['token' => $token]);

        Response::create(msgReturn(45003, $config), 'json')
            ->header(['Authorization' => 'Bearer ' . $token, 'Access-Control-Expose-Headers' => 'Authorization'])
            ->send();

        exit;
    }
}
