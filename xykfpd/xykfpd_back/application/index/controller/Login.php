<?php

namespace app\index\controller;

use app\common\model\ConfigurationModel;
use app\common\model\UsersTokenModel;
use app\index\validate\LoginValidate;
use Exception;
use service\jwt\facade\Jwt;
use think\Controller;
use app\common\model\UsersModel;
use think\Exception\DbException;
use think\facade\Cache;
use think\Request;
use service\jwt\exception\TokenBlacklistException;

class Login extends Controller
{

    /**
     * [account 账号密码登录]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-25T15:13:02+0800
     * @param $param
     * @return array [type]                            [description]
     * @throws DbException
     * @throws \think\Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\PDOException
     */
    public function account($param): ?array
    {

        $user = UsersModel::where('account', $param['username'])->find();

        if (!empty($user)) {
            if ($user['status'] === 2) {
                return msgReturn(43014);

            }
            if ($user['working_status'] !== 1) {
                return msgReturn(43010);
            }

            if (password_verify($param['password'], $user['password'])) { //验证密码是否正确

                // 生成token
                $token = $this->createToken($user->toArray());
                // 修改错误次数 保存token至数据库
                UsersModel::where('id', $user['id'])->update(['remain' => 5]);

                return msgReturn(45010, [
                    'token' => $token, 'user_id' => $user['id'],
                    'user_name' => $user['username'] , 
                    'project_id' => $user['project_id'],
                    'is_administrator' => $user['is_administrator'],
                ]);
            }

            UsersModel::where('id', $user['id'])->setDec('remain');

            if ($user['remain'] <= 1) {
                //锁定账户
                UsersModel::where('id', $user['id'])->update(['status' => 2]);
                return msgReturn(43025);
            }

            if ($user['remain'] <= 4) {
                return msgReturn(43027, [], null, true, [$user['remain']-1]);
            }

            return msgReturn(43026);

        }

        return msgReturn(43012);

    }

    /**
     * [login 登录]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-26T15:18:03+0800
     * @param Request $request [description]
     * @param LoginValidate $loginValidate
     * @return array [type]                            [description]
     * @throws DbException
     * @throws \think\Exception
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\PDOException
     */
    public function login(Request $request, LoginValidate $loginValidate): ?array
    {
        $param = $loginValidate->goCheck($request->param(), 'loginType');

        switch ((int)$param['login_type']) {
            case 1: //账号密码登录
                $loginValidate->goCheck($param, 'account');

                return $this->account($param);

            case 2: //短信登录
                $loginValidate->goCheck($param, 'phone');

                return $this->phoneLogin($param);

            case 3: //微信登录
                return $this->wechat($param);

            case 4: //指纹登录
                return $this->fingerPrint($param);

            default:
                return msgReturn(43001);

        }
    }

    /**
     * [phoneLogin 手机短信登录]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-26T09:20:00+0800
     * @param    [type]                   $data [description]
     * @return array [type]                         [description]
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws DbException
     */
    public function phoneLogin($data): array
    {

        //判断手机验证码是否过期
        $cache_phone = Cache::get($data['phone_key']);
        if (!$cache_phone) {
            return msgReturn(43006);
        }
        //判断手机号是否存在
        $user = UsersModel::where('mobile', $data['phone'])->find();
        if (empty($user)) {
            return msgReturn(43018);
        }

        //判断登录手机号与接受短信手机号是否一致
        if ($cache_phone['phone'] !== $data['phone']) {
            return msgReturn(43017);
        }

        //判断验证码是否正确
        if ($cache_phone['code'] !== $data['phone_code']) {
            return msgReturn(43006);
        }

        //删除缓存
        Cache::rm($data['phone_key']);

        //登录成功 生成token
        $token = $this->createToken($user->toArray());

        return msgReturn(45003, ['token' => $token, 'user_id' => $user['id'], 'user_name' => $user['username']]);

    }

    /**
     * 创建token
     * @param array $user
     * @return string
     * @throws DbException
     * @throws Exception
     */
    public function createToken(array $user): string
    {

        // 生成token
        $token = Jwt::setClaims($user)->builder();

        // 判断是否多重登录    1:允许2:不允许
        $multiUser = ConfigurationModel::where('name', 'MULTI_USER')->value('value');

        if ((int)$multiUser !== 1) {
            // 不允许多重登录
            // 清除中间表的数据 并把token加入黑名单
            $usersToken = UsersTokenModel::where('users_id', '=', $user['id'])->all();

            foreach ($usersToken AS $key => $value) {
                //销毁token force参数为强制下线配置,默认为false
                Jwt::destroy($value->token, true);

                $value->delete_time = nowDate();

                $value->save();
            }

        }

        // 创建中间表数据
        UsersTokenModel::create(['users_id' => $user['id'], 'token' => $token]);

        return $token;

    }

    /**
     * [logout 退出登录]
     * @Author   ShiHUN
     * @Email    461770336@qq.com
     * @DateTime 2020-03-27T10:33:40+0800
     * @param string $token
     * @param int $userId
     * @return array [type]                            [description]
     * @throws \think\Exception
     * @throws \think\exception\PDOException
     */
    public function logout($token = '', $userId = 0): ?array
    {

        try {

            if (empty($token)) {
                $token = Jwt::getToken();

                if (empty($token)) {
                    throw new TokenBlacklistException('');
                }

                $service = Jwt::getClaims();

                $userId = $service['user_id'];
            }

            // 删除关联表的数据
            // 判断是否多重登录 否则只删除当前用户的token
            $multiUser = ConfigurationModel::where('name','=','MULTI_USER')->value('value');

            if ((int)$multiUser === 1) { // 允许多重登录
                UsersTokenModel::where('token','=', $token)->delete(true);
            }

            if ((int)$multiUser === 2) { // 不允许多重登录
                // 删除掉当前用户关联的所有token
                UsersTokenModel::where('users_id','=', $userId)->delete(true);
            }

            // 删除当前用户的Token
            Jwt::destroy($token);

            return msgReturn(45003);
        } catch (TokenBlacklistException $tokenBlacklistException) {

            return msgReturn(45003);
        }
    }

    /**
     * 创建token
     * @param $user
     * @return string
     * @throws DbException
     */
    public function buildToken($user): string
    {
        if (!Cache::get('config_key')) {
            $configuration = new ConfigurationModel;

            $configuration->getConfiguration();
        }

        // 生成token    如果需要其他参数在service数组内追加
        return Jwt::createToken($user);
    }

    public function wechat(array $data): array
    {
        return [$data];
    }

    public function fingerPrint(array $data): array
    {
        return [$data];
    }


}