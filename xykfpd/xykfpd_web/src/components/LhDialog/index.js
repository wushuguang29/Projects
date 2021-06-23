import LhDialog from './src/index.vue'
LhDialog.install = Vue => {
	Vue.component(LhDialog.name, LhDialog)
}
export default LhDialog