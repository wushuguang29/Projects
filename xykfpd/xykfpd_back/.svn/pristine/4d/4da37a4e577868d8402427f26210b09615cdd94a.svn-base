<?php

namespace app\common\validate;

use service\rewrite\RewriteValidate;

class SmsValidate extends RewriteValidate
{
    /**
     * 定义验证规则
     * 格式：'字段名'	=>	['规则1','规则2'...]
     *
     * @var array
     */
    protected $rule = [
        'phone'               =>  ['require'],
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
        'phone.require'             =>      43023,
        'captcha_key.require'       =>      42002,
        'captcha_code.require'      =>      43005,
        'captcha_code.captchaCheck' =>      43005,
    ];
}
