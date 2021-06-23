<?php
/*
 * @Author: your name
 * @Date: 2020-12-28 16:27:25
 * @LastEditTime: 2020-12-29 09:30:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_back\application\index\controller\Test.php
 */
namespace app\index\controller;

use app\common\service\Sms;
use think\Controller;

class Test extends Controller{
    
    public function smsTest(){
        echo 'smsTest';
        $sms = new Sms();
        $result = $sms->sendVerificationCode(18073186136);
        dump($result);
    }
}