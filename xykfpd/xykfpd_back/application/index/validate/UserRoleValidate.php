<?php

namespace app\index\validate;

use service\rewrite\RewriteValidate;

class UserRoleValidate extends RewriteValidate
{
    /**
     * 定义验证规则
     * 格式：'字段名'    =>    ['规则1','规则2'...]
     *
     * @var array
     */
    protected $rule = [
        'users_id' => ['require'],
        'id'       => ['require'],
    ];

    /**
     * 定义错误信息
     * 格式：'字段名.规则名'    =>    '错误信息'
     *
     * @var array
     */
    protected $message = [
        'id.require'       => '角色ID不能为空',
        'users_id.require' => '用户ID不能为空',
    ];

    protected $scene = [
        'bind'     => ['id', 'users_id'],
        'users_id' => ['users_id'],
        'id'       => ['id'],
    ];
}
