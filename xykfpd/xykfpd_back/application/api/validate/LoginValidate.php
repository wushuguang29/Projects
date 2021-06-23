<?php
/*
 * @Author: your name
 * @Date: 2021-02-05 13:14:18
 * @LastEditTime: 2021-02-07 11:09:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_back\application\api\validate\LoginValidate.php
 */

namespace app\api\validate;

use service\rewrite\RewriteValidate;

class LoginValidate extends RewriteValidate
{
    /**
     * 定义验证规则
     * 格式：'字段名'	=>	['规则1','规则2'...]
     *
     * @var array
     */	
	protected $rule = [
        'login_type'     => ['require'],
        'code'            => ['require'],
        'encryptedData'  => ['require'],
        'iv'              => ['require'],
        'signature'      => ['require'],
        'rawData'         => ['require'],
        'phone'           => ['require'],
        'phone_code'     => ['require'],
        'phone_key'      => ['require'],
    ];
    
    /**
     * 定义错误信息
     * 格式：'字段名.规则名'	=>	'错误信息'
     *
     * @var array
     */	
    protected $message = [
        'login_type.require'     =>  43001,
        'code.require'            => '缺少参数code!',
        'encryptedData.require'  => '缺少参数encrypted_data!',
        'iv.require'              => '缺少参数iv!',
        'signature.require'      => '缺少参数signature!',
        'rawData.require'        => '缺少参数rawData!',
        'phone.require'          =>  43023,
        'phone_code.require'    =>  43006,
        'phone_key.require'     =>  '未获取手机验证码!',
    ];

    /**
     * [$scene 验证场景]
     * @var [type]
     */
    protected $scene = [
        'loginType'    =>  ['login_type'],
        'wechat'       =>  ['code', 'encryptedData', 'iv', 'signature', 'rawData'],
        'phone'        =>  ['phone', 'phone_code'],
    ];
}
