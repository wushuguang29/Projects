<?php

namespace app\index\validate;

use service\rewrite\RewriteValidate;
use think\Validate;

class DataPemissionValidate extends RewriteValidate
{
    /**
     * 定义验证规则
     * 格式：'字段名'    =>    ['规则1','规则2'...]
     *
     * @var array
     */
    protected $rule = [
        'id'              => ['require', 'number'],
        'role'            => ['require'],
        'resource_id'     => ['require'],
        'from_type'       => ['require'],
        'target_id'       => ['require'],
        'share_type'      => ['require'],
        'share_target_id' => ['require'],

    ];

    /**
     * 定义错误信息
     * 格式：'字段名.规则名'    =>    '错误信息'
     *
     * @var array
     */
    protected $message = [
        'id.require'              => '基础权限ID不能为空',
        'id.number'               => '基础权限ID只能为数字',
        'resource_id.require'     => '资源ID不能为空',
        'from_type.require'       => '数据来源类型不能为空',
        'target_id.require'       => '数据来源对象ID不能为空',
        'share_type.require'      => '接收数据的类型不能为空',
        'share_target_id.require' => '接收数据的具体对象ID不能为空',
    ];

    protected $scene = [
        'common_add' => ['id', 'role'],
        'share_add'  => ['resource_id', 'from_type', 'target_id', 'share_type', 'share_target_id'],
        'id'         => ['id'],
    ];
}
