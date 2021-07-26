import $H from '../../common/lib/request.js'
export default {
	state:{
		popupShow:"none",
		list:[],
		selectList:[],
		popupIndex:-1,
		popupData:{
			item:{}
		}
	},
	getters:{
		//购物车中list 的长度
		cartNum(state){
			return state.list.length;
		},
		selectNum(state){
			return state.selectList.length
		},
		// 判断是否全选
		checkedAll:(state)=>{
			state.selectList =[]
			for(let i =0;i<state.list.length;i++){
				if(state.list[i].checked){
					state.selectList.push(state.list[i].id)
				}
			}
			return state.list.length === state.selectList.length
		},
		totalPrice:(state)=>{
			let total = 0;
			state.list.forEach(item=>{
				if(item.checked){
					total += item.pprice * item.num
				}
			})
			return total
		},
		disableSelectAll:(state)=>{
			return state.list.length === 0
		},
		// popupData:(state)=>{
		// 	return state.popupIndex > -1 ? state.list[state.popupIndex] : {}
		// }
	},
	mutations:{
		setList(state,item){
			state.list = item
		},
		setSelectedAll(state){
			state.selectList = state.list.map(v=>{
				v.checked = true;
				return v.id;
			})
		},
		setNotSelectedAll(state){
			state.selectList = [];
			state.list.forEach((v)=>{
				v.checked = false
			})
		},
		selectItem(state,index){
			state.list[index].checked = !state.list[index].checked
		},
		delGoods(state){
			
		},
		setPopupIndex(state,index){
			state.popupIndex = index;
		},
		addCar(state,newData){
			state.list.unshift(newData)
		}
	},
	actions:{
		initCartList({state,commit}){
			$H.get('/cart', {}, {
				token: true
			}).then(res => {
				const carData = res.map(v => {
					return {
						...v
					}
				})
				commit('setList',carData);
			})
		},
		setSelected({commit,getters}){
			getters.checkedAll ? commit('setNotSelectedAll') : commit('setSelectedAll')
		},
		doDelGoods({commit,state}){
			let noChecked = true;
			let checkedArr = []
			const list = state.list.forEach(v=>{
				if(v.checked){
					noChecked = false;
					checkedArr.push(v.id)
				}
			})
			if(noChecked){
				uni.showToast({
					title:'请选择要删除的商品',
					icon:'none'
				})
				return ;
			}
			uni.showModal({
				content:"是否删除选中",
				success(res) {
					if(res.confirm){
						$H.post('/cart/delete',{
							shop_ids:checkedArr.join(','),
						},{
							token:true,
						}).then(()=>{
							uni.showToast({
								title:'删除成功',
							})
							state.list = state.list.filter(v=>{
								if(v.checked){
									return false
								}
								return true;
							})
						})
					}
				}
			})
		},
		showPopup({state,commit},{index,data}){
			commit('setPopupIndex',index);
			data.item = state.list[index];
			console.log(data)
			state.popupData = data;
			state.popupShow = 'show'		
		},
		hidePopup({state}){
			state.popupShow = 'hide';
			setTimeout(()=>{
				state.popupShow = 'none'
			},200)
		},
	}
}