export default {
	state: {
		list: []
	},
	getters: {
		// 判断是否全选
		defaultPath(state){
			return state.list.filter(item=>{
				return item.isDefault === true;
			})
		}
	},
	mutations: {
		clearPath(state){
			state.list = [];
		},
		updatePath(state,list){
			state.list = list;
		},
		// 创建收货地址;
		createAddress(state,item){
			state.list.unshift(item)
		},
		// 删除收货地址
		delAddress(state,id){
			console.log('删除方法',id)
			state.list = state.list.filter((item,i)=>{
				if(item.id===id){
					return false
				}else{
					return true;
				}
			})
		},
		// 修改收货地址
		updateAddress(state,{index,item}){
			for(let key in item){
				state.list[index][key] = item[key];
			}
		},
		// 取消默认状态、
		removeDefaultStatus(state){
			state.list.forEach(item=>{
				item.isDefault = false
			})
		}
	},
	actions: {
		updateAddress({commit},{index,item}){
			if(item.isDefault){
				commit("removeDefaultStatus")
			}
			commit('updateAddress',{index,item});
		},
		createAddress({commit},item){
			if(item.isDefault){
				commit("removeDefaultStatus")
			}
			commit('createAddress',item);
		}
	}
}
