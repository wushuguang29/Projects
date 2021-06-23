<?php
namespace app\index\validate;

use service\rewrite\RewriteValidate;

class UserValidate extends RewriteValidate
{
    /**
     * 定义验证规则
     * 格式：'字段名'    =>    ['规则1','规则2'...]
     *
     * @var array
     */
    protected $rule = [
        'username'         => ['require'],
        'password'         => ['require'],
        'mobile'           => ['require', 'max' => 11, 'regex' => '/0?(13|14|15|18)[0-9]{9}/'],
        'mobile_code'      => ['require'],
        'mobile_key'       => ['require'],
        'finger_code'      => ['require'],
        'captcha_key'      => ['require'],
        'captcha_code'     => ['require'],
        'login_type'       => ['require'],
        'account'          => ['require'],
        'email'            => ['email'],
        'id'               => ['require', 'number'],
        'old_password'     => ['require'],
        'password_confirm' => ['require', 'confirm:password'],
        'target_id'        => ['require'],
        'resource_id'      => ['require'],
        'users_id'         => ['require'],
        'organization_id'  => ['require'],

    ];

    /**
     * 定义错误信息
     * 格式：'字段名.规则名'    =>    '错误信息'
     *
     * @var array
     */
    protected $message = [

    ];

    /**
     * [$scene 验证]
     * @var [type]
     */
    protected $scene = [
        'add'                      => ['username', 'password', 'mobile', 'account', 'email'],
        'id'                       => ['id'],
        'account_login'            => ['username', 'password', 'captcha_key', 'captcha_code'],
        'account_login_no_captcha' => ['username', 'password'],
        'send_message'             => ['mobile', 'captcha_key', 'captcha_code'],
        'send_message_no_captcha'  => ['mobile'],
        'mobile_login'             => ['mobile', 'mobile_code', 'mobile_key'],
        'change'                   => ['password', 'old_password', 'password_confirm'],
        'edit_per'                 => ['target_id'],
        'bind_role'                => ['id', 'users_id'],
        'bind_org'                 => ['users_id', 'organization_id'],
        'users_id'                 => ['users_id'],
        'get_dp'                   => ['users_id', 'resource_id'],

    ];

    public function sceneEdit()
    {
        return $this->only(['username', 'mobile', 'account', 'email', 'id'])
            ->remove('account', 'unique')
            ->remove('mobile', 'unique');
    }
}
