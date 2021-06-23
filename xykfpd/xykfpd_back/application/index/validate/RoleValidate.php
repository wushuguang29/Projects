<?php

namespace app\index\validate;

use service\rewrite\RewriteValidate;

class RoleValidate extends RewriteValidate
{
    /**
     * 定义验证规则
     * 格式：'字段名'    =>    ['规则1','规则2'...]
     *
     * @var array
     */
    protected $rule = [
        'name'         => ['require', 'min' => 2, 'max' => 30, 'unique:role'],
        'id'           => ['require', 'number'],
        'remark'       => ['require'],
        'resource_id' => ['require'],
        'users_id'     => ['require'],
        'target_id'    => ['require'],
    ];

    /**
     * 定义错误信息
     * 格式：'字段名.规则名'    =>    '错误信息'
     *
     * @var array
     */
    protected $message = [
        'name.require'         => '角色名称不能为空',
        'name.min'             => '角色名称不能少于2个字符',
        'name.max'             => '角色名称不能大于30个字符',
        'name.unique'          => '角色名称不唯一',
        'id.require'           => 'ID不能为空',
        'id.number'            => 'ID必须为数字',
        'remark.require'       => '备注不能为空',
        'resource_id.require' => '资源ID不能为空',
        'users_id.require'     => '用户ID不能为空',
        'target_id.require'    => '角色ID不能为空',
    ];

    /**
     * [$scene 验证场景]
     * @var [type]
     */
    protected $scene = [
        'add'       => ['name'],
        'del'       => ['id'],
        'edit_per'  => ['target_id', 'resource_id'],
        'id'        => ['id'],
        'bind_user' => ['id', 'users_id'],
    ];

    public function sceneEdit()
    {
        return $this->only(['name', 'id'])
            ->remove('name', 'unique');
    }
}
