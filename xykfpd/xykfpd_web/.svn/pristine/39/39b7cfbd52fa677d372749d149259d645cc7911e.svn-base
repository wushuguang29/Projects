
<template>
  <div>
    <!-- 输入框 -->
    <el-input
      v-if="element == 'input'"
      v-model.trim="formData[formItemOptions.name]"
      :disabled="disabled"
      v-on="bindEvents"
      :clearable="clearable"
      :placeholder="placeholder"
      :type="formItemOptions.type"
    ></el-input>
    <!-- 数字框 -->
    <el-input-number
      v-if="element == 'number'"
      v-model="formData[formItemOptions.name]"
      :disabled="disabled"
      v-on="bindEvents"
      :controls="formItemOptions.controls ? formItemOptions.controls : true"
      :controls-position="formItemOptions.controlsPosition ? formItemOptions.controlsPosition : ''"
      :step="formItemOptions.step ? formItemOptions.step : 1"
      :step-strictly="formItemOptions.stepStrictly ? formItemOptions.stepStrictly : false"
      :min="formItemOptions.min"
    ></el-input-number>
    <!-- 下拉框 -->
    <el-select
      v-if="element == 'select'"
      v-model="formData[formItemOptions.name]"
      v-on="bindEvents"
      :disabled="disabled"
      :filterable="filterable"
      :clearable="clearable"
      :placeholder="placeholder"
    >
      <el-option
        v-for="item in formItemOptions.options"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
    </el-select>
    <!-- 日期选择 -->

    <el-date-picker
      v-if="element == 'date'"
      :type="formItemOptions.type"
      :value-format="format"
      :disabled="disabled"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      v-model="formData[formItemOptions.name]"
      v-on="bindEvents"
      range-separator="至"
      :clearable="clearable"
      :unlink-panels="formItemOptions.unlinkPanels"
    ></el-date-picker>
    <!-- 单选框组 -->
    <el-radio-group
      v-model="formData[formItemOptions.name]"
      v-if="element == 'radioGroup'"
      v-on="bindEvents"
    >
      <el-radio
        v-for="item in formItemOptions.options"
        :label="item.id"
        :key="item.id"
      >{{ item.name }}</el-radio>
    </el-radio-group>
    <!-- 复选框组 -->
<!--    判断是设置最小值是否为0-->
    <el-checkbox-group
      v-model="formData[formItemOptions.name]"
      v-if="element == 'checkboxGroup'&& formItemOptions.min==0"
      :max="formItemOptions.max ? formItemOptions.max : formItemOptions.options.length"
      v-on="bindEvents"
    >
      <el-checkbox
        v-for="item in formItemOptions.options"
        :label="item.id"
        :key="item.id"
      >{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <el-checkbox-group
        v-model="formData[formItemOptions.name]"
        v-if="element == 'checkboxGroup'&& formItemOptions.min!=0"
        :min="formItemOptions.min ? formItemOptions.min : 1"
        :max="formItemOptions.max ? formItemOptions.max : formItemOptions.options.length"
        v-on="bindEvents"
    >
      <el-checkbox
          v-for="item in formItemOptions.options"
          :label="item.id"
          :key="item.id"
      >{{ item.name }}</el-checkbox>
    </el-checkbox-group>

    <!-- cascader级联选择器 -->
    <!-- 时间选择器 -->
    <el-time-picker
      v-if="element == 'time'"
      :is-range="formItemOptions.isRange ? formItemOptions.isRange : false"
      v-model="formData[formItemOptions.name]"
      range-separator="至"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      placeholder="选择时间范围"
      v-on="bindEvents"
    ></el-time-picker>
  </div>
</template>

<script>
export default {
	name: 'FormItem',
	props: {
		formItemOptions: Object,
		formData: Object
	},
	computed: {
    //emptyText
    placeholder:function(){
      return this.formItemOptions.placeholder || '';
    },
		// 表单元素绑定的事件
		bindEvents: function() {
			return this.formItemOptions.events || {};
		},
		// 元素tag
		element: function() {
			return this.formItemOptions.element || 'input';
		},
		// 是否禁用
		disabled: function() {
			return this.formItemOptions.disabled || false;
    },
		// 是否可以清空
		clearable: function() {
			return this.formItemOptions.clearable || true;
		},
		// 下拉框搜索查找
		filterable: function() {
			return this.formItemOptions.filterable || false;
		},
		// type:'daterange' placeholder
		startPlaceholder: function() {
			return this.formItemOptions.startPlaceholder || '开始时间';
		},
		// type:'daterange' placeholder
		endPlaceholder: function() {
			return this.formItemOptions.endPlaceholder || '结束时间';
		},
		// type:'daterange/date' 时间格式
		format: function() {
			return this.formItemOptions.format || 'yyyy-MM-dd';
		}
  },
	watch: {
		formData(value) {
			// console.log('改变');
			this.$emit('searchChange', value);
		}
	},

};
</script>

<style></style>
