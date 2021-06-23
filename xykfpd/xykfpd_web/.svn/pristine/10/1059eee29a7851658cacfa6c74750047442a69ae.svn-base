<template>
	<lh-tree-select-table :tableData="tableData" @selectionChange="selectChange" :hasSelection="false" :columns="columns"></lh-tree-select-table>
</template>

<script>
export default {
	data() {
		return {
			tableData: [
				{
					id: 1,
					date: '2016-05-02',
					name: '王小虎1',
					address: '上海市普陀区金沙江路 1518 弄',
					checked: false,
					pid: 0
				},
				{
					id: 2,
					date: '2016-05-04',
					name: '王小虎2',
					address: '上海市普陀区金沙江路 1517 弄',
					checked: false,
					pid: 0
				},
				{
					id: 3,
					date: '2016-05-01',
					name: '王小虎3',
					pid: 0,
					address: '上海市普陀区金沙江路 1519 弄',
					checked: false,
					children: [
						{
							id: 31,
							date: '2016-05-01',
							name: '王小虎31',
							address: '上海市普陀区金沙江路 1519 弄',
							checked: false,
							pid: 3,
							children: [
								{
									id: 39,
									date: '2016-05-01',
									name: '王小虎39',
									address: '上海市普陀区金沙江路 1519 弄',
									checked: false,
									pid: 31
								},
								{
									id: 42,
									date: '2016-05-01',
									name: '王小虎42',
									address: '上海市普陀区金沙江路 1519 弄',
									checked: false,
									pid: 31,
									children: [
										{
											id: 56,
											date: '2016-05-01',
											name: '王小虎56',
											address: '上海市普陀区金沙江路 1519 弄',
											checked: false,
											pid: 42
										},
										{
											id: 76,
											date: '2016-05-01',
											name: '王小虎76',
											address: '上海市普陀区金沙江路 1519 弄',
											checked: false,
											pid: 42
										}
									]
								}
							]
						}
					]
				}
			],
			columns: [{
					text: '姓名',
					dataIndex: 'name'
				},
				{
					text: '项目名称',
					dataIndex: 'state',
					render: (h, params) => {
						return h(
							'el-tag',
							{
								props: { type: params.row.state === 0 ? 'success' : params.row.state === 1 ? 'info' : 'danger' } // 组件的props
							},
							params.row.state === 0 ? '上架' : params.row.state === 1 ? '下架' : '审核中'
						);
					}
				},
				{
					text: '日期',
					dataIndex: 'date'
				}
			]
		};
	},
	methods: {
		selectChange(selection) {
			console.log(selection);
		}
	}
};
</script>

<style></style>
