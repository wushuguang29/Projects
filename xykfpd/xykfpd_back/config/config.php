<?php
/*
 * @Author: your name
 * @Date: 2020-12-22 13:42:50
 * @LastEditTime: 2021-01-25 16:01:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xykfpd_back\config\config.php
 */
return [
    'SEX'            => [//性别
        1 => '男',
        2 => '女',
    ],

    'ACCOUNT_STATUS' => [//账号状态
        1 => '启用',
        2 => '禁用',
    ],

    'WORKING_STATUS'  => [//在职状态
        1 => '在职',
        2 => '离职',
    ],

    'IS_STATUS' => [
        1 => '是',
        2 => '否',
    ],

    //系统配置
    'CONFIG_TYPE'=>[
      1=>'数字',
      2=>'字符',
      3=>'文本',
      4=>'数组',
      5=>'枚举'
    ],
    'CONFIG_GROUP'=>[
      1=>'系统配置',
      2=>'数据库配置',
      3=>'附件上传配置'
    ],
    'CONFIG_SCOPE'=>[
      1=>'前端',
      2=>'后端',
      3=>'所有'
    ],
    //领域类型
    'DOMAIN'=>[
        1=>'生理',
        2=>'心理',
        3=>'行为',
        4=>'社会'
    ],
    //题目类型
    'QUESTION_TYPE'=>[
        1=>'单选',
        2=>'多选'
    ],
    //文化程度
    'DEGREE_EDUCATION'=>[
        1=>'未上学',
        2=>'小学',
        3=>'初中',
        4=>'中专',
        5=>'高中',
        6=>'大专',
        7=>'本科',
        8=>'硕士',
        9=>'博士'
    ],
    //婚姻状况
    'MARITAL_CONDITION'=>[
        1=>'未婚',
        2=>'有配偶',
        3=>'离异',
        4=>'丧偶'
    ],
    //子女状况
    'CHILDREN_EDUCATION'=>[
        1=>'无',
        2=>'1个',
        3=>'2个',
        4=>'3个',
        5=>'4个及以上'
    ],
    //所属疾病
    'AFFILIATED_DISEASE'=>[
        1=>'未患病',
        2=>'心血管疾病',
        3=>'呼吸系统疾病',
        4=>'泌尿系统疾病',
        5=>'内分泌系统疾病',
        6=>'消化道疾病',
        7=>'神经系统疾病',
        8=>'肿瘤',
        9=>'其他'
    ],
    //身体状况
    'PHYSICAL_CONDITION'=>[
        1=>'非常好',
        2=>'较好',
        3=>'一般',
        4=>'较差',
        5=>'非常差'
    ],
    //居住环境
    'LIVING_CONDITION'=>[
        1=>'独居',
        2=>'夫妻',
        3=>'子女或家人',
        4=>'保姆',
        5=>'其他'
    ],
    //医保类型
    'HEALTH_INSURANCE_TYPE'=>[
        1=>'公费医疗',
        2=>'城镇居民医疗保险',
        3=>'农村合作医疗保险',
        4=>'商业医疗保险',
        5=>'自费',
        6=>'其他'
    ],
    //经济来源
    'SOURCE_FINANCE'=>[
        1=>'储蓄',
        2=>'退休金',
        3=>'政府补助',
        4=>'子女亲戚提供',
        5=>'朋友提供',
        6=>'其他'
    ],
    'FLOW'=>[
      'AUDIT_RESULT_UN_REVIEW'        => 1, // 未审核
      'AUDIT_RESULT_IN_REVIEW'        => 2, // 审核中
      'AUDIT_RESULT_ALREADY_PASS'     => 3, // 已通过
      'AUDIT_RESULT_ALREADY_REJECT'   => 4, // 已驳回
    ],
    'PUSH_STATUS' => [
        1 => '未推送',
        2 => '已推送'
    ]
  ];
