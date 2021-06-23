<?php
namespace app\http\middleware;
/*
 * @Author: your name
 * @Date: 2021-01-04 17:14:41
 * @LastEditTime: 2021-01-20 10:46:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_back\application\http\middleware\PhoneAuthVerify.php
 */
use service\exception\PhoneException;
class PhoneAuthVerify{
    public function handle($request, \Closure $next)
    {
        $is_phone_auth = db('app_users')->where('id',APP_USER_ID)->value('is_phone_auth');
        if(intval($is_phone_auth) === 2){
            //判断用户登录成功后，手机是否绑定
            throw new PhoneException('请先绑定手机',49001);
        }
        return $next($request);
    }
}