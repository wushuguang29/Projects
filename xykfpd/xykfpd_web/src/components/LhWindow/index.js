import LhWindow from './src/index.vue'
LhWindow.install = Vue => {
	Vue.component(LhWindow.name, LhWindow)
}
export default LhWindow