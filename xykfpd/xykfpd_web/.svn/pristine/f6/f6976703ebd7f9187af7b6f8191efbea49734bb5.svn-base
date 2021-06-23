import Vue from 'vue'
// 防止按钮重复点击
const preventReClick = Vue.directive('preventReClick', {
    inserted: function(el, binding) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true
                setTimeout(() => {
                    el.disabled = false
                }, binding.value || 1000)
            }
        })
    }
});

const allowClick = Vue.directive('allow', {
    inserted: (el, binding, vnode) => {
		let permissionList = vnode.context.$route.meta.button;
		if (permissionList?.length) {
			let index = permissionList.findIndex((value, index, arr) => {
				return value.front_router_name == binding.value
			})
			if (index == -1) {
				el.parentNode.removeChild(el);
			}
		}

	}
})
export { preventReClick,allowClick }