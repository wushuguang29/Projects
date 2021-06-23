<?php

namespace app\index\validate;

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
	    'login_type'          =>  ['require', 'loginTypeCheck'],
	    'username'            =>  ['require'],
	    'password'            =>  ['require'],
	    'phone'               =>  ['require'],
	    'phone_code'          =>  ['require'],
	    'phone_key'           =>  ['require'],
	    'finger_code'         =>  ['require'],
	    'captcha_key'         =>  ['require'],
	    'captcha_code'        =>  ['require', 'captchaCheck'],
    ];
    
    /**
     * 定义错误信息
     * 格式：'字段名.规则名'	=>	'错误信息'
     *
     * @var array
     */	
    protected $message = [
        'login_type.require'        =>      43001,
        'login_type.loginType'      =>      43001,
        'username.require'          =>      43007,
        'password,require'          =>      43011,
        'phone.require'             =>      43023,
        'phone_key.require'         =>      42002,
        'phone_code.require'        =>      43006,
        'finger_code.require'       =>      43016,
        'captcha_key.require'       =>      42002,
        'captcha_code.require'      =>      43005,
        'captcha_code.captchaCheck' =>      43005,
    ];

    /**
     * [$scene 验证场景]
     * @var [type]
     */
    protected $scene = [
        'loginType'     =>  ['login_type'],
        'account'       =>  ['username', 'password', 'captcha_key', 'captcha_code'],
        'phone'         =>  ['phone', 'phone_key', 'phone_code'],
        'wechat'        =>  [],
        'fingerPrint'   =>  [],
    ];
}
